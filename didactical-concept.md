# Didactical Concept: UX Design Document Exercise

Teacher-facing guide. Not handed to students.

## Why This Domain (Cinema Seat Booking)

Every student has booked a cinema seat online. This familiarity means they don't need to learn the domain before they can work on the UX problem. The spatial nature of a seating plan forces design thinking that goes beyond forms and lists: students must reason about visual layout, spatial relationships, and how physical constraints (aisles, wheelchair positions, row geometry) translate into interaction patterns.

The domain also produces genuine trade-offs with no single correct answer (how to handle group selection, how to show pricing, how to surface accessibility options), which makes it impossible to "guess the teacher's answer."

## What Each Major Element Teaches

### Seating plan visual (provided in exercise)
Forces students to ground their design in a concrete layout rather than designing in the abstract. Every UX decision must connect back to this artifact. Students who skip studying the plan will produce generic designs that don't account for the actual row sizes, wheelchair positions, or aisle placement.

The visual is generated programmatically (`generate-visual.js` produces an SVG, converted to PNG). This makes it easy to adjust the layout if needed. The plan uses color-coding and a legend to distinguish seat types (standard, premium, wheelchair, companion), includes row labels and seat numbers, and shows the center aisle and screen position. The visual is intentionally simple: it conveys the spatial structure without suggesting any particular UI treatment, leaving that design work to the students.

### Seat states requirement
Teaches state modeling as a UX concern. Students who've done database work understand entity states, but they haven't thought about how each state needs a distinct visual representation and defined transitions. This bridges their backend mental model to frontend thinking.

### Booking flow requirement
Introduces multi-step user journey design. Students must think about information architecture: what to show when, what to collect when, and how steps connect. The 8-minute hold timer adds time pressure as a design constraint.

### Accessibility handling requirement
Makes accessible design a first-class concern rather than an afterthought. The wheelchair + companion seat rule introduces a constraint dependency (one booking must include both), which is a non-trivial UX challenge to communicate clearly.

### Companion seat bookability (explicit design decision)
The exercise deliberately leaves the bookability of companion seats for non-accessibility users as an open design question. Student testing revealed that this ambiguity confused students at multiple levels. Rather than resolving it, the exercise now explicitly flags it as a decision students must make and justify. This is pedagogically valuable: it forces students to reason about trade-offs (should the cinema maximize companion seat usage, or reserve them for wheelchair users?) and to document their rationale. Teachers should accept either answer as long as the student's justification is sound and the design is internally consistent.

### Error and edge cases requirement
The most important section for separating surface-level from thorough work. Students naturally design the happy path. This requirement forces them to think about what goes wrong: timeouts, conflicts, constraint violations. This is where the document's quality becomes visible.

### Scope guidance (4-6 pages / 1500-2500 words)
Students doing their first UX design exercise have no calibration for how much to write. Without guidance, they fall into two failure modes: (1) one paragraph per section, confusing "addressed" with "specified," or (2) overwriting everything in anxious prose, burying design decisions in filler. The page/word range gives a sanity check without becoming a target. Framing it as "shortest document a developer could build from" reinforces the quality bar and discourages padding. The guidance sits in "What You'll Produce" so students see it before they start writing, not after.

### Worked examples (seat state + booking flow step + error case)
Calibrate expectations across different dimensions. Without them, students produce wildly varying levels of detail. The first example (a seat state) shows: visual specification (colors, sizes), trigger description, user actions from this state, and constraint behavior. The second example (a booking flow step) shows: what the user sees, what they do, how constraints are enforced, and how they leave the step. The third example (an error case) shows: what triggers the error, exactly what appears on screen, what the user can do, and what they cannot do. Together, the three examples demonstrate that the same level of specificity applies whether students are describing a static state, a dynamic journey step, or an error scenario. The error example was added because student testing revealed that Section 7 (Error and Edge Cases) was consistently the weakest section across all skill levels — students had no model for what a well-described error looks like.

