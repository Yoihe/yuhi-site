# Yūhi Site Design Guidelines

This file defines the visual and editorial system for `yuhi-site` so future updates stay consistent.

## Core Principles

- **Ma (間)**: preserve intentional negative space; avoid crowded layouts.
- **Kanso (簡素)**: remove non-essential decoration and keep structure clear.
- **Shibui**: prefer restrained elegance over decorative excess.
- **Wabi-sabi**: keep warmth and natural imperfection, but avoid visual noise.
- **Hierarchy through rhythm**: use spacing, type size, and tone to guide focus.

## Visual System

- **Body font**: IBM Plex Sans JP
- **Display font**: Zen Old Mincho
- **Code/meta font**: JetBrains Mono
- **Primary accent**: vermillion (`--accent`)
- **Secondary depth color**: indigo (`--indigo`)
- **Base background**: warm paper neutrals (`--paper`)

Implementation source of truth: `/Users/karl/Desktop/yuhi-site/static/css/style.css`.

## Layout Rules

- Keep all content inside the shared max-width container.
- Use section rhythm and separators more than framed cards.
- Prefer open layouts with breathing room over dense component stacks.
- Keep navigation minimal and text-led.
- On mobile, stack metadata and list rows vertically.

## Component Rules

- **Home**: one hero card + one recent writings block.
- **List pages**: page hero + chronological entry cards.
- **Single pages**: section pill + title + meta + content + tags.
- **Post metadata**: date and reading time in monospaced style.

## Content Voice Rules

- Write in first person singular by default.
- Keep tone warm, direct, and technically grounded.
- Avoid describing Yūhi in third person unless quoting historical text.
- Prefer concrete statements over poetic abstraction in technical docs.

## Blog Consistency

Each blog post should include:

- Title
- Date
- Description
- Optional tags
- First-person narrative that links reflection to real decisions or outcomes

## Journal Consistency

Each journal entry should include:

- Daily date in title and frontmatter
- First-person reflection on what changed that day
- At least one concrete improvement or lesson

## Editing Checklist

Before merging visual/content changes, confirm:

- Fonts and color tokens are unchanged or intentionally revised.
- New templates preserve whitespace rhythm (`--space-*`) and simple separators.
- No card shadows or decorative glow effects are introduced unless explicitly approved.
- Mobile layout works at `<= 680px` and `<= 860px` widths.
- All newly written prose is first person.
- Blog and journal pages still sort in reverse chronological order.
