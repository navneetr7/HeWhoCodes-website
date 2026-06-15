#!/usr/bin/env bash
set -euo pipefail

DOMAIN="hewhocodes.com"
APP_DIR="/var/www/hewhocodes"
REPO_URL="https://github.com/navneetr7/HeWhoCodes-website.git"
NODE_MAJOR="22"

if [[ "${EUID:-$(id -u)}" -ne 0 ]]; then
  echo "Run as root: sudo bash scripts/server/setup.sh"
  exit 1
fi

echo "==> Installing system packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y curl git nginx certbot python3-certbot-nginx

if ! command -v node >/dev/null 2>&1 || [[ "$(node -v | cut -d. -f1 | tr -d v)" -lt "${NODE_MAJOR}" ]]; then
  echo "==> Installing Node.js ${NODE_MAJOR}"
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
  apt-get install -y nodejs
fi

echo "==> Enabling pnpm"
corepack enable
corepack prepare pnpm@latest --activate

if ! command -v pm2 >/dev/null 2>&1; then
  echo "==> Installing pm2"
  npm install -g pm2
fi

echo "==> Cloning or updating app"
if [[ -d "${APP_DIR}/.git" ]]; then
  git -C "${APP_DIR}" fetch origin main
  git -C "${APP_DIR}" reset --hard origin/main
else
  mkdir -p "$(dirname "${APP_DIR}")"
  git clone "${REPO_URL}" "${APP_DIR}"
fi

echo "==> Building app"
cd "${APP_DIR}"
pnpm install --frozen-lockfile 2>/dev/null || pnpm install
pnpm build

echo "==> Starting app with pm2"
pm2 delete hewhocodes >/dev/null 2>&1 || true
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup systemd -u root --hp /root >/dev/null 2>&1 || true

echo "==> Configuring nginx"
install -m 644 "${APP_DIR}/scripts/server/nginx/hewhocodes.com.conf" \
  "/etc/nginx/sites-available/${DOMAIN}"
ln -sf "/etc/nginx/sites-available/${DOMAIN}" "/etc/nginx/sites-enabled/${DOMAIN}"
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl enable nginx
systemctl reload nginx

SERVER_IP="$(curl -4 -fsS ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}')"
DNS_IP="$(dig +short "${DOMAIN}" A | head -1 || true)"

echo
echo "Setup complete."
echo "App directory: ${APP_DIR}"
echo "Server IP:     ${SERVER_IP}"
echo "DNS A record:  ${DNS_IP:-not set}"
echo
if [[ "${DNS_IP}" != "${SERVER_IP}" ]]; then
  echo "DNS is not pointing at this server yet."
  echo "In Namecheap, set these A records to ${SERVER_IP}:"
  echo "  @   -> ${SERVER_IP}"
  echo "  www -> ${SERVER_IP}"
  echo
  echo "After DNS propagates, run:"
  echo "  certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} --non-interactive --agree-tos -m hello@${DOMAIN} --redirect"
else
  echo "DNS looks correct. Enabling HTTPS:"
  certbot --nginx -d "${DOMAIN}" -d "www.${DOMAIN}" \
    --non-interactive --agree-tos -m "hello@${DOMAIN}" --redirect || true
fi

echo
echo "Site should be available at http://${DOMAIN} (or https after certbot)."