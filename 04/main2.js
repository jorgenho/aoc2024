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
    if (str.charAt(j) === "A") {
      try {
        j;
        const isFirstDiagonalMatch =
          (rows[i - 1].charAt(j - 1) === "M" &&
            rows[i + 1].charAt(j + 1) === "S") ||
          (rows[i - 1].charAt(j - 1) === "S" &&
            rows[i + 1].charAt(j + 1) === "M");
        const isSecondDiagonalMatch =
          (rows[i + 1].charAt(j - 1) === "M" &&
            rows[i - 1].charAt(j + 1) === "S") ||
          (rows[i + 1].charAt(j - 1) === "S" &&
            rows[i - 1].charAt(j + 1) === "M");

        if (isFirstDiagonalMatch && isSecondDiagonalMatch) {
          total += 1;
        }
      } catch {
        // noooooop :D
      }
    }
  }
}

console.log(total);

console.timeEnd("aoc");
