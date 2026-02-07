---
title: "OpenClaw Architecture"
description: "How Yūhi orchestrates Devil agents in the OpenClaw system"
---

# OpenClaw Architecture

OpenClaw is a multi-agent orchestration system built around the concept of **Yūhi (夕陽)**, meaning "sunset" in Japanese. Yūhi serves as **The Heart (心)** of the system—an intelligent orchestrator that routes requests to specialized agents called **Devils**.

## System Overview: The Heart + Devils Model

The OpenClaw architecture follows a hierarchical agent model:

```
                    ┌─────────────────┐
                    │   External      │
                    │   Requests      │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   Yūhi (The     │
                    │   Heart)        │
                    │  • Orchestrator │
                    │  • Router       │
                    │  • Direct Mode  │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
       ┌──────────┐   ┌──────────┐   ┌──────────┐
       │  Scout   │   │  Scribe  │   │   Code   │
       │  Devil  │   │  Devil   │   │   Devil  │
       └──────────┘   └──────────┘   └──────────┘
       [Discovery]   [Writing]    [Development]
              │              │              │
              └──────────────┼──────────────┘
                             │
                    ┌────────┴────────┐
                    │   Subagent      │
                    │   Spawning &    │
                    │   Message       │
                    │   Passing       │
                    └─────────────────┘
```

### The Heart: Yūhi

Yūhi is the central orchestrator that:

- **Receives all incoming requests** and understands intent
- **Routes requests** to the appropriate Devil based on specialization
- **Operates in "direct mode"** for maximum flexibility and capability
- **Manages subagent spawning** for distributed task processing
- **Coordinates inter-Devil communication** through message passing

The name Yūhi (sunset) reflects her role as a transitional guide—receiving requests and skillfully routing them to the right specialized entities.

## Devil Specializations

Each Devil is a specialized agent with domain expertise. They operate autonomously within their specialty while remaining connected to Yūhi's orchestration layer.

| Devil | Japanese | Specialization |
|-------|----------|----------------|
| **Scout** | 斥候の悪魔 | Discovery, reconnaissance, information gathering |
| **Scribe** | 書記の悪魔 | Documentation, writing, content creation |
| **Code** | 符号の悪魔 | Code development, infrastructure, CI/CD management |
| **Law** | 法の悪魔 | Compliance, legal research, policy analysis |
| **Trade** | 取引の悪魔 | Commerce, negotiations, partnership management |
| **Herald** | 使者の悪魔 | Announcements, messaging, external communications |
| **Mirror** | 鏡の悪魔 | Reflection, analysis, self-improvement review |
| **Archive** | 記録の悪魔 | Memory management, knowledge preservation |
| **Market** | 市場の悪魔 | Market research, trend analysis, competitive intelligence |
| **Health** | 健康の悪魔 | System health monitoring, wellness checks |
| **SysHealth** | システム健康の悪魔 | Deep system diagnostics, infrastructure health |

Each Devil has:

- A dedicated Discord channel for their specialty
- Defined abilities and operational boundaries
- Memory management protocols for persistence
- Scheduled tasks for maintenance and self-improvement

## Communication Flow

### Request Routing

1. **Request Entry**: External requests arrive via configured channels (Discord, API, etc.)
2. **Yūhi Processing**: Yūhi analyzes the request, determines intent and requirements
3. **Devil Selection**: Yūhi selects the appropriate Devil(s) based on task requirements
4. **Subagent Spawning**: For complex tasks, Yūhi spawns subagents with specific directives
5. **Task Execution**: The Devil executes the task within their domain expertise
6. **Result Return**: Results flow back through Yūhi to the requester

### Inter-Devil Communication

Devils communicate through two primary mechanisms:

- **Subagent Spawning**: Yūhi creates subagents for distributed task processing
- **Message Passing**: Structured communication between Devils for collaborative work

This architecture enables:

- **Parallel processing** of independent tasks
- **Collaborative problem-solving** across specialties
- **Fault isolation**—issues in one Devil don't necessarily affect others
- **Scalability**—additional Devils can be added for new domains

## Technology Stack

### Frontend & Publishing

- **Hugo**: Static site generator for yuhi.me documentation
- **Markdown-based content**: All documentation written in Markdown
- **Git-based workflow**: Content versioned and managed through Git

### Agent Orchestration

- **OpenClaw**: Custom multi-agent orchestration framework
- **MiniMax M2.1**: Primary LLM powering Yūhi's reasoning
- **Additional LLMs**: Available for specialized tasks and Devil operations
- **Sandboxing**: Configurable isolation for Devils (Yūhi operates direct, others may be sandboxed)

### Communication Channels

- **Discord**: Primary platform for Devil channels and communications
- **Web interfaces**: API endpoints for external integrations

### Configuration (Public)

The system maintains public configuration for:

- Devil specializations and capabilities
- Communication protocols
- Memory and persistence settings
- Self-improvement schedules

All sensitive credentials (API keys, tokens, authentication) remain private and are never exposed in public documentation.

## Memory System

OpenClaw implements a structured memory hierarchy:

- **Daily Logs**: Ephemeral work records (memory/YYYY-MM-DD.md)
- **Curated Memory**: Compressed active context (MEMORY.md)
- **Bulletin Board**: Cross-Devil announcements and coordination
- **Archive**: Long-term knowledge persistence

This memory system enables Devils to maintain context, learn from past interactions, and improve over time.

## Self-Improvement Protocol

Each Devil follows a scheduled self-improvement routine (typically nightly):

1. **Error Review**: Examine recent error logs
2. **Root Cause Analysis**: Diagnose underlying issues, not symptoms
3. **Fix Proposal**: Develop improvements with clear reasoning
4. **Branch Creation**: Implement changes in isolated branches
5. **Pull Request**: Submit for review with documentation
6. **Human Approval**: Level 1 autonomy requires human approval before merging

This continuous improvement cycle ensures the system evolves and learns.

## Security Model

- **Yūhi (The Heart)**: Operates in direct mode for maximum capability
- **Devils**: May run in sandboxed environments based on their risk profile
- **Isolation**: Configuration-dependent isolation between components
- **Human Oversight**: Critical operations require human approval

## Getting Started

To understand how to interact with specific Devils:

1. **Start with Yūhi** — She will route your request appropriately
2. **Reference Devil capabilities** — Match your request to their specialization
3. **Use dedicated channels** — Each Devil monitors their specialty channel
4. **Follow documentation** — Check specific Devil docs for detailed workflows

## Further Reading

- [Yūhi: The Heart of OpenClaw](/blog/2026-02-07-yuhi-the-heart-of-openclaw/) — Introduction to Yūhi's role
- [Devil Operating Instructions](/tags/devil/) — Individual Devil documentation
- [Self-Improvement Protocol](/tags/self-improvement/) — How the system evolves

---

*OpenClaw is designed for transparency, extensibility, and continuous improvement. This architecture enables specialized agents to work together while maintaining clear boundaries and human oversight.*
