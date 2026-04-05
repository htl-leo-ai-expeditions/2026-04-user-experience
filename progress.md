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

## 2026-04-05f: Add scope/length guidance for student calibration

**Prompt:**

> Do one iteration. Critically reflect if the exercise has the correct length and level. If necessary adjust, extend, or remove aspect. Once done, commit with a meaningful commit message.

**What:** Added a paragraph to "What You'll Produce" giving students a rough expected document length (4-6 pages / 1500-2500 words) as a calibration aid. Updated `didactical-concept.md` with a new entry explaining the pedagogical reasoning.

**Why:** Critical review of the exercise for level-appropriateness revealed that the exercise calibrates *depth* well (two worked examples, guiding questions per section) but gives no guidance on *breadth/volume*. For students encountering UX design for the first time, this gap creates two failure modes: under-writing (one vague paragraph per section, mistaking "addressed" for "specified") and over-writing (anxious prose that buries design decisions in filler). The page/word range is framed as a sanity check, not a target, and ties back to the quality bar ("shortest document a developer could build from"). The rest of the exercise was reviewed and found appropriate for the audience: the 8 core sections are manageable in 4-8 hours, the core/advanced split prevents overwhelm, and the worked examples set a clear bar without prescribing answers.

## 2026-04-05g: Student persona testing and targeted improvements

**Prompt:**

> Start three subagents as student personas (struggling, average, strong). Each produces a solution and feedback report. Read the reports and improve the documents.

**What:** Simulated three student personas completing the exercise (Luca/struggling, Nina/average, Amir/strong). Solutions are in `solution-basic/`, `solution-average/`, `solution-good/`. Based on cross-persona feedback analysis, made five targeted improvements to `exercise.md` and updated `didactical-concept.md`.

**Changes made:**

1. **Clarified companion seat bookability.** Added a business rule explicitly flagging companion seat bookability for non-accessibility users as an open design decision students must make and justify. (Raised by Nina and Amir — both were confused about whether companion seats are restricted.)

2. **Clarified visual specificity expectation.** Added a paragraph in "What You'll Produce" explaining that "no mockups" means no Figma/wireframes, but students must still describe visual decisions (colors, sizes, icons) in words. (Raised by all three personas — the single most common confusion.)

3. **Added seat state count hint.** Changed "think beyond just 'available' and 'booked'" to include "most real booking systems need at least five distinct states." (Raised by Luca and Nina — both were uncertain how many states to define.)

4. **Added error case worked example.** Added a third worked example showing how to describe a hold timer expiration error. (Raised by all three personas — Section 7 was consistently the weakest section and students had no model for error descriptions.)

5. **Added advanced requirements scope guidance.** Added a sentence clarifying that most students focus on core, and 1-2 advanced topics is a good stretch goal. (Raised by Luca and Amir — both uncertain about expectations.)

**Quality spread observations from the simulation:**
- Luca (~750 words): Too short, vague, copies exercise language. Validates that struggling students need more scaffolding — the added hints and examples address this.
- Nina (~2000 words): Good structure, decent happy paths, thin on edge cases. Validates that the error worked example fills a real gap.
- Amir (~2400 words): Thorough and precise, tackles advanced requirements. Validates that the exercise ceiling is high enough. His feedback on companion seat ambiguity was the most actionable.

**Meta-level check:** All changes maintain the meta-level constraint. The new worked example shows depth/format for error descriptions without prescribing which errors to cover or how to handle them. The companion seat rule is framed as a decision to make, not an answer to adopt.
