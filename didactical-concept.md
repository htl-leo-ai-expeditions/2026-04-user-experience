# Didactical Concept: CineStar Booking UX Exercise

## Why This Domain

A cinema seat booking system hits the sweet spot: students have used these interfaces, so they have intuition, but they've never had to *specify* one precisely. The spatial layout forces them out of form-and-list thinking into genuine interaction design.

## Requirement → Learning Objective Map

| Exercise Requirement | What It Teaches |
|---|---|
| Seat states and transitions | Systematic state modeling; thinking in states rather than screens |
| Interaction design (multi-select, group booking) | Designing compound interactions with constraints |
| Booking flow | End-to-end user flow design; step decomposition |
| Accessibility / wheelchair + companion logic | Designing for special requirements as first-class constraints, not bolt-on features |
| Error and edge cases | Defensive UX thinking; specifying failure modes, not just happy paths |
| Conventions section | Consistency as a design discipline; establishing shared vocabulary before diving in |
| Worked example | Calibrates expected depth without dictating content for other dimensions |
| Design questions per dimension | Forces trade-off reasoning; prevents shallow "the system shows an error" answers |
| Document template with structured scaffolds | Eliminates blank-page paralysis; empty tables and checklists show expected output format and granularity without providing answers |
| Seating plan analysis prompts | Forces active reading of the visual artifact; ensures students extract spatial details before designing interactions |

## Non-Obvious Pitfalls

- **Students will skip conventions.** They'll start with interaction design, contradict themselves by section 3, and not notice. Point them back when you see inconsistent terminology in drafts.
- **"An error is shown" syndrome.** The most common weakness. Push them: *what* does the user see, *where*, and *what can they do next*?
- **Companion seat logic is tricky.** Companion seats behave differently depending on whether the adjacent wheelchair space is booked. Some students will miss this; others will over-engineer it. Both are productive struggles.
- **Confusing UX description with implementation.** Watch for CSS ("background-color: #ccc") or pseudocode creeping in where visual properties and behaviors should be.
- **Worked example as template.** Some students will replicate the table format for every dimension, even where a different structure would be clearer (e.g., the booking flow is better as a narrative). Reinforce "your approach can differ."
- **Template treated as sufficient scope.** Some will interpret "fill in every section" as one paragraph per section. The empty tables set a minimum granularity (one row per state, one row per step), but point these students to the worked example and the scope guidance (1500-3000 words) to recalibrate.
- **Design questions answered too literally.** The questions provoke trade-off thinking, not a questionnaire. Redirect students who answer them one by one: the questions are prompts for their design, not the structure of their document.
- **Skimming the seating plan.** Check early drafts for designs that don't account for the actual layout (treating all rows as identical, ignoring aisles, missing the wheelchair/companion spatial relationship).

## Core vs. Advanced Split

The five core dimensions represent the minimum viable UX document: states, interactions, flow, accessibility, and errors. A student who addresses all five has demonstrated the primary learning objectives (systematic design thinking, precise specification, accessibility-aware design).

The advanced dimensions (pricing, undo, responsive, real-time, screen reader accessibility) add depth without changing the fundamental deliverable. They're ordered by effort so students can self-select based on their remaining time and interest. Notably, "interface accessibility" is a deep dive because it requires rethinking the spatial layout for non-visual users, which is a qualitatively different challenge.

## Meta-Goal Connection

The exercise frames the UX document as "a prompt." This isn't just motivation; it's the core transferable skill. Students who learn to specify interactions unambiguously will write better tickets, better API specs, and better AI prompts. The validation criterion ("could someone build this without asking questions?") applies far beyond UX design.
