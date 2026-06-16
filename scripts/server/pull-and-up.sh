#!/usr/bin/env bash
set -euo pipefail

PROFILE="${1:-${DEPLOY_PROFILE:?profile required: staging or production}}"
SERVICE="${PROFILE}"
IMAGE="ghcr.io/navneetr7/hewhocodes-website:${PROFILE}"
APP_DIR="${APP_DIR:-/opt/hewhocodes}"
LOCK_FILE="${LOCK_FILE:-/var/lock/hewhocodes-deploy.lock}"

if [[ -n "${GHCR_TOKEN:-}" && -n "${GHCR_USER:-}" ]]; then
  echo "${GHCR_TOKEN}" | docker login ghcr.io -u "${GHCR_USER}" --password-stdin
fi

mkdir -p "$(dirname "${LOCK_FILE}")"

wait_for_docker() {
  local attempt=0
  while (( attempt < 30 )); do
    if docker info >/dev/null 2>&1; then
      return 0
    fi
    sleep 2
    attempt=$((attempt + 1))
  done
  echo "Docker daemon not ready" >&2
  return 1
}

wait_for_prune_idle() {
  local attempt=0
  while (( attempt < 90 )); do
    if docker info >/dev/null 2>&1 && ! pgrep -af "docker (system|image|builder) prune" >/dev/null 2>&1; then
      return 0
    fi
    sleep 2
    attempt=$((attempt + 1))
  done
  echo "Timed out waiting for Docker prune to finish" >&2
  return 1
}

pull_with_recovery() {
  local attempt=1
  local max_attempts=4

  while (( attempt <= max_attempts )); do
    echo "Pull attempt ${attempt}/${max_attempts} for ${IMAGE}..."

    if docker compose --profile "${PROFILE}" pull "${SERVICE}"; then
      return 0
    fi

    if docker pull "${IMAGE}"; then
      return 0
    fi

    echo "Pull failed; recovering before retry..." >&2
    docker compose --profile "${PROFILE}" rm -f "${SERVICE}" 2>/dev/null || true
    docker image rm "${IMAGE}" -f 2>/dev/null || true
    wait_for_prune_idle || true

    case "${attempt}" in
      1)
        docker builder prune -af 2>/dev/null || true
        ;;
      2)
        docker system prune -af 2>/dev/null || true
        wait_for_prune_idle || sleep 15
        ;;
      3)
        if command -v systemctl >/dev/null 2>&1; then
          sudo -n systemctl restart docker 2>/dev/null || systemctl restart docker 2>/dev/null || true
          sleep 5
          wait_for_docker || true
        fi
        ;;
    esac

    wait_for_prune_idle || sleep 5
    attempt=$((attempt + 1))
  done

  echo "Image pull failed after ${max_attempts} attempts" >&2
  return 1
}

deploy() {
  cd "${APP_DIR}"

  docker compose --profile "${PROFILE}" stop "${SERVICE}" || true
  pull_with_recovery
  docker compose --profile "${PROFILE}" up -d "${SERVICE}"

  wait_for_prune_idle || true
  docker image prune -f 2>/dev/null || true
}

exec 9>"${LOCK_FILE}"
if ! flock -w 600 9; then
  echo "Another deploy is running; timed out waiting for lock" >&2
  exit 1
fi

deploy