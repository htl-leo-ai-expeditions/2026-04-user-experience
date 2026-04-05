# CineStar Booking System: UX Design Document

---

## 1. Conventions

| Convention | Your definition |
|---|---|
| Seat naming scheme | Seats are referred to by row letter followed by seat number. Row A is the row closest to the screen. Example: A4 refers to Row A, Seat 4. Wheelchair spaces and companion seats in Row E follow the same scheme (E3 = companion seat in column 3, E4 = wheelchair space in column 4). |
| Visual state vocabulary | Terms used: "highlighted" (draws attention, prominent), "muted" (de-emphasized, low contrast), "dimmed" (partially transparent, inactive feel), "pulsing" (subtle animation loop), "neutral" (default resting appearance), "badge" (small label overlaid on a seat). |
| Interaction vocabulary | Users "click" on desktop and "tap" on mobile. "Select" describes the logical action (a seat becomes selected). "Hover" is used for cursor-over effects on desktop only. "Deselect" means removing a seat from the current selection. |

---

## 2. Seat States and Transitions

Every seat exists in exactly one state at any time.

| State | Visual description | Can the user interact? | What happens on click/tap? |
|---|---|---|---|
| Available | Neutral appearance. Subtle highlight border on hover. | Yes | Seat becomes Selected. |
| Selected | Strongly highlighted with a prominent border. Shows a small numbered badge (e.g. "1", "2") indicating its position in the booking group. | Yes | Seat becomes Available (deselected). |
| Occupied | Muted and grayed out. No hover effect. | No | Nothing. Cursor shows "not-allowed" icon on hover. |
| Temporarily held | Dimmed with a small clock icon overlay. Tooltip on hover: "This seat is being held by another customer." | No | Nothing. |
| Wheelchair space (available) | Displays the international accessibility symbol (wheelchair icon). Neutral background. Highlighted border when the accessibility filter is active. | Yes, with conditions (see Section 5) | Seat becomes Selected only if at least one companion seat is also selected. Otherwise a tooltip appears: "Please also select a companion seat." |
| Companion seat (available) | Shows a small link icon or bracket connecting it visually to the adjacent wheelchair space. Otherwise looks like a standard available seat. | Yes | If the adjacent wheelchair space is not selected, the seat behaves like a standard available seat and becomes Selected. If the adjacent wheelchair space is selected, this seat becomes Selected as a companion seat. |
| Companion seat (linked) | Highlighted with a distinct accent border connecting it visually to its paired wheelchair space. Shows a small "companion" label badge. | Yes | Clicking deselects this seat. If it is the only companion seat for a selected wheelchair space, the user sees a warning (see Section 6). |

**Transitions:**

| From | To | Trigger |
|---|---|---|
| Available | Selected | User clicks/taps the seat. |
| Selected | Available | User clicks/taps the seat again (deselects). |
| Available | Temporarily held | Another customer selects this seat. Transition animates briefly to draw attention. |
| Temporarily held | Available | The other customer's hold expires or they deselect the seat. |
| Temporarily held | Occupied | The other customer completes their booking. |
| Selected | Occupied | Another customer completes their booking for the same seat (race condition; see Section 6). |
| Available | Occupied | Booking completes for this seat. |
| Companion seat (available) | Companion seat (linked) | User selects the adjacent wheelchair space. |
| Companion seat (linked) | Companion seat (available) | User deselects the adjacent wheelchair space. |

---

## 3. Interaction Design

**Single seat selection:**
The user clicks any Available seat. The seat immediately transitions to Selected state. A numbered badge appears on the seat (starting at "1" for the first seat). The booking summary sidebar updates to show the seat name (e.g., "B5") and increments the total seat count.

**Multi-select (group):**
The user clicks seats one at a time. Each clicked seat moves to Selected state and receives the next badge number in sequence (1, 2, 3, ...). The booking summary lists all selected seats and shows a running count (e.g., "3 of 6 seats selected"). There is no drag-to-select or shift-click; all selections are individual clicks.

**Deselection:**
The user clicks any Selected seat. It returns to Available state. Its badge disappears. The booking summary removes that seat. Badge numbers on remaining selected seats do not reorder — they keep their original numbers so the user isn't confused by seats renumbering.

**Swapping a seat at the maximum (6 seats selected):**
When 6 seats are selected, all remaining Available seats become dimmed with a "locked" appearance and are not clickable. To swap a seat, the user must first deselect one of the 6 chosen seats (click it to remove it). This returns it to Available and unlocks the other Available seats. The user can then select a different seat. There is no automatic swap interaction.

*Design question: Is there a better swap interaction?* A single-step swap (click a new seat and it replaces the oldest selection) would be faster, but could cause accidental swaps. I chose the two-step approach (deselect then select) because it is more predictable, even if it takes an extra click.

**Finding adjacent seats for a group:**
The seating plan shows all seat states visually. When a group needs adjacent seats, they must scan the plan themselves to find a row with enough available seats in a row. The booking summary shows how many seats are still needed. There is no automated "find adjacent seats" feature.

*Design question: How do we help a group of 4 find adjacent seats?* In a small 40-seat cinema like CineStar, the plan is compact enough that visual scanning is quick. A more advanced feature would highlight rows with enough adjacent seats when the user sets their group size, but this is outside scope for the current design.

---

## 4. Booking Flow

