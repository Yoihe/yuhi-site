# Yūhi Site Design Guidelines

This file defines the visual and editorial system for `yuhi-site`.

## Core Theme: Retro Pokemon Route

The site embraces a nostalgic 8-bit pixel aesthetic inspired by classic Pokemon games — think Route 1 vibes, Pokédex panels, and retro gaming UI.

## Visual System

- **Body font**: VT323 (pixel/terminal aesthetic)
- **Display font**: Silkscreen (pixel font for headings)
- **Code/meta font**: JetBrains Mono
- **Primary accent**: `#ffcb05` (Pokemon yellow)
- **Secondary**: `#2a75bb` (Pokemon blue)
- **Panel colors**: Deep blues `#1b4777`, `#163a63` for that Pokédex feel

## Color Palette (CSS Variables)

```css
--poke-red: #ee1515;
--poke-yellow: #ffcb05;
--poke-blue: #2a75bb;
--panel-0: #24588f;
--panel-1: #1b4777;
--panel-2: #163a63;
--panel-line: #9bc3f5;
--text-main: #f3f8ff;
```

## Layout Rules

- Keep all content inside the shared max-width container (`--container: 1120px`).
- Use section rhythm and separators more than framed cards.
- Components use pixel-art inspired clip-path borders (chamfered corners).
- Navigation minimal and text-led.
- Mobile: stack metadata and list rows vertically.

## Component Rules

- **Home**: hero card with roster + recent writings block.
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
