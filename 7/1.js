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

const calcSizes = (root, atMost) => {
  let totalSize = 0;
  let totalMatching = 0;
  root.children.forEach(c => {
    if(!c.children) {
        totalSize += c.size;
    }
    else {
        const [childTotal, childMatching] = calcSizes(c, atMost);
        totalSize += childTotal;
        totalMatching += childMatching;
    }
  })
  root.size = totalSize;
  if(totalSize <= atMost) {
    totalMatching += totalSize;
  }
  return [totalSize, totalMatching]
};

const lines = fs.readFileSync("./input.txt", "utf8").split("\n");
const root = buildDirectoryTree(lines);
console.log(calcSizes(root, 100000));
