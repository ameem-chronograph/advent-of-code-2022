const fs = require("fs");

const commonChars = (a, b) => {
    const common = [];
    const aChars = new Set();
    [...a].forEach(char => aChars.add(char));
    [...b].forEach(char => {
        if(aChars.has(char)) {
            common.push(char);
            aChars.delete(char);
        }
    });
    return common;
}

const errors = [];

fs.readFileSync('./input.txt', 'utf8').split('\n').forEach(sack=> {
    const compartmentSize = sack.length / 2;
    const left = sack.slice(0, compartmentSize);
    const right = sack.slice(compartmentSize);
    commonChars(left, right).forEach(c => errors.push(c));
});

const prioritySum = errors.reduce((sum, error) => {
    if(error === error.toLowerCase()) {
        return sum + 1 + (error.charCodeAt(0) - 'a'.charCodeAt(0));
    }
    else {
        return sum + 27 + (error.charCodeAt(0) - 'A'.charCodeAt(0));
    }
}, 0);

console.log(prioritySum);