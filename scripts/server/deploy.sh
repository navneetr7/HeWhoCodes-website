#!/usr/bin/env bash
set -euo pipefail

echo "Deployments are handled by GitHub Actions:"
echo "  push to main              -> staging.hewhocodes.com"
echo "  push tag v1.0.0 (etc.)    -> hewhocodes.com"
echo
echo "Manual server pull (emergency only):"
echo "  cd /opt/hewhocodes"
echo "  docker compose --profile staging pull staging && docker compose --profile staging up -d staging"
echo "  docker compose --profile production pull production && docker compose --profile production up -d production"