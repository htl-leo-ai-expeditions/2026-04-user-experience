# CineStar Booking System: UX Design Document

---

## 1. Conventions

| Convention | Definition |
|---|---|
| Seat naming scheme | Row letter + seat number, no separator: **A1**, **C4**, **E3**. Rows A–E run front-to-back (A closest to screen). Columns 1–8 run left-to-right. Always uppercase row, no leading zeros. |
| Visual state vocabulary | **Prominent** = full opacity, saturated, draws the eye. **Muted** = reduced opacity (~40%), desaturated. **Highlighted** = prominent plus a visible border or ring. **Dimmed** = slightly reduced opacity (~70%), still recognisable. **Pulsing** = a slow opacity oscillation used only for real-time transitions. Visual properties are never specified as hex colors or pixel values. |
| Interaction vocabulary | **Select** = a single deliberate click or tap that changes a seat's state. **Deselect** = clicking/tapping a currently-selected seat to remove it from the selection. **Hover** (desktop only) = moving the pointer over an element without clicking. **Tap** (touch) = single-finger contact and release. Where behavior differs between pointer and touch, both are noted explicitly. |
| Terminology | "Booking" = the entire transaction. "Selection" = the set of seats the user has chosen but not yet paid for. "Hold" = a server-side temporary reservation. "Ticket" = one seat + one ticket type (adult/child/concession). |

---

## 2. Venue Analysis

Derived from the seating plan — this section exists to make the rest of the document unambiguous.

**Seat inventory:**

| Row | Cols 1–2 | Cols 3–6 | Cols 7–8 | Type |
|---|---|---|---|---|
| A | standard | standard | standard | All standard (8 seats) |
| B | standard | standard | standard | All standard (8 seats) |
| C | premium | premium | premium | All premium (8 seats) |
| D | premium | premium | premium | All premium (8 seats) |
| E | standard (E1, E2) | companion (E3), wheelchair (E4), wheelchair (E5), companion (E6) | standard (E7, E8) | Mixed (8 seats) |

**Total: 40 seats** — 20 standard, 16 premium, 2 wheelchair spaces, 2 companion seats.

**Aisles:** Two vertical aisles divide the hall into three blocks. Left block: columns 1–2. Center block: columns 3–6. Right block: columns 7–8.

**Adjacency for companion-seat logic:**
- E3 is adjacent to E4 (wheelchair). E3 is the only companion seat for E4.
- E6 is adjacent to E5 (wheelchair). E6 is the only companion seat for E5.
- E4 and E5 are adjacent to each other. This is significant — see ambiguity flag A1 below.

---

## 3. Seat States and Transitions

### 3.1 State Table

| State | Visual description | Interactable? | On click/tap |
|---|---|---|---|
| **Available** | Prominent. Subtle hover ring on pointer-over (desktop). | Yes | Transitions to Selected (or Companion-Linked if it is a companion seat and its wheelchair space is already selected). |
| **Available — Companion (unlinked)** | Prominent, with a small accessibility-adjacent indicator (a faint dotted border). Tooltip on hover: "This seat is next to a wheelchair space. You can book it as a regular seat." | Yes | Transitions to Selected (regular), not Companion-Linked. No automatic pairing. |
| **Selected** | Highlighted. Displays a small badge (1–6) indicating position in this booking. Badge order is chronological selection order. | Yes | Deselects; transitions back to Available or Available-Companion-Unlinked. |
| **Companion-Linked** | Highlighted with a visible bracket or dotted connector to its wheelchair space. Badge shows ticket number. Tooltip: "Companion seat — required because you selected [wheelchair space ID]." | Yes | Deselects companion seat AND removes the linked wheelchair space from the selection (atomic operation — see Section 5 for the prompt). |
| **Wheelchair (available)** | Prominent, accessibility symbol visible. Highlighted border when the "I need a wheelchair space" filter is active. | Conditional — see Section 5. | If at least one companion seat is free and unselected: transitions to Wheelchair-Selected and auto-selects the nearest free companion seat. If the companion seat is already selected as a regular seat: transitions to Wheelchair-Selected, and the companion seat transitions to Companion-Linked (its role changes). |
| **Wheelchair-Selected** | Highlighted, accessibility symbol visible. Badge shows ticket number. Dotted connector to its paired companion seat. | Yes | Deselects this wheelchair space AND deselects its companion seat if it is in Companion-Linked state (atomic). |
| **Occupied** | Muted. No hover effect. | No | Cursor changes to "not-allowed". No action. |
| **Temporarily Held** | Dimmed (~70% opacity). Small clock icon overlaid at bottom-right of seat shape. Tooltip: "Another customer is about to book this seat." | No | No action. Clock icon distinguishes this from Occupied. |
| **Unavailable (rule-blocked)** | Muted with a lock icon. Tooltip explains reason (e.g., "Wheelchair space requires a companion seat — E6 is already taken"). | No | No action. |

