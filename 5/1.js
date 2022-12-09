const fs = require("fs");

const parseCrates = (crateLines) => {
  const stacks = [];
  for (let i = crateLines.length - 2; i >= 0; i--) {
    for (let j = 0; j < crateLines[i].length; j += 4) {
      const stackId = j / 4;
      if (stacks.length <= stackId) {
        stacks.push([]);
      }
      if (crateLines[i][j] === "[") {
        const crate = crateLines[i][j + 1];
        stacks[stackId].push(crate);
      }
    }
  }
  return stacks;
};

const applyMoves = (moveLines, crates) => {
  moveLines.forEach((moveLine) => {
    const [, amountStr, fromStr, toStr] = moveLine.match(
      /^move (\d+) from (\d+) to (\d+)/
    );
    for (let i = 0; i < parseInt(amountStr); i++) {
      crates[parseInt(toStr) - 1].push(crates[parseInt(fromStr) - 1].pop());
    }
  });
};

const data = fs.readFileSync("./input.txt", "utf8");
const lines = data.split("\n");
const crateLines = lines.slice(0, lines.indexOf(""));
const moveLines = lines.slice(lines.indexOf("") + 1, lines.length);
const crates = parseCrates(crateLines);
applyMoves(moveLines, crates);
console.log(crates.map(crate => crate[crate.length -1]).join(''));
