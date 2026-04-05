# UX Design Document: Seat Booking for Starlight Cinema

## Why This Exercise?

You've written code that works. You've built features that do the thing. But have you ever sat down and fully described *how a user interface should behave* before writing a single line of code?

That's what this exercise is about. You'll produce a **UX design document** for a graphical seat booking system. Not code. Not mockups. A written specification that describes every interaction, every state, every edge case, in enough detail that a developer (or an AI) could build it without asking you a single clarifying question.

Here's the twist: your design document is also an AI prompt. The better you write it, the better a frontier LLM like Claude or ChatGPT could turn it into a working prototype. Vague descriptions produce vague results. Precise specifications produce working software. That principle applies whether the reader is human or machine.

## The Scenario

You're designing the seat booking interface for **Starlight Cinema**, a small single-screen movie theater. The cinema has one screening room with a fixed seating layout (see the seating plan below). Your job is to design the complete user experience for booking seats through a web-based interface.

**Assume the user is already logged in.** Don't spend any effort on authentication, registration, or profile management.

### The Venue

Study the seating plan carefully. Every design decision you make should connect back to this layout.

![Starlight Cinema Seating Plan](seating-plan.png)

**Venue facts:**

| Property | Value |
|---|---|
| Total seats | 84 |
| Rows | 8 (A through H, front to back) |
| Seats per row | Row A: 8, Rows B-F: 10, Row G: 12, Row H: 12 (with gaps) |
| Wheelchair spaces | 4 (Row A, positions 1-2 and 7-8, no fixed chair) |
| Companion seats | 4 (Row A, positions 3-4 and 5-6, adjacent to wheelchair spaces) |
| Premium seats | 20 (Rows F-G, center section) |
| Aisle | Center aisle splits every row; side aisles along walls |
| Screen | Front wall, below Row A |

**Business rules:**

- A booking can contain **1 to 6 seats**.
- Wheelchair spaces can only be booked by users who indicate an accessibility need. Each wheelchair space must include at least one companion seat in the same booking.
- Companion seats are physically adjacent to wheelchair spaces. Whether non-accessibility users can book companion seats as regular seats is a design decision you need to make and justify in your document.
- Premium seats cost more than standard seats. The exact prices are: Standard CHF 16, Premium CHF 22, Wheelchair/Companion CHF 16.
- A booking is not confirmed until the user completes the checkout step.
- Seats are held for the user for **8 minutes** after selection. After that, they're released back to the pool.
- The cinema runs multiple showings per day. The user picks a showing before selecting seats.

## What You'll Produce

A single UX design document (text-based, no graphical mockups required) that fully specifies how the booking interface looks and behaves.

The quality bar: *Could a competent frontend developer build a working interactive prototype from your document alone, without needing to ask any clarifying questions about how the interface should look or behave?*

If your answer is "probably not," your document isn't done yet.

**Yes, you need to make visual decisions.** The exercise says "no graphical mockups required" — that means you don't need to create wireframes or Figma files. But you absolutely need to describe your visual design in words: which colors represent which states, how big elements are relative to each other, what icons or labels you use. Making these decisions and writing them down precisely *is* the exercise. Look at the worked examples to see what this looks like in practice.

**How much should you write?** A solid core document typically runs 4-6 pages (roughly 1500-2500 words). That's not a target to hit for its own sake. It's a sanity check. If your document is one page, you're almost certainly too vague. If it's twelve pages, you're probably over-explaining things that a simple table or state list would handle better. Aim for the shortest document that a developer could actually build from. Every sentence should earn its place.

## Worked Example

Here's an example of what one section of your design document might look like. This covers **one seat state** in full detail. Your document needs this level of specificity for *every* dimension.

