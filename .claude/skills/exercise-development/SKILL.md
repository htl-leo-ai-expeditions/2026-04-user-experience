---
name: exercise-development
description: |
  Iterative workflow for developing and refining CS/IT student exercises, together with a tightly aligned teacher-facing didactical concept and progress tracking. Use this skill whenever the user asks to create, continue, revise, improve, or finalize a student exercise, worksheet, handout, assignment, didactical concept, or related visualization for vocational CS/IT students.
---

# Exercise Development

Develop the exercise project iteratively.

Work in small, controlled steps. In each run, make exactly one focused improvement. You do not retain memory across runs. `progress.md` is the shared memory between runs.

## Core Files

Use these project files:

- `exercise.md`  
  Student-facing exercise handout. This is the main deliverable. At the start of a new project, it may contain only rough bullet points from the user. Before writing or editing it, read `references/writing-guide.md`.

- `didactical-concept.md`  
  Teacher-facing guide for this specific exercise. This document is written for experienced teachers. Keep it short, concrete, and tightly tied to the current exercise. Do not fill it with generic didactical explanations. Before writing or editing it, read `references/didactical-concept.md`.

- `progress.md`  
  Append-only iteration log. This is the shared memory across runs.

If the exercise uses visualizations, also follow `references/visualizations.md`.

## Startup Rules

At the beginning of every run:

1. Read `exercise.md`.
2. Read `didactical-concept.md` if it exists.
3. Read `progress.md` if it exists.
4. Read any exercise-specific files that are directly relevant to the current task.
5. Do not assume memory beyond what is written in these files.

If `didactical-concept.md` or `progress.md` does not exist yet, create it when needed as part of the current improvement.

## Core Workflow

Execute these steps in order:

1. **Understand the current state.**  
   Read the available files and identify what already exists, what is missing, and what the current exercise is trying to achieve.

2. **Choose one focused improvement.**  
   Pick exactly one meaningful improvement for this run.

3. **Apply the improvement.**  
   Edit the relevant file or files. A single improvement may touch multiple files, but all changes must serve the same purpose.

4. **Synchronize the didactical concept.**  
   If the improvement changes learning goals, task structure, scaffolding, expected difficulty, sequencing, deliverables, assessment cues, or teacher use, update `didactical-concept.md` in the same run.

5. **Log the run.**  
   Append a new entry to `progress.md` using the required format below.

## What Counts as One Focused Improvement

A focused improvement is one coherent objective.

Valid examples:

- sharpen one requirement or constraint
- improve the structure of the student handout
- add one template or scaffold for student output
- add one worked example fragment
- create or revise one visualization and its generated artifacts
- align the didactical concept with a changed exercise structure
- remove one ambiguity that would likely confuse students
- improve one section for clarity or consistency

A single focused improvement may modify `exercise.md`, `didactical-concept.md`, generated files, and `progress.md` together.

Do not bundle unrelated improvements into the same run.

## Prioritization Rules

If several improvements are possible, prefer the first applicable one:

1. Missing essential project files or missing core structure
2. Contradictions, ambiguity, or unclear requirements
3. Problems that make the exercise hard to solve or teach
4. Missing scaffolds, templates, or examples
5. Misalignment between `exercise.md` and `didactical-concept.md`
6. Language and style polish

Prefer structural and clarity improvements over cosmetic edits.

## Rules for `didactical-concept.md`

`didactical-concept.md` is for experienced teachers. Write it as a compact operational guide for the current exercise. Keep it specific. Keep it useful. Keep it aligned with the current version of `exercise.md`.

Include only guidance that helps a teacher run this exercise better, such as:

- what the exercise is really training
- where students will likely struggle
- which parts are meant to be discussed, decided, or left open
- how to read partial solutions
- what shortcuts or misconceptions to watch for
- where variation in student answers is acceptable
- how core and advanced parts change the teaching flow

Do not include generic pedagogy, broad didactical theory, obvious classroom advice, or filler text.

## Rules for `progress.md`

`progress.md` is append-only. Never rewrite earlier entries.

Use this format for every entry:

```md
## [marker]

**Prompt:**  
...

**Focus:**  
...

**Changes made:**  
- ...

**Why:**  
- ...

**Files modified:**  
- ...
```

The marker can be a date-like label, iteration label, or another stable run identifier.

Keep entries short but informative. Write them for a future model that has no memory and must understand what happened quickly.
