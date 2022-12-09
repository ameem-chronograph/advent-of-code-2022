const fs = require("fs");

const parse = (data) =>
  data
    .split("\n")
    .map((line) =>
      line
        .split(",")
        .map((ranges) => ranges.split("-").map((str) => parseInt(str)))
    );

const isContained = ([[a, b], [c, d]]) =>
  (a <= c && d <= b) || (c <= a && b <= d);

const pairs = parse(fs.readFileSync("./input.txt", { encoding: "utf8" }));
console.log(pairs.reduce((acc, curr) => (isContained(curr) ? acc + 1 : acc), 0));
