console.time("elapsed");
import { readFileSync } from "node:fs";
const data = readFileSync("ex.txt", "utf8");

const rows = data.split("\n");

let totals = [];
let visited = [];

function posToString(pos) {
  return `${pos.x}:${pos.y}`;
}

const { nodes, fences } = findNodesInPerimeter(0, 0);

const ySidex = fences.map((p) => p.y);

const sides = [];

for (let i = 0; i < ySides.length; i++) {}

console.log(sides);

//for (let i = 0; i < rows.length; i++) {
//  for (let j = 0; j < rows[i].length; j++) {
//    if (!visited.includes(posToString({ j, i }))) {
//      const perimeter = findNodesInPerimeter(j, i);
//      if (perimeter.nodes > 0) {
//        totals.push(perimeter);
//      }
//    }
//  }
//}

//console.log(
//  totals.reduce((total, { nodes, fences }) => total + nodes * fences.length, 0),
//);

function findNodesInPerimeter(x, y) {
  let result = { nodes: 0, fences: [] };

  function recurse(x, y) {
    const char = rows[y].charAt(x);
    const nodes = getAdjacentNodes(x, y);
    const fences = getFences(nodes, char);

    if (
      rows[y].charAt(x) === char &&
      !visited.includes(posToString({ x, y }))
    ) {
      result = {
        nodes: result.nodes + 1,
        fences: [...result.fences, ...fences],
      };
      visited.push(posToString({ x, y }));
    }

    nodes
      .filter((n) => !fences.includes(n))
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

function getFences(nodes, char) {
  return nodes.filter(
    (node) =>
      node.x < 0 ||
      node.x > rows[0].length - 1 ||
      node.y < 0 ||
      node.y > rows.length - 1 ||
      rows[node.y].charAt(node.x) !== char,
  );
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

  return { x: newX, y: newY };
}

console.timeEnd("elapsed");
