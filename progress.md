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
