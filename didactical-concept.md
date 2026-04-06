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
- **Conflating the two conflict scenarios:** Conflict handling has two distinct cases: (1) a seat the user already selected gets reserved by someone else during selection, and (2) seats are lost at checkout confirmation time. Most students will only describe the checkout conflict because it is the more dramatic moment. The mid-selection conflict is subtler but equally important: it affects the shopping cart, the seating plan display, and possibly the user's awareness. Push students who write a single "conflict" paragraph to separate the two cases and describe each completely.
- **Mixing visual design into the doc:** Some students will start specifying colors, fonts, CSS. Redirect to interaction logic.
- **Booking mode switch:** Students often forget to describe what happens to current selections when switching modes.
- **Row mode and aisles:** In row mode the system must find "consecutive seats without gaps," but aisles split each row into three sections (3-8-3). Students must decide whether consecutive seats can span an aisle or must stay within one section. Many will overlook this entirely because they think of each row as a flat list of 14 seats. Push them to state their rule explicitly and consider what happens when the requested group size exceeds a single section.
- **Wheelchair row in row mode:** Row W has a completely different structure from regular rows: only four seats, split across two sections with empty positions and companion seat logic. Most students will not think about whether row mode should include or exclude this row. If they include it, they must reconcile the companion seat rule with automatic seat assignment (what if the system assigns W4 without W3?). If they exclude it, they should state this explicitly. Either answer is valid; the exercise asks students to state and justify their decision.
- **Confusing "what" and "how":** Students may describe implementation details (WebSocket, polling) instead of user-visible behavior. The exercise now explicitly tells students to describe what the user sees, not how the system implements it. Despite this, expect the conflict handling and real-time sync sections to attract technical language. When reviewing, ask: "Could a non-technical product owner understand this sentence?" If not, the student slipped into implementation.

## Teacher cues

- A good document reads like a decision tree: for each user action, the outcome is unambiguous.
- Look for completeness of state definitions. Missing states = missing spec.
- The conflict handling section is the strongest signal of spec quality. Weak docs say "show an error." Strong docs distinguish the mid-selection conflict from the checkout conflict and describe the full recovery flow for each.

## Document template and worked example

The exercise now includes a section-skeleton template and a worked example fragment (tooltip interaction). The template reduces blank-page paralysis and sets expectations for document structure. It does not pre-decide content: every section contains only a prompt, not an answer.

The worked example deliberately uses a side topic (tooltips) that is not part of the core task. Students who copy the example verbatim gain nothing. The example's purpose is to calibrate precision: named states, explicit transitions, edge cases handled. Point students back to it when their writing is too vague.

Watch for students who fill in the template with one-liners per section. The template sets structure; the worked example sets depth. Both are needed.

## Core vs. advanced boundary

Core delivers a complete, implementable document for a single booking mode with basic conflict handling. Advanced requirements each add one independent dimension of complexity. Students can pick based on interest. The advanced tasks are designed so they don't require each other.
