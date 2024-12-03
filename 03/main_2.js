const fs = require("node:fs");
const data = fs.readFileSync("input.txt", "utf8");

const regex = /do\(\)|mul\(\d*,\d*\)|don\'t\(\)/gm;

let m;

let total = 0;
let doIt = true;

while ((m = regex.exec(data)) !== null) {
  if (m.index === regex.lastIndex) {
    regex.lastIndex++;
  }

  m.forEach((match) => {
    if (match === "do()" || match === `don't()`) {
      doIt = match === "do()";
    } else {
      [first, second] = match.split(",");

      if (doIt) {
        total +=
          Number(first.replace("mul(", "")) * Number(second.replace(")", ""));
      }
    }
  });
}

console.log(total);
