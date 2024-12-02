const fs = require("node:fs");
const data = fs.readFileSync("input.txt", "utf8");
const rows = data.split("\n");
rows.pop();

let safeCount = 0;

for (i = 0; i < rows.length; i++) {
  let row = rows[i].split(" ").map((c) => Number(c));

  let isSorted =
    row.every((v, i) => i === 0 || v <= row[i - 1]) ||
    row.every((v, i) => i === 0 || v >= row[i - 1]);

  let isWithinOffsetRange =
    row.every((v, i) => (i === 0 ? true : Math.abs(v - row[i - 1]) <= 3)) &&
    row.every((v, i) => (i === 0 ? true : Math.abs(v - row[i - 1]) >= 1));

  if (isSorted && isWithinOffsetRange) {
    safeCount = safeCount + 1;
  }
}

console.log(safeCount);
