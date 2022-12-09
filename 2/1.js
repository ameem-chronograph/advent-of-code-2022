const fs = require("fs");

const opponentMap = {
  A: "R",
  B: "P",
  C: "S",
};

const playerMap = {
  X: "R",
  Y: "P",
  Z: "S",
};

const rps = {
  R: {
    beats: "S",
    points: 1,
  },
  P: {
    beats: "R",
    points: 2,
  },
  S: {
    beats: "P",
    points: 3,
  },
};

const roundScore = (player, opponent) => {
  const playerShape = playerMap[player];
  const opponentShape = opponentMap[opponent];
  const outcomeScore =
    rps[playerShape].beats === opponentShape
      ? 6
      : playerShape === opponentShape
      ? 3
      : 0;
  const shapeScore = rps[playerShape].points;
  return outcomeScore + shapeScore;
};

const total = fs
  .readFileSync("./input.txt", "utf8")
  .split("\n")
  .map((str) => str.split(" "))
  .reduce(
    (total, [opponent, player]) => total + roundScore(player, opponent),
    0
  );
console.log(total);
