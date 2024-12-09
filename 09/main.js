console.time("elapsed");
import { readFileSync, writeFileSync } from "node:fs";
const data = readFileSync("input.txt", "utf8").replace("\n", "");

let parts = [];
let fileCounter = 0;

for (let index = 0; index < data.length; index++) {
  if (index % 2 === 0) {
    parts = [...parts, ...Array(Number(data.charAt(index))).fill(fileCounter)];
    fileCounter++;
  } else {
    parts = parts.concat(".".repeat(Number(data.charAt(index))).split(""));
  }
}

for (let index = parts.length - 1; index >= 0; index--) {
  const element = parts[index];
  if (Number(element) !== NaN) {
    const newIndex = parts.indexOf(".");

    if (newIndex > index) {
      break;
    }
    parts[index] = parts[newIndex];
    parts[newIndex] = element;
  }
}

let total = 0;

parts.map((n, index) => {
  if (n !== ".") {
    console.log(n);
    total += Number(n) * index;
  }
});
console.log(total);

console.timeEnd("elapsed");
