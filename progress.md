# Progress Log

## 2026-04-06 — Initial draft

**Prompt:**  
Create a rough first draft of exercise.md with bullet points and structure for a cinema seat reservation UX design exercise. No visualization yet. No polished prose.

**Focus:**  
Establish core structure, domain, scope, and requirement breakdown for the exercise.

**Changes made:**  
- Created exercise.md with full section structure: context, deliverable, scope, domain description, core requirements (seating plan, booking modes, cart, checkout, conflict handling), advanced requirements (rebate codes, responsive, real-time sync, love seats), and self-check placeholders.
- Created didactical-concept.md with exercise intent, requirement-to-learning map, likely difficulties, teacher cues, and core/advanced boundary.
- Created progress.md.

**Why:**  
- Starting from blank slate. Priority 1 is establishing the core files and structure so iterative refinement can begin.
- Key framing decision: document focuses on UI/UX interaction logic, not visual design. Students name states, not colors.
- Seating plan visualization deferred to a future iteration.

**Files modified:**  
- exercise.md (new)
- didactical-concept.md (new)
- progress.md (new)

## Iteration 2

**Prompt:**  
Identify the highest-priority improvement and apply it. The seating plan visualization (seating-plan.png) is missing and there are TODO placeholders in the self-check section.

**Focus:**  
Create the seating plan visualization. This is a missing essential project file (priority 1). The exercise explicitly states that students derive all seating details from the image, so without it the exercise is incomplete and unsolvable.

**Changes made:**  
- Created `seating-plan.js` generator script that produces the Kino Stella seating plan as SVG.
- Generated `seating-plan.svg` and `seating-plan.png` from the script.
- Replaced the TODO placeholder in `exercise.md` with an image reference to `seating-plan.png`.
- The seating plan shows: 8 rows (A-H) with 14 seats each, divided into 3 sections by two aisles (3 left, 8 center, 3 right). Rows D-E are premium. Row W at the back has wheelchair seats W1-W2 side-by-side on the left, W3 (wheelchair) + W4 (companion) on the right.

**Why:**  
- Missing essential file takes priority over all other improvements. The exercise requires students to read seat layout details from the image. Without the visualization, core requirements cannot be completed.
- Self-check TODO is lower priority (category 3-4) and will be addressed in a future iteration.

**Files modified:**  
- seating-plan.js (new)
- seating-plan.svg (new, derived)
- seating-plan.png (new, derived)
- exercise.md (updated image reference)
- progress.md (this entry)

## Iteration 3

**Prompt:**  
Identify the highest-priority improvement and apply it. Look for contradictions/ambiguity, self-check TODOs, missing scaffolds, or other gaps.

**Focus:**  
Flesh out the self-check section. It contained a TODO placeholder comment indicating it was unfinished, and the existing questions were somewhat vague. This is a priority 2-3 issue (incomplete content / unclear requirements).

**Changes made:**  
- Removed the `<!-- TODO: flesh out with concrete yes/no questions -->` comment.
- Added an introductory line telling students every answer should be "yes."
- Rewrote all five existing questions to be more specific and testable (e.g., "define every seat state" became "name every seat state and describe what triggers each transition").
- Added two new self-check questions: one for shopping cart completeness (what info per seat, how total is calculated) and one that catches visual-design leakage (the "remove all colors/fonts" test).

**Why:**  
- The TODO comment signaled unfinished work. Leaving it in creates ambiguity about whether the section is ready to use.
- The writing guide requires self-check questions to be "concrete and testable." The original questions were directionally correct but not precise enough for students to verify their own work reliably.
- The two new questions cover gaps: shopping cart detail level was a core requirement with no self-check coverage, and the visual-design boundary is a key exercise constraint that students commonly violate (noted in didactical-concept.md).

**Files modified:**  
- exercise.md (self-check section rewritten)
- progress.md (this entry)

## Iteration 4

**Prompt:**  
Identify the highest-priority improvement and apply it. The exercise has core structure, seating plan, and fleshed-out self-check. Look for missing scaffolds/templates, ambiguity, or alignment issues.

**Focus:**  
Add a document template (section skeleton) and a worked example fragment to exercise.md. This is a priority 4 issue (missing scaffolds). Students must produce a structured UX design document but had no guidance on expected sections, granularity, or depth. The writing guide explicitly recommends templates over loose prose when students produce structured output.