### 3.2 Companion Dual-Nature

The companion seat's state depends on context:

- If no wheelchair space in this booking is selected: companion seat is **Available — Companion (unlinked)**. Behaves like any regular available seat. No constraint is active.
- If the adjacent wheelchair space is selected: companion seat transitions to **Companion-Linked**. It can no longer be deselected independently — deselecting it also deselects its wheelchair space (with a confirmation prompt, see Section 6).
- If the companion seat was already Selected (regular) when the user selects its adjacent wheelchair space: the seat silently re-roles to Companion-Linked. Its badge number does not change. A brief tooltip fades in: "This seat is now acting as a companion seat for [wheelchair space ID]."

### 3.3 Transition Table

| From | To | Trigger |
|---|---|---|
| Available / Available-Companion | Selected | User selects seat (within ticket limit) |
| Available-Companion | Companion-Linked | User selects the adjacent wheelchair space |
| Selected (regular companion) | Companion-Linked | User selects the adjacent wheelchair space after having already selected the companion seat |
| Selected | Available / Available-Companion | User deselects seat (or max-swap, see Section 4) |
| Companion-Linked | Available-Companion | User deselects the linked wheelchair space (atomic deselect of both) |
| Wheelchair (available) | Wheelchair-Selected | User selects wheelchair space (companion auto-pairs or companion re-roles) |
| Wheelchair-Selected | Wheelchair (available) | User deselects wheelchair space (atomic) |
| Available (any) | Temporarily Held | Another user selects this seat on the server |
| Temporarily Held | Available (any) | Other user's hold expires or they deselect |
| Temporarily Held | Occupied | Other user confirms booking |
| Available (any) / Selected | Occupied | Booking confirmed while seat was selected (rare race condition, see Section 6) |

---

## 4. Interaction Design

### 4.1 Single Seat Selection

The user clicks/taps any seat in Available or Available-Companion state. The seat immediately transitions to Selected with the next available badge number (1–6). The booking summary panel (persistent sidebar on desktop, bottom sheet on mobile) updates instantly: seat ID appears in a row, a ticket-type dropdown defaults to "Adult". No page reload or loading state — the UI is optimistic and state is reconciled server-side when the user proceeds.

**Confirmation signal:** the seat's visual change is the confirmation. No toast or modal. The count in the summary panel incrementing is the secondary confirmation.

### 4.2 Multi-Select (Group Booking)

Users select seats one at a time. There is no drag-select. Each click adds one seat. The summary panel shows all selected seats with their ticket-type dropdowns. The panel's header shows "X of 6 seats selected".

**Group-finding assistance — "Find adjacent seats" tool:**

A control above the seating plan reads: "Seats for [−] 2 [+] people — Find together". When the user sets a group size and activates "Find together", the interface highlights available seat clusters of that size in the seating plan. Clusters are grouped by row and physical adjacency (no aisle crossing). Highlighted clusters show a subtle pulsing outline. Clusters that cross an aisle are not suggested. Clusters of premium seats are visually distinguished from standard clusters. The user clicks/taps any seat within a highlighted cluster to select the entire cluster at once. They can then fine-tune by deselecting individual seats.

This tool does not block manual selection — it is purely assistive. If no cluster of the requested size exists, a message appears below the tool: "No row has [N] adjacent available seats. Try a smaller group or adjust your selection manually."

### 4.3 Deselection

Clicking/tapping a Selected seat deselects it. Badge numbers re-sequence (badges 1–3 remain; if badge 2 is removed, badge 3 becomes badge 2). The ticket-type row for that seat is removed from the summary panel.

