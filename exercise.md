# UX Design Document: CineStar Booking System

## The Scenario

CineStar is a small independent cinema with a single screen. They want an online seat booking system where customers can pick their seats on a visual seating plan, select tickets for a group, and complete their booking. No app, just a responsive web interface.

Your job isn't to build it. Your job is to **design the complete user experience** and write it down so precisely that a frontend developer (or a frontier LLM) could build a working prototype from your document alone, without asking you a single question.

That's the bar. If your document leaves anything ambiguous, the implementation will guess. Guesses lead to rework.

## Why This Matters

Every ticket you write, every spec you hand off, every prompt you give an AI coding assistant is the same challenge: say exactly what you mean, or the result won't match your intent. This exercise makes that skill explicit. Vague input produces vague output. Every time.

## The Venue

Study the seating plan below carefully. It is your **single source of truth** for the cinema's layout. Every detail you need about capacity, seat types, and spatial arrangement is encoded in this diagram. There is no separate description. You must extract the information yourself.

![CineStar seating plan](seating-plan.png)

Before you start designing, make sure you can answer these questions from the plan alone:

- How many distinct seat types are there, and where is each type located?
- Where are the aisles? How do they divide the seating area?
- Which seats are adjacent to wheelchair spaces? What does that mean for your companion seat logic?
- Are there rows or sections that have a different seat mix than others?

You'll need these details throughout your document. If you can't answer one of these from the diagram, look again.

**Rules for this venue:**

- Maximum **6 tickets** per booking.
- Wheelchair spaces can only be booked together with at least one companion seat.
- Companion seats can be booked as regular seats when the adjacent wheelchair space is not in use.
- Children under 12 must be accompanied (at least one adult ticket in the same booking).
- There is one showtime per evening. Assume the customer has already chosen a date.

## What You Need to Produce

You are writing a **UX design document**. It must cover the dimensions listed below. For each dimension, you decide the *how*. The exercise tells you *what* to address, not what your answers should be.

### Conventions (Read This First)

Before you design anything, establish conventions that apply across your entire document:

- **How do you refer to seats?** Define a naming scheme (e.g., "Row C, Seat 4" or "C4") and use it consistently everywhere.
- **How do you describe visual states?** Don't name colors. Describe visual properties: "prominent", "muted", "highlighted border", "pulsing indicator". Be consistent.
- **How do you describe interactions?** Pick a vocabulary (click, tap, select, hover, drag) and stick with it.

Write your conventions section first. It's short, but everything else builds on it. Skip it and you'll contradict yourself halfway through.

### Worked Example: State Representation

Here's one dimension fully worked out. This is the depth and precision you should aim for in every section of your document.

---

**Seat States**

Every seat in the plan exists in exactly one of these states at any time:

| State | Visual Description | Can the user interact with it? |
|---|---|---|
| Available | Default appearance, neutral. Subtle hover effect when the cursor passes over it. | Yes. Clicking selects it. |
| Selected (by you) | Strong highlight with a visible border. Displays a small badge showing the ticket number in your group (e.g., "1", "2", "3"). | Yes. Clicking deselects it. |
| Occupied | Muted, grayed out. No hover effect. | No. Cursor changes to "not allowed" on hover. |
| Temporarily held | Slightly dimmed with a small clock icon overlay. Tooltip on hover: "This seat is being held by another customer." | No. |
| Wheelchair space (available) | Marked with the international accessibility symbol. Highlighted border when "accessibility filter" is active. | Yes, but only when at least one companion seat is also selected (see companion logic). |
| Companion seat (linked) | Subtle visual connector (dotted line or bracket) linking it to its adjacent wheelchair space. Otherwise behaves like a standard available seat. | Yes. Selecting it shows a tooltip: "This seat is next to a wheelchair space." |

**Transitions:**

- Available → Selected: User clicks the seat. Seat count in the booking summary increments.
- Selected → Available: User clicks the seat again. Seat count decrements.
- Available → Temporarily held: Another user selects the seat in real time. Transition animates briefly to draw attention.
- Temporarily held → Available: The other user's hold expires or they deselect.

---

This example covers one dimension. Your document needs this level of detail across all core dimensions below.

Notice what this example does: it defines every possible state, describes how each looks (without prescribing exact colors), explains what the user can do in each state, and maps the transitions. Your approach can differ. What matters is that it's complete and unambiguous.

### Core Dimensions

Address all of these in your document. This is where the bulk of the work lives.

