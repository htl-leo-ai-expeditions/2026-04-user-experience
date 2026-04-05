#!/usr/bin/env node
// Generates an SVG seating plan for the CineStar cinema exercise.
// Run: node generate-seating-plan.js > seating-plan.svg

const COLS = 8;
const ROWS = [
  { label: "A", seats: ["o","o","o","o","o","o","o","o"] },
  { label: "B", seats: ["o","o","o","o","o","o","o","o"] },
  { label: "C", seats: ["o","o","o","★","★","o","o","o"] },
  { label: "D", seats: ["o","o","★","★","★","★","o","o"] },
  { label: "E", seats: ["o","o","★","★","★","★","o","o"] },
  { label: "F", seats: ["♿","+","o","o","o","o","+","♿"] },
];

// Layout constants
const seatR = 16;
const seatGap = 52;
const leftMargin = 100;
const topMargin = 110;
const rowHeight = 52;
const aisleWidth = 24; // visual gap for aisles between seat columns
const width = leftMargin + COLS * seatGap + 2 * aisleWidth + 60;
const screenY = 40;
const legendY = topMargin + ROWS.length * rowHeight + 30;
const totalHeight = legendY + 80;

// Aisle positions: gaps before column index 1 and after column index 6
// (i.e., between cols 0-1 and between cols 6-7, matching the original diagram)
const aisleBeforeCols = new Set([1, 7]); // insert aisle gap before these column indices

function seatX(col) {
  // Shift right by aisleWidth for each aisle gap before this column
  let aisleOffset = 0;
  for (const a of aisleBeforeCols) {
    if (col >= a) aisleOffset += aisleWidth;
  }
  return leftMargin + col * seatGap + seatGap / 2 + aisleOffset;
}

function seatY(row) {
  return topMargin + row * rowHeight + rowHeight / 2;
}

let svg = "";
function emit(s) { svg += s + "\n"; }