Exception: deselecting a Companion-Linked seat triggers a confirmation prompt (see Section 6 — "Deselect linked companion").

### 4.4 Seat Swap at Maximum (6 Seats Selected)

When 6 seats are selected, all remaining available seats shift to a **dimmed-but-selectable** state with a swap cursor (two arrows). The seat count indicator reads "6 / 6 — tap another seat to swap". Clicking an unselected available seat opens a small inline popover anchored to that seat: "Replace which seat?" — showing the 6 currently selected seats as small interactive icons. The user taps one to swap: the old seat deselects, the new seat selects, badge numbers are re-sequenced. The popover closes. No full-page dialog; the interaction stays spatially close to the new seat.

Alternative path: the user can deselect one of their 6 seats first (returning to 5 selected), then select the new seat normally.

### 4.5 Hover States (Desktop)

- Available seat: subtle ring, seat ID shown in a small tooltip.
- Premium seat (available): tooltip adds "(Premium)" to the ID.
- Companion seat (available): tooltip: "[ID] — Next to wheelchair space E[4 or 5]. Can be booked as a regular seat."
- Wheelchair space (available): tooltip: "[ID] — Wheelchair space. Booking requires a companion seat."
- Occupied: no hover ring. Tooltip: "Already booked."
- Temporarily Held: tooltip: "Someone else is about to book this seat."

---

## 5. Booking Flow

| Step | What the user sees | What the user does | Data collected / shown |
|---|---|---|---|
| **1 — Seating plan** | Full seating plan, all states visible. Summary panel (empty). "Find together" tool. Accessibility filter toggle. | Selects seats (1–6). Optionally uses "Find together" or accessibility filter. | Seat IDs, seat types (standard/premium), running count. |
| **2 — Ticket types** | Summary panel now shows one row per selected seat. Each row: seat ID, ticket-type dropdown (Adult / Child under 12 / Concession). Total price updates live as types are chosen. Prices shown per ticket type and as a running total. | Assigns a ticket type to each seat. | Ticket type per seat. Validation runs inline (see constraints below). |
| **3 — Review** | Full summary: seats, ticket types, prices per seat, total. Showtime and date (read-only — already chosen). "Confirm and Pay" button. "Back to seats" link. | Reviews, optionally edits (via "Back to seats"). Clicks "Confirm and Pay". | Nothing new collected here. This is the last chance to review. |
| **4 — Payment** | Payment form (card details or third-party payment widget). Total shown prominently. | Enters payment details and submits. | Payment information (handled by payment provider — not in scope for this UX document). |
| **5 — Confirmation** | Confirmation screen: booking reference, list of seats, ticket types, total paid, showtime. Option to print/email tickets. | Optionally prints or shares. | Booking reference shown. |

**Commit point:** The booking becomes final when payment is successfully processed (Step 4 → Step 5 transition). Not at "Confirm and Pay" click — payment failure must be recoverable. The server-side hold is placed when the user clicks "Confirm and Pay" and is released if payment fails. Rationale: placing the commit at payment completion rather than at seat selection prevents phantom bookings and allows the user to change their mind freely until they actually pay.

**Ticket type placement:** Ticket types are assigned in Step 2, after seats are selected. Rationale: the user picks seats spatially first (a natural mental model), then assigns who sits where. Mixing ticket-type dropdowns into the seating plan would clutter the plan and distract from the spatial task. Placing them before seat selection would require the user to know their exact group composition upfront, which is often not the case.

**Constraint validation timing:**
- Max 6 seats: enforced at selection time (Step 1). Cannot exceed.
- Wheelchair + companion pairing: enforced at selection time (Step 1, auto-pairing or blocking).
- Child + adult: checked at Step 2 inline as ticket types are assigned. Not blocked at seat selection because seats are type-neutral until assigned.

---

## 6. Accessibility and Special Requirements

### 6.1 Discovering Wheelchair Spaces

An "Accessibility" toggle sits above the seating plan, labelled "I need a wheelchair space". When active:
- The two wheelchair spaces (E4, E5) and their companion seats (E3, E6) are highlighted with a prominent border.
- All other seats are dimmed but remain visible and selectable.
- A short text appears: "2 wheelchair spaces available — E4 and E5. Each requires a companion seat."

