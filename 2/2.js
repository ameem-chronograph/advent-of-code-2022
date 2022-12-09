const fs = require("fs");

const opponentMap = {
  A: "R",
  B: "P",
  C: "S",
};

const rps = {
  R: {
    beats: "S",
    loses: "P",
    points: 1,
  },
  P: {
    beats: "R",
    loses: "S",
    points: 2,
  },
  S: {
    beats: "P",
    loses: "R",
    points: 3,
  },
};

const roundScore = (playerStrategy, opponent) => {
  const opponentShape = opponentMap[opponent];
  if (playerStrategy === "X") {
    // lose
    return rps[rps[opponentShape].beats].points;
  } else if (playerStrategy === "Y") {
    // draw
    return 3 + rps[opponentShape].points;
  } else {
    // win
    return 6 + rps[rps[opponentShape].loses].points;
  }
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
