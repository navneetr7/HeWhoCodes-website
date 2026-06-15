#!/usr/bin/env bash
set -euo pipefail

echo "Deployments are handled by GitHub Actions:"
echo "  push to main              -> staging.hewhocodes.com"
echo "  push tag v1.0.0 (etc.)    -> hewhocodes.com"
echo
echo "Manual server pull (emergency only):"
echo "  bash /opt/hewhocodes/scripts/server/pull-and-up.sh staging"
echo "  bash /opt/hewhocodes/scripts/server/pull-and-up.sh production"