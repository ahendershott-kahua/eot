# Changes — March 24, 2026

## Terminology

- **Stakeholder → Champion**: Renamed the pod role "Stakeholder" to "Champion" across the entire deck. External stakeholder references preserved.
- **Developer → Engineer**: Standardized all "Developer" labels to "Engineer".
- **PRD → Documentation** (split approach): New-way/output contexts say "documentation"; old-way criticism slides keep "PRD" for rhetorical contrast. Quote slide (#7) kept as-is.
- **Draft MVP PRD → Draft Documentation**: Renamed the card title on slide 7.

## Slide Updates

### Slide 4 — Pod Composition
- Restructured as two-tier layout: **Core Operators** (Engineer + Champion) with bold bordered cards, **Available Support** (Platform, Host, QA, UX, PM, CS) with dashed tags.

### Slide 6 — Roles Collapse
- Simplified VS Code bullet (removed specific model names).
- PM → Champion: "Champion drafts the problem frame AND helps build a clickable prototype."
- Designer: "Generates supporting documentation AND ships clickable UI/visuals."
- Replaced repetitive "Build the Prototype" card with **Define Done** (acceptance criteria before building).

### Slide 7 — Industry Inputs
- Simplified prototype bullet: "AI builds clickable prototype same day."
- Removed PM-specific references from brief-shaping language.

### Slide 9 — Stakeholder Inputs
- Reframed QA as advisory/consultative. Added downstream regression note.

### Slide 10 — Artifact Expectations
- Replaced "1-page MVP PRD" with **Rapid Project Plan** as the anchor artifact.
- Added async advisor review bullet.

### Slide 10b — Rapid Project Plan Example *(new)*
- Two-page **Miami Dade Fast Track** example displayed side by side (8.5×11 aspect ratio).
- Subtitle: "Subject to change. Final iteration in progress."

### Slide 14 — Canvas Pod Case Study
- Added case study slide with inline name tags (solid for operators, dashed for advisors).
- Tag order: Pritesh (Champion) → Colin (Engineer) → Sarah (UX Advisor).

### Slide 15 — Three Pilot Pods
- Standardized all three pod cards to uniform format: Engineer → Champion → dashed advisor tags.
- Updated memberships:
  - **Calendar Pod**: Colin = Engineer, Champion = --, Advisors: Steve, Denny, Bridgette
  - **Strategic Apps Pod**: Vlado = Engineer, Sakiba + Jonathan = Champions, Advisors: Brian Haines
  - **Forward Deployed Pod**: Engineer = --, Jordan Hoff = Champion, Advisors: --

### Slide 16 — What Changes Now
- Added central execution coordination bullet.
- Fixed name: Bridget → Bridgette.

### Slide 18 — The Flow
- Renamed "Prototype" phase to **Iterate** (Discover → Iterate → Build → Launch & Deploy).

### Slide 19 — Who Drives Each Phase
- Renamed "Prototype" column to **Iterate**.
- Engineer and Champion shown as primary rows; PM, Designer, QA marked with `*` as advisory.
- Removed opacity dimming from advisory rows for readability.

## Slide Navigation

- Fixed duplicate `data-slide` numbers (slides 10b/11 and 15/Timeline both had collisions).
- Renumbered all slides sequentially **1–29**. Navigation and counter now work correctly through all slides.
- Section numbers match footer slide counter on every slide.

### Slide 15 — kCapture Pod: Case Study *(new)*
- Two-column layout: **Already Shipped** (floor plans, capture timelines, live 360, offline queue, comparison) + **What the Pod Is Proving**.
- Pod tags: ProCon (Champion) → Colin (Engineer) → Bridgette (UX Advisor, dashed).

### Slide 16 — kCapture Screenshot *(new)*
- Full-screen desktop screenshot of the kCapture interface (floor plan with pins + 360 capture panel).

### Slide Reordering
- kCapture slides (15 + 16) now appear **before** Canvas Pod (17).

## Title Slide

- Large 3-color rotating circles (teal, red, orange) centered as background element.
- Text floats on top with `background: rgba(255,255,255,0.85)` for readability.
- Dashed circle uses thinner stroke (1.5px, dash pattern 4 3).
- **Animation auto-pauses after 5 seconds**: circles fade out, snap to balanced arrangement, fade back in.
- Corner brand and inner slide circles are static (no animation).

## PDF Export

- Regenerated full **29-slide PDF** at 1920×1080 with Kahua logo top-right on every page (5.1MB).
- Added reusable generation script at `scripts/generate-pdf.js`.
- Anyone on the project can regenerate with:
  ```
  npm install
  npm run generate-pdf
  ```

## Infrastructure

- Added `package.json` with puppeteer dependency and `generate-pdf` script.
- Added `.gitignore` (excludes `node_modules/`).
- Committed `package-lock.json`.
- Added secret version history viewer (type "history" or click Kahua logo 5×).
- All dates updated to **March 24, 2026**.
