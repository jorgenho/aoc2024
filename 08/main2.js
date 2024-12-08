console.time("elapsed");
import { readFileSync, writeFileSync } from "node:fs";
const data = readFileSync("input.txt", "utf8");
const rows = data.split("\n");
rows.pop();

const maxY = rows.length;
const maxX = rows[0].length;

const regex = /[a-zA-Z0-9]/g;

const antennas = new Map();

for (let i = 0; i < rows.length; i++) {
  const matches = rows[i].match(regex);
  if (matches) {
    matches.forEach((match) => {
      const current = antennas.get(match);
      const ny = { y: i, x: rows[i].indexOf(match) };
      antennas.set(match, current ? [...current, ny] : [ny]);
    });
  }
}

const antinodes = [];

antennas.forEach((antenna) => {
  for (let j = 0; j < antenna.length; j++) {
    if (antenna.length > 1) {
      antinodes.push(`${antenna[j].x}:${antenna[j].y}`);
    }
    const rest = [...antenna];
    rest.splice(0, j + 1);

    rest.forEach((position) => {
      let xDiff = Math.abs(position.x - antenna[j].x);
      let yDiff = Math.abs(position.y - antenna[j].y);
      try {
        let factor = 1;
        while (true) {
          const nodeBefore = {
            y: antenna[j].y - yDiff * factor,
            x:
              antenna[j].x < position.x
                ? antenna[j].x - xDiff * factor
                : antenna[j].x + xDiff * factor,
          };

          if (isInMap(nodeBefore)) {
            antinodes.push(`${nodeBefore.x}:${nodeBefore.y}`);
          } else {
            break;
          }
          factor++;
        }
        factor = 1;
        while (true) {
          const nodeAfter = {
            y: position.y + yDiff * factor,
            x:
              antenna[j].x > position.x
                ? position.x - xDiff * factor
                : position.x + xDiff * factor,
          };

          if (isInMap(nodeAfter)) {
            antinodes.push(`${nodeAfter.x}:${nodeAfter.y}`);
          } else {
            break;
          }
          factor++;
        }
      } catch {
        console.log("whaaa");
      }
    });
  }
});

function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}
function isInMap({ x, y }) {
  return x >= 0 && x < maxX && y >= 0 && y < maxY;
}
const nodesWithinBounds = new Set(antinodes);

Array.from(nodesWithinBounds).map((n) => {
  const [x, y] = n.split(":").map((c) => Number(c));
  rows[y] = setCharAt(rows[y], x, "#");
});

writeFileSync("output.txt", rows.join("\n"));

console.log("total:", nodesWithinBounds.size);

console.timeEnd("elapsed");
