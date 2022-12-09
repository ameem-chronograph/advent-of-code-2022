const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf-8").split("\n");
const grid = [];

data.forEach((line) => {
  const row = line.split("").map((c) => parseInt(c));
  grid.push(row);
});

const numRows = grid.length;
const numCols = grid[0].length;

// brute force O(n^3) approach
// probably a better way to do this?

let best = 0;
for (let i = 0; i < numRows; i++) {
  for (let j = 0; j < numCols; j++) {
    let up = 0;
    let down = 0;
    let left = 0;
    let right = 0;
    // walk up
    let upPtr = i - 1;
    while (upPtr >= 0) {
      up++;
      if(grid[i][j] <= grid[upPtr][j]) {
        break;
      }
      upPtr--;
    }
    // walk down
    let downPtr = i + 1;
    while (downPtr < numCols) {
      down++;
      if(grid[i][j] <= grid[downPtr][j]) {
        break;
      }
      downPtr++;
    }

    // walk left
    let leftPtr = j - 1;
    while (leftPtr >= 0) {
      left++;
      if(grid[i][j] <= grid[i][leftPtr]) {
        break;
      }
      leftPtr--;
    }

    // walk right
    let rightPtr = j + 1;
    while (rightPtr < numRows) {
      right++;
      if(grid[i][j] <= grid[i][rightPtr]) {
        break;
      }
      rightPtr++;
    }
    best = Math.max(best, up * left * right * down);
  }
}

console.log(best);
