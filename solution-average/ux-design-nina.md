# UX Design Document: Starlight Cinema Seat Booking

## 1. Overview

This document describes the user interface for booking seats at Starlight Cinema, a small single-screen movie theater with 84 seats. The system is a web-based booking interface where logged-in users can pick a showing, select seats from an interactive seat map, and complete their booking through a checkout process.

**Terminology:**

- **Seat map**: The visual grid showing all seats in the theater.
- **Showing**: A specific screening of a movie at a specific date and time.
- **Booking**: A confirmed reservation of 1-6 seats for a specific showing.
- **Hold**: A temporary reservation (8 minutes) while the user completes checkout.
- **Wheelchair space**: A seat position without a fixed chair, for wheelchair users (Row A, positions 1-2 and 7-8).
- **Companion seat**: A seat next to a wheelchair space, meant for the companion of a wheelchair user (Row A, positions 3-4 and 5-6).
- **Premium seat**: A higher-priced seat in the center of Rows F-G.
- **Standard seat**: A regular seat (all other seats).

## 2. Seat Map Design

The seat map is the main element of the booking screen. It shows the theater layout from the audience's perspective (Row A at the top, closest to the screen, Row H at the bottom/back).

**Layout:**

- At the very top of the map, a light gray rectangle labeled "SCREEN" spans the width of the seating area, so users can orient themselves.
- Below the screen, rows are shown from A (front) to H (back).
- Each row has a label on the left side (e.g., "A", "B", etc.).
- Seats are shown as rounded squares, roughly 30x30 pixels, with spacing between them.
- The center aisle is represented as a gap between the left group and right group of seats in each row.
- Row A has 8 seats (4 on each side of the aisle). Rows B-F have 10 seats (5 on each side). Rows G-H have 12 seats (6 on each side).

**Visual distinction of seat types:**

