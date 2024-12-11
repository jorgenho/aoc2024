console.time("elapsed");
import { readFileSync } from "node:fs";
const data = readFileSync("ex.txt", "utf8");

const rows = data.split("\n");

let total = 0;

for (let i = 0; i < rows.length; i++) {
  for (let j = 0; j < rows[i].length; j++) {
    if (rows[i].charAt(j) === "0") {
      total += findHillNodesFromBase(j, i);
    }
  }
}
function findHillNodesFromBase(x, y) {
  let results = [];
  function recurse(x, y) {
    if (rows[y].charAt(x) === "9") {
      results.push(`${x}:${y}`);
    } else {
      const nodes = getAdjacentIncreasingNodes(x, y);
      nodes.forEach(({ x, y }) => {
        recurse(x, y);
      });
    }

    return results.length;
  }

  return recurse(x, y);
}

function getAdjacentIncreasingNodes(x, y) {
  const value = (Number(rows[y].charAt(x)) + 1).toString();

  const neighbours = [
    // left of node
    getNeighbourNode(x, y, -1, 0),
    // right of node
    getNeighbourNode(x, y, 1, 0),
    // above
    getNeighbourNode(x, y, 0, -1),
    // below
    getNeighbourNode(x, y, 0, 1),
  ].filter((p) => p !== null);

  return neighbours.filter((p) => rows[p.y].charAt(p.x) === value);
}

function getNeighbourNode(x, y, moveX, moveY) {
  const newX = x + moveX;
  const newY = y + moveY;

  if (
    newX < 0 ||
    newX > rows[0].length - 1 ||
    newY < 0 ||
    newY > rows.length - 1
  ) {
    return null;
  }
  return { x: newX, y: newY };
}
console.log(total);

console.timeEnd("elapsed");
