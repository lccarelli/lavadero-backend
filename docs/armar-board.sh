#!/usr/bin/env bash
# Arma el board completo: labels + issues + los agrega al GitHub Project.
# IDEMPOTENTE: si un issue (por título) ya existe, no lo duplica.
#
# Uso:
#   bash armar-board.sh
# Overrides (opcionales):
#   OWNER=lccarelli REPO=lccarelli/lavadero-backend PROJECT=1 bash armar-board.sh
set -euo pipefail

OWNER="${OWNER:-lccarelli}"
REPO="${REPO:-lccarelli/lavadero-backend}"
PROJECT="${PROJECT:-1}"

# --- Chequeo de permisos del Project ---
if ! gh project view "$PROJECT" --owner "$OWNER" >/dev/null 2>&1; then
  echo "No puedo leer el Project #$PROJECT de $OWNER."
  echo "Probablemente falte el scope. Corré:  gh auth refresh -s project,read:project"
  exit 1
fi

# --- Labels (idempotente) ---
labels=(
  "setup:0e8a16" "fullstack:1d76db" "infra:5319e7"
  "frontend:fbca04" "backend:b60205" "final:c5def5"
  "fase-1:d4c5f9" "fase-2:d4c5f9" "fase-3:d4c5f9"
  "prioridad-alta:e11d21" "prioridad-baja:c2e0c6"
)
for l in "${labels[@]}"; do
  gh label create "${l%%:*}" --color "${l##*:}" --repo "$REPO" 2>/dev/null || true
done

# --- Tickets: "titulo|labels|cuerpo" ---
tickets=(
"[TK-S-01] Bootstrap del proyecto y repos|setup,fase-1,prioridad-alta|Crear ambos repos, clonarlos como carpetas hermanas, estructura inicial y GitHub Project con columnas Backlog/En progreso/En revisión/Done. Detalle: docs/board-issues.md"
"[TK-S-02] Dockerización - compose MySQL + backend + frontend|setup,fase-1,prioridad-alta,infra|docker-compose up levanta los 3 servicios. Dockerfiles + compose + volumes. Detalle: docs/board-issues.md"
"[TK-S-03] Backend arranca en Docker y se conecta a la DB|setup,fase-1,backend|testConnection() + /health + test Supertest. Detalle: docs/board-issues.md"
"[TK-S-04] Frontend (nginx) sirve estáticos y hace fetch al backend|setup,fase-1,frontend|index.html + api.js + main.js + CORS + test. Detalle: docs/board-issues.md"
"[TK-S-05] GitHub Actions (CI básico) - opcional|setup,fase-1,infra,prioridad-baja|Workflow que corre npm test en cada PR. Detalle: docs/board-issues.md"
"[TK-F-01] Modelo Categoria + endpoint de listado|fullstack,fase-2|Categoria en BD + GET /api/categorias + getCategorias() en front. CUs: 2.1.1, 2.2.1, 3.1.3. Detalle: docs/board-issues.md"
"[TK-F-02] Modelo Producto + alta + listado paginado|fullstack,fase-2|Producto + paginación + alta con imagen + productos.html. CUs: 2.1.2, 2.2.2, 3.1.1, 3.2.1, 3.3.1, 5.2.x. Detalle: docs/board-issues.md"
"[TK-F-03] Modelo Usuario + autenticación admin|fullstack,fase-2,backend|Usuario + login sesión + EJS login + requireAdmin. CUs: 2.1.3, 2.2.3, 4.x. Detalle: docs/board-issues.md"
"[TK-F-04] Backoffice - Dashboard y CRUD de productos|fullstack,fase-2,backend|Dashboard EJS + CRUD completo + modales. CUs: 3.1.2, 3.2.x, 6.x. Detalle: docs/board-issues.md"
"[TK-F-05] Flujo cliente - Bienvenida + carrito + venta|fullstack,fase-2|Venta + VentaProducto + carrito.js + POST /api/ventas (total server-side). CUs: 2.1.4, 2.1.5, 5.x. Detalle: docs/board-issues.md"
"[TK-F-06] Ticket + PDF + reinicio del flujo|fullstack,fase-2,frontend|ticket.html + jsPDF + salir. CUs: 5.4.x. Detalle: docs/board-issues.md"
"[TK-F-07] Reportes - Excel de ventas|fullstack,fase-2,backend|GET /admin/ventas/excel (exceljs) + GET /api/ventas. CUs: 7.1.x. Detalle: docs/board-issues.md"
"[TK-F-08] Temas claro/oscuro + responsive + branding|fullstack,fase-2,frontend|theme.css + tema.js + header global + QA responsive. CUs: 1.2.x, 10.1.x. Detalle: docs/board-issues.md"
"[TK-F-09] Encuesta (final)|fullstack,fase-3,final|Encuesta + 5 inputs + upload imagen. CUs: 2.1.6, 8.1.x. Detalle: docs/board-issues.md"
"[TK-F-10] Detalle de producto (final)|fullstack,fase-3,final|producto-detalle.html + GET /api/productos/:id. CUs: 8.2.x. Detalle: docs/board-issues.md"
"[TK-F-11] Logs de login + pantalla de registros (final)|fullstack,fase-3,final,backend|LogLogin + /admin/registros. CUs: 2.1.7, 9.1.x. Detalle: docs/board-issues.md"
"[TK-F-12] Estadísticas + Excel de encuestas (final)|fullstack,fase-3,final,backend|Top 10 + ventas por categoría + promedio + excel encuestas. CUs: 7.2.1, 9.2.x. Detalle: docs/board-issues.md"
)

# Títulos ya existentes en el repo (para no duplicar)
existing="$(gh issue list --repo "$REPO" --state all --limit 200 --json title --jq '.[].title')"

for t in "${tickets[@]}"; do
  IFS='|' read -r title labels_csv body <<< "$t"
  if grep -qxF "$title" <<< "$existing"; then
    echo "= ya existe: $title"
  else
    echo "+ creando:   $title"
    gh issue create --repo "$REPO" --title "$title" --label "$labels_csv" --body "$body" >/dev/null
  fi
done

# --- Agregar TODOS los issues del repo al Project (item-add es idempotente) ---
echo "--- agregando issues al Project #$PROJECT ---"
while IFS= read -r url; do
  [ -z "$url" ] && continue
  gh project item-add "$PROJECT" --owner "$OWNER" --url "$url" >/dev/null
  echo "  ↳ $url"
done < <(gh issue list --repo "$REPO" --state all --limit 200 --json url --jq '.[].url')

echo "Listo. Board armado en Project #$PROJECT ($OWNER)."
