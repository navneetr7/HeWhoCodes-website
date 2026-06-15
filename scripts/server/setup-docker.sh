#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/hewhocodes"
REPO_URL="https://github.com/navneetr7/HeWhoCodes-website.git"

if [[ "${EUID:-$(id -u)}" -ne 0 ]]; then
  echo "Run as root: sudo bash scripts/server/setup-docker.sh"
  exit 1
fi

echo "==> Installing Docker"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y ca-certificates curl git nginx certbot python3-certbot-nginx

if ! command -v docker >/dev/null 2>&1; then
  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
  chmod a+r /etc/apt/keyrings/docker.asc
  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "${VERSION_CODENAME}") stable" \
    > /etc/apt/sources.list.d/docker.list
  apt-get update -qq
  apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
fi

echo "==> Stopping legacy pm2 deployment"
pm2 delete hewhocodes >/dev/null 2>&1 || true
pm2 save >/dev/null 2>&1 || true

echo "==> Syncing deployment files"
mkdir -p "${APP_DIR}"
if [[ -d "${APP_DIR}/.git" ]]; then
  git -C "${APP_DIR}" fetch origin main
  git -C "${APP_DIR}" reset --hard origin/main
else
  git clone "${REPO_URL}" "${APP_DIR}"
fi

echo "==> Configuring nginx"
install -m 644 "${APP_DIR}/scripts/server/nginx/hewhocodes.com.conf" \
  /etc/nginx/sites-available/hewhocodes.com
install -m 644 "${APP_DIR}/scripts/server/nginx/staging.hewhocodes.com.conf" \
  /etc/nginx/sites-available/staging.hewhocodes.com
ln -sf /etc/nginx/sites-available/hewhocodes.com /etc/nginx/sites-enabled/hewhocodes.com
ln -sf /etc/nginx/sites-available/staging.hewhocodes.com /etc/nginx/sites-enabled/staging.hewhocodes.com
nginx -t
systemctl enable nginx
systemctl reload nginx

SERVER_IP="$(curl -4 -fsS ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}')"

echo
echo "Docker host setup complete."
echo "Deploy directory: ${APP_DIR}"
echo "Server IP:        ${SERVER_IP}"
echo
echo "DNS records required:"
echo "  @       A  ${SERVER_IP}"
echo "  www     A  ${SERVER_IP}"
echo "  staging A  ${SERVER_IP}"
echo
echo "After DNS propagates, run:"
echo "  certbot --nginx -d hewhocodes.com -d www.hewhocodes.com -d staging.hewhocodes.com \\"
echo "    --non-interactive --agree-tos -m hello@hewhocodes.com --redirect"
echo
echo "Deployments:"
echo "  push to main       -> staging.hewhocodes.com"
echo "  push tag v1.0.0    -> hewhocodes.com"