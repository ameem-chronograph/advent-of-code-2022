const fs = require("fs");

const graph = [];
let start;
let end;

fs.readFileSync("input.txt", "utf-8")
  .split("\n")
  .forEach((line, row) => {
    const elevations = [];
    line.split("").forEach((c, col) => {
      if (c === "S") {
        start = [row, col];
        elevations.push(0);
      } else if (c === "E") {
        end = [row, col];
        elevations.push("z".charCodeAt(0) - "a".charCodeAt(0));
      } else {
        elevations.push(c.charCodeAt(0) - "a".charCodeAt(0));
      }
    });
    graph.push(elevations);
  });

const visited = Array(graph.length)
  .fill(null)
  .map(() => Array(graph[0].length).fill(false));
const queue = [{ position: start, distance: 0 }];
visited[start[0]][start[1]] = true;

while (queue.length) {
  let next = queue.shift();
  const {
    position: [row, col],
    distance,
  } = next;
  if(row === end[0] && col === end[1]) {
    console.log(distance);
    break;
  }
  const currElevation = graph[row][col];
  [
    [row - 1, col],
    [row, col + 1],
    [row + 1, col],
    [row, col - 1],
  ].forEach(([nRow, nCol]) => {
    if (
      nRow >= 0 &&
      nRow < graph.length &&
      nCol >= 0 &&
      nCol < graph[0].length &&
      !visited[nRow][nCol]
    ) {
      const nElevation = graph[nRow][nCol];
      if (nElevation - 1 <= currElevation) {
        queue.push({ position: [nRow, nCol], distance: distance + 1 });
        visited[nRow][nCol] = true;
      }
    }
  });
}
