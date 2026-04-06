# AI Expedition Logbook

## 🧭 Title
Iterative development of an AI skill workflow for CS/IT exercise authoring and review

## 👥 Participants
- Rainer Stropek (Teacher)
- Claude, ChatGPT (AI collaborator)

## 📅 Date
2026-04-06

---

## 🎯 Goal
Explore how AI skills, prompt design, and iterative refinement can support the creation of high-quality CS/IT exercises for vocational students.

The concrete questions explored in this expedition were:

- How should an exercise-development skill be structured so that it works reliably in iterative sessions?
- Which parts belong in the core `SKILL.md`, and which parts should live in reference documents?
- How should writing guidance for student-facing exercises be phrased so it produces clear, structured, non-spoiling exercise texts?
- How should a didactical concept guide be written so it stays useful for experienced teachers and tightly aligned with the exercise?
- How should a feedback-report skill be designed so an agent can generate qualitative, evidence-based review reports for single student submissions?
- How useful are persona-based validation ideas for improving exercises before classroom use?

---

## ⚙️ What we did
- Reviewed and criticized an initial draft of an `exercise-writing` skill focused on voice, structure, and student-facing exercise design.
- Evaluated whether the workflow should be split across multiple skills (`exercise-writing`, `didactical concept`, `exercise loop`) or unified into one main skill.
- Reframed the architecture toward one main `exercise-development` skill with modular reference documents instead of multiple loosely coupled peer skills.
- Reworked the technical visualization guidance so it focused on reproducible artifact pipelines (`.mmd` or generator script -> `.svg` -> `.png`) rather than pedagogical decision-making.
- Tightened the core `exercise-development` `SKILL.md`, especially around:
  - iterative one-focus-per-run improvements
  - shared memory via `progress.md`
  - synchronization between `exercise.md` and `didactical-concept.md`
  - startup behavior from a rough draft in `exercise.md`
- Rewrote the `writing-guide.md` for student-facing exercise authoring.
- Rewrote the `didactical-concept-guide.md` so it targeted experienced teachers and avoided generic pedagogy.
- Reviewed a separate `feedback-report` skill and strengthened it toward:
  - evidence-based qualitative feedback
  - isolated single-submission review sessions
  - fixed report structure
  - no grades or hidden scoring
  - explicit use of `exercise.md` and `didactical-concept.md` as context
- Discussed persona testing and decided against turning it into a heavyweight standalone skill.
- Reframed persona testing into lighter “weak / average / strong student lens” review passes that can be used inside the main iteration loop.
- Iteratively tested the skill on a concrete exercise project: a cinema seat reservation UX design exercise.

### Concrete exercise-development test cycle
Using the cinema exercise as the testbed, we ran and documented ten iterations:

1. Created the first exercise structure and initial didactical concept from a rough draft.
2. Added the missing seating-plan visualization as generated artifacts.
3. Reworked self-check questions to make them concrete and testable.
4. Added a document template and a worked example fragment to improve scaffolding.
5. Clarified the distinction between seat types and seat states.
6. Resolved ambiguity in the wheelchair companion-seat rule.
7. Exposed the design decision around row mode and aisles.
8. Split conflict handling into “during selection” and “at checkout”.
9. Added explicit boundaries against implementation-detail leakage.
10. Clarified the interaction between row mode and the wheelchair row.

---

## 🔍 Results & Insights