> **State: Selected-by-current-user**
>
> - **Visual:** The seat icon fills with a solid blue (#2563EB) background. A small checkmark appears in the center. The seat border changes from 1px gray to 2px blue.
> - **How the user gets here:** The user clicks an available seat. The state changes immediately on click (optimistic update). If the server rejects the hold (e.g., seat was just taken), the seat reverts to "unavailable" and an inline message appears above the seat map: "Sorry, seat [row][number] was just booked by someone else. Please choose another seat."
> - **What the user can do from here:** Click the seat again to deselect it (returns to "available"). Or proceed to checkout with this seat in the selection.
> - **Constraints:** If the user already has 6 seats selected, clicking an additional seat does nothing. A tooltip appears: "Maximum 6 seats per booking. Deselect a seat first."

Here's a second example, this time for a **booking flow step**:

> **Step: Seat selection**
>
> - **What the user sees:** The seat map fills the main content area, with a compact booking summary pinned to the right (desktop) or bottom (mobile). The summary shows the selected showing's date/time, a list of selected seats (initially empty), and a running total. A "Continue to checkout" button sits below the summary, disabled until at least one seat is selected.
> - **What the user does:** Clicks individual seats on the map to select them. Each click toggles the seat between "available" and "selected." The booking summary updates immediately with each change: seat label, seat type, price per seat, and the new total.
> - **How constraints are enforced:** If the user selects a 7th seat, the click has no effect and a tooltip appears near the seat: "Maximum 6 seats per booking." If the user has indicated a wheelchair need (from the previous step), only wheelchair and companion seats are clickable. All other seats appear dimmed with reduced opacity (0.4) and show a "not available for your selection" tooltip on hover.
> - **How the user leaves this step:** Clicks "Continue to checkout" (proceeds to the next step) or clicks the browser back button / a "Change showing" link above the seat map (returns to showing selection, seats are released).

And a third example, this time for an **error case**:

> **Error: Hold timer expires during seat selection**
>
> - **What triggers it:** The user selected seats but did not proceed to checkout within 8 minutes. The server releases all held seats.
> - **What the user sees:** A modal overlay appears (dark semi-transparent backdrop, white card centered). The heading reads "Your seat reservation has expired." The body text explains: "Your selected seats have been released because the 8-minute hold has expired. This keeps seats available for all customers." A single button reads "Choose seats again."
> - **What the user can do:** Click the button. The modal closes, the seat map reloads with current availability, and all previously selected seats are deselected. The user can start selecting again.
> - **What the user cannot do:** Dismiss the modal by clicking outside it or pressing Escape. They must acknowledge the expiry before continuing.

Three examples, three very different dimensions, same level of specificity. That's the bar for your entire document.

## Core Requirements

Use this structure as a starting point for your design document. You can rename sections or add subsections, but every topic listed here must be covered. For each one, your document must be detailed enough to pass the quality bar above.

```
1. Overview
   Brief description of the system and its purpose.
   Define the terminology you'll use throughout. If you call it
   a "seat map" here, don't switch to "seating chart" later.

2. Seat Map Design
   How the seating layout is rendered on screen. How rows, aisles,
   the screen, and different seat types are visually distinguished.
   → What does the user see first when the map loads?
     How do they orient themselves in the layout?

3. Seat States
   Every possible state a seat can be in (think beyond just
   "available" and "booked" — most real booking systems need
   at least five distinct states). How each state looks visually.
   What triggers transitions between states.
   → For each state: could a developer implement it from your
     description alone, without guessing colors, icons, or borders?

4. Booking Flow
   Step-by-step journey from choosing a showing to receiving
   a confirmation. What the user sees and does at each step.
   What information is shown and collected at each stage.
   → For each step: how does the user arrive, and how do they
     move forward (or go back)?

5. Selection Behavior
   How users select and deselect seats. How group selection works
   for multiple seats. What feedback the UI provides during
   selection. What happens when a selection violates a constraint
   (e.g., exceeding the 6-seat limit).
   → What exactly changes on screen the moment a user clicks
     a seat? What if that click violates a rule?

6. Accessibility and Special Requirements
   How users indicate accessibility needs. How the system surfaces
   available wheelchair and companion seats. How the "companion
   seat required" rule is communicated and enforced.
   → At what point in the flow does the user declare their needs?
     What if no wheelchair spaces are available for the chosen
     showing?

7. Error and Edge Cases
   What happens when a held seat times out. What if another user
   books a seat you've selected. What if the user tries to book
   more seats than allowed. How the system communicates each
   situation.
   → For each error: what exactly does the user see, and what
     can they do next?

8. Summary and Booking Confirmation
   What the user sees before confirming.
   What information is displayed after confirmation.
   → Is there enough detail for the user to verify everything
     is correct before they commit?
```

## Advanced Requirements

Already solid on the core? These dimensions add depth to your design document. Pick the ones that interest you. They're grouped by effort so you can gauge what's realistic in your remaining time. Most students focus entirely on the core requirements. If your core document is solid and you have time left, trying one or two advanced topics is a good challenge.

### Quick wins (30-60 min each)

- [ ] **Pricing display**: How and when are prices shown? In the seat map? In a sidebar? Only at checkout? What are the trade-offs of each approach?
- [ ] **Undo and modification**: How can a user change their selection before confirming? Can they modify a confirmed booking? What does that flow look like?

### Medium effort (1-2 hours each)

- [ ] **Responsive design**: How does the seat map adapt to mobile screens? Does the interaction model change on touch devices? What compromises are acceptable?
- [ ] **Real-time updates**: What happens when another user books seats while you're looking at the map? How does the UI update? How do you avoid jarring the user mid-selection?

### Deep dives (2+ hours each)

- [ ] **Keyboard and screen reader accessibility**: How does a user navigate the seat map without a mouse? What's the tab order? What do screen readers announce for each seat? How are spatial relationships communicated non-visually?
- [ ] **Micro-interactions and transitions**: What animations or transitions accompany state changes? How do hover states work? What loading indicators appear during server communication? How do these choices affect perceived performance?

## Self-Check

Before you submit, honestly answer these questions:

- Could a developer build this interface from your document without messaging you once?
- Have you described what happens when things go *wrong*, not just the happy path?
- For every seat state you've defined, is it clear how a user gets into it and out of it?
- If you handed your document to an LLM and said "build this," would the result match what you had in mind?

If any answer is "no" or "I'm not sure," that's where your document needs more work.

## Tips

- **Be specific.** "The seat changes color" tells nobody anything. *Which* color? *When* does it change? *What* was it before?
- **Think like a builder.** Someone will implement your design. Could they do it without guessing what you meant?
- **Design the sad paths.** Happy paths are easy. The quality of your document shows in how you handle timeouts, conflicts, and constraint violations.

## Submission

Submit your UX design document as a single file (Markdown, PDF, or Word). Name it `ux-design-[yourname].[ext]`.

Estimated effort: 4-8 hours.
