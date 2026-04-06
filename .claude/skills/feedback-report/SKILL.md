---
name: feedback-report
description: |
  Guide for creating or revising a prompt that an agent uses to generate qualitative feedback on a single student submission. Use this skill when building feedback prompts for exercises, assignments, worksheets, or similar student artifacts where each submission is reviewed in an isolated agent session together with the exercise and didactical concept.
---

# Feedback Report Prompt Guide

Write a prompt for an agent that reads one student's submission and produces one qualitative feedback report.

You are writing the **prompt**, not the feedback report itself.

## Core Goal

The generated prompt must make isolated agent runs produce feedback that is:

- evidence-based
- comparable across students
- qualitative rather than quantitative
- specific enough to support human grading later
- aligned with the exercise and its didactical intent

The prompt must not assume shared memory across students. It must define the review lens, structure, tone, and prohibitions clearly enough that different agent sessions produce comparable reports.

## Operating Model

Each student submission is reviewed in a separate agent session.

The reviewing agent receives:

- the exercise
- the didactical concept
- the student submission
- the feedback prompt you are writing here

That means the feedback prompt does **not** need to restate the full exercise. It should instead tell the reviewing agent how to use the provided materials consistently.

The prompt should make explicit:

- how to interpret the exercise and didactical concept
- what quality bar to apply
- which report structure to follow
- how to ground claims in evidence
- which prohibitions apply

A weak prompt leaves the reviewing lens implicit. A strong prompt makes it explicit.

## Universal Framing

The prompt must instruct the agent to act as a **feedback writer**, not a grader.

The agent's job is to describe:

- what the student submitted
- what the submission does well
- where it remains vague, incomplete, inconsistent, or weak
- what the student should improve next

The agent must not assign grades, points, scores, percentages, pass/fail labels, rubric levels, rankings, or other quantitative judgments.

A human teacher reads the report and determines the grade independently.

## Use of Context

The generated prompt should explicitly instruct the reviewing agent to use the provided materials in this way:

- **Exercise:** defines the student task, deliverables, constraints, and expected artifact
- **Didactical concept:** clarifies the intended learning focus, likely pitfalls, acceptable variation, and what matters most in reviewing the work
- **Student submission:** is the sole basis for judging what the student actually produced

The agent should use the exercise and didactical concept to interpret expectations, but should ground all claims about student performance in the student's submission.

Do not let the agent drift into generic pedagogy or teacher-facing didactical commentary inside the report.

## Quality Bar

Every prompt must define one primary validation lens for the exercise.

This quality bar is the main question through which the agent interprets the submission.

Good qualities of a quality bar:

- it is specific to the exercise
- it can be judged from the submission alone
- it reflects the actual purpose of the exercise
- it helps separate strong work from superficially plausible work

Example:

`Could a competent frontend developer build a working interactive prototype from this document alone, without needing extra clarification?`

Use exactly one primary quality bar unless the exercise genuinely requires two tightly connected lenses. Do not create a vague bundle of half-related criteria.

All major sections of the report should align with this quality bar.

## What the Prompt Must Contain

You can assume that the reviewing agent has access to the exercise and the didactical concept in the same session.

The feedback prompt therefore does **not** need to repeat the full exercise text.

It must still define all of the following clearly:

- how the agent should use the exercise and didactical concept
- the primary quality bar
- the required report structure
- any exercise-specific evaluation priorities
- the evidence rules
- the tone and language rules
- the prohibitions

Do not leave key review criteria implicit just because the exercise and didactical concept are available.

## Evidence Rules

The prompt must force the agent to ground every important claim in the submission itself.

Instruct the agent to:

- refer to concrete sections, passages, decisions, examples, tables, diagrams, or omissions in the student's work
- quote short phrases only when useful
- otherwise point to specific document parts in clear prose
- describe missing content as missing instead of guessing what the student may have meant
- distinguish between what is present, what is implied, and what is absent

Do not let the agent invent strengths to sound balanced.

Do not let the agent infer hidden understanding from polished wording alone.

Do not let the agent assume intent when the document is ambiguous. Describe the ambiguity instead.

## Partial and Uneven Submissions

The prompt must define how to handle incomplete, uneven, or misaligned submissions.

Instruct the agent to:

- describe what is actually present before criticizing what is missing
- distinguish incompleteness from poor quality
- prioritize the biggest blocking gaps
- avoid treating missing advanced work as a flaw if the advanced part was optional
- recognize when a partial submission still shows strong reasoning in the parts that exist

A report should still be useful when the submission is incomplete.

## Universal Report Structure

Define a fixed report structure in the prompt.

Every report must include these universal sections:

1. **Document Overview**  
   2 to 3 sentences. State what the student produced, how complete it appears, what major parts are present, and whether advanced aspects were attempted.

