const fs = require("fs");

const data = fs.readFileSync("./input.txt", "utf-8").split("\n");
const moves = data.map((line) => {
  const [direction, stepsStr] = line.split(" ");
  return [direction, parseInt(stepsStr)];
});

const tailVisited = {"0,0": true};
const rope = Array(10).fill(null).map(() => [0,0]);

moves.forEach(([direction, steps]) => {
  for (let i = 0; i < steps; i++) {
    if (direction === "U") {
        rope[0][0]++;
    } else if (direction === "R") {
        rope[0][1]++;
    } else if (direction === "D") {
        rope[0][0]--;
    } else {
        rope[0][1]--;
    }

    for(let j = 1; j < rope.length; j++) {
        const prev = rope[j - 1];
        const curr = rope[j];
        if(Math.abs(prev[0] - curr[0]) > 1) {
            const xDirection = (prev[0] - curr[0]) / Math.abs(prev[0] - curr[0]);
            curr[0] += xDirection;
            if(prev[1] !== curr[1]) {
                const yDirection = (prev[1] - curr[1]) / Math.abs(prev[1] - curr[1]);
                curr[1] += yDirection;
            }
        }
        else if(Math.abs(prev[1] - curr[1]) > 1) {
            const yDirection = (prev[1] - curr[1]) / Math.abs(prev[1] - curr[1]);
            curr[1] += yDirection;
            if(prev[0] !== curr[0]) {
                const xDirection = (prev[0] - curr[0]) / Math.abs(prev[0] - curr[0]);
                curr[0] += xDirection;
            }
        }
    }
    tailVisited[`${rope[rope.length-1][0]},${rope[rope.length-1][1]}`] = true;
  }
});

console.log(Object.entries(tailVisited).length);