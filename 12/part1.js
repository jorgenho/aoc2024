console.time("elapsed");
import { readFileSync } from "node:fs";
const data = readFileSync("input.txt", "utf8");

const rows = data.split("\n");

let totals = [];
let visited = [];

function posToString(pos) {
  return `${pos.x}:${pos.y}`;
}

for (let i = 0; i < rows.length; i++) {
  for (let j = 0; j < rows[i].length; j++) {
    if (!visited.includes(posToString({ j, i }))) {
      const perimeter = findNodesInPerimeter(j, i);
      if (perimeter.nodes > 0) {
        totals.push(perimeter);
      }
    }
  }
}

console.log(
  totals.reduce((total, { nodes, fences }) => total + nodes * fences, 0),
);

function findNodesInPerimeter(x, y) {
  let result = { nodes: 0, fences: 0 };

  function recurse(x, y) {
    const char = rows[y].charAt(x);
    const nodes = getAdjacentNodes(x, y);

    const fenceCount = nodes.filter(
      (n) => n === null || rows[n.y].charAt(n.x) !== char,
    ).length;

    if (
      rows[y].charAt(x) === char &&
      !visited.includes(posToString({ x, y }))
    ) {
      result = { nodes: result.nodes + 1, fences: result.fences + fenceCount };
      visited.push(posToString({ x, y }));
    }

    nodes
      .filter((n) => n !== null)
      .forEach(({ x, y }) => {
        if (
          !visited.includes(posToString({ x, y })) &&
          rows[y].charAt(x) === char
        ) {
          recurse(x, y);
        }
      });

    return result;
  }

  return recurse(x, y);
}

function getAdjacentNodes(x, y) {
  const neighbours = [
    // left of node
    getNeighbourNode(x, y, -1, 0),
    // right of node
    getNeighbourNode(x, y, 1, 0),
    // above
    getNeighbourNode(x, y, 0, -1),
    // below
    getNeighbourNode(x, y, 0, 1),
  ];

  return neighbours;
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

console.timeEnd("elapsed");
