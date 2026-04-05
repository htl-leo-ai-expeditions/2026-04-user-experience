---
name: feedback-report
description: |
  Template and rules for writing feedback report prompts (report-prompt.md). Use this skill when creating or revising a report-prompt.md file for any exercise. Provides the universal structure, tone, and constraints. The author supplies domain-specific sections.
---

# Feedback Report Prompt Guide

`report-prompt.md` is a prompt that agents use to generate qualitative feedback reports on student submissions. This skill defines the universal framework. Each exercise adds domain-specific sections.

## Universal Framing

The agent is a **feedback writer**, not a grader. Its job is to describe what the student did, how well their document meets the exercise's quality bar, and where they can improve. No grades, points, scores, rankings, ratings, percentages, or any other quantitative assessment. A human teacher reads the report and determines the grade independently.

## Quality Bar

Every `report-prompt.md` must reference the exercise's validation criterion (from `goal.md`) as the lens for all feedback. Example: *"Could a competent frontend developer build a working interactive prototype from this document alone, without needing to ask any clarifying questions?"*

## Report Structure

Use a fixed section structure. This ensures consistency across reports from different agents. Every report must include these **universal sections**:

1. **Document Overview** (2-3 sentences): What did the student produce? Scope, length, sections present, advanced topics attempted.
2. **Strengths** (2-4 bullet points): Cite specific passages. Focus on specificity, completeness, and design reasoning. Do not invent strengths.
3. **Gaps and Weaknesses** (2-5 bullet points): For each gap, describe what's missing/vague, why it matters (connect to quality bar), and what a stronger version looks like (point toward, don't supply).
4. **Consistency Check** (1-3 sentences): Internal contradictions, terminology shifts, missing states, unconnected flow steps. If consistent, say so briefly.
5. **Actionable Next Steps** (2-3 bullet points): If the student had one more hour, what should they work on? Specific, prioritized, concrete.

Add 1-3 **domain-specific sections** between Consistency Check and Actionable Next Steps. These check engagement with the exercise's unique artifact or constraint. Examples:

- "Seating Plan Engagement" (UX exercise): Does the design reflect the specific venue layout?
- "Business Rule Coverage" (API exercise): Does the LLD enforce each business rule?
- "Meta-Level Check" (when exercise has a meta-level constraint): Did the student make genuine design choices or paraphrase the exercise?

Each domain-specific section should have a target length (1-3 sentences or a table) and clear evaluation criteria.

## Tone and Language Rules (universal)

- **Respectful and constructive.** Acknowledge what was done well before addressing gaps.
- **Specific, not vague.** Always cite or reference concrete parts of the student's document. Never say "good job" or "needs work" without explaining what and why.
- **Descriptive, not evaluative.** Describe what the document does and doesn't do. Avoid judgment words like "excellent," "poor," "inadequate," or "impressive." Prefer factual language.
- **Direct.** Say what you mean in the fewest words necessary. Do not pad with encouragement filler.
- **No superlatives or softeners.** Do not use "overall," "in general," "it seems like," "perhaps," or similar hedging.

## Prohibitions (universal)

- **No grades.** No scores, points, letter grades, pass/fail judgments, percentages, rubric levels, or ranked tiers.
- **No comparisons.** Each report stands alone. No references to other students or class averages.
- **No rewriting.** Point toward what's missing; do not supply it.
- **No speculation.** Describe what the document contains, not what the student "tried to do" or "probably meant."
- **No extra sections.** Follow the defined section structure exactly.

## Length

400-1200 words depending on exercise complexity. Shorter is fine for brief or clearly weak submissions. Do not pad to reach a word count.

## Writing a New report-prompt.md

When creating `report-prompt.md` for a specific exercise:

1. Copy the universal framing, tone rules, and prohibitions from this skill.
2. Insert the exercise's specific quality bar from `goal.md`.
3. Add domain-specific sections (1-3) that check engagement with the exercise's unique constraints, artifacts, or business rules.
4. Set appropriate target lengths for each section.
5. Add any exercise-specific "must not" rules if needed.
6. Instruct the agent to read `exercise.md`, `goal.md`, and `didactical-concept.md` for context.
