const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf-8").split("\n");
const grid = [];

data.forEach((line) => {
  const row = line.split("").map((c) => parseInt(c));
  grid.push(row);
});

const numRows = grid.length;
const numCols = grid[0].length;
const visibilityMap = Array(numRows)
  .fill(null)
  .map(() => Array(numCols).fill(0));
let totalVisible = 0;

// left to right
for (let i = 0; i < numRows; i++) {
  let max = -1;
  for (let j = 0; j < numCols; j++) {
    if (grid[i][j] > max) {
      max = grid[i][j];
      if (visibilityMap[i][j] === 0) {
        visibilityMap[i][j] = 1;
        totalVisible++;
      }
    }
  }
}
// right to left
for (let i = 0; i < numRows; i++) {
  let max = -1;
  for (let j = numCols - 1; j >= 0; j--) {
    if (grid[i][j] > max) {
      max = grid[i][j];
      if (visibilityMap[i][j] === 0) {
        visibilityMap[i][j] = 1;
        totalVisible++;
      }
    }
  }
}

// top to bottom
for (let j = 0; j < numCols; j++) {
  let max = -1;
  for (let i = 0; i < numRows; i++) {
    if (grid[i][j] > max) {
      max = grid[i][j];
      if (visibilityMap[i][j] === 0) {
        visibilityMap[i][j] = 1;
        totalVisible++;
      }
    }
  }
}

// bottom to top
for (let j = 0; j < numCols; j++) {
  let max = -1;
  for (let i = numRows - 1; i >= 0; i--) {
    if (grid[i][j] > max) {
      max = grid[i][j];
      if (visibilityMap[i][j] === 0) {
        visibilityMap[i][j] = 1;
        totalVisible++;
      }
    }
  }
}

console.log(totalVisible);
