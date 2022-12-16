const fs = require("fs");

let min = 0;
let max = 4000000;
const rowObjects = {};
const beaconMap = {};
const sensorMap = {};
fs.readFileSync("input.txt", "utf8")
  .split("\n")
  .map((line) => line.match(/-?\d+/g).map((str) => parseInt(str)))
  .forEach(([sx, sy, bx, by]) => {
    if (!sensorMap[[sx, sy]]) {
      if (!rowObjects[sy]) {
        rowObjects[sy] = [];
      }
      rowObjects[sy].push([sx, sx, true]);
    }
    if (!beaconMap[[bx, by]]) {
      if (!rowObjects[by]) {
        rowObjects[by] = [];
      }
      rowObjects[by].push([bx, bx, true]);
    }
    sensorMap[[sx, sy]] = [bx, by];
    beaconMap[[bx, by]] = true;
  });

const calculateIntervals = (i) => {
  const targetRowObjects = rowObjects[i] || [];
  let intervals = [...targetRowObjects];
  Object.entries(sensorMap).forEach(([sensorStr, beacon]) => {
    const sensor = sensorStr.split(",").map((n) => parseInt(n));
    const distance =
      Math.abs(sensor[0] - beacon[0]) + Math.abs(sensor[1] - beacon[1]);
    const yDistance = Math.abs(i - sensor[1]);
    const remainingDistance = distance - yDistance;

    if (remainingDistance >= 0) {
      const xMin = sensor[0] - remainingDistance;
      const xMax = sensor[0] + remainingDistance;
      intervals.push([xMin, xMax]);
    }
  });
  intervals = intervals
    .map((interval) => {
      if (interval[0] < min && interval[1] < min) {
        return null;
      }
      if (interval[0] > max && interval[1] > max) {
        return null;
      }
      const updatedInterval = [...interval];
      updatedInterval[0] = Math.max(min, interval[0]);
      updatedInterval[1] = Math.min(max, interval[1]);
      return updatedInterval;
    })
    .filter((interval) => interval);
  return intervals;
};

const findMissingX = (intervals) => {
  intervals.sort((a, b) => {
    if (a[0] - b[0] === 0) {
      return a[1] - b[1];
    }
    return a[0] - b[0];
  });

  let prev = null;

  for (let j = 0; j < intervals.length; j++) {
    const next = intervals[j];
    if (!prev) {
      prev = next;
    } else {
      if (next[0] > prev[1] + 1) {
        return next[0] - 1;
      } else {
        prev = [prev[0], Math.max(prev[1], next[1])];
      }
    }
  }
  return null;
};

for (let y = 0; y < max; y++) {
  const intervals = calculateIntervals(y);
  const missingX = findMissingX(intervals);
  if (missingX !== null) {
    console.log(missingX * 4000000 + y);
    break;
  }
}
