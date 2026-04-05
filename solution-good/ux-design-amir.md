# UX Design Document: Seat Booking for Starlight Cinema

**Author:** Amir  
**Date:** 2026-04-05

---

## 1. Overview

This document specifies the complete user experience for Starlight Cinema's web-based seat booking interface. The system allows logged-in users to browse movie showings, select seats from an interactive seat map, and complete a booking with payment.

**Scope:** The design covers the flow from showing selection through booking confirmation. Authentication, user profiles, and admin/back-office features are out of scope.

### Terminology

| Term | Definition |
|---|---|
| **Seat map** | The interactive visual representation of the cinema's seating layout. |
| **Showing** | A specific screening of a movie at a scheduled date and time. |
| **Hold** | A temporary server-side reservation that locks a seat for the current user for 8 minutes. |
| **Booking** | A confirmed, paid reservation of one or more seats for a showing. |
| **Selection** | The set of seats the user has currently chosen (held but not yet confirmed). |
| **Standard seat** | A regular seat in rows B-H (CHF 16). |
| **Premium seat** | A seat in the center section of rows F-G with better sightlines (CHF 22). |
| **Wheelchair space** | An open floor space in row A (positions 1-2, 7-8) for wheelchair users (CHF 16). |
| **Companion seat** | A fixed seat adjacent to a wheelchair space in row A (positions 3-4, 5-6), intended for the companion of a wheelchair user (CHF 16). |
| **Checkout** | The final step where the user reviews their selection, provides payment, and confirms the booking. |
| **Timer** | The visible countdown showing how long the user's held seats remain reserved. |

---

## 2. Seat Map Design

### Layout structure

The seat map is rendered as a top-down schematic view of the cinema. The screen is at the top of the map, represented as a wide, slightly curved light-gray bar labeled "SCREEN" in uppercase, small font. Rows are arranged below the screen from A (closest) to H (farthest).

Each row is labeled with its letter on the left side of the map. Seat numbers run left to right within each row (1, 2, 3...). The center aisle is rendered as a visible gap (approximately the width of 1.5 seats) splitting each row into a left section and a right section.

Side aisles are represented as narrower gaps between the outermost seats and the map border.

### Seat rendering

Each seat is rendered as a rounded rectangle (24x24px at default zoom, border-radius 4px). Inside the rectangle, the seat number is displayed in a small font (10px). Seats are spaced with 4px horizontal and 6px vertical gaps.

**Seat type visual distinctions:**

| Seat type | Default fill | Border | Icon |
|---|---|---|---|
| Standard | `#E5E7EB` (light gray) | 1px `#9CA3AF` | None |
| Premium | `#FDE68A` (amber/gold) | 1px `#F59E0B` | Small star icon (top-right corner) |
| Wheelchair | `#BFDBFE` (light blue) | 1px `#3B82F6` | Wheelchair icon (center, replaces number) |
| Companion | `#DBEAFE` (lighter blue) | 1px `#60A5FA` | "C" letter (center, replaces number) |

### Legend

Below the seat map, a horizontal legend displays all four seat types with their color swatch and label: Standard, Premium, Wheelchair, Companion. The legend also shows the color for "Unavailable" and "Your selection" states.

### Orientation cues

- A label "SCREEN" at the top so users know which direction is "front."
- Row letters on the left margin.
- On hover over any seat, a tooltip shows: "[Type] - Row [X], Seat [N] - CHF [price]" (e.g., "Premium - Row F, Seat 5 - CHF 22").
- The entire map is contained within a bordered panel with a subtle drop shadow, making it feel like a distinct interactive element.

---

## 3. Seat States

Every seat on the map is in exactly one of the following states at any given time.

### 3.1 Available

- **Visual:** Default fill color for the seat type (see table in Section 2). Cursor changes to `pointer` on hover.
- **Hover effect:** The seat fill lightens by 10% and the border thickens to 2px. The tooltip described in Section 2 appears after 300ms.
- **Transitions from:** "Selected by current user" (user deselects), "Held" (hold expires and seat is released), or initial page load.
- **Transitions to:** "Selected by current user" (user clicks it), "Unavailable" (another user books it, real-time update).

