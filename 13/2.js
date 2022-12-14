const fs = require("fs");

const parse = (str) => {
  const stack = [];
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (char === "[") {
      stack.push([]);
    } else if (char === "]") {
      const top = stack.pop();
      if (!stack.length) {
        return top;
      }
      stack[stack.length - 1].push(top);
    } else if (!isNaN(char)) {
      let end = i;
      while (!isNaN(str[end])) {
        end++;
      }
      const parsed = parseInt(str.slice(i, end));
      if (!stack.length) {
        return parsed;
      }
      stack[stack.length - 1].push(parsed);
      i = end - 1;
    }
  }
};

const getOrder = (first, second) => {
  if (Number.isInteger(first) && Number.isInteger(second)) {
    return first - second;
  }
  if (!Array.isArray(first)) {
    first = [first];
  }
  if (!Array.isArray(second)) {
    second = [second];
  }

  let i = 0;
  while (i < first.length && i < second.length) {
    const order = getOrder(first[i], second[i]);
    if(order !== 0) {
        return order;
    }
    i++;
  }
  return first.length - second.length;
};

const lines = fs.readFileSync("input.txt", "utf-8").split("\n");
const items = [];
for (line of lines) {
  if (line !== "") {
    items.push(parse(line));
  }
}
let dividerA = [2];
let dividerB = [6];
items.push(dividerA, dividerB);

items.sort((a, b) => getOrder(a, b));

let total = 1;
items.forEach((item, index) => {
  if (item === dividerA || item === dividerB) {
    total *= index + 1;
  }
});

console.log(total);
