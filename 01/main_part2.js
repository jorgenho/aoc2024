const fs = require("node:fs");
const data = fs.readFileSync("input.txt", "utf8");
const rows = data.split("\n");
rows.pop();

const col1 = rows.map((row) => Number(row.split("   ")[0]));

const col2 = rows.map((row) => Number(row.split("   ")[1]));

let total = 0;

for (i = 0; i < col1.length; i++) {
  total += col1[i] * col2.filter((j) => j === col1[i]).length;
}
console.log(total);
