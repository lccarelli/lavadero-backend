# Runbook: tickets y board

Cómo trabajamos: de la consigna del TP a un board de GitHub con issues accionables.
Este documento explica **la filosofía**, **qué documento sirve para qué**, **cómo se
escribe un ticket en markdown** y **cómo se ejecutan la creación de issues y su
asignación al board**.

> Objetivo: que cualquiera de los dos integrantes pueda reproducir el proceso sin
> depender del otro, y que la trazabilidad consigna → ticket quede explícita.

---

## 1. Filosofía

### 1.1 Tickets fullstack verticales

Después del setup, **cada ticket entrega una funcionalidad end-to-end**: toca base de
datos + backend + frontend + tests del lado que aplique. Cuando se cierra un ticket,
una feature está **andando completa**, no "media hecha en una capa".

Esto evita el anti-patrón de "primero todos los modelos, después todos los endpoints,
después toda la UI", donde nada funciona hasta el final y la integración explota junta.

### 1.2 Jerarquía de planificación

```
Épica          (un objetivo grande del sistema)
└── Feature    (un conjunto coherente de funcionalidad)
    └── CU      (Caso de Uso: una unidad funcional concreta, con criterio de aceptación)
        ⇡
        Ticket  (TK: unidad de TRABAJO que agrupa varios CUs en algo entregable de una)
```

- **CU** = el *qué* (lo que el sistema debe hacer). Vive en `backlog.md`.
- **Ticket (TK)** = el *cómo y cuándo lo hacemos* (una tanda de trabajo fullstack que
  cubre varios CUs relacionados). Vive en `tickets.md`.

Un ticket suele cubrir entre 1 y ~11 CUs. Ejemplo: el ticket "Producto + listado
paginado" cierra los CUs del modelo Producto, el endpoint paginado, las validaciones y
la pantalla de productos, todos juntos, porque tiene sentido hacerlos en una sola pasada.

### 1.3 Clasificación de los CUs

En `backlog.md` cada CU está marcado:

- 🎯 **Obligatorio para cursada** (promoción)
- ⭐ **Extra para fecha de final**
- 🔧 **Técnico / infraestructura** (no funcional pero necesario)

Esto permite priorizar: primero todo lo 🎯, los ⭐ solo si vamos a final.

### 1.4 Dos repos

El proyecto vive en **dos repositorios separados**:

- `lavadero-backend` — API REST (JSON) + backoffice (EJS) + MySQL. Acá vive el
  `docker-compose.yml`, los `docs/` y el board.
- `lavadero-frontend` — frontend del cliente, HTML/CSS/JS vanilla, servido por nginx.

Como los tickets son fullstack, **un mismo ticket suele tocar ambos repos**. Por eso los
issues del board viven todos en **un solo repo** (`lavadero-backend`, el "ancla") aunque
parte del trabajo se haga en el frontend. El board es uno, el trabajo se reparte.

> Requisito del enunciado: **ambos integrantes deben tener commits en ambos repos.**
> Se vigila continuamente (pair programming o repartir features y revisar PRs cruzados).

---

## 2. Los documentos y su rol

Todos viven en `lavadero-backend/docs/`. El flujo de información es:

```
consigna del TP
   └─> requisitos.md        separa RF / RNF y fija el stack
        └─> backlog.md      desglosa en Épicas > Features > CUs (con 🎯/⭐/🔧)
             └─> tickets.md agrupa CUs en Tickets de trabajo (TK-S / TK-F)
                  └─> board-issues.md   cada TK como issue listo para crear
                       └─> [board de GitHub]
   trazabilidad.md   mapea: consigna ↔ CU ↔ justificación (para defensa)
   diagramas.md      modelo de datos y pantallas (Mermaid)
```

| Documento | Para qué sirve | Granularidad |
|-----------|----------------|--------------|
| `requisitos.md` | Requisitos funcionales / no funcionales + stack | Proyecto |
| `backlog.md` | El *qué*: catálogo completo de CUs | Caso de uso |
| `tickets.md` | El *cómo*: unidades de trabajo fullstack | Ticket (TK) |
| `board-issues.md` | Issues listos para copiar/crear en GitHub | Ticket (TK) |
| `trazabilidad.md` | Justificar cada decisión contra la consigna | Consigna ↔ CU |
| `diagramas.md` | Modelo de datos y mapa de pantallas | Proyecto |
| `runbook-tickets-y-board.md` | Este documento: el proceso | Meta |

