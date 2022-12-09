const fs = require("fs");

const parse = (data) =>
  data
    .split("\n")
    .map((line) =>
      line
        .split(",")
        .map((ranges) => ranges.split("-").map((str) => parseInt(str)))
    );

const isOverlap = ([[a, b], [c, d]]) =>
  (a <= c && c <= b) || (c <= a && a <= d);

const pairs = parse(fs.readFileSync("./input.txt", { encoding: "utf8" }));
console.log(pairs.reduce((acc, curr) => (isOverlap(curr) ? acc + 1 : acc), 0));
