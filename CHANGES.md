# Changes — March 26, 2026

## Terminology

- **Prototype → Iteration**: Replaced all instances of "prototype" throughout the entire deck with "iteration" and contextual alternatives ("working version", "artifact"). Per CTO direction.
- Vocabulary slide: "Prototype" entry renamed to **Iteration** with new definition.
- Quote slide now reads: **"They operate around an Iteration."**

## Slide Content Updates

### Slide 7 — Designer Inputs
- Callout rewritten: "A designer with VS Code can produce a clickable artifact in a single iteration session" (was "...in 2 hours").

### Slide 20 — Three Pilot Pods
- All three pod cards restructured to labeled format: `Engineer:`, `Champion:`, `Advisors:` (was inline names).
- Calendar Pod: added Steve Stankiewicz as Champion, Denny + Bridgette as Advisors.
- Strategic Apps Pod: Vlado = Engineer, Sakiba + Jonathan = Champions, Brian Haines = Advisor.
- Forward Deployed Pod: Champion = Jordan Hoff, Engineer/Advisors = "--".
- Removed several bullet descriptions from each pod card.
- Forward Deployed callout changed to "Engineering support required before activation."
- Bottom callout shortened: removed "Strategic Capital Planning pod operates until first customer-aligned execution pod launches."

### Slide 21 — What Changes Now
- "This Week" → **"Now"**, "Next Week" → **"Next"**.
- Replaced "Weeks, not months. New muscle memory starts now" with "Pod execution coordination and artifact tracking owned centrally."

### Slide 24 — Who Drives Each Phase
- Subtitle rewritten: "Engineer and Champion are constant. All other roles participate as needed." (was "Every role is engaged every phase...")
- PM, Designer, QA rows now marked with `*` as advisory roles.
- Added footnote: "Rows marked * are advisory functions, not required headcount."
- Bottom callout rewritten to match.

### Appendix — PM Deep Dive
- Callout rewritten: "The PM who ships an iteration discovers what works. The PM who ships a PRD describes what might." (was "...learns more than the PM who ships a PRD on Friday.")

### Appendix — Designer Deep Dive
- Callout rewritten: "A designer with an AI pair can now do work that once required a small team. Roles collapse into one workflow." (was "...produce what used to take a team of three two weeks, in a single afternoon.")

### Appendix — Engineer Deep Dive
- Callout rewritten: "The engineer who directs AI and ships working results outpaces the team that hand codes every step." (was "...ships in days outpaces the team that hand-codes for weeks.")

## Dates
- All dates updated to **March 26, 2026**.
- Saved **March 25** version snapshot to `versions/2026-03-25.html`.

## PDF
- Regenerated **32-slide PDF** with all changes.

---

# Changes — March 25, 2026

## New Slides

### Slide 11 — Rapid Project Plan: First Artifact *(new)*
- Seven-field template showing required entry artifact for every pod: Problem, Scope Boundary, Primary User, Test Workflow, Definition of Done, Success Signal, Owner.
- Color-coded two-column grid layout.

### Slide 13 — Pod Execution Vocabulary *(new)*
- Nine defined terms in a clean two-column grid: Pod, Champion, Advisor, Rapid Project Plan, Prototype, Inputs, Iteration Loop, Done, Demo.
- Definitions are intentionally flexible to avoid hard lines.
- Iterated through multiple design passes (colored bars → clean bottom-border layout).

### Slide 27 — Local Validation Scales to Market Patterns *(new)*
- Clarifies how pods avoid one-off solutions.
- Four bullets: validate locally, aggregate centrally, graduate patterns, insight through reuse.

## Slide Updates

### Slide 12 — Rapid Project Plan (Miami Dade Example)
- Swapped order: template slide (11) now comes before the example slide (12).
- Updated subtitle: "This template is actively being modified and standardized. Example shown from a live pod."

### Slide 9 — Stakeholder Inputs
- Removed "weekly" from demo reference.

### Slide 13 — Pod Execution Vocabulary
- Removed "Launch" as a defined term.
- Removed "weekly" from Demo definition.
- Removed "testable" from all definitions.
- Softened all definitions to avoid hard prescriptive language.
- Added "Champion" and "Advisor" as separate defined terms.

## Slide Navigation
- Renumbered all slides sequentially **1–32**. Counter updated throughout.
- Total slide count now **32**.

## Dates
- All dates updated to **March 25, 2026**.

## Version History
- Fixed "Current" entry: no longer links to a non-existent file. Clicking "Current" stays on the page.
- Restored missing **March 24, 2026** version entry in the manifest.

## Rollback
- Tagged `pre-edits-mar25` before any changes began (commit `9976cb7`).
- To rollback: `git reset --hard pre-edits-mar25`

---

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