### 3.2 Selected by current user

- **Visual:** Solid blue fill (`#2563EB`). White checkmark icon centered inside the seat. Border changes to 2px `#1D4ED8`. The seat number is hidden (replaced by the checkmark).
- **How the user gets here:** The user clicks an available seat. The state change is applied immediately as an optimistic update. A hold request is sent to the server in the background.
- **If the hold request fails** (e.g., the seat was taken between page load and click): the seat reverts to "Unavailable" state and an inline error banner appears above the seat map: "Seat [Row][Number] was just taken by another customer. Please choose a different seat." The banner has a yellow background (`#FEF3C7`), a warning icon, and auto-dismisses after 6 seconds (or on click).
- **Transitions to:** "Available" (user clicks it again to deselect), progresses to a confirmed booking through checkout.
- **Constraints enforced:** If the user already has 6 seats selected, clicking another available seat does nothing. A tooltip appears near the clicked seat: "Maximum 6 seats per booking. Deselect a seat to choose this one."

### 3.3 Unavailable (booked by another user)

- **Visual:** Fill color `#F3F4F6` (very light gray) with a diagonal line pattern overlay (subtle hatching). The seat number is still visible but in a muted color (`#D1D5DB`). Cursor remains `default` (no pointer).
- **Hover effect:** Tooltip reads "Already booked."
- **Click behavior:** No action. No visual feedback beyond the tooltip.
- **Transitions from:** "Available" (another user completes a booking for this seat; arrives via real-time update or page refresh).
- **Transitions to:** None during the current session (bookings are not reversed in real time).

### 3.4 Held by another user

- **Visual:** Identical to "Unavailable." The user does not need to distinguish between "booked" and "temporarily held by someone else" -- both are simply not available.
- **Rationale:** Showing "held" as a separate visual state would leak information about other users' activity and create confusion ("will it become free soon?"). Keeping it visually identical to booked is simpler and avoids misleading expectations.

### 3.5 Disabled (accessibility restriction)

- **Visual:** The seat retains its type-specific color but at reduced opacity (`opacity: 0.35`). Cursor is `not-allowed`.
- **Hover effect:** Tooltip reads "Not available for accessibility bookings. Please select wheelchair or companion seats."
- **When this state applies:** When the user has indicated a wheelchair accessibility need (see Section 6), all seats that are neither wheelchair spaces nor companion seats enter this state.
- **Transitions to:** "Available" if the user removes their accessibility indication.

### 3.6 Expired hold (current user)

This is not a persistent visual state on the map. When the user's 8-minute hold timer expires, all of the user's selected seats revert to "Available" (or "Unavailable" if someone else grabbed them). A modal overlay appears -- see Section 7 for full details.

---

## 4. Booking Flow

The booking flow is a linear sequence of four steps. A progress indicator at the top of the page shows the steps as a horizontal bar: **Select Showing** > **Choose Seats** > **Checkout** > **Confirmation**. The current step is highlighted in blue; completed steps show a checkmark; future steps are grayed out.

### Step 1: Select Showing

- **What the user sees:** A list of upcoming showings for the selected movie. Each showing is a card displaying: movie title, date (e.g., "Saturday, 12 April 2026"), time (e.g., "20:15"), and a small availability indicator (e.g., "62 of 84 seats available" or "Almost full -- 5 seats left" in orange text if fewer than 10 seats remain). If a showing is completely sold out, the card is grayed out and displays "Sold out" with no click action.
- **How the user arrives:** By navigating to the movie's page on the cinema website (out of scope) and clicking "Book tickets."
- **User action:** Clicks a showing card.
- **Accessibility prompt:** After clicking a showing, a small dialog appears: "Do you need wheelchair-accessible seating?" with two buttons: "Yes, I need wheelchair spaces" and "No, continue with standard seating." This choice affects which seats are selectable in Step 2 (see Section 6). The user can change this choice later from the seat selection screen via a link.
- **Transition to Step 2:** Immediate after the accessibility prompt is answered. The seat map loads for the selected showing.

