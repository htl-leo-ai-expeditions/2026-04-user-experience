# UX Design Document: Cinema Seat Reservation

## Context and purpose

You will write a UX design document for a seat reservation system in a small single-screen cinema ("Kino Stella"). The document must be precise enough that an experienced frontend developer or an AI coding agent can implement the entire frontend without asking you a single question.

This exercise trains you to think through interaction logic before writing code. You are not designing how things look. You are designing how things work.

## Deliverable

A single UX design document covering the seat selection and checkout flow for Kino Stella. No code. No visual design.

## What your document covers and what it does not

**In scope:**

- Seat selection (interactive seating plan)
- Shopping cart (synchronized with seat selection)
- Checkout (confirm reservation)
- Conflict handling (two users selecting the same seat at nearly the same time)
- Where to display the currently selected film, date, and showtime (already chosen before this screen)

**Out of scope:**

- Film browsing, date/time selection (already happened)
- Payment processing (happens after checkout)
- User accounts or authentication
- Admin views

## Focus: interaction logic, not visual design

Your document describes UI/UX logic: what screens exist, what elements are on each screen, what states those elements can be in, what happens when the user interacts with them, and what happens on errors or edge cases.

- Name visual states (e.g., "available", "selected", "reserved-by-others", "wheelchair-companion-locked"). Do not specify colors, fonts, sizes, or pixel values.
- Describe screen layout in terms of regions and their relationships (e.g., "seating plan on the left, shopping cart on the right"). Do not create Figma mockups or detailed wireframes.
- Visual design (colors, typography, CSS) is a separate step that comes later.

## The cinema: Kino Stella

![Kino Stella seating plan](seating-plan.png)

<!-- Students derive all seating details from the image. No written seat counts or row details are given in the text. -->

**Seat types and pricing** (fixed, not dependent on film or showtime):

| Seat type | Price |
|---|---|
| Regular | 8.50 EUR |
| Premium | 12.00 EUR |
| Wheelchair | 8.50 EUR |
| Companion (next to wheelchair) | 8.50 EUR |

- The cinema has a single screen, with two aisles running from front to back, dividing the seats into three sections.
- Some seats are premium seats (more expensive, better position).
- Three wheelchair-accessible seats:
  - Two are side-by-side.
  - The third has a companion seat next to it. The companion seat can only be booked if the wheelchair seat is also booked.
- Maximum group size: 6 people.

## Core requirements

Your UX design document must cover all of the following:

### Seating plan interaction

- Interactive seating plan showing all seats with their current state
- Seat states your document must define: available, selected (by current user), reserved (by another user), wheelchair, companion-locked, and any others you identify
- Clicking/tapping a seat selects or deselects it
- The companion seat rule: describe exactly what happens when a user tries to book the companion seat without the wheelchair seat, and vice versa
- Group size limit of 6: what happens when the user tries to select a 7th seat?

### Booking modes

Two modes the user can switch between:

- **Row mode:** Select a number of seats and a preferred row. The system finds consecutive seats without gaps. Describe what happens if no consecutive block is available.
- **Pick mode:** Select each seat individually by clicking on the seating plan.

Describe how switching between modes works. What happens to already-selected seats?

### Shopping cart

- Always visible alongside the seating plan
- Shows selected seats with their type and individual price
- Shows total price
- Updates in real time as seats are selected/deselected
- Describe what information is shown per seat (row, seat number, type, price?)

### Checkout

- Describe the checkout flow after seat selection is complete
- What information is shown on the checkout/confirmation screen?
- What is the final action the user takes?

### Conflict handling

Multiple users see the seating plan at the same time. Seats reserved by others update in real time. Still, two users might click the same seat at nearly the same time.

- Describe what happens when a user tries to confirm seats that were just reserved by someone else
- What message does the user see?
- What is the recovery flow? (Back to seat selection? Automatic suggestion of alternatives?)

## Advanced requirements

Pick one or more of these to extend your document:

- **Rebate codes:** The user can enter a rebate code before checkout. Describe the interaction: where is the input field, when is the code validated, how are discounts shown in the cart, what happens on invalid codes?
- **Responsive design:** Describe how the seating plan and cart adapt to mobile screens. What changes in layout, interaction, or information density?
- **Real-time sync visualization:** When another user selects or reserves a seat, how does it animate or transition on your screen? Describe the visual feedback.
- **Love seats:** Double-wide premium seats for couples (two seats that must be booked together). Describe selection behavior and cart display.

## Self-check before submission

<!-- TODO: flesh out with concrete yes/no questions -->

- Does your document define every seat state and the transitions between them?
- Can a developer implement the companion seat rule from your description alone, without guessing?
- Is the conflict handling flow complete, including the error message and recovery?
- Did you describe both booking modes and the switch between them?
- Did you specify where the film/date/time information appears?
