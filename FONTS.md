# Font System (matching nav.al)

## Font Families

| Font | Source | Role |
|------|--------|------|
| **Inter** | Google Fonts | Body text, default UI |
| **Lato** | Google Fonts | Banner titles & subtitles |
| **Roboto Condensed** | Google Fonts | Section headings (`header.major`) |
| **Open Sans Condensed** | Google Fonts | Tile/card titles |
| **IBM Plex Mono** | Google Fonts | Code, metadata, post dates |

## Element → Font Mapping

| Element | Font | Weight | Size | Notes |
|---------|------|--------|------|-------|
| Body text | Inter | 500 | 18px | Line-height 1.556 |
| Headings (h1-h6) | Inter | 700 | 2.5em–0.7em | |
| Banner title (h1) | Lato | 200 | 3.5em | Letter-spacing 1px |
| Banner description (p) | Lato | 200 | 1.1em | Letter-spacing 1px |
| Section title (`header.major`) | Roboto Condensed | 400 | inherited | Uppercase, letter-spacing 1px |
| Section subtitle (`header.major > p`) | IBM Plex Mono | 400 | 0.75em | Uppercase |
| Tile headings (h3) | Open Sans Condensed | 700 | 1.75em | |
| Header/nav | Inter | 600 | 0.8em | Uppercase |
| Buttons | Inter (inherited) | 700 | 0.8em | Uppercase |
| Post meta (date/author) | IBM Plex Mono | 400 | 0.75em | Uppercase |
| Code / `<pre>` | IBM Plex Mono | — | 0.9em | |
| Links | Inter (inherited) | — | — | Color #999, hover uses highlight |
| Strong/bold | Inter | 700 | — | |
| Blockquote | Inter (inherited) | — | — | Italic, left border |
| Footer copyright | Inter (inherited) | — | 0.8em | |

## Utility CSS Classes

Use these in your markdown/HTML posts to manually apply a font:

```html
<span class="font-mono">monospace text</span>
<h2 class="font-heading">Roboto Condensed heading</h2>
<p class="font-banner">Lato light text</p>
```

| Class | Font Applied |
|-------|-------------|
| `.font-mono` | IBM Plex Mono |
| `.font-heading` | Roboto Condensed |
| `.font-banner` | Lato |

## SCSS Variables

Defined in `_sass/libs/_vars.scss`:

```scss
$font: (
  family:          ('Inter', Helvetica, sans-serif),
  family-banner:   ('Lato', sans-serif),
  family-heading:  ('Roboto Condensed', sans-serif),
  family-title:    ('Open Sans Condensed', Helvetica, sans-serif),
  family-fixed:    ('IBM Plex Mono', monospace),
  weight:          500,
  weight-bold:     700,
  weight-light:    200,
  letter-spacing:  0,
  letter-spacing-alt: 0.1em
);
```

## Original Reference

Typography sourced from [nav.al](https://nav.al). Benton Sans (their body font) is a premium Adobe Typekit font — **Inter** is used as the closest free alternative.
