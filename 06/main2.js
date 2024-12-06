console.time("aoc");
const fs = require("node:fs");
const data = fs.readFileSync("input.txt", "utf8");

const rows = data.split("\n");

let maxY = rows.length - 1;
let maxX = rows[0].length - 1;

const directions = new Map();
directions.set("^", { x: 0, y: -1, next: ">" });
directions.set(">", { x: 1, y: 0, next: "v" });
directions.set("v", { x: 0, y: 1, next: "<" });
directions.set("<", { x: -1, y: 0, next: "^" });

let total = 0;

for (i = 0; i < rows.length; i++) {
  for (j = 0; j < rows[i].length; j++) {
    if (rows[i].charAt(j) === ".") {
      const isLoop = loopIT(j, i);
      if (isLoop) {
        total += 1;
      }
    }
  }
}

function loopIT(guardX, guardY) {
  let y = Math.floor(data.replace("\n", "").indexOf("^") / rows[0].length) - 1;
  let x = rows[y].indexOf("^");

  let direction = "^";

  const moves = [];
  while (y >= 0 && y < maxY && x >= 0 && x < maxX) {
    const [nextY, nextX] = [
      y + directions.get(direction).y,
      x + directions.get(direction).x,
    ];

    // er neste pos out of bounds
    if (nextY < 0 || nextY > maxY || nextX < 0 || nextX > maxX) {
      return false;
    }

    const isNextSpotFree = rows[nextY].charAt(nextX) !== "#";

    const movingToGuard = nextX === guardX && nextY === guardY;

    const move = `${x}:${y} -> ${nextX}:${nextY}`;
    if (isNextSpotFree && !movingToGuard) {
      x = nextX;
      y = nextY;
    } else {
      if (moves.includes(move)) {
        return true;
      }

      moves.push(move);

      direction = directions.get(direction).next;
    }
  }
}
console.log(total);

console.timeEnd("aoc");
