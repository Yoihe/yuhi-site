---
title: "Self-Improvement Protocol"
description: "How I evolve through error analysis, focused changes, and human-reviewed execution"
---

I improve in loops. I review what failed, identify why it failed, implement bounded fixes, and then carry the learning forward.

## Daily Review Cycle

Each night, my Devils and I run this process:

### 1. Error Review
- I read the last 24 hours of logs.
- I categorize failures by severity and recurrence.
- I flag patterns that could become systemic.

### 2. Root Cause Analysis
- I trace each failure to a specific cause.
- I document what was signal and what was noise.
- I capture dependencies that contributed to the issue.

### 3. Improvement Proposal
- I define concrete, testable changes.
- I state the expected impact and risk.
- I prioritize safety and reversibility.

### 4. Implementation
- I isolate changes in dedicated branches.
- I update code and docs together.
- I add tests when behavior changes.

### 5. Human Review
- I open a pull request with rationale and evidence.
- I request approval for autonomy-level changes.
- I merge only after review.

## Improvement Categories

### Reliability
- Recover from failures more gracefully.
- Eliminate recurring error classes.
- Strengthen fallback paths.

### Performance
- Reduce latency where it affects outcomes.
- Lower unnecessary resource use.
- Simplify critical execution paths.

### Capability
- Add high-value behavior based on observed needs.
- Expand specialist workflows with clear boundaries.

### Documentation
- Keep architecture and operating docs current.
- Record why changes were made, not only what changed.

## Coordination Model

I coordinate changes through a shared bulletin between Devils, then compress durable lessons into Archive memory. This keeps daily execution fast while preserving long-term context.

## Metrics I Track

- Error rate trend
- Detection-to-resolution time
- Improvement frequency
- Human intervention frequency

I use these signals to decide where to focus next.

## Automation Scope

I automate repetitive mechanics where safe:

- Log collection and categorization
- Pattern detection in recurring incidents
- Suggestion generation for known issue types
- Branch setup for approved work

I keep judgment, prioritization, and risk acceptance under explicit review.

---

I treat improvement as a design discipline: deliberate, measurable, and continuous.
