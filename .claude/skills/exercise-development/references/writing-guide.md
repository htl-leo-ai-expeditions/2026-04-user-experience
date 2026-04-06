# Exercise Writing Guide

Use this guide whenever you write or revise `exercise.md`.

The exercise is student-facing. Assume they already have programming experience, but are meeting the current topic in a more systematic way for the first time.

The job of `exercise.md` is to make the task clear, solvable, and worth doing.

## Core Goal

Write an exercise that does all of the following:

- makes the purpose of the task clear
- states deliverables, constraints, and expectations precisely
- gives students enough structure to work independently
- forces them to think and decide instead of copy
- stays aligned with the intended scope and difficulty

Prefer clarity, structure, and solvability over style.

## Priority Order

When writing or revising an exercise, optimize in this order:

1. clarity of task and deliverables
2. internal consistency
3. solvability with the assumed prior knowledge
4. useful structure and scaffolding
5. tone and language polish

If style and clarity conflict, clarity wins.

## Voice and Tone

Write in a direct, natural, student-facing voice.

- Use second person: `you`, `your`, `you'll`
- Sound like a competent instructor or senior colleague, not a textbook
- Use contractions naturally
- Keep the tone calm, clear, and concrete
- Be direct about where the real work is
- Use energy sparingly. Do not force signature phrases or artificial hype

Good:
- `Your job is to design the API contract and document the decisions you make.`
- `This is where most of the thinking happens.`
- `You do not need to implement the backend.`

Bad:
- `One should consider the following aspects.`
- `It is recommended that the student reflects upon...`
- `Now it gets real.`

## Default Structure

Build the exercise from the outside in.

Use this progression unless there is a strong reason not to:

1. **Context and purpose**  
   Explain what the task is about and why it matters in this exercise.

2. **Deliverables**  
   State early what students must hand in or produce.

3. **Global rules and constraints**  
   Put conventions, assumptions, restrictions, and shared rules before section-specific details.

4. **Task details**  
   Break the work into clear sections or subtasks.

5. **Support material**  
   Add templates, worked example fragments, self-checks, and submission notes where useful.

Do not start with a wall of detailed requirements before students know the overall shape of the task.

## Required Writing Decisions

### State deliverables early

Students should not have to reconstruct the expected result from scattered requirements.

Good:
- `At the end, you will hand in:`
- `Your result must contain the following parts:`

Weak:
- hiding the deliverable inside later subsections
- describing tasks without stating the expected artifact

### Make global rules explicit

If a rule applies everywhere, place it once in a shared section.

Typical examples:
- naming rules
- required sections
- formatting rules
- allowed assumptions
- technology restrictions

Do not scatter global rules across multiple sections unless there is a strong reason.

### Break the task into meaningful sections

Use headings that reflect what students must actually do.

Prefer:
- `Design the data model`
- `Define the API contract`
- `Document error cases`

Avoid generic labels like:
- `Part 1`
- `Task A`

unless the sequence itself is the important information.

## Scaffolding Rules

Scaffold the work without solving it.

Use scaffolding to reduce ambiguity and blank-page paralysis. Do not use it to pre-decide the interesting parts of the task.

Good scaffolding:
- a table template
- a required section outline
- a checklist of aspects that must be covered
- a worked example fragment for format and depth
- prompts that force explicit decisions

Bad scaffolding:
- ready-made solutions in disguise
- examples that can be copied with superficial renaming
- design decisions that remove the core thinking work

When a task includes meaningful design choices, make students decide and document those choices.

Useful formulations:
- `What trade-offs does your choice create?`
- `What does your decision imply for error handling, extension, or maintenance?`
- `Document the assumptions behind your design.`

## Templates Over Loose Prose

Whenever students are expected to produce structured output, prefer a copy-ready template over a vague paragraph.

Useful template forms:
- tables
- section skeletons
- fill-in-the-blank structures
- bullet-based result templates

A good template does three things:

- reduces startup friction
- shows the expected level of granularity
- makes the output easier to review

Use templates when structure matters. Do not add them mechanically when a plain instruction is enough.

## Worked Example Fragments

Use a worked example fragment when students need help calibrating depth, format, or precision.

A worked example fragment should:

- be small enough to read quickly
- be concrete enough to set a quality bar
- demonstrate format, detail level, and consistency
- stop short of solving the main task

Do not create a full worked solution that students can mirror with trivial substitutions. Do not use core aspects of the example as a worked solution. Use a side topic or a small part of the task as the example.

After the example, state what it is for.

Useful wording:
- `This example shows the level of detail expected for one item. Your concrete solution can differ, but it must be equally precise.`
- `Use this as a format and quality reference, not as a blueprint to copy.`

## Core and Advanced Parts

Separate the essential path from the stretch path.

Use this rule:

