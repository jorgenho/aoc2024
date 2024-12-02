const fs = require("node:fs");
const data = fs.readFileSync("input.txt", "utf8");
const rows = data.split("\n");
rows.pop();

let safeCount = 0;

function isSorted(row) {
  return (
    row.every((v, i) => i === 0 || v <= row[i - 1]) ||
    row.every((v, i) => i === 0 || v >= row[i - 1])
  );
}

function isWithinOffsetRange(row) {
  return (
    row.every((v, i) => (i === 0 ? true : Math.abs(v - row[i - 1]) <= 3)) &&
    row.every((v, i) => (i === 0 ? true : Math.abs(v - row[i - 1]) >= 1))
  );
}

for (i = 0; i < rows.length; i++) {
  let row = rows[i].split(" ").map((c) => Number(c));

  if (isSorted(row) && isWithinOffsetRange(row)) {
    safeCount = safeCount + 1;
  } else {
    const isAnotherComboSafe = row.some((v, i) => {
      const rowWithoutIndex = [...row];
      rowWithoutIndex.splice(i, 1);
      return isSorted(rowWithoutIndex) && isWithinOffsetRange(rowWithoutIndex);
    });

    if (isAnotherComboSafe) {
      safeCount = safeCount + 1;
    }
  }
}

console.log(safeCount);