### Step 2: Choose Seats

- **What the user sees:** The seat map (Section 2) fills the main content area. On desktop, a booking summary panel is pinned to the right side (approximately 280px wide). On mobile, the summary is a collapsible bar pinned to the bottom of the screen. The summary shows:
  - Showing info: movie title, date, time.
  - Selected seats list (initially empty, shows "No seats selected yet" in gray italic text). As seats are selected, each appears as a row: "Row F, Seat 5 (Premium) -- CHF 22". Seats are listed in order: row letter first, then seat number.
  - Running total: "Total: CHF 0" updating with each selection change.
  - Hold timer: "Time remaining: 8:00" -- starts counting down from the moment the first seat is selected (see Section 7).
  - "Continue to checkout" button: disabled (grayed out, `cursor: not-allowed`) until at least one seat is selected. When enabled, the button is blue (`#2563EB`) with white text.
  - "Change showing" link (plain text link, above the summary): returns the user to Step 1 and releases all held seats.
- **User actions:** Click seats to select/deselect (see Section 5). Click "Continue to checkout" when satisfied.
- **Transition to Step 3:** User clicks "Continue to checkout."
- **Transition back to Step 1:** User clicks "Change showing." All current holds are released immediately.

### Step 3: Checkout

- **What the user sees:** The seat map is no longer visible. The page shows a checkout form with:
  - **Order summary** (top section): movie title, showing date/time, a table of selected seats (Row, Seat, Type, Price), and the total price. Each line item is clearly readable.
  - **Payment section** (below the summary): payment method selection (credit card, TWINT, etc.). Appropriate input fields for the selected payment method. These are standard payment form patterns and not specified further here.
  - **Buttons:** "Confirm and pay" (primary, blue) and "Back to seat selection" (secondary, text link style).
- **Hold timer:** Still visible and counting down. Displayed as a small banner at the top of the checkout page: "Your seats are held for [M:SS]." If the timer reaches 2:00, the banner turns orange as a warning. If it expires, see Section 7.
- **User action:** Fills in payment details and clicks "Confirm and pay."
- **Transition to Step 4:** Payment is processed successfully. The server converts the holds into a confirmed booking.
- **Transition back to Step 2:** User clicks "Back to seat selection." Holds are preserved; the timer continues.
- **Payment failure:** If the payment fails, an inline error message appears below the payment form: "Payment could not be processed. Please check your details and try again." The user remains on the checkout page with all fields preserved.

### Step 4: Confirmation

