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
