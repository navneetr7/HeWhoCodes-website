#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/hewhocodes"

if [[ ! -d "${APP_DIR}/.git" ]]; then
  echo "App not installed. Run scripts/server/setup.sh first."
  exit 1
fi

echo "==> Pulling latest main"
git -C "${APP_DIR}" fetch origin main
git -C "${APP_DIR}" reset --hard origin/main

echo "==> Installing dependencies"
cd "${APP_DIR}"
pnpm install --frozen-lockfile 2>/dev/null || pnpm install

echo "==> Building"
pnpm build

echo "==> Restarting app"
pm2 restart hewhocodes

echo "Deploy complete."