#!/usr/bin/env bash
# Valida que TODOS los CUs del backlog estén cubiertos por algún ticket.
# Cruza backlog.md (lista canónica de CUs) contra board-issues.md (CUs por ticket).
# Salida ok = sin huérfanos ni referencias phantom.
set -euo pipefail
cd "$(dirname "$0")"

grep -oE '### CU [0-9]+\.[0-9]+\.[0-9]+' backlog.md \
  | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | sort -uV > /tmp/cov_all.txt
grep -oE 'CU-[0-9]+\.[0-9]+\.[0-9]+' board-issues.md \
  | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | sort -uV > /tmp/cov_ref.txt

echo "CUs en backlog:        $(wc -l < /tmp/cov_all.txt)"
echo "CUs cubiertos:         $(wc -l < /tmp/cov_ref.txt)"

orphans="$(comm -23 /tmp/cov_all.txt /tmp/cov_ref.txt)"
phantom="$(comm -13 /tmp/cov_all.txt /tmp/cov_ref.txt)"

if [ -z "$orphans" ] && [ -z "$phantom" ]; then
  echo "OK todos los CUs del backlog están cubiertos por un ticket."
  exit 0
fi
[ -n "$orphans" ] && { echo "HUÉRFANOS (sin ticket):"; echo "$orphans"; }
[ -n "$phantom" ] && { echo "PHANTOM (referenciados pero no existen en backlog):"; echo "$phantom"; }
exit 1