**Regla de oro:** la fuente de verdad de los CUs es `backlog.md`. La fuente de verdad de
los tickets es `tickets.md`. `board-issues.md` es una *vista* de `tickets.md` formateada
para GitHub. Si cambia un ticket, se actualiza `tickets.md` **y** `board-issues.md`.

---

## 3. Cómo se escribe un ticket en markdown

### 3.1 Convención de nombres

```
TK-S-NN   Ticket de Setup    (horizontal: infra que hay que tener antes de empezar)
TK-F-NN   Ticket Fullstack   (vertical: una feature end-to-end)
```

- **Setup (TK-S):** son horizontales por naturaleza (no se puede testear el backend sin
  tenerlo levantado). Se hacen primero, en orden.
- **Fullstack (TK-F):** desde el primero entregan una feature completa.

### 3.2 Anatomía de un ticket

Cada ticket en `tickets.md` tiene **siempre** estas secciones:

```markdown
## TK-F-NN: <título corto y claro>

**Objetivo:** una o dos frases. Qué queda andando cuando esto se cierra.

**Capas que toca:**
- **DB:** modelos / seeders nuevos
- **Backend:** endpoints, validaciones, middleware
- **Frontend:** pantallas, módulos JS, estilos
- **EJS:** vistas del backoffice (si aplica)
- **Tests:** qué se testea de cada lado

**Criterio de aceptación:**
- Lista de condiciones verificables. Si todas se cumplen, el ticket está "Done".
- Deben ser objetivas ("GET /api/productos?page=1&limit=8 devuelve 8 items"), no vagas.

**Estimación:** X hs
**Casos de uso relacionados:** CU-X.Y.Z, CU-...
```

### 3.3 Buenas prácticas al redactar

- **El criterio de aceptación manda.** Si no se puede verificar, no es criterio.
- **Un ticket = una branch = un PR.** Si un ticket no entra en una branch razonable,
  está demasiado grande: partilo.
- **Listar los CUs relacionados** mantiene la trazabilidad: cada CU del backlog termina
  cubierto por algún ticket.
- **Tareas como checklist** (`- [ ]`) para tachar progreso dentro del issue.

### 3.4 El paso a `board-issues.md`

`board-issues.md` toma cada ticket de `tickets.md` y lo deja en formato "issue":

```markdown
## [TK-F-NN] <título>

`Labels: fullstack, fase-2, ...`

**Objetivo:** ...
**Tareas:** - [ ] ...
**Criterio de aceptación:** - ...
**Estimación / CUs:** ...
```

El `##` es el **título del issue**. La línea `Labels:` define las etiquetas. El resto es
el cuerpo. Es lo que el script lee conceptualmente (los textos están replicados en el
script, ver §4).

---

## 4. De markdown al board: ejecución

Hay **un script todo-en-uno**: `docs/armar-board.sh`. Hace tres cosas, en orden, y es
**idempotente** (se puede correr varias veces sin duplicar nada).

### 4.1 Qué hace `armar-board.sh`

1. **Verifica permisos** del Project. Si faltan, avisa y corta.
2. **Crea los labels** (idempotente: ignora los que ya existen).
3. **Crea los issues**: por cada ticket, si ya existe uno con ese **título**, lo saltea;
   si no, lo crea. Así correrlo de nuevo no genera duplicados.
4. **Agrega todos los issues del repo al Project** (`gh project item-add`, idempotente).

### 4.2 Requisitos previos

- Tener la **GitHub CLI** (`gh`) instalada y logueada en la cuenta correcta:
  ```bash
  gh auth status        # debe mostrar la cuenta personal
  ```
- El repo y el Project tienen que existir en GitHub.
- Permiso de `project` en el token (la primera vez):
  ```bash
  gh auth refresh -s project,read:project
  ```

### 4.3 Ejecutar

```bash
cd lavadero-backend
bash docs/armar-board.sh
```

Variables que se pueden sobreescribir (con sus defaults):

```bash
OWNER=lccarelli \
REPO=lccarelli/lavadero-backend \
PROJECT=1 \
bash docs/armar-board.sh
```

