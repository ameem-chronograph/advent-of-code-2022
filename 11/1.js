const fs = require("fs");

const lines = fs.readFileSync("input.txt", "utf-8").split("\n");

let lineGroups = [[]];
lines.forEach((line) => {
  if (line === "") {
    lineGroups.push([]);
  } else {
    lineGroups[lineGroups.length - 1].push(line);
  }
});

const monkeys = lineGroups.map((lineGroup) => {
  const operation = lineGroup[2].match(/= (.*) (.) (.*)/);
  const monkey = {
    id: parseInt(lineGroup[0].match(/(\d+)/)[1]),
    items: [...lineGroup[1].matchAll(/(\d+)/g)].map((match) =>
      parseInt(match[0])
    ),
    operation: {
      left: !isNaN(operation[1]) ? parseInt(operation[1]) : operation[1],
      operator: operation[2],
      right: !isNaN(operation[3]) ? parseInt(operation[3]) : operation[3],
    },
    test: {
      divisibleBy: parseInt(lineGroup[3].match(/(\d+)/)[1]),
      ifTrue: parseInt(lineGroup[4].match(/(\d+)/)[1]),
      ifFalse: parseInt(lineGroup[5].match(/(\d+)/)[1]),
    },
    inspectionCount: 0,
  };
  return monkey;
});

const NUM_ROUNDS = 20;
for (let i = 0; i < NUM_ROUNDS; i++) {
  for (let j = 0; j < monkeys.length; j++) {
    const monkey = monkeys[j];
    const numItems = monkey.items.length;
    for (let k = 0; k < numItems; k++) {
      monkey.inspectionCount++;
      let worryLevel = monkey.items.shift();
      const left =
        monkey.operation.left === "old" ? worryLevel : monkey.operation.left;
      const right =
        monkey.operation.right === "old" ? worryLevel : monkey.operation.right;
      worryLevel = Math.floor(
        (monkey.operation.operator === "+" ? left + right : left * right) / 3
      );

      if (worryLevel % monkey.test.divisibleBy === 0) {
        monkeys[monkey.test.ifTrue].items.push(worryLevel);
      } else {
        monkeys[monkey.test.ifFalse].items.push(worryLevel);
      }
    }
  }
}
console.log(
  monkeys
    .map((monkey) => monkey.inspectionCount)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((acc, curr) => acc * curr)
);
