console.time("elapsed");
import { readFileSync, writeFileSync } from "node:fs";
const data = readFileSync("ex.txt", "utf8").replace("\n", "");

let parts = [];
let fileCounter = 0;

for (let index = 0; index < data.length; index++) {
  if (index % 2 === 0) {
    parts = [
      ...parts,
      fileCounter.toString().repeat(Number(data.charAt(index))),
    ];
    fileCounter++;
  } else {
    parts = [...parts, ".".repeat(Number(data.charAt(index)))];
  }
}

for (let index = parts.length - 1; index >= 0; index--) {
  const element = parts[index];
  if (!isNaN(element)) {
    const firstFreeSpaceElement = parts.find(
      (f) => !!f && f.length >= element.length && f.charAt(0) === "."
    );

    if (firstFreeSpaceElement) {
      if (newIndex > index) {
        break;
      }
      parts[index] = parts[newIndex];
      parts[newIndex] = element;
    }
  }
}

console.log(parts.join(""));

let total = 0;

parts
  .filter((f) => f !== ".")
  .map((n, index) => {
    if (n !== ".") {
      total += Number(n) * index;
    }
  });
console.log(total);

console.timeEnd("elapsed");
