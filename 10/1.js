const fs = require("fs");

const lines = fs.readFileSync("input.txt", "utf-8").split("\n");

let cycle = 1;
let x = 1;
const signalStrengths = [];

const updateSignalStrengths = (cycle, x, signalStrengths) => {
  if (cycle <= 220 && (cycle - 20) % 40 === 0) {
    signalStrengths.push(cycle * x);
  }
};

lines.forEach((line) => {
  const command = line.split(" ");
  updateSignalStrengths(cycle, x, signalStrengths);
  switch (command[0]) {
    case "noop":
      cycle++;
      break;
    case "addx":
      cycle++;
      updateSignalStrengths(cycle, x, signalStrengths);
      cycle++;
      x += parseInt(command[1]);
      break;
    default:
      break;
  }
});

console.log(signalStrengths.reduce((acc, curr) => acc + curr));
