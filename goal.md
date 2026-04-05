# Goal: UX Design Document Exercise

## Mission

Create a student exercise where students practice:
- Writing a **detailed UX design document** for a graphical seat/space booking system
- Practicing **AI prompting skills** by making the design document precise enough that a frontier LLM could build a working prototype from it alone

The exercise is **not** about implementing code. It is about producing a complete, unambiguous UX design document.

## Student Background

- 4th year of vocational CS training (ages ~18-20)
- Languages: C#, TypeScript, Java, some C
- Know relational databases and SQL
- Solid fundamentals: OS concepts, networking basics, boolean logic, number systems
- Comfortable with web technologies (HTML, CSS, basic JS)
- This is likely their first structured encounter with UX design methodology

## Learning Objectives

### Primary

1. **UX Design Thinking**: Students learn to systematically design a user experience for a spatially complex, interactive interface. They must think about layout, interaction patterns, state representation, user flows, edge cases, and accessibility before any code is written.

2. **Writing a UX Design Document**: Students produce a structured document that fully specifies how a booking interface looks, behaves, and handles edge cases. The document should be precise, complete, and unambiguous, detailed enough that someone (or an LLM) could build a working prototype from it without asking clarifying questions.

3. **AI Prompting through Specification**: By writing a high-quality UX design document, students implicitly practice the skill of giving clear, structured instructions to an AI. The design document *is* the prompt. The better the document, the better an LLM can implement it. This connection should be made explicit in the exercise.

### Secondary

- Thinking about interface states and transitions before building them
- Understanding the relationship between spatial layout and data model
- Designing for accessibility and special requirements as a first-class concern, not an afterthought
- Appreciating the value of upfront design work in preventing rework during implementation

## What the Exercise is NOT About

- Writing code (no implementation required)
- Learning a specific framework or UI library
- Visual design aesthetics (typography, branding, color palettes)
- Backend API design or database modeling (these may be mentioned in passing but are not the focus)
- Authentication, authorization, or account management
- Creating graphical mockups (e.g. Figma). Students describe the visual layout and interaction design in words and, if necessary, text diagrams (basic ASCII art).

## Domain: Graphical Seat/Space Booking

The exercise domain is a **graphical seat or space reservation system**. Examples include: a small single-screen cinema, a few tables in a restaurant, a small theatre, a section of a concert venue, or a block of seats at a soccer stadium.

### Why This Domain

- It is **familiar** to students (everyone has booked a cinema seat or restaurant table online)
- It has a **strong visual component** that forces students to think about spatial representation, not just forms and lists
- It creates **natural UX complexity**: group selection, adjacent-seat logic, accessibility requirements, real-time availability, state management
- It produces **genuine design trade-offs** with no single "right answer" (grid vs. realistic layout, click-to-select vs. drag-to-select, inline details vs. sidebar)
- The scope is **controllable** by constraining venue size (one small cinema, not a multiplex)
- It connects to real systems students have actually used, making the exercise feel relevant rather than academic

### Domain Constraints

These constraints shape the exercise (they are for the exercise author, not the student):

- **Keep scope small.** The venue must be small: one screen, one dining room, one section. Students design the UX for a single, bounded space. No multi-venue, multi-floor, or chain-wide scenarios.
- **Graphical layout is mandatory.** The exercise must include a visual, spatial representation of the venue (a seating plan, a table layout, a pitch-side view). Students must study it and derive UX interactions from it.
- **Group booking is required.** Users must be able to book multiple seats/spaces for a group in a single transaction. This introduces UX challenges around selection, confirmation, and partial availability.
- **Special requirements must exist.** The venue must support at least a few accessibility or special-need categories (e.g. wheelchair spaces, child seats, barrier-free entry routes, high chairs, companion seats). Students must design how these are surfaced, filtered, and selected in the UI.
- **No authentication/account system design.** Assume a logged-in user. Don't spend UX effort on login flows, registration, or profile management.

### Visual Artifact

The exercise handout must include a visual representation of the venue to book. Students must carefully study it and derive UX interactions from it. Example:

* Visual artifact is a cinema seating plan
* User wants to book a wheelchair seat
* There are only five wheelchair spots available, so the UX design document must explain how the user is limited to selecting from those five, how the UI communicates that limitation, and how the user can find out which ones are available.

## The Meta-Level Constraint

**This is the single most important design principle for this exercise.**

The exercise must operate on a **meta-level**. It defines the domain, the layout of the venue, and the business rules (e.g. max. number of tickets/seats, price per seat if applicable). It also defines *what a UX design document must contain* and *what qualities it must have*, without prescribing the specific interaction patterns students should use.

If the exercise is too concrete, students can copy-paste it as their design document. If it is too abstract, students won't know what is expected.

The sweet spot:
- **Specify categories of information** students must provide (e.g. "describe your error states"), not the specific information itself (e.g. "show a toast when booking fails").
- **Pose design questions** students must answer in their document, not design decisions they must adopt.
- **Require artifacts** (flow diagrams, state descriptions) without dictating their content.
- **Use the worked example** to show the expected depth and format.

## Deliverable: UX Design Document

The student produces a textual UX design document. The exercise must require students to address (at minimum) the dimensions below, without dictating the answers.

### Core Dimensions (required for all students)

- **Interaction design**: How does a user select seats/spaces? How does multi-select work for groups? What feedback does the UI give during selection?
- **Booking flow**: What are the steps from "I want to book" to "booking confirmed"? What information is collected at each step?
- **Special requirements handling**: How does a user indicate accessibility needs? How does the system surface available options? How are constraints enforced (e.g. companion seat next to wheelchair space)?
- **State representation**: What states can a seat/space be in (available, selected, occupied, blocked, reserved-for-accessibility)? How is each state visually communicated?
- **Error and edge cases**: What happens when a selection becomes unavailable mid-booking? What if the group size exceeds available adjacent seats? How are conflicts communicated?

### Advanced Dimensions (stretch goals for stronger students)

- **Responsive design**: How does the spatial layout adapt to different screen sizes?
- **Real-time updates**: What happens when another user books while you're selecting?
- **Pricing visibility**: How and when are prices shown in relation to the spatial layout?
- **Undo and modification**: How can users change their selection before confirming? After confirming?
- **Interface accessibility**: Keyboard navigation, screen reader support, color-blind considerations
- **Micro-interactions**: Hover states, selection transitions, loading indicators
- **Multi-event support**: Choosing a date/showtime and how that changes availability

### Validation Criterion

A good UX design document should pass this test: *"Could a competent frontend developer (or frontier LLM) build a working interactive prototype from this document alone, without needing to ask any clarifying questions about how the interface should look or behave?"*

## Exercise Format

- Self-contained written exercise (handout)
- Written in English
- Estimated effort: 4-8 hours
- Individual work
- Core vs. advanced split must be clearly marked, so average students are not overwhelmed and strong students are not bored