- [ ] **Seat states and transitions**: Define every state a seat can be in. Describe the visual representation and what user actions are available in each state. Map the transitions between states. (The worked example above is one way to do this. You may structure yours differently.)

  Design questions to address:
  - A companion seat can behave as a regular seat *or* as a linked accessibility seat depending on context. How does your state model handle this dual nature? Walk through this scenario concretely: a user selects a companion seat as a regular seat. Then they select the adjacent wheelchair space. What happens to the companion seat's state, appearance, and behavior?
  - How does the user distinguish between a seat that is permanently sold and one that is temporarily held by another customer?

- [ ] **Interaction design**: How does a user select a single seat? How does multi-select work for a group of up to 6? What happens visually during selection? What feedback confirms the action? How does deselection work?

  Design questions to address:
  - A group of 4 wants to sit together, but no row has 4 adjacent available seats. How does the interface help them find the best option without forcing them to count seats row by row?
  - The user has selected 6 seats (the maximum). They now want to swap one seat for a different one. What's the interaction?

- [ ] **Booking flow**: Map the complete flow from "user sees the seating plan" to "booking confirmed". What steps does the user go through? What information is shown or collected at each step? What are the decision points?

  Design questions to address:
  - At what point in the flow does the user commit? Is there a review step, or does the last click confirm immediately? What are the trade-offs of your choice?
  - Where does ticket type selection (adult, child, concession) happen: during seat selection, in a separate step, or at confirmation? Why?

- [ ] **Accessibility and special requirements**: How does a user who needs a wheelchair space find and book one? How does the companion seat logic work in the UI? How are these constraints communicated before the user makes a mistake, not after?

  Design questions to address:
  - A user selects a wheelchair space but hasn't selected a companion seat yet. Does the system block the selection, auto-select a companion seat, or allow it and warn later? What are the trade-offs?
  - How does the interface make wheelchair spaces discoverable without forcing every user to see accessibility information they don't need?

- [ ] **Error and edge cases**: What happens if a seat becomes unavailable while the user is selecting? What if the user selects 7 seats (exceeding the limit)? What if a child ticket is added without an adult? How are errors communicated? Be specific: don't just say "an error is shown." Describe *what* the user sees, *where* it appears, and *what they can do about it*.

  Here's an example of the specificity you need. Compare these two descriptions of the same error:

  *Vague:* "If the user selects too many seats, an error is shown."

  *Specific:* "When 6 seats are selected, remaining available seats become visually dimmed and non-interactive. Clicking a dimmed seat does nothing. The seat count indicator reads '6 / 6'. A tooltip appears near the rejected seat: 'Maximum 6 seats per booking. Deselect a seat to choose a different one.' The user deselects one of their current seats, which re-enables the remaining available seats."

  The vague version leaves the developer guessing about *what* error, *where* it shows up, and *how* the user recovers. The specific version is buildable. Aim for the second version in every row of your error table.

  Design questions to address:
  - The user has spent two minutes carefully selecting 5 seats. Then one of them gets booked by someone else. How does the interface handle this without making the user start over?
  - A constraint violation (e.g., child without adult) could be caught at selection time or at confirmation time. When does your design catch it, and why is that the better moment?

For all of these questions: there are no wrong answers, only undocumented ones. The skill is in deciding *and* explaining your reasoning.

You will find that the venue rules above don't cover every situation. That's intentional. Real specs have gaps. When you hit an undefined rule (e.g., "what happens if...?" and nothing in this exercise tells you), don't just guess silently. State your assumption, explain why you chose it, and design consistently from there. A documented assumption is a design decision. An undocumented one is a bug waiting to happen.

### Advanced Dimensions (Stretch Goals)

These extend your document's depth. Tackle them if you finish the core dimensions with time to spare. They're grouped by effort so you can pick what fits.

**Quick wins (30-60 min each):**

- [ ] **Pricing visibility**: How and when are ticket prices shown? On hover? In a sidebar? Do premium seats cost more? How does the user know before selecting?
- [ ] **Undo and modification**: How does the user change their selection before confirming? Is there a "clear all" option? Can they modify after confirmation?

**Medium effort (1-2 hours each):**

- [ ] **Responsive design**: How does the seating plan work on a phone screen? Does it scroll, zoom, or reflow? How do touch interactions differ from mouse interactions?
- [ ] **Real-time updates**: What happens visually when another customer books a seat you were looking at? How does the system handle race conditions at the moment of confirmation?