The toggle is off by default. Users who don't need it are unaffected. Users who need it get clear spatial orientation.

### 6.2 Companion Seat Pairing Logic

**Auto-pairing on wheelchair space selection:**

When the user selects a wheelchair space (E4 or E5):
1. The system checks whether its companion seat (E3 for E4, E6 for E5) is available.
2. If available and not yet in the user's selection: the companion seat is automatically added to the selection in Companion-Linked state. A non-blocking notice appears in the summary panel: "E3 was added automatically as a companion seat for E4. You can swap it if needed." The companion seat's badge number is assigned next in sequence.
3. If available and already in the user's selection (regular): it silently re-roles to Companion-Linked (Section 3.2). A brief tooltip fades in to explain the role change.
4. If the companion seat is Occupied or Temporarily Held: the wheelchair space transitions to Unavailable (rule-blocked) with tooltip: "E4 cannot be booked — companion seat E3 is taken." The user cannot select this wheelchair space.

**Rationale for auto-pairing:** The rule "wheelchair space requires a companion seat" is a business constraint the user may not know. Auto-pairing is discoverable and removes friction. The user is told what happened and can adjust. Blocking the selection silently would frustrate users; allowing it and warning at confirmation would waste their time.

### 6.3 Both Wheelchair Spaces — Ambiguity Flag A1

**Ambiguity identified:** E4 and E5 are physically adjacent. If a user books both E4 and E5 for two wheelchair users, they need two companion seats: E3 (for E4) and E6 (for E5). This is the expected case and the logic handles it cleanly.

However: what if a user wants to book both E4 and E5 but only has one companion? E4 and E5 are adjacent — does E5 satisfy as a "companion" for E4, and does E4 satisfy as a "companion" for E5 (i.e., do wheelchair users themselves count as companions for each other)?

**This exercise does not define this.** My design assumes the answer is no — each wheelchair space requires its own designated companion seat (E3 or E6). If the exercise intends wheelchair users to count as companions for each other, the companion-pairing logic and the row-E layout need to be re-specified.

Design decision pending clarification: if a user selects both E4 and E5, the current design auto-pairs E3 and E6, consuming 4 seats for 2 wheelchair users. If that is correct, the total booking can still hold 2 more seats (up to the 6-ticket limit), and those 2 additional seats could be standard or premium — potentially for non-wheelchair companions who want to sit nearby. Since no adjacent standard seats exist in the center block of row E (E3 and E6 are both companion seats), those extra companions would need to sit in E1, E2, E7, or E8.

### 6.4 Companion Seats as Regular Seats

When neither wheelchair space in the user's selection is adjacent to E3 or E6, those seats are in Available-Companion (unlinked) state and can be booked normally as standard seats. Their ticket type can be Adult, Child, or Concession — there is no restriction.

**Ambiguity Flag A2:** Can companion seats E3 and E6 be booked with a child ticket when used as regular seats? The exercise rules say children under 12 must be accompanied by an adult in the same booking. This applies regardless of seat type. There is no rule that says companion seats can only carry adult tickets. My design permits child tickets for E3/E6 when used as regular seats, subject to the normal child-requires-adult constraint.

### 6.5 Constraint Communication (Proactive)

The following constraints are visible before any mistake is made:

| Constraint | Where shown proactively |
|---|---|
| Max 6 tickets | Booking summary panel header: "Select up to 6 seats". Counter updates live. |
| Wheelchair requires companion | Wheelchair space tooltip on hover. Accessibility toggle info text. |
| Child requires adult | Ticket-type step: the Child option in the dropdown shows a footnote "(requires adult in booking)". The Adult option is labelled "(or Concession)". |
| Companion seat dual nature | Hover tooltip on companion seats. |

---

## 7. Error and Edge Cases

