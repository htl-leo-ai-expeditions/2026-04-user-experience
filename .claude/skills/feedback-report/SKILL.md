---
name: feedback-report
description: |
  Guide for authoring a feedback-report prompt — a standalone prompt that an agent uses to generate qualitative feedback on a single student submission. Use this skill when creating or revising such a prompt for any exercise.
---

# Feedback Report Prompt Guide

## What You Are Writing

You are writing a **prompt** — not a report. This prompt will be given to an agent that reads one student's submission and produces a qualitative feedback report. Each student is evaluated in its own agent session with no shared context between students. The prompt must therefore be fully self-contained: it must carry all exercise context, evaluation criteria, structure, and tone rules so that every agent session produces consistent, comparable feedback.

## Universal Framing

Instruct the agent that it is a **feedback writer**, not a grader. Its job is to describe what the student did, how well their document meets the exercise's quality bar, and where they can improve. No grades, points, scores, rankings, ratings, percentages, or any other quantitative assessment. A human teacher reads the report and determines the grade independently.

## Quality Bar

The prompt must state the exercise's validation criterion as the lens for all feedback. Example: *"Could a competent frontend developer build a working interactive prototype from this document alone, without needing to ask any clarifying questions?"*

## Report Structure

Define a fixed section structure in the prompt. This ensures consistency across independent agent sessions. Every report must include these **universal sections**:

1. **Document Overview** (2-3 sentences): What did the student produce? Scope, length, sections present, advanced topics attempted.
2. **Strengths** (up to 5 bullet points): Cite specific passages. Focus on specificity, completeness, and design reasoning. Do not invent strengths.
3. **Gaps and Weaknesses** (up to 5 bullet points): For each gap, describe what's missing/vague, why it matters (connect to quality bar), and what a stronger version looks like (point toward, don't supply).
4. **Consistency Check** (a few sentences): Internal contradictions, terminology shifts, missing states, unconnected flow steps. If consistent, say so briefly.
5. **Actionable Next Steps** (up to 3 bullet points): If the student had one more hour, what should they work on? Specific, prioritized, concrete.
6. **Summary** (a few sentences)

Between Consistency Check and Actionable Next Steps, add up to 3 **domain-specific sections** that check engagement with the exercise's unique artifact or constraint. Each domain-specific section needs a target length and clear evaluation criteria.

## Tone and Language Rules

Embed these in the prompt so every agent session applies them identically:

- **Respectful and constructive.** Acknowledge what was done well before addressing gaps.
- **Specific, not vague.** Always cite concrete parts of the student's document. Never "good job" or "needs work" without explaining what and why.
- **Descriptive, not evaluative.** Describe what the document does and doesn't do. Avoid judgment words like "excellent," "poor," "inadequate." Prefer factual language.
- **Direct.** Fewest words necessary. No encouragement filler.
- **No superlatives or softeners.** No "overall," "in general," "it seems like," "perhaps."

Do not use em dashes or en dashes to join clauses or add asides. Rewrite as:

- Separate sentences (preferred)
- Parenthetical aside
- Comma
- Colon for clarification

## Prohibitions

- **No grades.** No scores, points, letter grades, pass/fail, percentages, rubric levels, or ranked tiers.
- **No comparisons.** Each report stands alone. No references to other students.
- **No rewriting.** Point toward what's missing; do not supply it.
- **No extra sections.** Follow the defined structure exactly.
