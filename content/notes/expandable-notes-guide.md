---
title: Expandable Notes Guide
date: 2026-02-08
description: How to use the expandable notes system.
---

## Overview

The Notes section uses expandable accordion-style content powered by native HTML `<details>` and `<summary>` elements. This provides inline content expansion without requiring JavaScript.

## Adding New Notes

Create a new markdown file in `content/notes/`:

```markdown
---
title: Your Note Title
date: 2026-02-08
description: Brief description shown in list view.
---

Your note content here. Supports full Markdown formatting.
```

## Using the Expand Shortcode

You can also use expandable content anywhere in your site using the `expand` shortcode:

```markdown
{{< expand title="Click to expand" >}}
Your expandable content here.
{{< /expand >}}
```

## Features

- **Native HTML**: Uses `<details>` and `<summary>` elements for maximum compatibility
- **No JavaScript required**: Works without client-side scripting
- **Accessible**: Proper keyboard navigation support
- **Markdown support**: Full Markdown formatting in note content
- **Responsive**: Works on all screen sizes
