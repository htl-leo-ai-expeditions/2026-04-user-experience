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

## 2026-04-05 — Add probing design questions to core dimensions

**Prompt:** "Do one iteration."

**What was done:** Added two targeted design questions to each of the five core dimensions in `exercise.md`. Each question presents a concrete scenario that forces students to confront a real design trade-off rather than giving a surface-level answer. Added a closing line ("there are no wrong answers, only undocumented ones") per the exercise-writing style guide's scaffolding principle.

Updated `didactical-concept.md`:
- Added "Design questions per dimension" to the requirement-to-objective map
- Added a new pitfall entry about students treating design questions as a questionnaire rather than thinking prompts

**Why:** `goal.md` explicitly requires the exercise to "pose design questions students must answer in their document, not design decisions they must adopt." The prior draft described *what* each dimension should cover but didn't ask specific questions that force trade-off reasoning. The questions are scenario-based (e.g., "a group of 4 wants to sit together but no row has 4 adjacent seats") so students must reason about their design choices rather than stating vague intentions. This directly addresses the "meta-level constraint": the questions provoke design thinking without prescribing answers.

**Files modified:** `exercise.md` (design questions added to core dimensions), `didactical-concept.md` (map + pitfall entries), `progress.md` (this entry)

## 2026-04-05 — Add copy-ready document template

**Prompt:** "Do one iteration."

**What was done:** Added a "Document Template" section to `exercise.md`, placed between the core/advanced dimensions and the scope guidance. The template is a copy-ready skeleton with six numbered sections (Conventions, Seat States and Transitions, Interaction Design, Booking Flow, Accessibility and Special Requirements, Error and Edge Cases). Each section has italicized placeholder text hinting at what to address without providing answers.

Updated `didactical-concept.md`:
- Added "Document template" to the requirement-to-objective map (eliminates blank-page paralysis, sets expected structure)
- Added a new pitfall: students treating the template as sufficient scope (writing one paragraph per section instead of achieving the depth shown in the worked example)

**Why:** The exercise-writing skill requires "Templates Over Prose: Wherever students need to produce structured output, give them a copy-ready template." The exercise previously told students *what* to address (via the dimension checklist and design questions) and *how deep to go* (via the worked example), but gave no starting scaffold. This risks blank-page paralysis, especially for weaker students. The template bridges that gap without violating the meta-level constraint: it structures the *categories* of information without providing the design decisions themselves. Students can rename sections or restructure, preserving autonomy.

**Files modified:** `exercise.md` (document template section added), `didactical-concept.md` (map entry + pitfall), `progress.md` (this entry)

## 2026-04-05 — Add seating plan analysis prompts

**Prompt:** "Do one iteration."

**What was done:** Added four analysis questions between the seating plan image and the venue rules in `exercise.md`. The questions prompt students to actively interrogate the diagram before they start designing: identifying seat types and their locations, aisle positions, spatial relationships between wheelchair and companion seats, and row-level seat mix differences.

Updated `didactical-concept.md`:
- Added "Seating plan analysis prompts" to the requirement-to-objective map (forces active reading, ensures spatial details are extracted before designing)
- Added a new pitfall: students skimming the plan and designing as if all rows are identical

**Why:** The exercise says "study the seating plan carefully" and "you must extract the information yourself," but gives no guidance on *what* to look for. Students who skim the plan risk designing interactions that don't account for the actual layout (e.g., ignoring that aisles split the seating area, or that companion seats are spatially tied to wheelchair spaces). The analysis questions scaffold active reading without revealing answers, consistent with the meta-level constraint. This is especially important because `goal.md` prohibits textual descriptions of the venue layout: the plan is the only source, so students who misread it will produce flawed designs.

**Files modified:** `exercise.md` (analysis prompts added after seating plan), `didactical-concept.md` (map entry + pitfall), `progress.md` (this entry)

## 2026-04-05 — Polish pass: tighten text, remove duplication

**Prompt:** "Do one iteration, but do not add things this time. Look at the current status with a fresh eye and improve, restructure, rephrase, reformat, remove duplication."

**What was done:**

- **`exercise.md`**:
  - Rewrote "Why This Matters" to stop repeating what "The Scenario" already establishes (document = prompt). Now leads with the transferable skill insight instead.
  - Trimmed Tips from 4 to 3: removed "Start with conventions" (duplicated the Conventions section) and "Write for the builder" (duplicated the scenario framing). Added "Describe, don't implement" which addresses a real pitfall (CSS/pseudocode creep) not warned about elsewhere in the exercise.
  - Fixed em dash in the document template title (style guide violation).
  - Tightened the template intro (cut redundant "Delete the placeholder text").
- **`didactical-concept.md`**:
  - Tightened all 8 pitfall entries. Cut sentences that restated what the exercise already says ("The exercise tells them to...", "The exercise calls this out explicitly"). Each pitfall now leads with the problem and what to do about it, without echoing the exercise text.

**Why:** After five additive iterations, the text had accumulated redundancy. "Document as prompt" appeared three times across sections. Tips echoed earlier instructions. Pitfalls explained both the problem and that the exercise addresses it (the teacher can see that). A polish pass at this stage prevents the exercise from feeling repetitive to students and the didactical concept from being unnecessarily long for teachers.

**Files modified:** `exercise.md`, `didactical-concept.md`, `progress.md` (this entry)

## 2026-04-05 — Replace prose placeholders with structured deliverable scaffolds

**Prompt:** "Do one iteration. This time, focus on providing clear instructions about deliverables to students (e.g. empty tables, checklists, etc.)."

**What was done:** Rewrote the Document Template section in `exercise.md`. The previous version had italicized prose placeholders (e.g., "*[Define every state a seat can be in...]*"). The new version provides concrete, copy-ready scaffolds for each section:

- **Conventions**: table with one row per convention to define
- **Seat States and Transitions**: two tables (one for states with columns for visual description, interactivity, and click behavior; one for transitions with from/to/trigger columns)
- **Interaction Design**: bullet list with labeled interaction types to describe
- **Booking Flow**: step-by-step table with columns for what the user sees, does, and what data is involved; plus a prompt to mark the commit point
- **Accessibility**: labeled bullet list covering discovery, pairing, constraint communication, and fallback behavior
- **Error and Edge Cases**: table with columns for scenario, trigger, message, location, and recovery action; pre-seeded with three example scenario names to reduce blank-page paralysis

Updated `didactical-concept.md`:
- Refined the template row in the requirement-to-objective map to mention structured scaffolds
- Expanded the "template as sufficient scope" pitfall to note that empty tables set a minimum granularity

**Why:** The exercise-writing skill says "Templates Over Prose: Wherever students need to produce structured output, give them a copy-ready template (an empty table, a skeleton structure, a fill-in-the-blanks block)." The previous template told students *what* to write about but not *what shape* their output should take. Students seeing an empty table with labeled columns understand the expected granularity immediately: one row per state, one row per step, one row per error scenario. This is especially important for the error and edge cases section, where "be specific" is hard to act on without a visible structure that demands specifics (trigger, message, location, recovery). The scaffolds stay meta-level: they define columns and labels, not answers.

**Files modified:** `exercise.md` (document template rewritten), `didactical-concept.md` (map + pitfall updated), `progress.md` (this entry)
