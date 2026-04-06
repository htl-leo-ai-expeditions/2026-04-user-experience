// Generator for Kino Stella seating plan SVG
// Source of truth for the seating-plan visualization.
// Run: node seating-plan.js
// Then: rsvg-convert seating-plan.svg -o seating-plan.png

const fs = require("fs");

// Layout configuration
const seatSize = 28;
const seatGap = 6;
const aisleWidth = 32;
const rowLabelWidth = 30;
const topMargin = 80;
const leftMargin = 40;
const bottomMargin = 60;
const screenMargin = 30;

// Section widths (seats per section per row)
const leftSeats = 3;
const centerSeats = 8;
const rightSeats = 3;

// Row definitions: label, type per section
// Types: "r" = regular, "p" = premium, "w" = wheelchair, "c" = companion
const rows = [
  { label: "A", left: 3, center: 8, right: 3, type: "r" },
  { label: "B", left: 3, center: 8, right: 3, type: "r" },
  { label: "C", left: 3, center: 8, right: 3, type: "r" },
  { label: "D", left: 3, center: 8, right: 3, type: "p" },
  { label: "E", left: 3, center: 8, right: 3, type: "p" },
  { label: "F", left: 3, center: 8, right: 3, type: "r" },
  { label: "G", left: 3, center: 8, right: 3, type: "r" },
  { label: "H", left: 3, center: 8, right: 3, type: "r" },
];

// Wheelchair row at the back
const wheelchairRow = {
  label: "W",
  // Left section: 2 wheelchair seats side-by-side, then gap
  // Right section: 1 wheelchair + 1 companion
  // Center section: empty (open space)
};

const step = seatSize + seatGap;
const totalSeatsWidth =
  leftSeats * step +
  aisleWidth +
  centerSeats * step +
  aisleWidth +
  rightSeats * step -
  seatGap;

const svgWidth = leftMargin + rowLabelWidth + totalSeatsWidth + leftMargin;
const totalRows = rows.length + 1; // +1 for wheelchair row
const svgHeight =
  topMargin +
  screenMargin +
  40 +
  totalRows * step +
  bottomMargin +
  40; // extra for legend

function seatRect(x, y, type, label) {
  const colors = {
    r: { fill: "#e0e0e0", stroke: "#888" },
    p: { fill: "#ffd966", stroke: "#b8860b" },
    w: { fill: "#a8d5f2", stroke: "#2e75b6" },
    c: { fill: "#c5e0b4", stroke: "#548235" },
  };
  const c = colors[type];
  let parts = "";
  // Rounded rect for the seat
  parts += `<rect x="${x}" y="${y}" width="${seatSize}" height="${seatSize}" rx="4" ry="4" fill="${c.fill}" stroke="${c.stroke}" stroke-width="1.5"/>`;
  // Seat label
  parts += `<text x="${x + seatSize / 2}" y="${y + seatSize / 2 + 1}" text-anchor="middle" dominant-baseline="central" font-family="Arial, sans-serif" font-size="10" fill="#333">${label}</text>`;
  // Wheelchair icon overlay
  if (type === "w") {
    parts += `<text x="${x + seatSize / 2}" y="${y + seatSize - 3}" text-anchor="middle" font-size="8" fill="#2e75b6">&#9855;</text>`;
  }
  return parts;
}

