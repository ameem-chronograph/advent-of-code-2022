const fs = require("fs");

const createDirectory = (name, parent) => ({
  name,
  parent,
  children: [],
  size: 0,
});
const createFile = (size, name, parent) => ({ name, size, parent });
const tokenize = (line) => line.split(" ").filter((token) => token);

const buildDirectoryTree = (lines) => {
  const root = createDirectory("/", null);
  let currNode = root;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const tokens = tokenize(line);
    if (tokens[0] === "$") {
      if (tokens[1] === "cd") {
        if (tokens[2] === "/") {
          currNode = root;
        } else if (tokens[2] === "..") {
          currNode = currNode.parent;
        } else {
          const childDir = currNode.children.find(
            (child) => child.children && child.name === tokens[2]
          );
          currNode = childDir;
        }
      } else if (tokens[1] === "ls") {
        while (i + 1 < lines.length) {
          const nextLineTokens = tokenize(lines[i + 1]);
          if (nextLineTokens[0] === "$") {
            break;
          }
          currNode.children.push(
            nextLineTokens[0] === "dir"
              ? createDirectory(nextLineTokens[1], currNode)
              : createFile(
                  parseInt(nextLineTokens[0]),
                  nextLineTokens[1],
                  currNode
                )
          );
          i++;
        }
      }
    }
  }
  return root;
};

const addSizes = (root) => {
  if (!root.children) {
    return root.size;
  }
  root.children.forEach((c) => (root.size += addSizes(c)));
  return root.size;
};

const findMin = (root, target) => {
  let bestMin = Infinity;
  if (root.children) {
    root.children.forEach((c) => {
      const childBestMin = findMin(c, target);
      bestMin = Math.min(bestMin, childBestMin);
    });
    if (root.size >= target) {
      bestMin = Math.min(bestMin, root.size);
    }
  }
  return bestMin;
};

const lines = fs.readFileSync("./input.txt", "utf8").split("\n");
const root = buildDirectoryTree(lines);
addSizes(root);
console.log(findMin(root, 30000000 - (70000000 - root.size)));
