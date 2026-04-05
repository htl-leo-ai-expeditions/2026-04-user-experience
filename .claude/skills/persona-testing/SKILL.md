---
name: persona-testing
description: |
  Simulate student personas to stress-test an exercise before deployment. Use this skill when the user asks to test an exercise with student personas, simulate student submissions, or when the exercise is mostly complete and needs validation.
---

# Student Persona Testing

## Purpose

Test an exercise by simulating three student personas completing it. This reveals ambiguities, gaps, and calibration issues invisible from the author's perspective. Each persona exposes different failure modes.

## Personas

### Struggling

- Reads instructions once, misses nuance
- Produces minimal output, copies exercise language
- Stops at first confusion, guesses rather than reasons
- **Reveals:** insufficient scaffolding, ambiguous instructions, missing examples

### Average

- Follows instructions carefully, produces decent happy paths
- Thin on edge cases and error handling
- Gets confused by implicit expectations
- **Reveals:** unclear depth calibration, which sections lack worked examples, implicit assumptions

### Strong

- Thorough, precise, tackles advanced requirements
- May find genuine ambiguities in business rules
- Tests the exercise's ceiling
- **Reveals:** whether advanced requirements are well-specified, whether the exercise ceiling is high enough, real ambiguities in the exercise

## Process

1. **Spawn 3 subagents**, one per persona. Each reads the exercise specification and produces a complete submission as that persona would.
2. **Save solutions** to `solution-basic/`, `solution-average/`, `solution-good/`.
3. **Generate feedback reports** for each submission. Focus on the issues revealed by that persona's failure modes.
4. **Cross-persona analysis:** Identify issues raised across personas.
5. **Make targeted improvements** to the exercise and accompanying documents (e.g. didactical concept) to address the issues.

## Cross-Persona Analysis

Focus improvements on issues raised by 2 or more personas. Single-persona issues may reflect persona-specific behavior rather than exercise flaws.

## What to Look For

- **Confusion about expectations:** Do all personas understand what they need to produce?
- **Vague sections:** Do personas produce wildly different interpretations of the same section?
- **Missing worked examples:** Which dimensions produce the weakest output across personas?
- **Ambiguous business rules:** Do personas have to guess at rules the exercise should define?
- **Scope/length miscalibration:** Is the struggling persona overwhelmed? Is the strong persona underwhelmed?
- **Copy-paste risk:** Does the struggling persona submit something that looks like the exercise text rephrased?

## Meta-Level Check

After making improvements based on persona testing, re-read the exercise and verify: "Could a student submit this exercise text as their design document?" If yes, the exercise has become too concrete. Roll back or abstract the offending additions.