2. **Strengths**  
   Up to 5 bullet points. Each point must refer to something concrete in the submission. Do not invent strengths for balance.

3. **Gaps and Weaknesses**  
   Up to 5 bullet points. For each point, state what is missing, vague, inconsistent, or underdeveloped, why that matters in light of the quality bar, and what a stronger version would need to do. Point toward improvement. Do not rewrite the missing part for the student.

4. **Consistency Check**  
   A short paragraph. Check internal consistency, terminology, states, rules, transitions, and cross-references. If the document is largely consistent, say so briefly and specifically.

5. **Actionable Next Steps**  
   Up to 3 bullet points. Prioritized, concrete, and realistic. Answer the question: if the student had one more hour, what should they improve first?

6. **Summary**  
   A short closing paragraph that characterizes the current state of the submission through the quality bar.

## Domain-Specific Sections

Between **Consistency Check** and **Actionable Next Steps**, the prompt may add up to 3 domain-specific sections.

Use them only when the exercise has distinctive quality risks or artifacts that are not already covered well by the universal sections.

Good reasons to add a domain-specific section:

- the exercise depends on a specific artifact type such as API contracts, ER diagrams, UI flows, test cases, or architecture decisions
- the exercise has one unusual constraint that deserves explicit inspection
- the quality bar depends on one artifact-specific dimension that would otherwise get lost

Bad reasons:

- renaming a universal section
- adding decorative structure
- repeating points that already belong under Strengths or Gaps and Weaknesses

Prefer 1 or 2 strong domain-specific sections over 3 weak ones.

For each domain-specific section, define:

- the section name
- the target length
- exactly what it checks
- what counts as strong engagement
- what counts as a meaningful gap

## Tone and Language Rules

Embed these rules directly in the generated prompt so the reviewing agent applies them consistently.

- **Respectful and constructive.** Acknowledge real strengths before addressing gaps.
- **Specific.** Every important point must be tied to visible evidence in the submission.
- **Descriptive rather than judgmental.** Describe what the work does and does not do. Avoid empty praise or blunt verdict language.
- **Direct.** Use as few words as needed. Do not add encouragement filler.
- **Calibrated.** Use cautious language only when the evidence is genuinely partial or ambiguous.

Prefer:
- `The document defines the main endpoints clearly, but it never states what happens when the booking already exists.`
- `The terminology is mostly consistent, except for the switch between "member" and "customer" in the error cases.`

Avoid:
- `This is excellent work.`
- `The document is poor.`
- `Overall, it seems like the student perhaps understood the task in general.`

Do not use em dashes or en dashes to join clauses or add asides. Rewrite using a new sentence, comma, colon, or parentheses.

## Prohibitions

The generated prompt must explicitly prohibit the reviewing agent from doing the following:

- assigning grades, scores, points, percentages, or rubric levels
- comparing the student to other students
- speculating about intent without evidence
- inventing strengths that are not visible in the submission
- rewriting missing sections for the student
- adding sections beyond the defined universal structure and selected domain-specific slots
- drifting into generic pedagogy or teacher advice inside the report
- using report language that sounds like a hidden grading rubric

## Adaptation Rules

When writing or revising the feedback prompt, adapt it to the exercise at hand.

That means:

- make the quality bar exercise-specific
- use the didactical concept to sharpen what matters in the review
- choose domain-specific sections only when they add real value
- define evidence expectations in terms of the actual artifact students submit
- keep the universal structure stable unless there is a strong reason to change it
- keep the feedback qualitative even when the exercise itself includes checklists or levels

Do not produce a generic feedback prompt that could apply equally well to almost any exercise.

## What Not to Do

- Do not write a prompt that assumes shared context across student sessions.
- Do not leave the reviewing agent to infer the quality bar on its own.
- Do not rely on vague terms such as `good`, `weak`, `complete`, or `clear` without telling the agent how to interpret them for this exercise.
- Do not let the prompt collapse into a hidden scoring rubric.
- Do not overfit the structure so tightly that the agent cannot describe an unusual but valid submission.
- Do not forget to define how missing or partial work should be handled.
- Do not confuse useful feedback with model answers.

## Final Check Before You Finish

Before finalizing the prompt, check the following:

- Is the prompt clearly for writing a feedback report, not assigning a grade?
- Could the reviewing agent perform a solid review using the prompt together with the exercise, didactical concept, and student's submission?
- Is there one clear primary quality bar?
- Are the report sections fixed and specific enough to produce comparable outputs?
- Does the prompt force evidence-based feedback?
- Does it handle incomplete or uneven submissions sensibly?
- Are domain-specific sections justified and well defined, if any are included?
- Does the prompt prohibit rewriting, scoring, comparison, and speculation?