| Scenario | Trigger | What the user sees | Where | What the user can do |
|---|---|---|---|---|
| **Seat becomes unavailable mid-selection** | Another user confirms a booking for a seat the user has selected, while the user is still on the seating plan | The seat pulses once (a short animation), then transitions to Occupied. A banner appears: "Sorry — [seat ID] was just booked by someone else. It has been removed from your selection." | Top of seating plan, dismissable after 5 seconds or on manual dismiss | Continue selecting. The rest of the selection is intact. No need to start over. |
| **Seat becomes Temporarily Held mid-selection** | Another user places a hold on a seat the user has NOT yet selected | The seat transitions to Temporarily Held with a clock icon. No interruption to the current user. | On the seating plan, in place | The user can wait (the hold may expire) or choose a different seat. |
| **Max tickets exceeded (attempted)** | User tries to select a 7th seat | The click/tap is ignored. The selected seat does not change state. A brief shake animation on the count indicator. A tooltip appears on the rejected seat: "You've reached the 6-ticket maximum. Deselect a seat to choose a different one." | Seat tooltip + count indicator animation | Deselect one seat, then select the new one. Or use the swap interaction (Section 4.4). |
| **Wheelchair space — companion occupied** | User tries to select a wheelchair space whose only companion seat is Occupied or Temporarily Held | The wheelchair space is in Unavailable (rule-blocked) state. Tooltip: "This wheelchair space can't be booked — its companion seat (E3/E6) is not available." | Seat tooltip | Select the other wheelchair space if its companion is free. Or book without a wheelchair space. |
| **Child ticket without adult** | User assigns Child ticket type to a seat when no other seat in the selection has Adult or Concession type | Inline validation in the ticket-type panel: a warning icon appears on that row. Text: "A child ticket requires at least one adult or concession ticket in the same booking." The "Confirm and Pay" button is disabled until resolved. | Ticket-type panel, inline on the offending row | Change the ticket type of another seat to Adult or Concession, or change this ticket to Adult. |
| **All seats assigned Child tickets** | User assigns Child to every ticket in a booking | Same as above: warning on all rows, "Confirm and Pay" disabled. Message in summary panel: "At least one ticket must be Adult or Concession when children are present." | Summary panel + individual rows | Change at least one ticket type to Adult or Concession. |
| **Deselect linked companion seat** | User tries to click a Companion-Linked seat | A small inline confirmation appears anchored to the seat: "Removing this companion seat will also remove [wheelchair space ID]. Remove both?" — [Yes, remove both] [Cancel] | Inline popover on the seat | Confirm to remove both, or cancel to keep both. |
| **Session / hold timeout** | User spends too long on the booking (hold expires server-side) | **Ambiguity Flag A3:** The exercise does not specify a hold duration. I am assuming a 10-minute hold. At 2 minutes remaining, a persistent banner appears: "Your seat hold expires in 2:00. Complete your booking or seats may be released." Countdown visible. At expiry, all held seats are released; a modal appears: "Your session has expired. Your seats are no longer reserved." [Start over] | Banner at top of page, then modal on expiry | Click "Start over" to return to the seating plan. Previously-selected seats may now be taken. |
| **Payment fails** | User submits payment but the transaction is declined | Payment form shows an error from the provider: "Payment declined — [reason if available]. Your seats are still held for [remaining time]." Retry possible. | Payment form, inline | Re-enter payment details and retry. If hold expires before retry, they return to the seating plan. |
| **Race condition: seat confirmed while user is paying** | Another user books the same seat between "Confirm and Pay" click and payment processing | After payment is processed, the confirmation page shows: "Your booking is confirmed, but one seat change occurred: [seat ID] was unavailable and has been refunded. Your updated booking is below." | Confirmation page | Accept the partial booking, or initiate a refund for the entire booking (link to support). This edge case may require a backend policy decision not fully in scope for this UX document. |

---

## 8. Pricing Visibility (Advanced)

**Ambiguity Flag A4:** The exercise does not state whether premium seats (rows C–D) cost more than standard seats (rows A–B, row E sides). A real cinema would almost certainly charge a premium. I am designing on the assumption that premium seats carry a higher price, but the exact amounts are to be defined by the cinema operator.

### 8.1 Price Display on the Seating Plan

Each seat's hover tooltip includes the base price for that seat type: "C4 — Premium — €12.00" vs. "A3 — Standard — €8.00". The price shown is the base (Adult) price. Ticket-type modifiers (child discount, concession) are applied in the ticket-type step.

A small legend below the seating plan shows: Standard €8.00 | Premium €12.00 | Wheelchair space (free — book with companion seat).

### 8.2 Price in the Summary Panel

