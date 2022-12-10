const fs = require("fs");

const data = fs.readFileSync("./input.txt", "utf-8").split("\n");
const moves = data.map((line) => {
  const [direction, stepsStr] = line.split(" ");
  return [direction, parseInt(stepsStr)];
});

const tailVisited = {"0,0": true};
const headPosition = [0, 0];
let tailPosition = [0, 0];

moves.forEach(([direction, steps]) => {
  for (let i = 0; i < steps; i++) {
    const prevHead = [headPosition[0], headPosition[1]];
    if (direction === "U") {
      headPosition[0]++;
    } else if (direction === "R") {
      headPosition[1]++;
    } else if (direction === "D") {
      headPosition[0]--;
    } else {
      headPosition[1]--;
    }

    if(Math.abs(headPosition[0] - tailPosition[0]) > 1) {
        const xDirection = (headPosition[0] - tailPosition[0]) / Math.abs(headPosition[0] - tailPosition[0]);
        tailPosition[0] += xDirection;
        if(headPosition[1] !== tailPosition[1]) {
            const yDirection = (headPosition[1] - tailPosition[1]) / Math.abs(headPosition[1] - tailPosition[1]);
            tailPosition[1] += yDirection;
        }
    }
    else if(Math.abs(headPosition[1] - tailPosition[1]) > 1) {
        const yDirection = (headPosition[1] - tailPosition[1]) / Math.abs(headPosition[1] - tailPosition[1]);
        tailPosition[1] += yDirection;
        if(headPosition[0] !== tailPosition[0]) {
            const xDirection = (headPosition[0] - tailPosition[0]) / Math.abs(headPosition[0] - tailPosition[0]);
            tailPosition[0] += xDirection;
        }
    }

    tailVisited[`${tailPosition[0]},${tailPosition[1]}`] = true;
  }
});

console.log(Object.entries(tailVisited).length);