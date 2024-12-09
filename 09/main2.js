console.time("elapsed");
import { readFileSync } from "node:fs";
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

const fileCount = new Set(parts.filter((p) => p !== ".")).size - 1;

for (let index = fileCount; index > 0; index--) {
  const currentFile = parts.filter((p) => p === index);

  const startOfFreePos = getAvailableIndex(parts, currentFile.length);

  const start = parts.indexOf(index);

  if (startOfFreePos !== -1 && startOfFreePos < start) {
    const dots = Array(currentFile.length).fill(".");
    parts.splice(start, dots.length, ...dots);
    parts.splice(startOfFreePos, currentFile.length, ...currentFile);
  }
}

function getAvailableIndex(arr, n) {
  let indices = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (n === 1 && arr[i] === ".") return i;

    if (arr[i] === "." && arr[i + 1] === ".") {
      indices.push(i);
      if (indices.length === n - 1) {
        return indices[0];
      }
    } else {
      indices = [];
    }
  }
  return -1;
}

let total = 0;

parts.forEach((n, index) => (total += isNaN(n) ? 0 : Number(n) * index));

console.log(total);

console.timeEnd("elapsed");
