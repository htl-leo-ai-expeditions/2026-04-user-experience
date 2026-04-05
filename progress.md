# Progress Log

## 2026-04-05: Initial exercise draft

**Prompt:**

> Do one iteration. Once done, commit with a meaningful commit message.

**What:** Created the first complete draft of `exercise.md`, `didactical-concept.md`, and this progress log.

**Details:**
- Chose a small single-screen cinema ("Starlight Cinema") as the venue. 84 seats across 8 rows, with wheelchair spaces, companion seats, premium seats, and a center aisle.
- Wrote the full exercise handout following the exercise-writing skill: conversational tone, top-down structure, scaffold-without-spoiling approach, worked example (one seat state), document structure template, core/advanced split with effort groupings, self-check questions, and tips.
- Core requirements cover: seat map visualization, seat states, selection interaction, booking flow, accessibility handling, error/edge cases.
- Advanced requirements grouped by effort: pricing display and undo (quick), responsive design and real-time updates (medium), keyboard/screen reader accessibility and micro-interactions (deep).
- Included a worked example showing one seat state ("selected-by-current-user") at the expected level of detail.
- Created the didactical concept explaining the reasoning behind each exercise element.

**Not yet done:**
- The worked example could be expanded or a second example added for a different dimension (e.g., a booking flow step).
- The document structure template could be refined based on review.

## 2026-04-05b: Create seating plan visual

**What:** Created `generate-visual.js` to programmatically generate the cinema seating plan as SVG, then converted to PNG.

**Details:**
- Script generates an SVG showing all 8 rows (A-H) with correct seat counts, a center aisle, row labels, and seat numbers.
- Seat types are color-coded: gray for standard, amber for premium, blue for wheelchair (with wheelchair symbol), light blue for companion (marked "C").
- Includes a legend at the bottom and a "SCREEN" bar at the top.
- Rows are centered so narrower rows (like Row A with 8 seats) align with wider rows (G/H with 12 seats).
- Converted to PNG at 2x scale for crisp rendering.
- Updated `didactical-concept.md` to document the visual's design rationale.

**Not yet done:**
- The worked example could be expanded or a second example added for a different dimension (e.g., a booking flow step).
- The document structure template could be refined based on review.
