---
name: didactical-concept
description: |
  How to write and maintain the teacher-facing didactical concept document (didactical-concept.md). Use this skill whenever creating, updating, or reviewing the didactical concept for any exercise project.
---

# Didactical Concept Guide

## What This File Is

`didactical-concept.md` is a **teacher-facing guide**. It is NOT handed to students. It helps teachers understand and deliver the exercise. Teachers read it before class, not during a lecture.

## When to Update

Whenever you change `exercise.md` or `goal.md` in a way that affects the didactical reasoning, **update `didactical-concept.md` as part of the same change**. Do not leave it for a later iteration.

## Keep It in Sync

If you add, remove, or change a requirement or section in the exercise, update the corresponding entry in the didactical concept to explain what that element teaches and why it is there.

## Required Dimensions

Cover these at minimum:

- **Why the domain was chosen.** What makes it suitable for the learning objectives? Why is it familiar, appropriately complex, and engaging for students?
- **What each major requirement is designed to teach.** For every significant section or requirement in the exercise, explain the skill or concept it develops.
- **Where students commonly struggle and how to help them.** Concrete struggle points with practical remediation suggestions for teachers.
- **How the core vs. advanced split serves differentiation.** Why the split exists, what each tier targets, and how teachers should manage students at different levels.
- **How the exercise connects to the broader learning objective.** The "design document as AI prompt" framing, the "specification as professional skill" angle, or whatever the exercise's meta-goal is.

## Document Hidden Complexity

For each non-obvious aspect of the exercise (gotchas, common student mistakes, subtle design trade-offs), explain what to watch for and how a teacher can guide students through it. These are the things a teacher wouldn't spot from reading `exercise.md` alone.

## Style

- **Concise and actionable.** Each entry should help a teacher do something, not just understand something.
- **Do not bloat.** If it takes more than a few sentences to explain a point, the point is probably too broad. Split it.
- **Use the same terminology** as `exercise.md` and `goal.md` so teachers can map entries back to specific exercise sections.
