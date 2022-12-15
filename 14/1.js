const fs = require("fs");

const getKey = (x, y) => `${x},${y}`;
const map = {};
const lines = fs.readFileSync("input.txt", "utf-8").split("\n");
let maxY = 0;
lines.forEach((line) => {
  const points = line
    .split(" -> ")
    .map((pointStr) => pointStr.split(",").map((n) => parseInt(n)));
  let curr = 0;
  while (curr + 1 < points.length) {
    const xStart = Math.min(points[curr][0], points[curr + 1][0]);
    const xEnd = Math.max(points[curr][0], points[curr + 1][0]);
    const yStart = Math.min(points[curr][1], points[curr + 1][1]);
    const yEnd = Math.max(points[curr][1], points[curr + 1][1]);

    for (let x = xStart; x <= xEnd; x++) {
      for (let y = yStart; y <= yEnd; y++) {
        maxY = Math.max(maxY, y);
        map[getKey(x, y)] = true;
      }
    }
    curr++;
  }
});

let sandLocation = [500, 0];
let x = sandLocation[0];
let y = sandLocation[1];

let restedUnits = 0;
while (y < maxY) {
  if (!map[getKey(x, y + 1)]) {
    y++;
  } else if (!map[getKey(x - 1, y + 1)]) {
    y++;
    x--;
  } else if (!map[getKey(x + 1, y + 1)]) {
    y++;
    x++;
  } else {
    map[getKey(x, y)] = true;
    restedUnits++;
    x = sandLocation[0];
    y = sandLocation[1];
  }
}

console.log(restedUnits);
