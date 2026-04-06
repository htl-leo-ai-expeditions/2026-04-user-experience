# Didactical Concept: Cinema Seat Reservation UX Document

## Exercise intent

This exercise trains precise specification writing, not coding and not visual design. Students must describe interaction logic, states, transitions, and edge cases concretely enough that an AI coding agent or experienced developer can implement without questions. The cinema domain is familiar enough that students can reason about it from experience, but complex enough (real-time sync, linked seats, booking modes) to expose gaps in vague specifications.

## Requirement-to-learning map

| Requirement | What it trains |
|---|---|
| Seat types vs. states and transitions | Thinking in state machines; separating orthogonal dimensions; exhaustive enumeration |
| Companion seat rule | Describing conditional logic precisely |
| Booking modes + switching | Handling mode-dependent behavior and state reset |
| Shopping cart sync | Specifying derived/computed UI behavior |
| Conflict handling | Reasoning about concurrency at the UX level |
| Seating plan from image | Extracting specs from visual sources (no spoon-feeding) |

## Likely student difficulties

- **Conflating types and states:** Students will mix seat types (regular, premium, wheelchair, companion) with seat states (available, selected, reserved). These are orthogonal dimensions. A wheelchair seat can be available, selected, or reserved. Push students to model them separately: types are fixed properties of a seat; states change during a session.
- **Too vague on states:** Students will write "the seat changes color" instead of defining named states and transitions. Push them toward explicit state names and transition triggers.
- **Ignoring edge cases:** Companion seat logic and conflict handling will be underspecified. Students tend to describe the happy path only. The companion seat rule has two directions: selecting the companion without the wheelchair seat, and deselecting the wheelchair seat while the companion is still selected. Many students will cover only the first.
- **Mixing visual design into the doc:** Some students will start specifying colors, fonts, CSS. Redirect to interaction logic.
- **Booking mode switch:** Students often forget to describe what happens to current selections when switching modes.
- **Confusing "what" and "how":** Students may describe implementation details (WebSocket, polling) instead of user-visible behavior.

## Teacher cues

- A good document reads like a decision tree: for each user action, the outcome is unambiguous.
- Look for completeness of state definitions. Missing states = missing spec.
- The conflict handling section is the strongest signal of spec quality. Weak docs say "show an error". Strong docs describe the full recovery flow.

## Document template and worked example

The exercise now includes a section-skeleton template and a worked example fragment (tooltip interaction). The template reduces blank-page paralysis and sets expectations for document structure. It does not pre-decide content: every section contains only a prompt, not an answer.

The worked example deliberately uses a side topic (tooltips) that is not part of the core task. Students who copy the example verbatim gain nothing. The example's purpose is to calibrate precision: named states, explicit transitions, edge cases handled. Point students back to it when their writing is too vague.

Watch for students who fill in the template with one-liners per section. The template sets structure; the worked example sets depth. Both are needed.

## Core vs. advanced boundary

Core delivers a complete, implementable document for a single booking mode with basic conflict handling. Advanced requirements each add one independent dimension of complexity. Students can pick based on interest. The advanced tasks are designed so they don't require each other.
