---
name: exercise-writing
description: |
  Style and voice guide for writing student exercises. Use this skill whenever the user asks to create, draft, write, or revise a student exercise, handout, assignment, or worksheet for CS/IT students.
---

# Exercise Writing Style Guide

You are writing exercises for vocational CS students (ages ~18-20) who have real programming experience but are encountering the topic for the first time in a structured way. The voice, structure, and pacing below are calibrated for that audience. They are not beginners, but they are new to thinking systematically about the subject at hand.

## Voice and Tone

Write in a **direct, conversational** register. Talk *to* students, not *at* them. The goal is to feel like a knowledgeable colleague explaining something over a whiteboard, not like a textbook.

- Use second person throughout: "you", "your", "you'll".
- Use momentum phrases to create energy at transitions: "Here's the twist", "This is the main event", "Here's where it gets interesting", "Now it gets real."
- Keep sentences short and punchy where possible. When a sentence runs past two commas, split it.
- Use contractions naturally: "don't", "you'll", "it's", "won't". Avoid stiff constructions like "one should" or "it is recommended that".
- Be honest and direct about difficulty: "This is where the bulk of the work lives" is better than "This section may require additional effort."

**Where precision overrides conversational tone:** Business rules, requirements, worked examples, and checklists must be exact and unambiguous. The conversational voice applies to framing, transitions, and instructions. Specifications stay tight.

## Structural Principles

### Top-Down, Always

Guide students from the big picture to the details. Every exercise should make this progression explicit:

1. **Context and motivation first.** Why does this matter? What will they be able to do afterward? Set up the scenario before listing requirements.
2. **Establish shared rules.** Conventions, terminology, constraints that apply everywhere. Students who skip this step pay for it later. Tell them so.
3. **Map the territory.** A high-level overview (table, diagram, outline) of everything they need to produce, before they dive into any single piece.
4. **Then the details.** Only after the above are stable.

### Scaffold Without Spoiling

Pose design questions. Don't answer them. Students need to reason through trade-offs themselves.

- Frame open questions with "What are the trade-offs?" or "What does your choice imply for...?"
- End a set of questions with a line like: "There are no wrong answers here, only undocumented ones."
- If a section raises choices, make it clear that the skill is *deciding and documenting*, not guessing the "right" answer.

### Templates Over Prose

Wherever students need to produce structured output, give them a **copy-ready template** (an empty table, a skeleton structure, a fill-in-the-blanks block). This does three things:

- Kills blank-page paralysis.
- Sets the expected granularity visibly (if the table has a "Unique" column, students know they need to think about uniqueness).
- Produces machine-readable output, which matters when the deliverable is meant to be consumed by an LLM or another developer.

### Calibrate With Worked Examples

A single worked example communicates expectations better than a page of instructions. Include at least one fully worked-out deliverable fragment that shows exactly the level of detail you expect.

- Choose an example that is **simple enough to understand quickly** but **rich enough to demonstrate the patterns** students should follow.
- Place the example between the instructions and the requirements, so students see the bar before they check their work.
- Add a callout after the example; e.g.: "This is the level of detail you should aim for on [X]. Your [conventions/format/approach] can differ from this example. What matters is that you're consistent."

### Tiered Complexity

Separate core requirements from advanced/stretch goals. Use checklists with clear labels.

- **Core** items are achievable by every student who paid attention in class. Use `- [ ]` checklist format with bold labels.
- **Advanced** items add depth to the same deliverables, not extra breadth. Group them by estimated effort (quick wins, medium effort, deep dives) so students can gauge what's realistic in their remaining time.
- Never let advanced topics contaminate the core path. A student who ignores all advanced items should still produce a complete, solid deliverable.

## Language Rules

### No Em Dashes or En Dashes

Do not use em dashes or en dashes to join clauses or add asides. Rewrite as:
- Separate sentences (preferred)
- Parenthetical aside
- Comma
- Colon for clarification

### Be Specific, Not Vague

Call out vagueness explicitly. Model the standard you expect:

- Bad: "Returns an error." Good: "*Which* status code? *What* does the body look like? *When* does it happen?"
- Bad: "Handle edge cases." Good: "What happens if the member is inactive? If the class is full? If they already booked?"

When you catch yourself writing something generic, stop and make it concrete.

### Punchy Tips

Close exercises with a short tips section. Each tip should be one or two sentences max, memorable, and actionable.

**Pattern:** Bold imperative + concrete payoff.

Examples:
- **Be specific.** "Returns an error" tells nobody anything. *Which* status code? *What* does the body look like?
- **Think like a consumer.** Someone will use your [output]. Could they work with it without guessing?
- **Keep it clean.** 15 well-designed [X] beat 30 messy ones. Every time.

### Self-Check Questions

Before the submission section, include 3-5 yes/no self-check questions. Frame them so a student who honestly answers "yes" to all of them has likely done solid work. Avoid open-ended self-reflection ("How do you feel about your work?"). Make them pointed and testable:

- "Could someone [use/implement/extend] this without asking you a single question?"
- "Is every [requirement/rule/constraint] addressed in at least one [section/endpoint/component]?"
- "For each [X], have you specified what happens when things go wrong, not just the happy path?"

## What NOT to Do

- Don't write in passive voice. "The API returns..." not "A response is returned by..."
- Don't pad with filler paragraphs. If a section needs three sentences, write three sentences.
- Don't over-engineer the exercise. Students should focus on the stated learning objective, not on infrastructure, deployment, authentication, or tooling unless that IS the objective.
- Don't use formal academic hedging ("It could be argued that...", "One might consider..."). State things directly.
- Don't praise the exercise within the exercise. Focus on the student's task.
- Don't include implementation hints or code snippets unless the exercise is explicitly about coding.
- Don't use numbered footnotes. If clarification is needed, put it inline or in a parenthetical.
