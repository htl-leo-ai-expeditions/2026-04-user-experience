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
const width = leftMargin + COLS * seatGap + 60;
const screenY = 40;
const legendY = topMargin + ROWS.length * rowHeight + 40;
const aisleY = legendY - 10;
const totalHeight = legendY + 120;

function seatX(col) {
  return leftMargin + col * seatGap + seatGap / 2;
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
      emit(`<circle cx="${cx}" cy="${cy}" r="${seatR}" fill="#d1c4e9" stroke="#7e57c2" stroke-width="1.5"/>`);
      emit(`<text x="${cx}" y="${cy + 6}" text-anchor="middle" font-size="16" font-weight="700" fill="#5e35b1">+</text>`);
    }
  });
});

// Aisle markers below row F
const aislePositions = [0, 3.5, 7]; // between seat indices
aislePositions.forEach(pos => {
  const ax = (pos === 3.5)
    ? (seatX(3) + seatX(4)) / 2
    : seatX(pos);
  emit(`<line x1="${ax}" y1="${aisleY - 8}" x2="${ax}" y2="${aisleY + 8}" stroke="#999" stroke-width="1.5" stroke-dasharray="4,3"/>`);
  emit(`<text x="${ax}" y="${aisleY + 22}" text-anchor="middle" font-size="11" fill="#999">aisle</text>`);
});

// Legend
const ly = legendY + 50;
const items = [
  { type: "standard", label: "Standard seat" },
  { type: "premium", label: "Premium seat" },
  { type: "wheelchair", label: "Wheelchair space" },
  { type: "companion", label: "Companion seat" },
];

const legendStartX = leftMargin - 10;
const legendGap = 160;

items.forEach((item, i) => {
  const lx = legendStartX + i * legendGap;
  const iy = ly;
  const r = 10;

  if (item.type === "standard") {
    emit(`<circle cx="${lx}" cy="${iy}" r="${r}" fill="#b8d4f0" stroke="#5a9bd5" stroke-width="1.2"/>`);
  } else if (item.type === "premium") {
    emit(`<circle cx="${lx}" cy="${iy}" r="${r}" fill="#fce4b8" stroke="#e6a817" stroke-width="1.2"/>`);
    emit(`<text x="${lx}" y="${iy + 4}" text-anchor="middle" font-size="11" fill="#c48800">★</text>`);
  } else if (item.type === "wheelchair") {
    emit(`<rect x="${lx - 12}" y="${iy - 10}" width="24" height="20" rx="4" fill="#c8e6c9" stroke="#43a047" stroke-width="1.2"/>`);
    emit(`<text x="${lx}" y="${iy + 4}" text-anchor="middle" font-size="12">♿</text>`);
  } else if (item.type === "companion") {
    emit(`<circle cx="${lx}" cy="${iy}" r="${r}" fill="#d1c4e9" stroke="#7e57c2" stroke-width="1.2"/>`);
    emit(`<text x="${lx}" y="${iy + 4}" text-anchor="middle" font-size="12" font-weight="700" fill="#5e35b1">+</text>`);
  }

  emit(`<text x="${lx + 16}" y="${iy + 4}" font-size="12" fill="#555">${item.label}</text>`);
});

emit("</svg>");

process.stdout.write(svg);