### Document structure template (integrated with core requirements)
Kills blank-page paralysis. Students who know what sections to write can focus on content rather than structure. The template is loose enough that students must still decide how to organize their thoughts within each section. By combining the scaffold and requirements into one section, students have a single reference for both structure and expectations, instead of cross-referencing two separate lists that cover the same dimensions.

Each template section includes one or two guiding questions (marked with →). These questions push students from "I wrote something for this section" toward "I wrote something a developer could actually build from." They target the most common gaps for each section (e.g., missing visual specifics in seat states, unclear navigation between booking flow steps, unspecified user recovery paths for errors). They stay at the meta-level: they ask *what to think about*, not *what to write*. A student who takes each question seriously will produce a more complete document without being steered toward any particular design.

## Where Students Commonly Struggle

| Struggle | How to help |
|---|---|
| **Too vague.** "The seat changes color when selected." | Point them back to the worked example. Ask: "Which color? What was it before? What if they click again?" |
| **Confused about visual specificity.** "But it says no mockups required — do I really need to specify colors?" | Yes. The exercise now explicitly clarifies this: "no mockups" means no Figma/wireframes, but students must still make and describe visual design decisions in words. Point them to the clarification in "What You'll Produce" and the worked examples. |
| **Designing only the happy path.** They describe how booking works when everything goes right. | Ask them to walk through their flow and intentionally break things. "What if two users click the same seat at the same time?" |
| **Copying the exercise as their document.** They restate requirements instead of making design decisions. | Remind them: the exercise says *what* to address, their document says *how* it works. If their document reads like the exercise, they haven't designed anything. |
| **Ignoring the seating plan.** Generic descriptions that could apply to any venue. | Ask: "Where are the wheelchair spaces in your design? How does the aisle affect your layout?" If they can't answer from their document, it's not specific enough. |
| **Inconsistent terminology.** "Seat map" in one section, "seating chart" in another, "booking grid" in a third. | Point out the inconsistency. Suggest they define terms once in their overview and use them consistently. |
| **Overwhelming themselves with advanced requirements.** | Emphasize the core/advanced split. A complete core document is better than a half-finished document that tries to cover everything. |

## Core vs. Advanced Split for Differentiation

The core requirements cover the essential dimensions of a seat booking UX: visualization, states, interaction, flow, accessibility, and errors. Any student who engages seriously can produce a solid document covering these six areas.

Advanced requirements deepen the same design rather than broadening it. They're grouped by effort (quick wins, medium, deep dives) so students can self-select based on their remaining time and interest. This prevents stronger students from being bored without making weaker students feel like they're failing.

Crucially, the advanced items don't unlock new features. They add nuance to existing ones (e.g., "how does the seat map work on mobile?" deepens the seat map design, it doesn't add a new system).

The exercise now includes explicit guidance that "most students focus entirely on the core requirements" and suggests "one or two advanced topics" for students who finish early. Student testing showed that without this guidance, struggling students felt pressure to attempt advanced items, while strong students were uncertain how many to tackle.

## Meta-Level Framing: Why It Prevents Copy-Paste

The exercise specifies *categories of information* (e.g., "describe your seat states"), not *the information itself* (e.g., "use blue for selected seats"). This means:

- Two students can produce completely different, equally valid documents.
- Copying the exercise requirements into the document doesn't constitute a design. The requirements ask *what to address*, not *what the answer is*.
- The worked example shows depth, not direction. It demonstrates the format and specificity expected, but students must apply that standard to their own design choices.

If a student's document looks like a rephrased version of the exercise, they haven't done the work. The design decisions are the work.

## Connection to Broader Learning Objective

The exercise frames the UX design document as an AI prompt. This isn't a gimmick. It's a genuine professional skill: the ability to write specifications so precise that they can be executed without interpretation. Whether the executor is a junior developer, an outsourced team, or a frontier LLM, the skill is the same.

By making this connection explicit, the exercise gives students a concrete, testable quality bar: "Could an LLM build this from your document?" This is more motivating and more measurable than "write a good design document."
