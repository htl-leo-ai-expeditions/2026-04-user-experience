# Didactical Concept Guide

Use this guide whenever you write or revise `didactical-concept.md`.

`didactical-concept.md` is a compact teacher-facing companion to `exercise.md`. It exists to help an experienced teacher run this specific exercise well. It is not a place for generic pedagogy, theory summaries, or classroom common sense.

## Core Goal

Write a didactical concept that does all of the following:

- stays tightly aligned with the current version of `exercise.md`
- explains the exercise-specific teaching intent behind the current design
- highlights non-obvious student difficulties and useful intervention points
- helps a teacher interpret partial, uneven, or divergent student results
- stays short enough to be worth reading before class

If a point is obvious from the exercise itself, or obvious to an experienced teacher, cut it.

## Audience

Write for experienced teachers.

Assume the reader already knows:

- general pedagogy
- classroom management
- differentiation
- formative assessment
- common teaching frameworks

Do not explain these. Do not name-drop them. Do not translate the exercise into didactical buzzwords.

Write for someone who wants the useful parts fast:
- what this exercise is really training
- where students will get stuck
- what kinds of variation are acceptable
- what to look for when judging quality
- what changed in the exercise design that matters for teaching

## Priority Order

When writing or revising `didactical-concept.md`, optimize in this order:

1. alignment with the current `exercise.md`
2. usefulness for classroom execution
3. non-obviousness
4. concision
5. polish

If a sentence is elegant but obvious, remove it.

## Scope

Cover only what helps a teacher work with this exercise better.

Good scope:
- why the chosen task format fits the learning target
- what each major requirement is meant to train
- where students are likely to misread, overbuild, under-specify, or short-circuit the task
- which shortcuts produce superficially plausible but weak results
- which differences between student solutions are acceptable
- where the core/advanced boundary matters in practice
- how to read partial solutions

Bad scope:
- explaining standard teaching moves
- generic reminders to differentiate, scaffold, or give feedback
- repeating the task description in prose
- long theory paragraphs
- anything that belongs in a pedagogy textbook

## Default Structure

Use this structure unless there is a strong reason not to:

1. **Exercise intent**  
   What this exercise is really training beyond the surface topic.

2. **Requirement-to-learning map**  
   For each major requirement or task block, state what it is meant to train.

3. **Likely student difficulties**  
   Name concrete struggle points and why they matter.

4. **Teacher cues**  
   State what to watch for when reviewing or discussing results.

5. **Core vs. advanced boundary**  
   Explain what makes the core sufficient and what the advanced part adds.

This is a default structure, not a mandatory ritual. Keep only the sections that earn their place.

## Exercise Intent

Start by naming the actual training value of the exercise.

Do not stop at the surface topic.

Weak:
- `This exercise is about REST APIs.`

Stronger:
- `This exercise uses a REST API scenario to train precise specification work, especially the ability to define consistent endpoints, explicit constraints, and error cases without hiding behind vague prose.`

This section should help a teacher see what kind of thinking the exercise is supposed to provoke.

## Requirement-to-Learning Map

Map major requirements or task blocks to the capability they are supposed to train.

Keep it compact. A short table is often the best format.

Do not force one row per tiny bullet point. Group by meaningful chunks.

## Likely Student Difficulties

This is usually the most valuable section.

Focus on problems that are not obvious from the task text alone.

Useful examples:
- students choose names inconsistently across sections
- students describe only happy paths and forget failure cases
- students produce something that looks complete but leaves decisions undocumented
- students over-engineer the solution because they confuse realism with quality
- students copy the wording of the exercise without making actual design decisions

For each difficulty, add a short practical note about how a teacher might respond.

Good:
- `Many students will specify endpoints that look plausible but do not form a coherent naming system. In discussion, push them to justify consistency across the whole API, not only endpoint by endpoint.`

Weak:
- `Students may have difficulties. Teachers should support them individually.`

## Teacher Cues

Help the teacher see what to look for in student work.

Focus on observable signals.

Useful cues:
- signs of genuine reasoning versus template-filling
- indicators that a student understood the trade-offs
- common patterns of incomplete work
- where acceptable variation ends and real inconsistency begins
- what a strong partial solution looks like

Examples:
- `A partial solution can still be strong if the endpoint set is incomplete but the conventions and error handling logic are internally consistent.`
- `Do not mistake volume for quality. A shorter result with explicit decisions is usually better than a longer result full of vague placeholders.`

This section should help teachers judge quality without forcing a single model solution.

## Core vs. Advanced Boundary

Explain the practical meaning of the split.

Focus on what changes in the student artifact and in classroom use.

Useful questions:
- What makes the core part already sufficient?
- What extra depth does the advanced part add?
- What should a teacher expect from a student who completes only the core?
- How does advanced work deepen the same artifact instead of creating side work?

Do not explain general differentiation theory.

## Synchronization Rules

`didactical-concept.md` must stay aligned with the current `exercise.md`.

Update it in the same run whenever the exercise changes in a way that affects:

- learning goals
- task structure
- scaffolding
- expected difficulty
- sequencing
- deliverables
- review criteria
- what counts as acceptable variation
- how a teacher is likely to use the exercise

Do not update it for cosmetic wording changes unless the wording change affects interpretation.

## Style Rules

### Keep it compact

Aim for the shortest document that is still useful.

A few tight sections are better than a long narrative. Every sentence should earn its place.

### Use the exercise vocabulary

Use the same terminology, labels, and section names as `exercise.md` wherever possible.

The teacher should be able to map the concept back to the exercise quickly.

### Be actionable

Write things a teacher can do, notice, or keep in mind.

Good:
- `Watch for students who define resources cleanly but never specify what happens when a request fails.`

Bad:
- `Error handling is an important aspect of professional software design.`

### Be specific

Avoid abstract praise or vague educational language.

Weak:
- `The exercise supports deeper understanding.`
- `Students reflect on authentic design questions.`

Stronger:
- `The exercise forces students to turn vague domain language into explicit interface rules. That is where many of them realize how much they usually leave implicit.`

### No pedagogy theater

Do not pad the document with terms such as:
- constructive alignment
- competency orientation
- Bloom's taxonomy
- learner activation
- differentiation strategy

unless the user explicitly asks for them.

## What Not to Do

- Do not summarize the exercise section by section unless that summary adds new teaching value.
- Do not explain obvious classroom moves to experienced teachers.
- Do not write generic advice that would fit almost any exercise.
- Do not justify every minor design choice.
- Do not turn the file into a pedagogical essay.
- Do not copy phrases from `exercise.md` unless you are using them to make a specific teaching point.
- Do not let the didactical concept drift out of sync with the actual exercise.
- Do not confuse teacher guidance with a hidden solution key.

## Final Check Before You Finish

Before you finalize `didactical-concept.md`, check the following:

- Is it clearly aligned with the current `exercise.md`?
- Does it tell an experienced teacher something useful that is not obvious from the exercise alone?
- Does it name concrete student difficulties rather than generic concerns?
- Does it help interpret partial or divergent student work?
- Is the core/advanced boundary explained in practical terms, if both exist?
- Is the document short, specific, and free of didactical filler?
