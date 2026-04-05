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
- The document structure template could be refined based on review.

## 2026-04-05b: Create seating plan visual

**Prompt:**

> Do one iteration. Once done, commit with a meaningful commit message.

**What:** Created `generate-visual.js` to programmatically generate the cinema seating plan as SVG, then converted to PNG.

**Details:**
- Script generates an SVG showing all 8 rows (A-H) with correct seat counts, a center aisle, row labels, and seat numbers.
- Seat types are color-coded: gray for standard, amber for premium, blue for wheelchair (with wheelchair symbol), light blue for companion (marked "C").
- Includes a legend at the bottom and a "SCREEN" bar at the top.
- Rows are centered so narrower rows (like Row A with 8 seats) align with wider rows (G/H with 12 seats).
- Converted to PNG at 2x scale for crisp rendering.
- Updated `didactical-concept.md` to document the visual's design rationale.

**Not yet done:**
- The document structure template could be refined based on review.

## 2026-04-05c: Add second worked example (booking flow step)

**Prompt:**

> Do one iteration. Once done, commit with a meaningful commit message.

**What:** Added a second worked example to `exercise.md` showing a booking flow step ("Seat selection") at the same level of detail as the existing seat state example. Updated `didactical-concept.md` to reflect the expanded worked examples section.

**Why:** The first example only demonstrated how to describe a visual state. Students also need to describe multi-step journeys, which require a different writing pattern (what the user sees, does, how constraints are enforced, how they leave the step). Two examples covering two fundamentally different dimensions help students calibrate their work across all sections of the document. Verified the new example passes the meta-level check: it shows depth and format but doesn't prescribe design decisions students must make.

## 2026-04-05d: Refine document structure template with guiding questions

**Prompt:**

> Do one iteration. Once done, commit with a meaningful commit message.

**What:** Added guiding questions (marked with →) to each section of the document structure template in `exercise.md`. Updated `didactical-concept.md` to explain the pedagogical purpose of these questions.

**Why:** The template previously listed what each section should cover but didn't help students gauge whether their content was specific enough. The guiding questions push students from "I addressed this topic" toward "I described this in enough detail to build from." Each question targets the most common gap for that section (missing visual specifics, unclear step transitions, unspecified error recovery). All questions stay at the meta-level: they ask what to think about, not what to write. Verified meta-level check passes: the questions cannot be submitted as answers in a design document.

**This resolves** the recurring "template could be refined" item from prior iterations.

## 2026-04-05e: Remove duplication between template and core requirements

**Prompt:**

> Do one iteration, but do not add things this time. Look at the current status with a fresh eye and improve, restructure, rephrase, reformat, remove duplication. Once done, commit with a meaningful commit message.

**What:** Merged the Document Structure Template and Core Requirements into a single section. Trimmed redundant tips.

**Why:** The template (in "What You'll Produce") and the Core Requirements section covered the same six dimensions — seat map, states, selection, booking flow, accessibility, errors — using nearly identical wording. Students had to cross-reference two sections that said the same thing. The merge keeps the code-block scaffold (students can copy it) but enriches each section with the best specifics from both sources: concrete examples from the core requirements (e.g., "think beyond just 'available' and 'booked'", "e.g., exceeding the 6-seat limit", "what if no wheelchair spaces are available") and guiding questions from the template. Two tips ("Stay consistent" and "Use the seating plan") were removed because they duplicate guidance already present in the template sections. Updated `didactical-concept.md` to reflect the merged structure.
