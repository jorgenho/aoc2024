console.time("aoc");
const fs = require("node:fs");
const data = fs.readFileSync("input.txt", "utf8");
const rows = data.split("\n");

let totalSum = 0;

const permutationsMap = new Map();

for (let i = 0; i < rows.length; i++) {
  [total, parts] = rows[i].split(":");

  const numbers = parts
    .trimEnd()
    .trimStart()
    .split(" ")
    .map((c) => Number(c));

  let perms = [];
  if (!permutationsMap.has(numbers.length - 1)) {
    permutationsMap.set(
      numbers.length - 1,
      generateOperatorPermutations(numbers.length - 1),
    );
  }
  perms = permutationsMap.get(numbers.length - 1);

  for (let j = 0; j < perms.length; j++) {
    let sum = numbers[0];
    for (let z = 0; z < perms[j].length; z++) {
      const operator = perms[j][z];

      if (operator === "+") {
        sum = sum + numbers[z + 1];
      }

      if (operator === "*") {
        sum = sum * numbers[z + 1];
      }

      if (operator === "||") {
        sum = Number(`${sum}${numbers[z + 1]}`);
      }
    }

    if (sum === Number(total)) {
      totalSum += Number(total);
      break;
    }
  }
}

console.log(totalSum);

function generateOperatorPermutations(numOfItems) {
  const possibleOperators = ["*", "+", "||"];

  function recurse(currentLength) {
    if (currentLength === 0) {
      return [[]];
    }

    const results = [];

    const subPermutations = recurse(currentLength - 1);

    for (const subPerm of subPermutations) {
      for (const operator of possibleOperators) {
        results.push([...subPerm, operator]);
      }
    }

    return results;
  }

  return recurse(numOfItems);
}

console.timeEnd("aoc");
