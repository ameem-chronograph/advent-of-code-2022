const fs = require("fs");

const targetRow = 2000000;
const targetRowObjects = [];

const beaconMap = {};
const sensorMap = {};
fs.readFileSync("input.txt", "utf8")
  .split("\n")
  .map((line) => line.match(/-?\d+/g).map((str) => parseInt(str)))
  .forEach(([sx, sy, bx, by]) => {
    if (sy === targetRow && !sensorMap[[sx, sy]]) {
      targetRowObjects.push([sx, sx, true]);
    }
    if (by === targetRow && !beaconMap[[bx, by]]) {
      targetRowObjects.push([bx, bx, true]);
    }
    sensorMap[[sx, sy]] = [bx, by];
    beaconMap[[bx, by]] = true;
  });

const intervals = [...targetRowObjects];
Object.entries(sensorMap).forEach(([sensorStr, beacon]) => {
  const sensor = sensorStr.split(",").map((n) => parseInt(n));
  const distance =
    Math.abs(sensor[0] - beacon[0]) + Math.abs(sensor[1] - beacon[1]);
  const yDistance = Math.abs(targetRow - sensor[1]);
  const remainingDistance = distance - yDistance;

  if (remainingDistance >= 0) {
    const xMin = sensor[0] - remainingDistance;
    const xMax = sensor[0] + remainingDistance;
    intervals.push([xMin, xMax]);
  }
});

let total = 0;
intervals.sort((a, b) => {
  if (a[0] - b[0] === 0) {
    return a[1] - b[1];
  }
  return a[0] - b[0];
});

let prev = null;
let objectCount = 0;
intervals.forEach((next, i) => {
  if (next[2]) {
    objectCount++;
  }
  if (!prev) {
    prev = next;
  } else {
    if (next[0] > prev[1] + 1) {
      total += prev[1] - prev[0] + 1 - objectCount;
      prev = next;
      objectCount = 0;
    } else {
      prev = [prev[0], Math.max(prev[1], next[1])];
      if (i === intervals.length - 1) {
        total += prev[1] - prev[0] + 1 - objectCount;
        objectCount = 0;
      }
    }
  }
});

console.log(total);