| Step | What the user sees | What the user does | What information is collected or shown |
|---|---|---|---|
| 1 | The seating plan page. The plan shows all seats in their current states. A sidebar shows: showtime date/time, seat count (0 of max 6), and an empty seat list. A prominent "Accessibility" toggle is visible above the plan. | Views the plan, optionally activates the accessibility toggle. | Showtime date and time (pre-selected). |
| 2 | Available seats respond to hover. Selected seats show numbered badges. The sidebar updates with each selection. | Clicks seats to select them (up to 6). | Selected seat names and count. |
| 3 | When at least 1 seat is selected, a "Continue" button appears at the bottom of the sidebar. | Clicks "Continue". | — |
| 4 | A ticket type screen appears. For each selected seat, the user assigns a ticket type: Adult, Child (under 12), or Concession. The seat name is shown next to each dropdown. A running total price is shown at the bottom. | Assigns a ticket type to each seat. | Ticket types per seat. Total price. |
| 5 | A review screen shows: showtime, all selected seats and their ticket types, total price. A "Confirm Booking" button is shown. A "Back" link allows returning to ticket type selection. | Reviews the summary. Clicks "Confirm Booking" to finalize, or "Back" to change something. | All booking details displayed for confirmation. |
| 6 | A confirmation screen with a booking reference number. Option to download or email the tickets. | Notes the reference number or downloads tickets. | Booking reference, ticket summary. |

**Commit point:** The booking becomes final at Step 5 when the user clicks "Confirm Booking". I placed it there because users should be able to review all details — seats, ticket types, and total price — before committing. A review step reduces accidental bookings and gives a natural moment to catch errors like wrong ticket types.

*Design question: Where does ticket type selection happen?* I chose to put ticket type selection in a separate step (Step 4) after seat selection. This keeps the seating plan uncluttered. Selecting ticket type per seat during selection would require a popup or inline form for each seat, which adds friction. The trade-off is that the user can't see the price impact while picking seats.

---

## 5. Accessibility and Special Requirements

**Discovering wheelchair spaces:**
Row E contains two wheelchair spaces (E4 and E5). An "Accessibility" toggle button is shown above the seating plan. When activated, wheelchair spaces receive a strongly highlighted border so they are immediately visible. Users who do not need accessibility features are not forced to see special callouts during normal browsing.

**Companion seat pairing:**
Companion seats in Row E are E3 (adjacent to wheelchair space E4) and E6 (adjacent to wheelchair space E5). When a wheelchair space is selected, the system automatically highlights its companion seat(s) with a linked accent border and a tooltip: "This seat must be booked with the wheelchair space." The companion seat transitions to Companion seat (linked) state. The user must select the companion seat manually — it is not auto-booked. If the user tries to confirm without selecting a companion seat after selecting a wheelchair space, the system shows an error (see Section 6).

**Constraint communication:**
Before any mistakes occur, the booking sidebar displays a note: "Wheelchair spaces require at least one companion seat to be selected." This note becomes bold and highlighted when a wheelchair space is selected. The companion seat(s) gain their linked visual state to make the requirement obvious in context.

**Booking a companion seat as a regular seat:**
If no wheelchair space is selected, companion seats (E3 and E6) behave as standard available seats. They show no special visual treatment beyond a subtle link icon. A user can select them as ordinary seats. A tooltip on hover reads: "This seat is next to a wheelchair space" so the user is informed but not blocked.

*Design question: Does the system block wheelchair selection without a companion, auto-select, or warn later?* My design allows the wheelchair space to be selected but immediately highlights the companion seat requirement in the sidebar and with the linked visual state. The booking cannot proceed to Step 3 without a companion seat also selected. Auto-selecting feels presumptuous (the user may want to pick which companion seat). Blocking before selection would prevent users from even exploring the wheelchair area.

---

## 6. Error and Edge Cases

| Scenario | Trigger | What the user sees | Where it appears | What the user can do |
|---|---|---|---|---|
| Seat becomes unavailable mid-selection | Another customer books a seat the user has already selected | The seat transitions from Selected to Occupied with a brief pulse animation. A warning message appears: "Seat [name] is no longer available and has been removed from your selection." The booking summary updates. | Inline on the seat in the plan; warning message in the sidebar below the seat list | User can select a different available seat. They do not need to start over. |
| Maximum tickets exceeded | User attempts to click a 7th seat | The click has no effect. A short warning message appears: "Maximum 6 seats per booking." Available seats remain visually locked (dimmed). | Sidebar, below seat count | User can deselect an existing seat to free up a slot, then select a different one. |
| Child ticket without adult | User assigns all ticket types as Child with no Adult in Step 4 | The system shows a warning: "At least one Adult ticket is required when booking for children under 12." The "Continue" button on Step 4 is disabled until the issue is resolved. | Below the ticket type list on the ticket type screen | User changes at least one ticket type to Adult. |
| Wheelchair space selected without companion seat | User selects a wheelchair space but has not selected a companion seat when clicking "Continue" | The "Continue" button is disabled. The sidebar shows: "A companion seat is required with every wheelchair space. Please also select E3 or E6." The companion seat(s) pulse briefly to draw attention. | Sidebar warning; visual pulse on the companion seat in the plan | User selects a companion seat. |
| Session expires during selection | User takes too long on the seat selection page | A modal dialog appears: "Your session has expired. Your seat selections have been released." An "OK" button returns the user to a fresh seating plan. | Full-page modal overlay | User starts seat selection again. Previously chosen seats may now be taken. |

---

*Word count: approximately 1,700 words*
