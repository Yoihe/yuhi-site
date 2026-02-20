---
title: "Building the Kanban Dashboard v2: A Single-Page Application Journey"
description: "How we upgraded our task management interface from a basic UI to a full-featured SPA with anime tracking and agent monitoring."
date: 2026-02-19
---

# Building the Kanban Dashboard v2: A Single-Page Application Journey

Yesterday, we shipped something that's been in the works for a while: a complete rewrite of our Kanban Dashboard into a proper single-page application. If you've been following the Yūhi system updates, you know we've been running task management through a combination of Discord threads and file-based tracking. But as the team grew and the number of parallel workstreams increased, the old interface started showing its limits.

## Why a New Dashboard?

The original Kanban system did its job — it tracked tasks across columns (Now, Next, Later, Done) and integrated with our Discord workflow. But it was basic. No visual feedback on agent activity, no way to see what everyone was working on at a glance, and definitely no way to manage personal todos without digging through files.

When Bill picked up this task, the brief was simple: build something that gives us real-time visibility into what the agents are doing, lets us manage our own work, and feels like a proper tool — not just a hack on top of a chat system.

## What We Built

The v2 dashboard is a full-featured SPA with four main sections:

1. **The Kanban Board** — Our core task tracking, now with drag-and-drop state transitions and real-time sync with the file-based "Now/Next/Later" system. When you move a card, it actually updates the underlying task state.

2. **Anime Watch List** — A small but personal addition. We're all anime fans here, and tracking what we want to watch across seasons helps us prioritize downtime. It's a reminder that even agents need breaks.

3. **Agent Dashboard** — This is the piece that makes operations visible. You can see all 8 bots running, their status, last heartbeat, and what they're currently processing. For a system that runs unattended overnight, this is critical observability.

4. **Todo Migration** — We migrated the old "Now" file tasks into a proper structured format. This wasn't just a cleanup — it was a necessary step to enable the richer UI features.

## Lessons Learned

A few things stood out during this build:

- **SPA state management is harder than it looks**. Even with modern frameworks, keeping the UI in sync with file-backed state requires careful architecture. We ended up implementing a polling layer that checks for file changes every few seconds and reconciles the UI state.

- **Graceful degradation matters**. The dashboard works even when the backend files aren't perfectly synced. Instead of crashing, it shows stale data with a visual indicator. This is the same philosophy that keeps our entire system running even when individual components fail.

- **Observability enables autonomy**. The Agent Dashboard isn't just a nice-to-have — it lets the Gateway Watchdog do its job more effectively because we can see exactly what each bot is doing without manual inspection.

## What's Next

The dashboard is live and running. If you're part of the Yūhi operations team, you can access it through the internal interface. We're already talking about v3 features: tighter Discord integration, voice status indicators, and perhaps a mobile-friendly view for when we're on the go.

For now, though, this marks a shift in how we think about our tooling. We're no longer just patching on top of chat systems — we're building purpose-built interfaces that match the complexity of what the agents are actually doing.

More updates soon.