// Header
emit(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${totalHeight}" width="${width}" height="${totalHeight}" font-family="'Segoe UI', Arial, sans-serif">`);

// Background
emit(`<rect width="100%" height="100%" fill="#f8f8f8" rx="12"/>`);

// Screen
const screenLeft = seatX(0) - seatR;
const screenRight = seatX(COLS - 1) + seatR;
const screenW = screenRight - screenLeft;
emit(`<rect x="${screenLeft}" y="${screenY}" width="${screenW}" height="28" rx="4" fill="#444" />`);
emit(`<text x="${screenLeft + screenW / 2}" y="${screenY + 18}" text-anchor="middle" fill="#fff" font-size="13" font-weight="600" letter-spacing="3">SCREEN</text>`);

// Column numbers
for (let c = 0; c < COLS; c++) {
  emit(`<text x="${seatX(c)}" y="${topMargin - 10}" text-anchor="middle" font-size="13" fill="#666" font-weight="600">${c + 1}</text>`);
}

// Rows
ROWS.forEach((row, ri) => {
  const cy = seatY(ri);

  // Row label
  emit(`<text x="${leftMargin - 24}" y="${cy + 5}" text-anchor="middle" font-size="14" fill="#555" font-weight="600">Row ${row.label}</text>`);

  row.seats.forEach((type, ci) => {
    const cx = seatX(ci);

    if (type === "o") {
      // Standard seat
      emit(`<circle cx="${cx}" cy="${cy}" r="${seatR}" fill="#b8d4f0" stroke="#5a9bd5" stroke-width="1.5"/>`);
    } else if (type === "★") {
      // Premium seat — star shape inside circle
      emit(`<circle cx="${cx}" cy="${cy}" r="${seatR}" fill="#fce4b8" stroke="#e6a817" stroke-width="1.5"/>`);
      emit(`<text x="${cx}" y="${cy + 5}" text-anchor="middle" font-size="15" fill="#c48800">★</text>`);
    } else if (type === "♿") {
      // Wheelchair space — rounded rectangle
      const boxW = seatR * 2 + 4;
      const boxH = seatR * 2;
      emit(`<rect x="${cx - boxW/2}" y="${cy - boxH/2}" width="${boxW}" height="${boxH}" rx="6" fill="#c8e6c9" stroke="#43a047" stroke-width="1.5"/>`);
      emit(`<text x="${cx}" y="${cy + 6}" text-anchor="middle" font-size="17">♿</text>`);
    } else if (type === "+") {
      // Companion seat
      emit(`<circle cx="${cx}" cy="${cy}" r="${seatR}" fill="#7e57c2" stroke="#5e35b1" stroke-width="1.5"/>`);
      emit(`<text x="${cx}" y="${cy + 7}" text-anchor="middle" font-size="20" font-weight="700" fill="#fff">+</text>`);
    }
  });
});

// Aisle strips — vertical dashed lines running through the seating area
const aisleStripX = [];
for (const a of aisleBeforeCols) {
  // Position the aisle in the gap between the previous column and this one
  const prevColRight = seatX(a - 1) + seatR + 2;
  const thisColLeft = seatX(a) - seatR - 2;
  aisleStripX.push((prevColRight + thisColLeft) / 2);
}
// Also add a center aisle between columns 3 and 4 (no gap, just a marker)
aisleStripX.push((seatX(3) + seatX(4)) / 2);

const aisleTop = seatY(0) - seatR - 8;
const aisleBottom = seatY(ROWS.length - 1) + seatR + 8;

aisleStripX.forEach(ax => {
  emit(`<line x1="${ax}" y1="${aisleTop}" x2="${ax}" y2="${aisleBottom}" stroke="#bbb" stroke-width="2" stroke-dasharray="6,4"/>`);
  emit(`<text x="${ax}" y="${aisleBottom + 16}" text-anchor="middle" font-size="11" fill="#999" font-style="italic">aisle</text>`);
});

// Legend — 2×2 grid so it fits the canvas
const items = [
  { type: "standard", label: "Standard seat" },
  { type: "premium", label: "Premium seat" },
  { type: "wheelchair", label: "Wheelchair space" },
  { type: "companion", label: "Companion seat" },
];

const legendCols = 2;
const legendColW = 220;
const legendRowH = 26;
const legendStartX = leftMargin + 10;
const legendStartY = legendY + 14;

items.forEach((item, i) => {
  const col = i % legendCols;
  const row = Math.floor(i / legendCols);
  const lx = legendStartX + col * legendColW;
  const iy = legendStartY + row * legendRowH;
  const r = 9;

  if (item.type === "standard") {
    emit(`<circle cx="${lx}" cy="${iy}" r="${r}" fill="#b8d4f0" stroke="#5a9bd5" stroke-width="1.2"/>`);
  } else if (item.type === "premium") {
    emit(`<circle cx="${lx}" cy="${iy}" r="${r}" fill="#fce4b8" stroke="#e6a817" stroke-width="1.2"/>`);
    emit(`<text x="${lx}" y="${iy + 4}" text-anchor="middle" font-size="10" fill="#c48800">★</text>`);
  } else if (item.type === "wheelchair") {
    emit(`<rect x="${lx - 11}" y="${iy - 9}" width="22" height="18" rx="4" fill="#c8e6c9" stroke="#43a047" stroke-width="1.2"/>`);
    emit(`<text x="${lx}" y="${iy + 4}" text-anchor="middle" font-size="11">♿</text>`);
  } else if (item.type === "companion") {
    emit(`<circle cx="${lx}" cy="${iy}" r="${r}" fill="#7e57c2" stroke="#5e35b1" stroke-width="1.2"/>`);
    emit(`<text x="${lx}" y="${iy + 5}" text-anchor="middle" font-size="14" font-weight="700" fill="#fff">+</text>`);
  }

  emit(`<text x="${lx + 16}" y="${iy + 4}" font-size="12" fill="#555">${item.label}</text>`);
});

emit("</svg>");

process.stdout.write(svg);