- A student who completes only the core part should still produce a coherent, valid result.
- Advanced work should deepen the same artifact, not send students into an unrelated side quest.

Use clear labels:
- `Core`
- `Advanced`

Add effort hints only when they help students plan realistically.

Do not let advanced requirements leak into the core path.

## Make Requirements Concrete

Vague requirements produce vague student work.

Whenever you notice a vague phrase, rewrite it into observable expectations.

Weak:
- `Handle errors.`
- `Think about edge cases.`
- `Return useful responses.`
- `Document your design.`

Stronger:
- `For each endpoint, specify success and failure responses.`
- `State what happens if the member is inactive, the class is already full, or the booking already exists.`
- `Document the assumptions and trade-offs behind your design decisions.`
- `For every rule, show where it is enforced.`

Push requirements toward something a teacher can actually inspect.

## Keep the Exercise Solvable

Do not accidentally expand the task beyond the learning goal.

Avoid introducing extra complexity unless it is the point of the exercise.

Common accidental scope creep:
- deployment details
- authentication
- infrastructure
- tooling setup
- performance tuning
- UI design
- database migrations
- framework-specific boilerplate

Only include those if they are part of the intended learning objective.

## Avoid Solution Leakage

Be precise about the task, but do not pre-solve the reasoning work.

This is the key distinction:

- good exercise text makes expectations concrete
- bad exercise text makes decisions for the students

Do:
- specify deliverables
- specify constraints
- specify required coverage
- show the expected level of detail
- provide structure

Do not:
- give away the architecture unless that is the point
- provide implementation-ready answers in descriptive prose
- include code unless the exercise is explicitly about code
- turn open design space into a checklist of preselected conclusions

Before finalizing a section, ask:
`Did I clarify the task, or did I quietly solve part of it?`

## Language Rules

### Write directly

Prefer active, concrete phrasing.

Better:
- `The API returns...`
- `Document your assumptions.`
- `State how the system behaves in this case.`

Worse:
- `A response is returned by the API...`
- `It should be considered whether...`

Avoid passive phrasing when it weakens clarity.

### Keep sentences under control

Prefer short to medium sentences.

If a sentence is doing too much, split it. Do not pile multiple constraints, exceptions, and side notes into one long line.

### Avoid academic filler

Do not write like a paper.

Avoid:
- `It could be argued that...`
- `One might consider...`
- `The following aspects should be taken into consideration...`

Say what matters directly.

### Avoid vague intensifiers

Words like `appropriate`, `reasonable`, `useful`, `robust`, or `clean` are often empty unless you define them in context.

Do not write:
- `Create a clean design.`
- `Return a meaningful response.`

Write:
- `Keep the response format consistent across all endpoints.`
- `Use the same naming convention in all tables and sections.`

### No em dashes or en dashes for clause linking

Do not use em dashes or en dashes to glue thoughts together.

Rewrite using:
- a new sentence
- a comma
- a colon
- parentheses when needed

## Self-Check Questions

Before the submission or closing section, include 3 to 5 yes/no self-check questions when they help students verify their own work.

Good self-check questions are concrete and testable.

Examples:
- `Could someone implement or extend your design without asking you basic clarification questions?`
- `Did you specify not only the happy path, but also what happens when things go wrong?`
- `Is every stated rule reflected in at least one concrete part of your result?`
- `Did you keep your format and naming consistent across the whole deliverable?`

Do not use reflective filler such as:
- `How do you feel about your work?`

## Tips Section

A short tips section near the end is often useful.

Keep it short. Each tip should be one or two sentences.

Pattern:
- bold imperative
- concrete payoff

Examples:
- `**Be specific.** "Returns an error" is not enough. State which error, when it happens, and what the response looks like.`
- `**Think like a reviewer.** Could someone work with your result without guessing what you meant?`
- `**Keep it consistent.** A smaller, cleaner result beats a larger result full of contradictions.`

Do not add a tips section just to fill space. Use it only when it reinforces the task.

## What Not to Do

- Do not pad the exercise with filler paragraphs.
- Do not praise the task inside the task text.
- Do not hide the actual deliverable behind vague wording.
- Do not over-engineer the exercise beyond the intended learning goal.
- Do not introduce unrelated tooling or infrastructure requirements.
- Do not include numbered footnotes.
- Do not rely on generic phrases where concrete expectations are needed.
- Do not use worked examples that students can copy almost unchanged.
- Do not add code snippets unless the exercise explicitly benefits from them.
- Do not polish rough text before the structure is sound.

## Final Check Before You Finish

Before you finalize `exercise.md`, check the following:

- Is it clear what students must produce?
- Are the constraints and expectations stated explicitly?
- Is the task solvable with the assumed background?
- Does the structure help students start and stay oriented?
- Did you scaffold the work without solving the core task?
- Are core and advanced parts clearly separated, if both exist?
- Is the wording concrete, direct, and free of filler?
