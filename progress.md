# Progress Log

## 2026-04-05 — Initial exercise draft

**Prompt:** "Do one iteration."

**What was done:** Created all foundational files from scratch based on `goal.md`:

- **`exercise.md`**: Full student handout including:
  - Scenario framing (CineStar single-screen cinema)
  - ASCII seating plan with 6 rows × 8 seats, encoding standard seats, premium center block, wheelchair spaces (2), and companion seats (2)
  - Venue business rules (max 6 tickets, wheelchair+companion pairing, child accompaniment)
  - Conventions section (students define naming, visual vocabulary, interaction vocabulary first)
  - One fully worked example (seat state representation) showing expected depth
  - Five core dimensions as checklist (states, interaction, flow, accessibility, errors)
  - Five advanced dimensions grouped by effort (quick/medium/deep)
  - Scope guidance (1500-3000 words core, 300-600 per advanced dimension)
  - Self-check questions and tips
- **`didactical-concept.md`**: Teacher guide covering domain rationale, requirement-to-objective map, non-obvious pitfalls, core/advanced split rationale, and meta-goal connection.
- **`progress.md`**: This file.

**Why:** Starting from scratch, the highest-impact first iteration is a complete draft that can be refined in subsequent passes. The exercise follows the meta-level constraint from `goal.md`: it specifies *what* students must address without prescribing *how* they should answer.

**Files modified:** `exercise.md` (new), `didactical-concept.md` (new), `progress.md` (new)

## 2026-04-05 — Replace ASCII seating plan with graphical version

**Prompt:** "Replace the ASCII seating plan with a graphical version. Write a standalone JS program that generates the SVG, convert it to PNG, and include it in the exercise."

**What was done:** Created `generate-seating-plan.js`, a standalone Node.js script that outputs an SVG seating plan matching the original ASCII layout. The SVG was converted to `seating-plan.png` using `rsvg-convert`. The ASCII art block in `exercise.md` was replaced with a Markdown image reference to the PNG.

The graphical version improves readability over the ASCII original:
- Each seat type has a distinct color and shape (blue circles for standard, gold circles with star for premium, green rounded rectangles with ♿ for wheelchair, purple circles with + for companion)
- Row labels, column numbers, screen bar, aisle markers, and a color legend are all included
- The visual encoding is richer than ASCII, making it easier for students to parse the spatial layout and extract seat-type information

**Why:** The ASCII diagram was functional but hard to read at a glance, especially the distinction between seat types. A graphical seating plan better represents what students would encounter in a real booking system, and having the generator script means the layout can be tweaked and regenerated easily.

**Files modified:** `generate-seating-plan.js` (new), `seating-plan.svg` (new, generated), `seating-plan.png` (new, generated), `exercise.md` (updated image reference), `progress.md` (this entry)
