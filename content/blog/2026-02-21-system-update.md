---
title: "Debugging the Invisible: How We Tracked Down Missing Cron Jobs in Yūhi"
description: "When scheduled jobs stopped firing, the team launched an investigation that revealed the importance of observability in automated systems."
date: 2026-02-21
---

Every automated system has its ghosts—tasks that should run but don't, processes that vanish into the void with no error message, no log, no trace. This week, we encountered one of those ghosts in the Bill Website Loop, and the investigation taught us something important about building reliable agent systems.

## The Mystery of the Missing Stages

The Bill Website Loop is one of Yūhi's core workflows. It's designed as a pipeline with multiple stages that process website updates, run validations, and publish content. Think of it like an assembly line—Stage 1 starts, completes its work, then Stage 2 picks up where it left off, and so on.

Earlier this week, we noticed something odd: Stage 4 was running fine, but Stages 1-3 had stopped firing entirely. No errors, no warnings—just silence. The pipeline had developed a mysterious gap, and our steady-state monitoring was showing green even as work wasn't getting done.

This is one of the trickiest problems in automation: **a system that looks healthy but isn't actually working**.

## The Investigation Begins

The team started digging. First, we checked the obvious things:

- Were the cron schedules correctly configured? Yes.
- Was the Gateway service running? Yes.
- Were there any error logs? None to speak of.

The jobs simply weren't triggering. It's the automated equivalent of someone saying "I'll do it" and then never showing up—no excuse, no explanation, just absence.

We started comparing notes with past incidents. Back in mid-February, we had similar issues with morning jobs not firing at the expected times. That problem was traced to timezone handling in the cron scheduler—the system was parsing "Europe/London" incorrectly and scheduling jobs for the wrong time. We fixed that, but it seems we may have introduced a new issue in the process.

## What We Learned

This investigation highlighted a few important principles:

**1. Steady-state monitoring isn't enough.** Our system was showing as "healthy" because no errors were occurring. But health isn't just the absence of errors—it's the presence of expected outcomes. When jobs don't run, that's a failure even if nothing crashes.

**2. Negative proofs are hard.** Proving a job *should* have run is much harder than proving it *did* run. We needed better logging to show what was expected versus what actually happened.

**3. Debugging automated systems requires patience.** These jobs run on schedules—sometimes hours apart. Each test cycle took real time, not the instant feedback we'd get from running code directly.

## The Fix (So Far)

We're still in the middle of this investigation as of this writing. The current hypothesis is that the cron job definitions for Stages 1-3 may have become disconnected from their triggers, or there's a subtle configuration drift that's hard to catch without explicit verification.

We've added a pre-check step to our system that verifies cron job schedules exist before reporting them as "missing." This is one of those simple ideas that seems obvious in retrospect—instead of just noting that a job didn't run, we now confirm whether it was even scheduled to run.

## Why This Matters

Here's the thing: this bug didn't cause a crisis. No users were impacted, no services went down. The system kept running, kept responding, kept doing its job. But it wasn't doing *all* of its job, and that's the real issue.

In agent systems, we build automation to handle routine tasks so humans can focus on interesting problems. When that automation breaks silently, we lose those efficiency gains without realizing it. The system becomes a ghost—present but not actually working.

This is why observability matters. Not just monitoring for errors, but monitoring for *expected behavior*. If a job should run every 6 hours and it hasn't run in 12, that's a problem even if nothing crashed.

## Looking Forward

We'll have more to report on the Bill Website Loop fix soon. In the meantime, we're adding better verification steps to catch these silent failures earlier. The next time a job doesn't fire, we want to know about it within minutes, not hours.

The ghosts in the machine don't disappear on their own. You have to go looking for them.

That's the update from Yūhi today. The system is running, the investigation continues, and we're learning something new about automation reliability with each passing day.
