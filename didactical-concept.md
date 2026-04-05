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

## Non-Obvious Pitfalls

- **Students will skip conventions.** They'll start with interaction design, contradict themselves by section 3, and not notice. The exercise tells them to write conventions first, but expect some to ignore it. Point them back when you see inconsistent terminology in drafts.
- **"An error is shown" syndrome.** Many students will describe error handling as "the system shows an error." Push them: *what* does the user see, *where*, and *what can they do next*? The exercise calls this out explicitly, but it's the most common weakness.
- **Companion seat logic is tricky.** The rule that companion seats behave differently depending on whether the adjacent wheelchair space is booked creates a conditional UX state. Some students will miss this entirely. Others will over-engineer it. Both are productive struggles.
- **Confusing UX description with implementation.** Watch for students who slip into writing CSS ("background-color: #ccc") or pseudocode instead of describing visual properties and behaviors. The conventions section should prevent this, but it's a recurring tendency.
- **Worked example as template.** Some students will replicate the table format from the worked example for every dimension, even where a different structure would be clearer (e.g., the booking flow is better as a step-by-step narrative). The exercise says "your approach can differ," but you may need to reinforce this.

## Core vs. Advanced Split

The five core dimensions represent the minimum viable UX document: states, interactions, flow, accessibility, and errors. A student who addresses all five has demonstrated the primary learning objectives (systematic design thinking, precise specification, accessibility-aware design).

The advanced dimensions (pricing, undo, responsive, real-time, screen reader accessibility) add depth without changing the fundamental deliverable. They're ordered by effort so students can self-select based on their remaining time and interest. Notably, "interface accessibility" is a deep dive because it requires rethinking the spatial layout for non-visual users, which is a qualitatively different challenge.

## Meta-Goal Connection

The exercise frames the UX document as "a prompt." This isn't just motivation; it's the core transferable skill. Students who learn to specify interactions unambiguously will write better tickets, better API specs, and better AI prompts. The validation criterion ("could someone build this without asking questions?") applies far beyond UX design.