**Deep dive (2+ hours):**

- [ ] **Interface accessibility**: How would a screen reader user navigate the seating plan? What's the keyboard navigation model? How do you handle the spatial layout for non-visual users?

## Document Template

Copy this skeleton into a new file and fill in every section. The tables and structures below show you *what* to produce and at what granularity. You can rename sections, add subsections, or restructure, but every topic must be addressed somewhere in your final document.

---

**CineStar Booking System: UX Design Document**

**1. Conventions**

| Convention | Your definition |
|---|---|
| Seat naming scheme | *[How do you refer to individual seats? e.g., "Row C, Seat 4" or "C4"]* |
| Visual state vocabulary | *[What terms do you use to describe how things look? e.g., "highlighted", "muted", "prominent"]* |
| Interaction vocabulary | *[What terms do you use for user actions? e.g., "click", "tap", "select", "hover"]* |

**2. Seat States and Transitions**

One row per state. Add or remove rows as needed.

| State | Visual description | Can the user interact? | What happens on click/tap? |
|---|---|---|---|
| *[state name]* | *[how it looks]* | *[yes/no]* | *[what the interaction does, or why it's disabled]* |
| *[state name]* | | | |
| *[...]* | | | |

Then list each transition:

| From | To | Trigger |
|---|---|---|
| *[state]* | *[state]* | *[what causes this transition]* |
| *[...]* | | |

**3. Interaction Design**

Describe each interaction. For each one, cover: what the user does, what the interface shows during the action, and what confirms the action is complete.

- **Single seat selection:** *[describe]*
- **Multi-select (group):** *[describe]*
- **Deselection:** *[describe]*
- **Swapping a seat at the maximum:** *[describe]*
- **Finding adjacent seats for a group:** *[describe]*

**4. Booking Flow**

One row per step, in order. Add as many steps as your flow needs.

| Step | What the user sees | What the user does | What information is collected or shown |
|---|---|---|---|
| 1 | *[describe the screen/state]* | *[describe the action]* | *[what data is displayed or entered]* |
| 2 | | | |
| *[...]* | | | |

Mark the commit point: at which step does the booking become final? Why did you place it there?

**5. Accessibility and Special Requirements**

- **Discovering wheelchair spaces:** *[How does a user who needs a wheelchair space find available options?]*
- **Companion seat pairing:** *[What happens in the UI when a wheelchair space is selected? How is the companion seat linked?]*
- **Constraint communication:** *[How does the interface prevent mistakes before they happen, rather than showing errors after?]*
- **Booking as a regular seat:** *[When no wheelchair space is booked, how do companion seats behave?]*

**6. Error and Edge Cases**

One row per error scenario. Don't leave any column blank.

| Scenario | Trigger | What the user sees | Where it appears | What the user can do |
|---|---|---|---|---|
| *[e.g., seat becomes unavailable mid-selection]* | *[what causes it]* | *[exact message or visual change]* | *[where on screen]* | *[recovery action]* |
| *[e.g., max tickets exceeded]* | | | | |
| *[e.g., child ticket without adult]* | | | | |
| *[add your own scenarios]* | | | | |

---

## Scope and Length

Your core document (conventions + five core dimensions) should land somewhere around **1500-3000 words**. That's roughly 4-8 pages. If you're well under 1500 words, you're probably not specific enough. If you're well over 3000, check whether you're repeating yourself or drifting into implementation details.

Each advanced dimension you tackle adds roughly 300-600 words. Don't pad to hit a number. Aim for precision.

## Self-Check

Before you submit, answer these honestly:

- Could a developer build a working prototype from your document without asking you a single clarifying question?
- Have you covered every seat type visible in the seating plan, including wheelchair and companion seats?
- For every user action you describe, have you also described what happens when it goes wrong?
- Are your conventions consistent throughout the document, or did you start calling the same thing by different names halfway through?
- Did you describe interactions and visual states without slipping into code or specific CSS properties?

If you answered "no" to any of these, go back and fix it. That's where the points are.

## Tips

- **Think in states, not screens.** A seat that's "available" and a seat that's "selected" are the same element in two states. Design the states, then the transitions.
- **Test your document mentally.** Walk through the booking flow as a user. Then as a wheelchair user. Then with a group of 5. Every path that hits a gap is a gap in your design.
- **Describe, don't implement.** If you catch yourself writing CSS properties or pseudocode, step back. Describe what the user *sees and does*, not how the code works.
