# UX Design Document: Seat Booking for Starlight Cinema

## 1. Overview

This system is a web-based seat booking interface for Starlight Cinema. The user can pick a showing and then select seats and book them. The cinema has 84 seats in 8 rows with different types like standard, premium and wheelchair seats.

**Terminology:**
- Seat map: the visual layout showing all the seats
- Booking: when user selects seats and confirms them
- Showing: a specific movie at a specific time

## 2. Seat Map Design

The seat map shows all the seats of the cinema. At the top there is the screen, then below that are the rows from A (front) to H (back). Each seat is shown as a small square or rectangle. There is a center aisle in the middle of each row.

The different seat types have different colors:
- Standard seats are gray
- Premium seats are orange
- Wheelchair seats are blue
- Companion seats are light blue

Each seat has its row letter and number shown on it or when you hover over it. The user can see the screen at the top so they know which direction they are facing. There is a legend at the bottom that explains what each color means.

When the map loads the user sees all the seats for that showing. Available seats are in their normal colors and already booked seats are darker or have a X on them.

## 3. Seat States

A seat can be in the following states:

**Available:** The seat is free and can be clicked. It shows in its normal color (gray for standard, orange for premium, etc.).

**Selected:** The user clicked on it and it is now selected. The seat changes to blue with a checkmark. The user can click again to deselect it.

**Booked/Unavailable:** Someone else already booked this seat. It is shown in a dark gray color and the user cannot click on it.

**Held:** The seat is being held by another user who is in the process of booking. It looks the same as booked (dark gray, not clickable).

**Wheelchair:** This is a special state for wheelchair spaces. They are only clickable if the user said they need accessibility.

## 4. Booking Flow

The booking flow goes like this:

**Step 1: Choose a showing**
The user sees a list of movies and times for today or they can pick another date. They click on a showing to continue.

**Step 2: Select seats**
The seat map is shown. The user clicks on seats to select them. They can select 1 to 6 seats. There is a summary on the side that shows what they selected and the total price. When they are done they click "Continue to checkout".

**Step 3: Checkout**
The user sees a summary of their booking with all the seats and prices. They enter their payment information and click "Confirm booking".

**Step 4: Confirmation**
The user sees a confirmation message with a booking number. They can print it or save it.

## 5. Selection Behavior

When the user clicks an available seat:
- The seat changes color to blue (selected)
- It appears in the booking summary on the side
- The total price updates

When the user clicks a selected seat:
- The seat goes back to available
- It is removed from the summary
- The total price updates

If the user tries to select more than 6 seats, they get a message saying "Maximum 6 seats per booking".

For group selection the user just clicks multiple seats one by one. There is no drag-select or anything like that.

## 6. Accessibility and Special Requirements

At the beginning of the booking flow (before the seat map), the system asks if the user has any accessibility needs. If they check the wheelchair option, then the wheelchair spaces in Row A become available for them to select.

Wheelchair spaces are blue on the map. If the user selects a wheelchair space, they also need to select at least one companion seat next to it. The companion seats are the light blue ones next to the wheelchair spaces.

If no wheelchair spaces are available the system shows a message saying there are no wheelchair spaces left for this showing.

## 7. Error and Edge Cases

**Seat timeout:** If the user takes more than 8 minutes the held seats are released. The user gets a message that their session expired and they need to start again.

**Seat taken by someone else:** If another user books a seat that you selected, the seat changes to unavailable and you get a notification.

**Too many seats:** If you try to select more than 6 seats you get an error message.

**Payment fails:** If payment doesnt work the user gets an error and can try again.

## 8. Summary and Booking Confirmation

**Before confirming:**
The user sees:
- The movie and showing time
- List of selected seats with row and number
- Seat types and prices
- Total price
- A "Confirm" button

**After confirming:**
The user sees:
- Booking confirmation number
- All the details of the booking
- Option to print or download the confirmation
