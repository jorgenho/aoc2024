console.time("aoc");
const fs = require("node:fs");
const data = fs.readFileSync("input.txt", "utf8");

const rows = data.split("\n");
// fjern siste rad som er tom
rows.pop();

let total = 0;

for (i = 0; i < rows.length; i++) {
  for (j = 0; j < rows[i].length; j++) {
    const str = rows[i];
    if (str.charAt(j) === "X") {
      // mot hoyre
      if (isMatch(i, j, 0, 1)) {
        total += 1;
      }
      // venstre
      if (isMatch(i, j, 0, -1)) {
        total += 1;
      }

      // opp
      if (isMatch(i, j, -1, 0)) {
        total += 1;
      }

      // ned
      if (isMatch(i, j, 1, 0)) {
        total += 1;
      }

      // ned hoyre
      if (isMatch(i, j, 1, 1)) {
        total += 1;
      }

      // ned venstre
      if (isMatch(i, j, 1, -1)) {
        total += 1;
      }

      // opp venstre
      if (isMatch(i, j, -1, -1)) {
        total += 1;
      }

      // opp hoyre
      if (isMatch(i, j, -1, 1)) {
        total += 1;
      }
    }
  }
}

console.timeEnd("aoc");

function isMatch(startingRow, startingIndex, verticalOffset, horizontalOffset) {
  try {
    return (
      rows[startingRow + verticalOffset].charAt(
        startingIndex + horizontalOffset * 1,
      ) === "M" &&
      rows[startingRow + verticalOffset * 2].charAt(
        startingIndex + horizontalOffset * 2,
      ) === "A" &&
      rows[startingRow + verticalOffset * 3].charAt(
        startingIndex + horizontalOffset * 3,
      ) === "S"
    );
  } catch {
    return false;
  }
}