The summary panel shows a running total that updates as seats are selected and ticket types are assigned. Each row shows: [Seat ID] | [Ticket type] | [Price]. The footer shows "Total: €X.XX". If the user has not yet assigned ticket types, prices show as "€8.00 (Adult)" or "€12.00 (Adult)" as a default estimate, with a note: "Prices may change if you select child or concession tickets."

### 8.3 Price Changes on Ticket Type Selection

When the user selects a Child or Concession ticket type for a seat, the price on that row updates immediately and the total recalculates. The change is animated briefly (the price number slides from old to new value) so the user notices the update.

### 8.4 Premium Seat Upcharge Communication

When the user selects their first premium seat, a one-time dismissible notice appears in the summary panel: "You've selected a premium seat (row C or D). These seats have better sightlines and comfort — and cost €4.00 more per ticket." This notice does not appear again for subsequent premium seat selections in the same session.

---

## 9. Responsive Design (Advanced)

### 9.1 Layout Breakpoints

**Desktop (≥1024px):** Two-column layout. Seating plan on the left (roughly 65% width). Summary panel on the right (35%), sticky, scrolls with content. "Find together" tool and accessibility toggle sit above the seating plan.

**Tablet (600–1023px):** Single-column layout. Seating plan full width, scaled to fit. Summary panel collapses to a bottom drawer, shown as a tab bar at the bottom: "X seats — €X.XX — View / Confirm". Tap to expand.

**Mobile (< 600px):** Seating plan fills the full width. Because the seating plan has 8 columns plus two aisles, it will not be legible at full mobile width without scaling. The seating plan is rendered as a horizontally scrollable zone with pinch-to-zoom. Minimum touch target size for each seat: 44×44px (following WCAG 2.5.5). The plan is displayed with a default zoom level that makes all seats visible simultaneously on a 375px-wide screen; at this zoom, each seat is approximately 30px — users are instructed to pinch to zoom before selecting.

An alternative "List view" toggle on mobile renders seats as a list grouped by row, with availability chips: "Row C: C1 (prem, €12) · C2 (prem, €12) · C3 taken · ...". List view supports the same select/deselect interactions via tap without requiring zoom. This is primarily a fallback for users on small screens who find spatial navigation difficult.

### 9.2 Touch Interaction Differences

| Interaction | Desktop | Mobile/Touch |
|---|---|---|
| Hover tooltip | Shown on pointer-over | Not applicable — tooltip shown as a tap-and-hold action, or via an info icon |
| Seat selection | Single click | Single tap |
| Swap at maximum | Popover anchored to new seat | Bottom sheet listing the 6 selected seats |
| "Find together" tool | Inline above plan | Accessible via a floating button that expands to a bottom sheet |
| Seating plan navigation | Fixed or scrollable | Pinch-to-zoom + pan |

### 9.3 Accessibility Toggle on Mobile

The "I need a wheelchair space" toggle is accessible from both the main view and the list view on mobile. On the list view, wheelchair spaces and companion seats are labelled with icons and are grouped visually at the end of the row-E section.

---

## 10. Ambiguity Summary

The following open questions were identified during this design. Each requires a decision from the cinema operator or exercise author before implementation.

| # | Question | Impact | Assumption made in this document |
|---|---|---|---|
| A1 | Do two wheelchair users count as companions for each other, eliminating the need for separate companion seats? | Changes companion-pairing logic; affects capacity planning | No — each wheelchair space requires its own companion seat (E3 or E6) |
| A2 | Can companion seats E3/E6 hold child tickets when used as regular seats? | Ticket type validation logic | Yes — the child-requires-adult rule applies regardless; no extra restriction |
| A3 | What is the server-side hold duration? | Session timeout UX, banner timing | 10 minutes, with a 2-minute warning |
| A4 | Do premium seats (rows C–D) cost more than standard seats? | Pricing display and live total calculation | Yes — example prices €12 premium, €8 standard |
| A5 | What happens when a user books both wheelchair spaces (E4 and E5) but the 6-ticket maximum means they can only add one companion? | Auto-pairing logic at capacity | Both auto-pair required; if capacity prevents both companions, a clear error is shown: "Booking both wheelchair spaces requires 2 companion seats. You currently have room for [N] more tickets." |

---

*Document word count (approximate): 2900 words core + 600 words advanced dimensions = ~3500 words total.*
