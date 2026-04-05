# UX Design Document: CineStar Booking System

## Conventions

Seats are named by row letter and seat number, like A1 or C4. Rows go from A to E. There are 8 seats per row.

Seat types: standard (blue), premium (purple), wheelchair space, companion seat.

Visual states: available, selected, occupied, unavailable.

Interactions: click to select a seat, click again to deselect.

---

## 1. Seat States and Transitions

| State | Visual | Description |
|-------|--------|-------------|
| Available | Blue or purple | Seat can be selected |
| Selected | Green highlight | Customer has chosen this seat |
| Occupied | Grey, no click | Already booked by someone else |
| Unavailable | Greyed out | Cannot be selected |

When a customer clicks an available seat it becomes selected. If they click a selected seat it goes back to available. If the seat is occupied nothing happens.

Wheelchair spaces and companion seats are shown differently in row E.

---

## 2. Interaction Design

The customer clicks seats on the seating plan to select them. They can select up to 6 seats (maximum 6 tickets per booking).

If the customer tries to select more than 6 seats, an error is shown.

To deselect a seat the customer clicks it again.

The seating plan shows the screen at the top. Rows A-E are shown below. Aisles are between columns 2-3 and 6-7.

**Seat types and locations:**
- Standard seats: rows A, B, and some seats in row E
- Premium seats: rows C and D
- Wheelchair spaces: row E
- Companion seats: row E, next to wheelchair spaces

Customers can select multiple seats by clicking each one. The total number of selected seats is shown somewhere on the page.

---

## 3. Booking Flow

1. Customer opens the booking page
2. The seating plan is shown with available and occupied seats
3. Customer clicks seats to select them
4. Customer clicks "Continue" button
5. Customer fills in ticket types (adult, child, etc.)
6. Customer enters their name and email
7. Customer pays
8. Confirmation is shown

If something goes wrong at any step, an error is shown and the customer can try again.

The customer has already chosen a date before this flow starts.

**Ticket types:**
- Adult
- Child (under 12, must have at least one adult in the booking)

Children under 12 must be accompanied by at least one adult ticket in the same booking. If the customer only selects child tickets, an error is shown.

---

## 4. Accessibility and Special Requirements

**Wheelchair spaces:**
- Located in row E
- Can only be booked together with at least one companion seat
- Shown with a wheelchair icon

**Companion seats:**
- Located in row E next to wheelchair spaces
- When booked with a wheelchair space, they are companion seats
- Can also be booked as regular seats

If a customer tries to book a wheelchair space without a companion seat, an error is shown.

Row E layout: seats 1-2 are standard, then there is a companion seat, then two wheelchair spaces, then another companion seat, then seats 7-8 are standard.

---

## 5. Error and Edge Cases

| Situation | Error Message |
|-----------|---------------|
| More than 6 tickets selected | "Maximum 6 tickets per booking" |
| Wheelchair space without companion seat | "Wheelchair spaces require a companion seat" |
| Child ticket without adult | "Children must be accompanied by an adult" |
| Seat already taken | Seat is shown as occupied and cannot be selected |
| Payment fails | An error is shown, customer can retry |

---

## Summary

The CineStar booking system lets customers pick their seats on a visual seating plan and complete their booking. The seating plan shows all seats with their current state. Customers select up to 6 seats, choose their ticket types, and pay. Special rules apply for wheelchair spaces, companion seats, and child tickets. Errors are shown when rules are broken.