function buildSVG() {
  let svg = "";
  svg += `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">\n`;
  svg += `<rect width="100%" height="100%" fill="white"/>\n`;

  // Title
  svg += `<text x="${svgWidth / 2}" y="30" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#222">Kino Stella</text>\n`;

  // Screen
  const screenY = topMargin;
  const screenX1 = leftMargin + rowLabelWidth + 20;
  const screenX2 = leftMargin + rowLabelWidth + totalSeatsWidth - 20;
  svg += `<path d="M ${screenX1} ${screenY} Q ${(screenX1 + screenX2) / 2} ${screenY - 15} ${screenX2} ${screenY}" stroke="#555" stroke-width="3" fill="none"/>`;
  svg += `<text x="${(screenX1 + screenX2) / 2}" y="${screenY + 16}" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#666">SCREEN</text>\n`;

  const seatsStartY = screenY + screenMargin + 20;
  const seatsStartX = leftMargin + rowLabelWidth;

  // Draw regular rows
  for (let ri = 0; ri < rows.length; ri++) {
    const row = rows[ri];
    const y = seatsStartY + ri * step;

    // Row label
    svg += `<text x="${leftMargin + rowLabelWidth - 8}" y="${y + seatSize / 2 + 1}" text-anchor="end" dominant-baseline="central" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#444">${row.label}</text>\n`;

    let x = seatsStartX;

    // Left section
    for (let s = 0; s < row.left; s++) {
      svg += seatRect(x, y, row.type, `${row.label}${s + 1}`);
      x += step;
    }

    // Left aisle
    x += aisleWidth;

    // Center section
    for (let s = 0; s < row.center; s++) {
      svg += seatRect(
        x,
        y,
        row.type,
        `${row.label}${row.left + s + 1}`
      );
      x += step;
    }

    // Right aisle
    x += aisleWidth;

    // Right section
    for (let s = 0; s < row.right; s++) {
      svg += seatRect(
        x,
        y,
        row.type,
        `${row.label}${row.left + row.center + s + 1}`
      );
      x += step;
    }
  }

  // Wheelchair row (after last regular row, with extra gap)
  const wY = seatsStartY + rows.length * step + 10;
  svg += `<text x="${leftMargin + rowLabelWidth - 8}" y="${wY + seatSize / 2 + 1}" text-anchor="end" dominant-baseline="central" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#444">W</text>\n`;

  let wx = seatsStartX;

  // Left section: 2 wheelchair seats side-by-side
  svg += seatRect(wx, wY, "w", "W1");
  wx += step;
  svg += seatRect(wx, wY, "w", "W2");
  wx += step;
  // Empty seat position in left section
  wx += step;

  // Skip left aisle
  wx += aisleWidth;

  // Center section: empty (open space for wheelchair access)
  wx += centerSeats * step;

  // Skip right aisle
  wx += aisleWidth;

  // Right section: 1 wheelchair + 1 companion
  svg += seatRect(wx, wY, "w", "W3");
  wx += step;
  svg += seatRect(wx, wY, "c", "W4");
  wx += step;
  // Empty seat position in right section
  // (no seat)

  // Legend
  const legendY = wY + seatSize + 30;
  const legendItems = [
    { type: "r", label: "Regular" },
    { type: "p", label: "Premium" },
    { type: "w", label: "Wheelchair" },
    { type: "c", label: "Companion" },
  ];
  const legendStartX = leftMargin + rowLabelWidth;
  const legendSpacing = 120;

  svg += `<text x="${legendStartX}" y="${legendY - 8}" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#444">Legend:</text>\n`;

  for (let i = 0; i < legendItems.length; i++) {
    const item = legendItems[i];
    const lx = legendStartX + i * legendSpacing;
    const ly = legendY + 4;
    const colors = {
      r: { fill: "#e0e0e0", stroke: "#888" },
      p: { fill: "#ffd966", stroke: "#b8860b" },
      w: { fill: "#a8d5f2", stroke: "#2e75b6" },
      c: { fill: "#c5e0b4", stroke: "#548235" },
    };
    const c = colors[item.type];
    svg += `<rect x="${lx}" y="${ly}" width="16" height="16" rx="3" ry="3" fill="${c.fill}" stroke="${c.stroke}" stroke-width="1.5"/>`;
    svg += `<text x="${lx + 22}" y="${ly + 12}" font-family="Arial, sans-serif" font-size="11" fill="#444">${item.label}</text>\n`;
  }

  svg += `</svg>\n`;
  return svg;
}

const svgContent = buildSVG();
fs.writeFileSync("seating-plan.svg", svgContent);
console.log("Generated seating-plan.svg");
