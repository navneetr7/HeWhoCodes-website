#!/usr/bin/env bash
set -euo pipefail

PROFILE="${1:?profile required: staging or production}"
SERVICE="${PROFILE}"
IMAGE="ghcr.io/navneetr7/hewhocodes-website:${PROFILE}"
APP_DIR="${APP_DIR:-/opt/hewhocodes}"

cd "${APP_DIR}"

docker compose --profile "${PROFILE}" stop "${SERVICE}" || true

if ! docker compose --profile "${PROFILE}" pull "${SERVICE}"; then
  echo "Pull failed; pruning Docker state and retrying..."
  docker image rm "${IMAGE}" -f || true
  docker system prune -af
  docker compose --profile "${PROFILE}" pull "${SERVICE}"
fi

docker compose --profile "${PROFILE}" up -d "${SERVICE}"
docker image prune -f