### ✅ What worked
- **Unifying the workflow into one main skill worked better than splitting it into several equal skills.** The architecture became easier to reason about and less fragile.
- **Separating core instructions from focused reference files worked well.** The core skill became leaner, while writing, didactical, and visualization rules stayed modular.
- **The one-focus-per-iteration loop was productive.** It led to meaningful improvements without rewriting everything at once.
- **`progress.md` as shared memory was valuable.** It created continuity across iterations and made the reasoning behind changes inspectable.
- **The writing guide improved significantly after tightening it around clarity, solvability, structure, and anti-spoiling rules.**
- **The didactical concept guide became much stronger once it was explicitly targeted at experienced teachers.** Removing generic pedagogy made it more useful.
- **The visualization reference became more robust when reframed as a technical pipeline document.** Treating structured source files as canonical artifacts was the right move.
- **The feedback-report skill became clearer once it was assumed that the reviewing agent receives both the exercise and the didactical concept.** That reduced duplication and sharpened the actual purpose of the prompt.
- **The concrete exercise test project revealed real ambiguity categories.** Many of the best improvements came from noticing hidden design decisions, not from polishing wording.

### ⚠️ What didn’t work
- **Overly modular skill separation did not work well.** Treating writing, didactical concept, and loop logic as separate peer skills created more architectural neatness than practical reliability.
- **Some early skill drafts were too manifesto-like.** They had strong taste and voice, but not enough operational precision.
- **Hard stylistic rules can be overfit.** Some earlier rules were too rigid or too focused on rhetoric instead of robust behavior.
- **Persona testing as a separate skill felt too heavy.** Full simulated submissions and multi-agent workflows risked becoming workflow theater rather than useful validation.
- **There was a risk of over-scaffolding.** Improvements must clarify the task without quietly solving it for students.
- **A generic “teacher guide” tends to bloat quickly unless aggressively constrained.** Without discipline, it drifts into pedagogy filler.

### 💡 Key takeaways
- **One strong skill with modular references beats several loosely coordinated skills** for this kind of iterative authoring workflow.
- **The core `SKILL.md` should define control logic, not become a knowledge dump.**
- **Reference files are the right place for stable, domain-specific guidance** such as writing rules, didactical rules, and visualization pipelines.
- **Iterative refinement needs explicit shared memory.** The append-only `progress.md` pattern works well.
- **Student-facing exercise writing should optimize for clarity, structure, solvability, and non-leaky scaffolding, not for rhetorical flair.**
- **Teacher-facing didactical concepts are only useful when they stay tightly exercise-specific and assume expert readers.**
- **Feedback prompts need strong anti-hallucination and evidence rules.** Otherwise AI review becomes vague, flattering, or speculative.
- **Persona-style review is useful as a lens, not as a full simulation framework.**
- **A concrete exercise project is an excellent test harness for skill development.** The cinema exercise exposed modeling ambiguities, hidden assumptions, and scope boundaries that abstract discussion alone would likely have missed.

---

## 📦 Artifacts

### Code
- `seating-plan.js`
- Generated visualization artifacts: `seating-plan.svg`, `seating-plan.png`

### Materials
- Draft and revised versions of:
  - `exercise-development` `SKILL.md`
  - `writing-guide.md`
  - `didactical-concept-guide.md`
  - `visualizations.md`
  - `feedback-report` skill
- `exercise.md` for the cinema seat reservation UX design exercise
- `didactical-concept.md` for the same exercise
- `progress.md` documenting ten improvement iterations

### Related changes
- Iterative updates to the cinema seat reservation exercise project
- Revisions to the skill architecture for AI-assisted exercise development and review

---

## 🔗 References (optional)
- Mermaid / Mermaid CLI (`mmdc`) for diagram generation
- `rsvg-convert` from `librsvg2-bin` for SVG-to-PNG conversion
- Internal skill drafts and reference documents developed during this expedition
- Progress log from the cinema exercise test project

---

## 🚀 Next steps (optional)
- Package the unified `exercise-development` skill and test it on at least one very different exercise type, not only UX/specification tasks.
- Test whether the feedback-report prompt produces stable output quality across several real student submissions.
- Add a lightweight “student lens” review mode to the main exercise-development workflow instead of creating a separate persona-testing skill.
- Compare how well the workflow transfers to exercises that are more code-centric, database-centric, or architecture-centric.
- Start collecting a small set of proven exercise projects as regression tests for future skill revisions.
