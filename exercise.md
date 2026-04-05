# UX Design Document: CineStar Booking System

## The Scenario

CineStar is a small independent cinema with a single screen. They want an online seat booking system where customers can pick their seats on a visual seating plan, select tickets for a group, and complete their booking. No app, just a responsive web interface.

Your job isn't to build it. Your job is to **design the complete user experience** and write it down so precisely that a frontend developer (or a frontier LLM) could build a working prototype from your document alone, without asking you a single question.

That's the bar. If your document leaves anything ambiguous, the implementation will guess. Guesses lead to rework.

## Why This Matters

A UX design document is a prompt. It tells someone (human or AI) exactly what to build. The better you specify interactions, states, edge cases, and flows, the closer the result matches your intent. This is the same skill you'll use every time you write a ticket, a spec, or a prompt for an AI coding assistant. Vague input produces vague output. Every time.

## The Venue

Study the seating plan below carefully. It is your **single source of truth** for the cinema's layout. Every detail you need about capacity, seat types, and spatial arrangement is encoded in this diagram. There is no separate description. You must extract the information yourself.

![CineStar seating plan](seating-plan.png)

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
- [ ] **Interaction design**: How does a user select a single seat? How does multi-select work for a group of up to 6? What happens visually during selection? What feedback confirms the action? How does deselection work?
- [ ] **Booking flow**: Map the complete flow from "user sees the seating plan" to "booking confirmed". What steps does the user go through? What information is shown or collected at each step? What are the decision points?
- [ ] **Accessibility and special requirements**: How does a user who needs a wheelchair space find and book one? How does the companion seat logic work in the UI? How are these constraints communicated before the user makes a mistake, not after?
- [ ] **Error and edge cases**: What happens if a seat becomes unavailable while the user is selecting? What if the user selects 7 seats (exceeding the limit)? What if a child ticket is added without an adult? How are errors communicated? Be specific: don't just say "an error is shown." Describe *what* the user sees, *where* it appears, and *what they can do about it*.

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

- **Start with conventions.** Ten minutes spent here saves an hour of inconsistency later.
- **Think in states, not screens.** A seat that's "available" and a seat that's "selected" are the same element in two states. Design the states, then the transitions.
- **Write for the builder.** Your reader is someone who needs to implement this. Every vague phrase becomes a guess. Every guess becomes a bug.
- **Test your document mentally.** Walk through the booking flow as a user. Then walk through it as a wheelchair user. Then walk through it with a group of 5. If any path hits a gap in your document, fill it.
