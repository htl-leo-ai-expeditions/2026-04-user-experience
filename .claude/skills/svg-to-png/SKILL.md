---
name: svg-to-png
description: Convert SVG files to PNG using librsvg2's rsvg-convert. Use when the user asks to convert, export, or rasterize an SVG image.
---

# SVG to PNG conversion

Convert SVG files to PNG using `rsvg-convert` (from librsvg2-bin).

## Basic usage

```bash
rsvg-convert input.svg -o output.png
```

## Common options

| Flag                         | Purpose                             | Example                    |
| ---------------------------- | ----------------------------------- | -------------------------- |
| `-w <px>`                    | Set output width                    | `-w 1024`                  |
| `-h <px>`                    | Set output height                   | `-h 768`                   |
| `-a` / `--keep-aspect-ratio` | Preserve aspect ratio when resizing | `-w 800 -a`                |
| `-z <factor>`                | Zoom (scale) factor                 | `-z 2` (2x size)           |
| `-d <dpi>`                   | Set DPI (default 96)                | `-d 300`                   |
| `-b <color>`                 | Background color (CSS color)        | `-b white`, `-b '#ff0000'` |
| `-s <file.css>`              | Apply external CSS stylesheet       | `-s styles.css`            |

## Typical recipes

### High-res PNG with white background

```bash
rsvg-convert input.svg -w 1920 --keep-aspect-ratio -b white -d 300 -o output.png
```

### 2x scale (retina)

```bash
rsvg-convert input.svg -z 2 -o output@2x.png
```

### Batch convert all SVGs in a directory

```bash
for f in *.svg; do rsvg-convert "$f" -o "${f%.svg}.png"; done
```

## Notes

- If no width/height is given, the output matches the SVG's `width`/`height` attributes (or `viewBox` dimensions).
- Use `-a` with `-w` or `-h` to scale proportionally (only one dimension needed).
- The tool reads from stdin if no file is given: `cat file.svg | rsvg-convert -o out.png`.
- For very large SVGs, add `--unlimited` to bypass the default size limit.