- **What the user sees:** A confirmation page with:
  - A green checkmark icon and the heading "Booking confirmed!"
  - Booking reference number (e.g., "SLC-20260412-0042") displayed prominently.
  - Movie title, showing date and time.
  - List of booked seats (same format as the checkout summary).
  - Total amount paid.
  - A note: "A confirmation email has been sent to [user's email]."
  - Buttons: "Book more tickets" (returns to movie/showing listing) and "View my bookings" (navigates to the user's booking history -- out of scope for this design but the button should exist).
- **Timer:** No longer displayed. Holds have been converted to confirmed bookings.
- **Browser behavior:** The confirmation page replaces the checkout in the browser history (using `replaceState`), so pressing the back button does not return to the checkout form (which would be confusing since the booking is already confirmed).

---

## 5. Selection Behavior

### Single seat selection

When the user clicks an available seat:
1. The seat immediately transitions to the "Selected by current user" state (blue fill, checkmark).
2. The booking summary updates: the seat is added to the list, the total recalculates, and both changes are highlighted with a brief pulse animation (a subtle scale-up to 1.02 and back over 200ms) on the newly added row.
3. If this is the first seat selected, the hold timer starts at 8:00 and begins counting down. The "Continue to checkout" button becomes enabled.
4. A hold request is sent to the server. If it fails, the seat reverts (see Section 3.2).

### Single seat deselection

When the user clicks a seat that is currently in the "Selected by current user" state:
1. The seat immediately transitions back to "Available" (its type-specific default color).
2. The seat is removed from the booking summary list, and the total recalculates.
3. A release request is sent to the server.
4. If this was the last selected seat, the "Continue to checkout" button becomes disabled again. The hold timer stops and resets (it will restart from 8:00 when the next seat is selected).

### Group selection behavior

There is no special "group select" or drag-to-select mechanism. Users select seats one at a time by clicking. This keeps the interaction simple and avoids ambiguity about which seats are included in a drag region, especially across the center aisle.

However, when a user selects adjacent seats, they are visually grouped: the individual blue fills merge into a continuous blue highlight across adjacent seats, reinforcing that they are part of the same booking.

### Constraint enforcement during selection

| Constraint | Trigger | UI Response |
|---|---|---|
| Max 6 seats | User clicks a 7th available seat | Click has no effect. Tooltip on the clicked seat: "Maximum 6 seats per booking. Deselect a seat first." |
| Wheelchair booking: non-accessible seat clicked | User with accessibility flag clicks a standard/premium seat | Click has no effect. Seat is in "Disabled" state (Section 3.5). Tooltip explains restriction. |
| Wheelchair without companion | User tries to proceed to checkout with a wheelchair space selected but no companion seat | "Continue to checkout" button remains disabled. A message appears below the button: "Wheelchair bookings require at least one companion seat. Please select a companion seat adjacent to your wheelchair space." |
| Companion without wheelchair | User without accessibility flag tries to click a companion seat | Companion seats are available to all users (they are regular seats when not part of a wheelchair booking). They can be selected normally. |

---

## 6. Accessibility and Special Requirements

### Declaring accessibility needs

At the transition between Step 1 and Step 2 (after selecting a showing), the user is prompted: "Do you need wheelchair-accessible seating?" with two clearly labeled buttons (see Step 1 in Section 4).

If the user selects "Yes":
- The seat map loads with all standard and premium seats in the "Disabled" state (Section 3.5).
- Only wheelchair spaces and companion seats are clickable.
- A blue info banner appears above the seat map: "Showing wheelchair-accessible seats. You can change this by clicking 'Switch to standard seating' below."
- Below the seat map, a text link reads: "Switch to standard seating." Clicking it clears the accessibility flag, releases any held wheelchair/companion seats, and reloads all seats in their normal states.

If the user selects "No":
- The seat map loads normally. All available seats of all types are clickable.
- Wheelchair spaces and companion seats are still visible on the map but are **not** clickable for standard bookings. They appear in their type-specific colors at reduced opacity (0.5) with a tooltip: "Wheelchair-accessible seating -- select 'wheelchair-accessible seating' to book these." This prevents accidental booking and keeps these seats available for users who need them.

### Companion seat rule enforcement

When a user in accessibility mode selects a wheelchair space, the system must ensure at least one companion seat is also included in the booking before checkout:

- After selecting a wheelchair space, a prompt message appears in the booking summary: "Please also select at least one companion seat (marked C) next to your wheelchair space."
- The "Continue to checkout" button is disabled until the companion rule is satisfied.
- If the user deselects all companion seats while still having a wheelchair space selected, the prompt reappears and the button disables.

### No wheelchair spaces available

If all wheelchair spaces for a showing are booked/held, and the user has selected "Yes" to the accessibility prompt:
- The seat map loads but all wheelchair spaces are in the "Unavailable" state.
- A prominent banner appears above the map: "We're sorry -- all wheelchair-accessible spaces for this showing are currently unavailable. You can try a different showing or contact us at [phone/email] for assistance."
- A "Choose a different showing" button is displayed below the banner.

---

## 7. Error and Edge Cases

### 7.1 Hold timer expiration

**Trigger:** The 8-minute countdown reaches 0:00 while the user is on Step 2 or Step 3.

**What happens:**
1. All of the user's held seats are released on the server.
2. A modal overlay appears (semi-transparent dark backdrop, white card centered):
   - Heading: "Your seat reservation has expired"
   - Body: "The 8-minute hold on your seats has been released. This happens to keep seats available for all customers. You can start a new selection now."
   - Button: "Choose seats again" (closes the modal and returns the user to Step 2 with a fresh seat map -- all previously selected seats are deselected).
3. The modal cannot be dismissed by clicking outside it or pressing Escape. The user must acknowledge it.

**Warning before expiration:** At 2:00 remaining, the timer text turns orange (`#F59E0B`) and the timer area pulses once to draw attention. At 1:00 remaining, the timer turns red (`#EF4444`) and a brief shake animation plays.

### 7.2 Seat taken by another user during selection

**Trigger:** The user clicks an available seat, but the server responds that the seat is already held or booked.

**What happens:**
1. The seat reverts from "Selected by current user" to "Unavailable" state.
2. An inline warning banner appears above the seat map (yellow background, warning icon): "Seat [Row][Number] was just taken. Please choose another seat." Auto-dismisses after 6 seconds.
3. The seat is removed from the booking summary and the total is recalculated.

### 7.3 Seat becomes unavailable via real-time update

**Trigger:** While the user is viewing the seat map, another user books or holds a seat that was previously shown as available.

**What happens:**
1. The seat transitions to "Unavailable" state with a brief fade animation (300ms).
2. No banner or notification is shown (this would be disruptive if it happened frequently). The visual change on the map is sufficient.
3. If the user was hovering over that exact seat, the tooltip updates to "Already booked."

### 7.4 Network error during seat hold

**Trigger:** The user clicks a seat but the server is unreachable.

**What happens:**
1. The seat shows "Selected" optimistically for up to 3 seconds.
2. If no server response is received in 3 seconds, the seat reverts to "Available."
3. A red error banner appears above the seat map: "Connection lost. Please check your internet connection and try again." The banner persists until the user dismisses it or a subsequent action succeeds.

### 7.5 Network error during checkout

**Trigger:** The user clicks "Confirm and pay" but the request fails due to a network error.

**What happens:**
1. The "Confirm and pay" button shows a loading spinner. After 10 seconds of no response, the spinner is replaced with an error message below the button: "We couldn't process your request. Please check your connection and try again."
2. The button re-enables so the user can retry.
3. Critically, the system must be idempotent: if the server actually processed the payment but the response was lost, retrying must not charge the user twice. (This is a backend concern, but the UX document notes it because the frontend must handle this case gracefully -- show "Booking confirmed" if a retry reveals the booking already exists.)

### 7.6 User navigates away or closes the tab

**Trigger:** The user closes the browser tab, navigates to another site, or refreshes the page while seats are held.

**What happens:**
- On `beforeunload`, the browser shows a native confirmation dialog: "You have seats selected. If you leave, your selection will be lost."
- If the user leaves anyway, the server-side hold timer continues and the seats are released after 8 minutes.
- If the user returns (e.g., by navigating back) within the 8-minute window, the seats should still be held. The page reloads with the user's current holds reflected on the seat map. (This requires the server to associate holds with the user session, not just the page instance.)

### 7.7 Double-booking prevention at checkout

**Trigger:** The user clicks "Confirm and pay," but between their last map load and the checkout, one of their held seats was released (e.g., server-side hold expiry due to clock skew) and booked by someone else.

**What happens:**
1. The server rejects the booking.
2. The user sees an error message on the checkout page: "One or more of your selected seats is no longer available. Please return to seat selection and choose new seats."
3. A "Back to seat selection" button is provided. The seat map reloads with current availability.

---

## 8. Summary and Booking Confirmation

### Pre-confirmation summary (Checkout - Step 3)

Before the user clicks "Confirm and pay," the checkout page displays a full order summary:

| Field | Example |
|---|---|
| Movie title | "Interstellar" |
| Showing | Saturday, 12 April 2026 at 20:15 |
| Seats | Row F, Seat 5 (Premium) -- CHF 22 |
| | Row F, Seat 6 (Premium) -- CHF 22 |
| | Row G, Seat 4 (Standard) -- CHF 16 |
| **Total** | **CHF 60** |

Seats are listed sorted by row (A first) then by seat number. Each line shows the row, seat number, seat type in parentheses, and individual price. The total is displayed in bold at the bottom with a horizontal rule above it.

The user can review every detail and is expected to verify correctness before confirming. A small text line above the "Confirm and pay" button reads: "By confirming, you agree to the cinema's terms and conditions." ("terms and conditions" is a link.)

### Post-confirmation (Step 4)

See Step 4 in Section 4 for the full confirmation page specification. Key elements repeated for clarity:

- Booking reference (format: `SLC-YYYYMMDD-NNNN`)
- All booking details (movie, showing, seats, total)
- Confirmation email notice
- Navigation options for further actions

---

## 9. Pricing Display (Advanced)

**Design decision:** Prices are shown at three points in the flow, with increasing prominence.

1. **On hover (seat map):** The tooltip for every available seat includes its price: "Premium - Row F, Seat 5 - CHF 22." This lets users discover prices without leaving the map, but doesn't clutter the visual layout.

2. **In the booking summary (Step 2):** Each selected seat shows its individual price. The running total updates in real time. This is where pricing becomes actionable -- users can see the cost impact of each seat they add.

3. **At checkout (Step 3):** The full price breakdown is shown in a clear table format (Section 8). This is the final verification.

**Why not show prices directly on the seat map?** Putting price labels on each seat would create visual clutter, especially given that there are only three price points (CHF 16, CHF 16, CHF 22). The legend already distinguishes seat types visually, and the tooltip provides on-demand pricing. A small price legend could be added next to the seat type legend: "Standard/Wheelchair/Companion: CHF 16 | Premium: CHF 22" -- this is a low-clutter way to surface pricing early.

**Addition to the legend:** Below the seat type legend, a pricing line is displayed: "Standard, Wheelchair & Companion: CHF 16 | Premium: CHF 22."

---

## 10. Real-Time Updates (Advanced)

The seat map should reflect changes made by other users in near-real-time, to minimize "seat conflict" errors at selection time.

### Implementation approach

The client maintains a WebSocket connection to the server while the seat map is open. The server pushes seat status changes as they occur. Each message contains: `{ seatId, newState }` where `newState` is either `"held"` or `"available"` (the client treats `"held"` as `"unavailable"`).

### UI behavior on receiving an update

- If the seat was "Available" and becomes "Unavailable": the seat fades (300ms) to the unavailable state (Section 3.3). No notification. This is a background change.
- If the seat was "Unavailable" and becomes "Available" (another user's hold expired): the seat fades (300ms) to its type-specific available color. No notification.
- If the seat was "Selected by current user" and the server sends a release (this should not happen normally, but could in edge cases): treat as a conflict. The seat transitions to "Unavailable" and the inline warning banner appears (Section 7.2).

### Rate limiting visual updates

If many seats change state in a short period (e.g., a group booking releases 6 seats at once), the changes are batched and applied simultaneously rather than as 6 individual animations. This prevents a distracting sequence of flickering seats.

### Connection loss

If the WebSocket connection drops:
- After 3 seconds of disconnection, a small orange banner appears below the seat map: "Live updates paused. Seat availability may not be current." 
- The client attempts to reconnect with exponential backoff (1s, 2s, 4s, 8s, max 30s).
- On reconnection, the client requests a full seat map refresh to sync any changes missed during the outage. The banner disappears.

---

## Self-Check Responses

1. **Could a developer build this without messaging me?** Yes, for the core flow. I've specified colors, sizes, states, transitions, and copy for every major interaction. A developer might need to make minor decisions about exact padding/margins, but the behavior is fully defined.

2. **Have I described what happens when things go wrong?** Yes. Section 7 covers timer expiry, seat conflicts, network errors, navigation away, and double-booking prevention.

3. **For every seat state, is it clear how a user gets in and out?** Yes. Each state in Section 3 lists its transitions to and from other states.

4. **Would an LLM produce something close to what I intend?** I believe so. The specific colors, text strings, and behavioral rules are all stated explicitly. The main area of ambiguity might be the exact spatial layout and spacing of the seat map, but the structure (rows, aisles, seat sizes) is defined.
