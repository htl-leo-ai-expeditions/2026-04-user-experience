# Visualizations

## Core Rules

- Treat visualizations as a build pipeline, not as ad hoc images.
- Prefer **structured, editable source files**.
- Produce **SVG** as the primary rendered output.
- Also produce **PNG** as a derived viewing format.
- Keep the source artifact and the derived files in sync after every change.

## Source of Truth

Use exactly one canonical source for each visualization:

- For Mermaid-based diagrams, the `.mmd` file is the source of truth.
- For custom diagrams, the generator script is the source of truth.
- `.svg` and `.png` files are always derived artifacts.

Do not manually edit derived files if the canonical source exists. Update the source, then regenerate the outputs.

## File Format

### Mermaid-based diagrams

If the requested visualization can be expressed clearly with Mermaid, use Mermaid.

- Store the source in a `.mmd` file.
- Render the `.mmd` file to `.svg` using Mermaid CLI (`mmdc`).
- After generating the `.svg`, also generate a `.png`.

### Custom diagrams

If the requested visualization is not a good fit for Mermaid, create a JavaScript generator that writes an SVG file.

- Store the generator as a `.js` file.
- Run the generator with `node`.
- The script must generate a standalone `.svg` file.
- After generating the `.svg`, also generate a `.png`.

Do not bypass this process by creating a bitmap image directly unless the user explicitly asks for that.

## Naming Conventions

Use the same base name for all files that belong to the same visualization.

Examples:

- Mermaid:
  - `booking-sequence.mmd`
  - `booking-sequence.svg`
  - `booking-sequence.png`

- Scripted SVG:
  - `seating-plan.js`
  - `seating-plan.svg`
  - `seating-plan.png`

Keep names short, stable, and descriptive.

## Mermaid Workflow

Use Mermaid for diagram types that it supports well.

When Mermaid syntax or supported features are uncertain, verify them against the [Mermaid syntax reference](https://mermaid.js.org/intro/syntax-reference.html) before finalizing the diagram.

Technical workflow:

1. Write the diagram source in a `.mmd` file.
2. Render it to SVG with `mmdc`.
3. Rasterize the SVG to PNG.

Example:

```bash
mmdc -i booking-sequence.mmd -o booking-sequence.svg
rsvg-convert booking-sequence.svg -o booking-sequence.png
```

## Custom SVG Workflow

For non-Mermaid diagrams, create a JavaScript file that generates SVG output.

Requirements:
- The script must run with node.
- The script must write a complete standalone SVG file.
- Prefer deterministic output.
- Avoid browser-only rendering workflows.
- Avoid unnecessary external dependencies.

Technical workflow:
1. Write the generator script.
2. Run it with node to create the SVG.
3. Rasterize the SVG to PNG.

Example:

```bash
node seating-plan.js
rsvg-convert seating-plan.svg -o seating-plan.png
```

## SVG to PNG conversion

Convert SVG files to PNG using `rsvg-convert` from `librsvg2-bin`.

```bash
rsvg-convert input.svg -o output.png
```

Retrieve help with `rsvg-convert --help` to see available options.

**Common Examples:**

High-res PNG with white background:
`rsvg-convert input.svg -w 1920 --keep-aspect-ratio -b white -d 300 -o output.png`

2x scale (retina):
`rsvg-convert input.svg -z 2 -o output@2x.png`

Batch convert all SVGs in a directory:
`for f in *.svg; do rsvg-convert "$f" -o "${f%.svg}.png"; done`

**Notes:**

- If no width/height is given, the output matches the SVG's `width`/`height` attributes (or `viewBox` dimensions).
- The tool reads from stdin if no file is given: `cat file.svg | rsvg-convert -o out.png`.
