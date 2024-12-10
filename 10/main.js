console.time("elapsed");
import { readFileSync, writeFileSync } from "node:fs";
const data = readFileSync("ex.txt", "utf8");

const rows = data.split("\n");

let total = [];

for (let i = 0; i < rows.length; i++) {
  for (let j = 0; j < rows[i].length; j++) {
    if (rows[i].charAt(j) === "9") {
      total = [...total, ...findBottomNodesFromNode(j, i)];
    }
  }
}

function findBottomNodesFromNode(x, y) {
  let results = [];
  function recurse(nodes) {
    nodes.forEach(({ x, y }) => {
      const neighbours = getAdjacentDecreasingNodes(x, y);
      if (rows[y].charAt(x) === "1") {
        const endPoints = neighbours.filter(
          ({ x, y }) => rows[y].charAt(x) === "0"
        );

        if (endPoints.length > 0) {
          results = [...results, ...endPoints];
        }
      }

      if (neighbours.length === 0) {
        return results;
      }
      recurse(neighbours);
    });
    return results;
  }

  const neighbours = getAdjacentDecreasingNodes(x, y);

  return recurse(neighbours);
}

function getAdjacentDecreasingNodes(x, y) {
  const value = (Number(rows[y].charAt(x)) - 1).toString();

  const neighbours = [
    getNeighbourNode(x, y, -1, 0),
    getNeighbourNode(x, y, 1, 0),
    getNeighbourNode(x, y, 0, -1),
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
