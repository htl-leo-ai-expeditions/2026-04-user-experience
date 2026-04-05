const fs = require("fs");

const SEAT_SIZE = 28;
const SEAT_GAP = 6;
const ROW_GAP = 8;
const AISLE_GAP = 24;
const LEFT_MARGIN = 50;
const TOP_MARGIN = 70;

const COLORS = {
  standard: "#6B7280",
  premium: "#D97706",
  wheelchair: "#2563EB",
  companion: "#60A5FA",
  screen: "#374151",
  label: "#374151",
  bg: "#FFFFFF",
};

// Row definitions: each seat is { type, col }
// col determines x-position (with aisle gap in the center)
const rows = [
  {
    label: "A",
    seats: [
      { type: "wheelchair", col: 0 },
      { type: "wheelchair", col: 1 },
      { type: "companion", col: 2 },
      { type: "companion", col: 3 },
      // aisle
      { type: "companion", col: 4 },
      { type: "companion", col: 5 },
      { type: "wheelchair", col: 6 },
      { type: "wheelchair", col: 7 },
    ],
  },
  ...["B", "C", "D", "E"].map((label) => ({
    label,
    seats: Array.from({ length: 10 }, (_, i) => ({
      type: "standard",
      col: i,
    })),
  })),
  {
    label: "F",
    seats: Array.from({ length: 10 }, (_, i) => ({
      type: i >= 3 && i <= 6 ? "premium" : "standard",
      col: i,
    })),
  },
  {
    label: "G",
    seats: Array.from({ length: 12 }, (_, i) => ({
      type: i >= 3 && i <= 8 ? "premium" : "standard",
      col: i,
    })),
  },
  {
    label: "H",
    seats: Array.from({ length: 12 }, (_, i) => ({
      type: "standard",
      col: i,
    })),
  },
];

function seatX(col, totalInRow) {
  // Center the row; aisle is between col totalInRow/2-1 and totalInRow/2
  const half = totalInRow / 2;
  const baseX = col * (SEAT_SIZE + SEAT_GAP);
  const aisleOffset = col >= half ? AISLE_GAP : 0;
  return LEFT_MARGIN + baseX + aisleOffset;
}

function rowY(index) {
  return TOP_MARGIN + index * (SEAT_SIZE + ROW_GAP);
}

// Calculate canvas size
const maxCols = 12;
const canvasWidth =
  LEFT_MARGIN * 2 +
  maxCols * (SEAT_SIZE + SEAT_GAP) -
  SEAT_GAP +
  AISLE_GAP;
const canvasHeight = TOP_MARGIN + rows.length * (SEAT_SIZE + ROW_GAP) + 80;

let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvasWidth} ${canvasHeight}" width="${canvasWidth}" height="${canvasHeight}" font-family="Arial, Helvetica, sans-serif">
<rect width="${canvasWidth}" height="${canvasHeight}" fill="${COLORS.bg}"/>

<!-- Title -->
<text x="${canvasWidth / 2}" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="${COLORS.label}">Starlight Cinema - Seating Plan</text>

<!-- Screen -->
<rect x="${LEFT_MARGIN}" y="42" width="${canvasWidth - LEFT_MARGIN * 2}" height="14" rx="3" fill="${COLORS.screen}" opacity="0.7"/>
<text x="${canvasWidth / 2}" y="53" text-anchor="middle" font-size="10" fill="white" font-weight="bold">SCREEN</text>
`;

rows.forEach((row, ri) => {
  const y = rowY(ri);
  const totalInRow = row.seats.length;

  // Center offset: shift smaller rows so they align with the widest row (12)
  const maxWidth =
    maxCols * (SEAT_SIZE + SEAT_GAP) - SEAT_GAP + AISLE_GAP;
  const rowWidth =
    totalInRow * (SEAT_SIZE + SEAT_GAP) - SEAT_GAP + AISLE_GAP;
  const centerOffset = (maxWidth - rowWidth) / 2;

  // Row label
  svg += `<text x="${LEFT_MARGIN - 20 + centerOffset}" y="${y + SEAT_SIZE / 2 + 5}" text-anchor="middle" font-size="12" font-weight="bold" fill="${COLORS.label}">${row.label}</text>\n`;

  row.seats.forEach((seat, si) => {
    const x = seatX(si, totalInRow) + centerOffset;
    const seatNum = si + 1;

    if (seat.type === "wheelchair") {
      // Wheelchair: square with rounded corners + wheelchair icon hint
      svg += `<rect x="${x}" y="${y}" width="${SEAT_SIZE}" height="${SEAT_SIZE}" rx="4" fill="${COLORS.wheelchair}" opacity="0.85"/>`;
      svg += `<text x="${x + SEAT_SIZE / 2}" y="${y + SEAT_SIZE / 2 + 1}" text-anchor="middle" dominant-baseline="middle" font-size="14" fill="white">\u267F</text>`;
    } else if (seat.type === "companion") {
      svg += `<rect x="${x}" y="${y}" width="${SEAT_SIZE}" height="${SEAT_SIZE}" rx="4" fill="${COLORS.companion}" opacity="0.85"/>`;
      svg += `<text x="${x + SEAT_SIZE / 2}" y="${y + SEAT_SIZE / 2 + 4}" text-anchor="middle" font-size="9" fill="white" font-weight="bold">C</text>`;
    } else if (seat.type === "premium") {
      svg += `<rect x="${x}" y="${y}" width="${SEAT_SIZE}" height="${SEAT_SIZE}" rx="6" fill="${COLORS.premium}" opacity="0.85"/>`;
      svg += `<text x="${x + SEAT_SIZE / 2}" y="${y + SEAT_SIZE / 2 + 4}" text-anchor="middle" font-size="9" fill="white" font-weight="bold">${seatNum}</text>`;
    } else {
      svg += `<rect x="${x}" y="${y}" width="${SEAT_SIZE}" height="${SEAT_SIZE}" rx="6" fill="${COLORS.standard}" opacity="0.7"/>`;
      svg += `<text x="${x + SEAT_SIZE / 2}" y="${y + SEAT_SIZE / 2 + 4}" text-anchor="middle" font-size="9" fill="white" font-weight="bold">${seatNum}</text>`;
    }
    svg += "\n";
  });
});

// Legend
const legendY = TOP_MARGIN + rows.length * (SEAT_SIZE + ROW_GAP) + 16;
const legendItems = [
  { color: COLORS.standard, label: "Standard", opacity: 0.7 },
  { color: COLORS.premium, label: "Premium", opacity: 0.85 },
  { color: COLORS.wheelchair, label: "Wheelchair", opacity: 0.85 },
  { color: COLORS.companion, label: "Companion", opacity: 0.85 },
];

let lx = LEFT_MARGIN;
legendItems.forEach((item) => {
  svg += `<rect x="${lx}" y="${legendY}" width="14" height="14" rx="3" fill="${item.color}" opacity="${item.opacity}"/>`;
  svg += `<text x="${lx + 20}" y="${legendY + 11}" font-size="11" fill="${COLORS.label}">${item.label}</text>`;
  lx += 20 + item.label.length * 7 + 16;
});

svg += "\n</svg>";

fs.writeFileSync("seating-plan.svg", svg);
console.log("Generated seating-plan.svg");
