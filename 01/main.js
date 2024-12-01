const fs = require("node:fs");
const data = fs.readFileSync("input.txt", "utf8");
const rows = data.split("\n");
rows.pop();

const col1 = rows
  .map((row) => Number(row.split("   ")[0]))
  .sort((a, b) => a - b);
const col2 = rows
  .map((row) => Number(row.split("   ")[1]))
  .sort((a, b) => a - b);

let total = 0;

for (i = 0; i < col1.length; i++) {
  total += Math.abs(col1[i] - col2[i]);
}
console.log(total);
