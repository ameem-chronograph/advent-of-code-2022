const fs = require("fs");

const lines = fs.readFileSync("input.txt", "utf-8").split("\n");

let cycle = 1;
let x = 1;
const tv = Array(6).fill(null).map(() => Array(40).fill('.'));

const draw = (tv, cycle, x) => {
    const pixelRow = Math.floor((cycle - 1) / 40);
    const pixelCol = (cycle - 1) % 40;
    if(Math.abs(pixelCol - x) <= 1) {
        tv[pixelRow][pixelCol] = '#';
    }
}

lines.forEach((line) => {
  const command = line.split(" ");
  draw(tv, cycle, x);
  switch (command[0]) {
    case "noop":
      cycle++;
      break;
    case "addx":
      cycle++;
      draw(tv, cycle, x);
      cycle++;
      x += parseInt(command[1]);
      break;
    default:
      break;
  }
});

console.log(tv.map(row => row.join('')).join('\n'));
