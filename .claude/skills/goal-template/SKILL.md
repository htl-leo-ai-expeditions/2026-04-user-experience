---
name: goal-template
description: |
  Template and guide for writing goal.md files for student exercises. Use this skill when creating a new exercise project, when editing goal.md, or when the user asks to set up a new exercise from scratch.
---

# Goal Document Template

`goal.md` is the single source of truth for what the exercise must achieve. `CLAUDE.md` governs how you work; `goal.md` governs what you build.

## Required Sections

### Mission

What students practice. What the deliverable is (e.g., a UX design document, a low-level design document, an API specification). State clearly what the exercise is NOT about (no implementation, no specific frameworks, etc.).

### Student Background

Year of study, age range, programming languages known, relevant prior knowledge (databases, networking, web, etc.), and what is new to them in this exercise. This calibrates the exercise's depth and vocabulary.

### Learning Objectives

#### Primary (2-3)

Each with a paragraph explaining the skill and why it matters. These are the skills students should demonstrably improve at by completing the exercise.

#### Secondary (3-5)

Bullet points of supporting skills that students practice along the way but that are not the primary focus.

### What the Exercise is NOT About

Explicit scope exclusions. List topics students might expect to cover but should not. This prevents scope creep during exercise authoring and sets expectations for students.

### Domain

Which domain the exercise uses and why. Include:

- **Why this domain:** What makes it suitable (familiarity, complexity level, trade-offs, visual component, etc.)
- **Domain constraints:** Rules for the exercise author (not the student) that shape the exercise's scope. E.g., "keep venue small," "group booking is required," "no authentication design."

### Deliverable

What the student produces. Include:

- **Core dimensions** (required for all students): The essential sections or aspects every submission must cover.
- **Advanced dimensions** (stretch goals): Additional depth for stronger students. Should deepen existing work, not add breadth.
- **Validation criterion:** A single litmus test for quality. Use the pattern: *"Could a competent [developer/designer/LLM] [build/implement/execute] [the thing] from this document alone, without needing to ask any clarifying questions?"*

### Exercise Format

- Format (self-contained handout, project, etc.)
- Language
- Estimated effort (hours)
- Individual or group work
- How core vs. advanced split is marked

## Optional Sections

Add these when relevant to the exercise:

### Meta-Level Constraint

Include when the exercise text could be confused with the deliverable (e.g., a UX design exercise where the exercise handout itself describes UX). Define the sweet spot:

- Specify categories of information students must provide, not the specific information itself
- Pose design questions students must answer, not design decisions they must adopt
- Require artifacts without dictating their content
- Use worked examples to show expected depth, not blueprints to copy

### Visual Artifact

Include when the exercise provides a visual that students must study and derive their work from. Describe what the visual shows and how students should engage with it.

## Writing Guidance

- Be concrete about scope boundaries. "Small" is vague; "one screen, one dining room, one section" is clear.
- Write domain constraints for the exercise author, not the student. Students see the exercise handout, not `goal.md`.
- The validation criterion should be a question someone can honestly answer yes or no to. Avoid fuzzy criteria.
- Keep primary learning objectives to 2-3. More than that dilutes focus.
