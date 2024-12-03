const fs = require("node:fs");
const data = fs.readFileSync("input.txt", "utf8");

const regex = /mul\(\d*,\d*\)/gm;

let m;

let total = 0;

while ((m = regex.exec(data)) !== null) {
  if (m.index === regex.lastIndex) {
    regex.lastIndex++;
  }

  m.forEach((match, groupIndex) => {
    [first, second] = match.split(",");
    total +=
      Number(first.replace("mul(", "")) * Number(second.replace(")", ""));
  });
}

console.log(total);
