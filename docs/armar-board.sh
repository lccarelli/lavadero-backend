#!/usr/bin/env bash
# Sincroniza el board con docs/board-issues.md (fuente canónica).
# - Parsea cada bloque "## [TK-..]" -> título, "Labels:" -> etiquetas, resto -> cuerpo.
# - Por cada ticket: si ya existe un issue con ese título lo EDITA (actualiza cuerpo y
#   labels); si no, lo CREA. Idempotente.
# - Agrega todos los issues del repo al Project.
#
# Uso:    bash docs/armar-board.sh
# Vars:   OWNER=lccarelli REPO=lccarelli/lavadero-backend PROJECT=1 bash docs/armar-board.sh
set -euo pipefail

OWNER="${OWNER:-lccarelli}"
REPO="${REPO:-lccarelli/lavadero-backend}"
PROJECT="${PROJECT:-1}"
SRC="$(dirname "$0")/board-issues.md"

[ -f "$SRC" ] || { echo "No encuentro $SRC"; exit 1; }
if ! gh project view "$PROJECT" --owner "$OWNER" >/dev/null 2>&1; then
  echo "No puedo leer el Project #$PROJECT de $OWNER. Corré: gh auth refresh -s project,read:project"
  exit 1
fi

# --- Labels (idempotente) ---
labels=(
  "setup:0e8a16" "fullstack:1d76db" "infra:5319e7" "frontend:fbca04"
  "backend:b60205" "final:c5def5" "docs:0075ca"
  "fase-1:d4c5f9" "fase-2:d4c5f9" "fase-3:d4c5f9"
  "prioridad-alta:e11d21" "prioridad-baja:c2e0c6"
)
for l in "${labels[@]}"; do
  gh label create "${l%%:*}" --color "${l##*:}" --repo "$REPO" 2>/dev/null || true
done

# --- Parseo de board-issues.md a un manifiesto (title<TAB>labels<TAB>bodyfile) ---
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
awk -v dir="$TMP" '
  /^## \[/ {
    if (have) print title "\t" labels "\t" bodyfile
    n++; have=1; mode="labels"; title=substr($0,4); labels=""
    bodyfile=dir "/body" n ".md"; printf "" > bodyfile; next
  }
  have && mode=="labels" && /^Labels:/ { labels=$0; sub(/^Labels:[ ]*/,"",labels); mode="body"; next }
  /^## / && !/^## \[/ { if (have) { print title "\t" labels "\t" bodyfile; have=0 } mode="done"; next }
  have && mode=="body" { if ($0 != "---") print $0 >> bodyfile }
  END { if (have) print title "\t" labels "\t" bodyfile }
' "$SRC" > "$TMP/manifest.tsv"

# Issues existentes (number<TAB>title). while-read en vez de mapfile (bash 3.2 de macOS).
existing=()
while IFS= read -r line; do existing+=("$line"); done < <(gh issue list --repo "$REPO" \
  --state all --limit 200 --json number,title --jq '.[] | "\(.number)\t\(.title)"')

# --- Crear o editar cada ticket ---
while IFS=$'\t' read -r title labels bodyfile; do
  [ -z "$title" ] && continue
  # labels -> flags repetidos
  create_lbls=(); add_lbls=()
  IFS=',' read -ra L <<< "$labels"
  for x in "${L[@]}"; do x="$(echo "$x" | xargs)"; [ -z "$x" ] && continue
    create_lbls+=(--label "$x"); add_lbls+=(--add-label "$x"); done
  # ¿existe? Match por el código [TK-..] (estable aunque cambie el título)
  code="${title#\[}"; code="${code%%\]*}"
  num=""
  for e in "${existing[@]}"; do
    etitle="${e#*$'\t'}"; ecode="${etitle#\[}"; ecode="${ecode%%\]*}"
    [ "$ecode" = "$code" ] && { num="${e%%$'\t'*}"; break; }
  done
  if [ -n "$num" ]; then
    gh issue edit "$num" --repo "$REPO" --title "$title" --body-file "$bodyfile" "${add_lbls[@]}" >/dev/null
    echo "~ actualizado #$num ($code)"
  else
    gh issue create --repo "$REPO" --title "$title" --body-file "$bodyfile" "${create_lbls[@]}" >/dev/null
    echo "+ creado: $code"
  fi
done < "$TMP/manifest.tsv"

# --- Agregar todos los issues al Project (idempotente) ---
echo "--- agregando issues al Project #$PROJECT ---"
while IFS= read -r url; do
  [ -z "$url" ] && continue
  gh project item-add "$PROJECT" --owner "$OWNER" --url "$url" >/dev/null
done < <(gh issue list --repo "$REPO" --state all --limit 200 --json url --jq '.[].url')

echo "Listo. Board sincronizado desde board-issues.md en Project #$PROJECT ($OWNER)."