**Changes made:**  
- Added a "Document template" section to exercise.md with a copy-ready section skeleton. Each section contains a comment prompt, not an answer.
- Added a "Worked example: calibrating depth and precision" section with a tooltip interaction example. The example uses a side topic (not part of core requirements) to set the quality bar without leaking solutions.
- Added a "Document template and worked example" section to didactical-concept.md explaining the pedagogical purpose: template reduces blank-page paralysis and sets structure; worked example calibrates depth and precision. Includes a teacher cue about students who fill the template with one-liners.

**Why:**  
- The writing guide states: "Whenever students are expected to produce structured output, prefer a copy-ready template over a vague paragraph." The exercise asks for a complete UX design document but previously gave no structural guidance.
- Without a template, students must infer the expected document structure from scattered requirements. This adds unnecessary friction that is not part of the learning goal.
- The worked example addresses a common calibration problem: students who write vaguely ("the seat changes") instead of precisely (named states, explicit transitions, edge cases). A concrete example sets the bar more effectively than instructions alone.
- The example intentionally uses a side topic (tooltips) so it cannot be copied with superficial renaming, following the writing guide's rule against examples that mirror the main task.

**Files modified:**  
- exercise.md (added document template and worked example sections)
- didactical-concept.md (added template/example guidance section)
- progress.md (this entry)

## Iteration 5

**Prompt:**  
Identify the highest-priority improvement and apply it.

**Focus:**  
Disambiguate seat types from seat states. The exercise listed "wheelchair" and "companion-locked" alongside "available", "selected", and "reserved" in a single flat list of seat states, conflating two orthogonal dimensions: seat type (a fixed property) and seat state (changes during a session). This is a priority 2 issue (ambiguity) that would lead students to produce confused state models.

**Changes made:**  
- In exercise.md, rewrote the seat states bullet to explicitly separate types (regular, premium, wheelchair, companion) from states (available, selected, reserved, companion-locked), explaining they are two independent dimensions.
- Updated the document template section: renamed "Seat states" to "Seat types and states" and added a comment prompt reminding students to model them separately.
- Updated the self-check question about states to also ask whether types and states are clearly separated.
- In didactical-concept.md, updated the requirement-to-learning map entry to reflect the type/state separation as a learning objective (separating orthogonal dimensions).
- Added a new likely difficulty entry about students conflating types and states, with a concrete teacher intervention note.

**Why:**  
- The original list ("available, selected, reserved, wheelchair, companion-locked") mixed fixed properties with dynamic states. A student reading this could reasonably model "wheelchair" as a state rather than a type, producing a state machine where a seat transitions into being a wheelchair seat, which is nonsensical.
- Separating types from states is a transferable modeling skill (it maps directly to the distinction between entity attributes and entity states in database and object design, which these students already know from relational databases).
- The fix makes the exercise requirement more precise without adding complexity or reducing student decision space.

**Files modified:**  
- exercise.md (seat states bullet, document template, self-check)
- didactical-concept.md (requirement-to-learning map, likely difficulties)
- progress.md (this entry)

## Iteration 6

**Prompt:**  
Identify the highest-priority improvement and apply it.

**Focus:**  
Resolve ambiguous companion seat rule terminology. The cinema description used "booked" ("The companion seat can only be booked if the wheelchair seat is also booked"), while the state definition used "selected" ("companion seat when its wheelchair seat is not selected"). These terms imply different behaviors: "booked" suggests a confirmed reservation (database state), while "selected" refers to the current user's in-progress selection (UI state). This is a priority 2 issue (ambiguity in a core requirement).

**Changes made:**  
- In exercise.md, rewrote the companion seat rule in the cinema description to use "selected" consistently and to clarify it is about the same user's selection, not a confirmed reservation.
- Added the reverse case to the companion seat interaction requirement: what happens when the user deselects the wheelchair seat while the companion seat is still selected.
- Updated the companion-locked state definition to clarify it refers to the current user's selection of the adjacent wheelchair seat.
- In didactical-concept.md, expanded the "Ignoring edge cases" difficulty to explicitly mention the two directions of the companion seat rule (selecting companion without wheelchair, and deselecting wheelchair while companion is selected).

**Why:**  
- The inconsistent terminology ("booked" vs. "selected") could lead students to design two very different behaviors. Using "selected" consistently makes clear that the companion seat rule is a UI-level constraint within a single user's session, not a database-level reservation dependency.
- The reverse case (deselecting the wheelchair seat) was implicit but never stated. Students who only think about the forward case will produce incomplete specs. Making this explicit in the exercise requirement and in the didactical concept ensures both students and teachers attend to it.

**Files modified:**  
- exercise.md (companion seat rule in cinema description, seat states definition, seating plan interaction requirement)
- didactical-concept.md (likely student difficulties)
- progress.md (this entry)