- **Standard seats**: Gray (#9CA3AF) background with a darker gray border.
- **Premium seats**: Orange/amber (#D97706) background with a darker orange border. A small star icon in the corner.
- **Wheelchair spaces**: Blue (#3B82F6) background with a wheelchair icon in the center.
- **Companion seats**: Light blue (#93C5FD) background with a "C" label.

A legend at the bottom of the seat map explains each color and icon. It also shows the prices: Standard CHF 16, Premium CHF 22, Wheelchair/Companion CHF 16.

When the map first loads, all available seats are shown in their type colors. The user sees the full layout at once and can orient themselves relative to the screen.

## 3. Seat States

Each seat can be in one of the following states:

### Available

- **Visual**: Seat is shown in its type color (gray, orange, blue, or light blue) as described above.
- **How the user gets here**: This is the default state for all unreserved seats.
- **What the user can do**: Click to select the seat.

### Selected (by current user)

- **Visual**: The seat background changes to solid blue (#2563EB) with a white checkmark in the center. The border becomes 2px blue.
- **How the user gets here**: The user clicks an available seat.
- **What the user can do**: Click again to deselect (returns to available). Or continue to checkout.
- **Constraints**: Maximum 6 seats can be selected. If the user tries to select a 7th, nothing happens and a small tooltip appears saying "Maximum 6 seats per booking."

### Unavailable (booked by someone else)

- **Visual**: The seat is shown in dark gray (#4B5563) with an "X" or is slightly faded. No hover effect.
- **How the user gets here**: Another user has already booked or is holding this seat.
- **What the user can do**: Nothing. The seat is not clickable. On hover, the cursor stays as default (not pointer).

### Held-but-expired

This is when the user's own hold times out (8 minutes). The seat goes back to available or unavailable depending on whether someone else grabbed it. See section 7 for how this is handled.

### Disabled

- **Visual**: The seat has reduced opacity (0.4) and is not clickable.
- **How the user gets here**: The seat is not available for the user's current selection mode. For example, if the user has NOT indicated a wheelchair need, the wheelchair and companion seats in Row A still appear but are not selectable. Actually, wait - the exercise says wheelchair spaces can only be booked by users who indicate an accessibility need. So for regular users, wheelchair spaces should appear disabled.
- **What the user can do**: Hover shows a tooltip explaining why the seat is disabled (e.g., "This seat is reserved for wheelchair users").

## 4. Booking Flow

The booking flow has four main steps:

### Step 1: Select a Showing

- **What the user sees**: A list of available showings for the current and upcoming days. Each showing displays the movie title, date, time, and how many seats are still available (e.g., "42 seats available").
- **What the user does**: Clicks on a showing to select it.
- **How the user moves forward**: After clicking a showing, the system loads the seat map for that showing and moves to Step 2.

### Step 2: Accessibility Preferences

- **What the user sees**: A small dialog or section asking "Do you need wheelchair-accessible seating?" with a Yes/No choice. There could also be a brief explanation that wheelchair spaces include companion seats.
- **What the user does**: Selects Yes or No.
- **How the user moves forward**: After selecting, the seat map loads with appropriate seats enabled/disabled.
- **How the user goes back**: A "Change showing" link at the top takes them back to Step 1.

### Step 3: Seat Selection

- **What the user sees**: The seat map fills the main content area. On the right side (on desktop) or at the bottom (on mobile), there's a booking summary panel. The summary shows: the selected showing (movie, date, time), a list of selected seats (initially empty showing "No seats selected"), and a total price of CHF 0.00. A "Continue to checkout" button is at the bottom of the summary, grayed out/disabled until at least one seat is selected.
- **What the user does**: Clicks seats on the map to select them. Each click toggles the seat between available and selected. The summary updates immediately with each change: it shows the seat label (e.g., "Row B, Seat 3"), the seat type, the price, and the running total.
- **How constraints are enforced**: If the user tries to select a 7th seat, the click does nothing and a tooltip appears near the seat. If the user indicated wheelchair needs, only wheelchair and companion seats are clickable, all others are dimmed.
- **How the user moves forward**: Clicks "Continue to checkout."
- **How the user goes back**: Clicks "Change showing" link, which releases all held seats and goes back to Step 1.

### Step 4: Checkout and Confirmation

- **What the user sees**: A summary of the booking: movie title, date/time, list of selected seats with type and price each, and a total. There's a "Confirm booking" button and a "Go back" button.
- **What the user does**: Reviews the information. If everything looks good, clicks "Confirm booking."
- **What happens on confirm**: The system processes the booking. A loading spinner appears on the button. On success, a confirmation screen shows with a booking reference number, the details of the booking, and a message like "Your booking is confirmed! Enjoy the show."
- **How the user goes back**: Clicks "Go back" to return to seat selection. Their seats remain held.

## 5. Selection Behavior

**Selecting a seat:**
- User clicks an available seat.
- The seat immediately changes to the "selected" state (blue with checkmark).
- The booking summary on the right updates to add the seat (row, number, type, price).
- The total price updates.

**Deselecting a seat:**
- User clicks a selected seat.
- The seat returns to "available" state.
- The seat is removed from the booking summary.
- The total price updates.

**Group selection:**
- There is no special group selection mode. Users select seats one by one.
- However, if a user selects a wheelchair space, the system could suggest selecting an adjacent companion seat by highlighting it with a pulsing border. The companion seat is not automatically selected - the user must click it themselves.

**Constraint enforcement:**
- **6-seat limit**: Clicking a 7th seat does nothing. Tooltip appears: "Maximum 6 seats per booking. Deselect a seat first."
- **Wheelchair + companion rule**: If a user with accessibility needs selects a wheelchair space but tries to proceed to checkout without selecting at least one companion seat, the "Continue to checkout" button shows an error message: "Please select at least one companion seat next to your wheelchair space."
- **Minimum 1 seat**: The checkout button stays disabled until at least one seat is selected.

## 6. Accessibility and Special Requirements

**Declaring accessibility needs:**
- This happens at Step 2 of the booking flow (before seeing the seat map).
- The user is asked "Do you need wheelchair-accessible seating?" with Yes/No options.

**When the user selects "Yes":**
- The seat map shows wheelchair spaces and companion seats as available (in their normal colors).
- All standard and premium seats are dimmed (opacity 0.4) and not clickable.
- A note above the map says: "Showing wheelchair-accessible seats. Wheelchair spaces include companion seats for your companion."

**When the user selects "No":**
- Standard and premium seats are available as normal.
- Wheelchair spaces and companion seats are shown but dimmed/disabled with a tooltip: "Reserved for wheelchair users."

**Companion seat rule:**
- If the user selects a wheelchair space, the system highlights the adjacent companion seats with a subtle pulsing animation to encourage the user to also select one.
- The user cannot proceed to checkout with a wheelchair space but no companion seat. An error appears near the checkout button.

**What if no wheelchair spaces are available?**
- If all wheelchair spaces for a showing are already booked, the accessibility question in Step 2 should show a message: "Unfortunately, all wheelchair-accessible seats for this showing are currently unavailable. Please try another showing." The user can then go back and pick a different showing.

## 7. Error and Edge Cases

**Hold timeout (8 minutes):**
- A countdown timer is displayed somewhere in the booking summary, showing remaining hold time (e.g., "Time remaining: 5:32").
- When 2 minutes remain, the timer turns red and a warning appears: "Your seat hold will expire soon. Please complete your booking."
- When the timer reaches 0, the user's selected seats are released. A modal dialog appears: "Your seat hold has expired. Your selected seats have been released. Would you like to start over?" with a button to return to seat selection.

**Seat taken by another user during selection:**
- If the user clicks a seat and the server responds that it's already taken (race condition), the seat changes to "unavailable" state. An inline message appears above the seat map: "Sorry, seat [row][number] was just booked by someone else. Please choose another seat."

**Booking confirmation failure:**
- If the server fails when confirming the booking, an error message appears: "Something went wrong. Please try again." The "Confirm booking" button becomes clickable again.

**Network errors:**
- If the connection is lost, a banner appears at the top of the page: "Connection lost. Please check your internet connection." The user's selections are preserved locally and can be retried when the connection returns.

## 8. Summary and Booking Confirmation

**Before confirming (checkout screen):**
The user sees:
- Movie title and poster thumbnail
- Showing date and time
- List of selected seats, each showing: row letter, seat number, seat type (Standard/Premium/Wheelchair/Companion), and individual price
- Total price in CHF
- A "Confirm booking" button and a "Go back to seats" button

**After confirming:**
The user sees:
- A success message: "Booking confirmed!"
- A unique booking reference number (e.g., "SLC-2026-04821")
- All the details from above repeated for the user's records
- A note: "A confirmation email has been sent to your registered email address."
- A "Book another showing" button to start over
- A "Print" button to print or save the confirmation

The user should have enough information on this screen to verify everything is correct even after confirming - movie, time, exact seats, and total cost.