- `OWNER` — dueño del Project (tu usuario).
- `REPO` — repo donde viven los issues.
- `PROJECT` — número del Project. Se ve con `gh project list --owner <usuario>`.

### 4.4 Salida esperada

```
= ya existe: [TK-S-01] Bootstrap del proyecto y repos
+ creando:   [TK-F-07] Reportes - Excel de ventas
...
--- agregando issues al Project #1 ---
  ↳ https://github.com/lccarelli/lavadero-backend/issues/1
...
Listo. Board armado en Project #1 (lccarelli).
```

### 4.5 Las columnas del board

Los issues entran al Project **sin Status** (columna vacía). El campo **Status** del
Project (Projects v2) trae por defecto `Todo / In Progress / Done`. Se ajusta **una vez**
desde la UI del Project para que quede:

```
Backlog · En progreso · En revisión · Done
```

(Settings del Project → campo Status → renombrar opciones y agregar "En revisión".)

Opcional: activar el **workflow "Auto-add to project"** (Project → ⋯ → Workflows) para
que los issues nuevos del repo entren solos al board sin re-correr el script.

---

## 5. Ciclo de vida de un ticket (día a día)

```
Backlog ──► En progreso ──► En revisión ──► Done
   │            │               │             │
 issue       branch +        PR abierto    PR mergeado
 creado      commits         + review       (Closes #NN)
```

1. **Tomar un issue** del board → moverlo a **En progreso**.
2. Crear la branch:
   ```bash
   git checkout -b feature/tk-f-02-listado-productos
   ```
3. Trabajar **todas las capas** del ticket en esa branch (DB → backend → tests →
   frontend → tests). No mergear con tests rojos.
4. Abrir **PR** con `Closes #NN` en la descripción → mover el issue a **En revisión**.
5. El **compañero revisa** y mergea → el issue pasa a **Done** automáticamente.

### 5.1 Convención de commits

```
tipo(CU-X.Y.Z): descripción corta
```

`tipo ∈ {feat, fix, test, refactor, docs, chore}`. Ejemplos:

```
feat(CU-3.1.1): listado de productos paginados
test(CU-3.1.1): tests del endpoint GET /api/productos
fix(CU-5.3.5): el cálculo del total ignoraba descuentos
```

### 5.2 Branches

- `main` protegida.
- Una branch por feature: `feature/tk-f-NN-nombre-corto`.
- PRs con review del compañero antes de mergear.

---

## 6. Agregar o modificar un ticket

El proceso es editar markdown y re-correr el script (que es idempotente):

1. **¿Hay un CU nuevo?** Agregarlo primero en `backlog.md` (con su 🎯/⭐/🔧).
2. **Definir/ajustar el ticket** en `tickets.md` con todas sus secciones (§3.2).
3. **Reflejarlo en `board-issues.md`** (la vista formateada).
4. **Agregar la entrada al array `tickets=(...)` de `armar-board.sh`** con el formato
   `"titulo|labels|cuerpo"`.
5. Re-correr:
   ```bash
   bash docs/armar-board.sh
   ```
   Los tickets viejos se saltean por título; solo se crea el nuevo y se agrega al board.

> Si cambia el **título** de un ticket ya creado, el script lo trataría como nuevo
> (crearía un duplicado). En ese caso, editar el título del issue en GitHub a mano, o
> cerrar el viejo.

---

## 7. Referencia rápida de comandos

```bash
# Estado de la cuenta gh
gh auth status

# Permiso de project (primera vez)
gh auth refresh -s project,read:project

# Ver número del Project
gh project list --owner lccarelli

# Armar/actualizar el board completo (idempotente)
cd lavadero-backend && bash docs/armar-board.sh

# Listar los issues del repo
gh issue list --repo lccarelli/lavadero-backend --limit 30

# Crear branch de un ticket
git checkout -b feature/tk-f-02-listado-productos
```

---

## 8. Resumen en una frase

> La consigna se desglosa en **CUs** (`backlog.md`), los CUs se agrupan en **tickets**
> fullstack (`tickets.md`), los tickets se vuelven **issues** (`board-issues.md` +
> `armar-board.sh`), y cada issue se trabaja en su **branch** hasta quedar **Done** en el
> board. Todo trazable, todo reproducible, todo end-to-end.
