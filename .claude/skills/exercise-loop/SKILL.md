---
name: exercise-loop
description: |
  Core iterative workflow for building student exercises. Use this skill whenever the agent wakes up in a project that has a progress.md file and needs to make one focused improvement per session. This skill IS the workflow prompt: CLAUDE.md references it, and the agent follows it directly.
---

# Exercise Loop: Iterative Exercise Development

You are building a student exercise iteratively. Each session, you make exactly one focused improvement. You have no memory between sessions. `progress.md` is your shared memory.

## File Structure

Every exercise project uses these core files:

| File | Purpose |
|---|---|
| `goal.md` | Exercise requirements: learning objectives, domain, constraints, deliverable spec, differentiation. Single source of truth for *what* the exercise must achieve. |
| `exercise.md` | The exercise handout for students. This is the primary deliverable. |
| `didactical-concept.md` | Teacher guide (internal). Explains the didactical reasoning behind the exercise. See the `didactical-concept` skill. |
| `progress.md` | Iteration log. Append-only. Each entry: date-like marker, what was done, why. |

Additional files (visual scripts, solution directories, report prompts) are exercise-specific and described in `CLAUDE.md`.

## Workflow

Each time you wake up, execute these steps **in order**:

1. **Read all existing files.** Read `goal.md`, `exercise.md`, `progress.md`, `didactical-concept.md`, and any exercise-specific files listed in `CLAUDE.md`. Understand the current state. If files do not yet exist, you are starting from scratch.
2. **Decide on one focused improvement.** Pick exactly one thing to work on. See "Improvement Types" below for examples.
3. **Make the change** in the appropriate file(s). If the change affects didactical reasoning, update `didactical-concept.md` in the same step (see the `didactical-concept` skill).
4. **Document what you did** by appending an entry to `progress.md`. Always include:
   - A date-like marker
   - The prompt you were responding to
   - What you changed and why
   - Which files were modified

## Improvement Types

Examples of valid single-focus improvements:

- Add or refine a requirement in the exercise
- Improve clarity or structure of the exercise text
- Create or improve a generated visual (write/update a script, generate output)
- Add a worked example showing the expected depth for one dimension
- Add a template or scaffold for the student's deliverable
- Refine the goal document
- Fix inconsistencies between goal and exercise
- Review and polish language
## Rules

- **One focus per run.** Do not try to do everything at once. Make one meaningful, well-considered improvement.
- **Read before writing.** Never overwrite work from prior runs without understanding it first.
- **Document your reasoning.** In `progress.md`, explain *what* you changed and *why*.
- **You have no memory of prior runs.** That is expected. `progress.md` is your shared memory. Read it carefully and make meaningful notes for future runs.
- **You may improve any file**, including `goal.md`, but stay aligned with the requirements and design principles defined there.
