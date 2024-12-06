console.time("aoc");
const fs = require("node:fs");
const data = fs.readFileSync("input.txt", "utf8");

const rows = data.split("\n");

let maxY = rows.length - 1;
let maxX = rows[0].length - 1;

// finn startposisjon
let y = Math.floor(data.replace("\n", "").indexOf("^") / rows[0].length) - 1;
let x = rows[y].indexOf("^");

console.log(x, y, rows[y].charAt(x));

const visited = [];

let direction = "^";

const directions = new Map();
directions.set("^", { x: 0, y: -1, next: ">" });
directions.set(">", { x: 1, y: 0, next: "v" });
directions.set("v", { x: 0, y: 1, next: "<" });
directions.set("<", { x: -1, y: 0, next: "^" });

visited.push(`${x}:${y}`);

while (y >= 0 && y < maxY && x >= 0 && x < maxX) {
  const [nextY, nextX] = [
    y + directions.get(direction).y,
    x + directions.get(direction).x,
  ];

  // er neste pos out of bounds
  if (nextY < 0 || nextY > maxY || nextX < 0 || nextX > maxX) {
    break;
  }

  const isNextSpotFree = rows[nextY].charAt(nextX) !== "#";

  if (isNextSpotFree) {
    x = nextX;
    y = nextY;
    visited.push(`${x}:${y}`);
  } else {
    direction = directions.get(direction).next;
  }
}
console.log(Array.from(new Set(visited)).length);

console.timeEnd("aoc");
