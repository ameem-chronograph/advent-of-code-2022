const fs = require("fs");

const commonChar = (a, b, c) => {

    const aChars = new Set();
    const abChars = new Set();

    [...a].forEach(char => aChars.add(char));
    [...b].forEach(char => {
        if(aChars.has(char)) {
            abChars.add(char);
        }
    });

    for(let char of c) {
        if(abChars.has(char)) {
            return char;
        }
    }
}

const badges = [];
const sacks = fs.readFileSync('./input.txt', 'utf8').split('\n');
for(let i = 0; i < sacks.length; i+=3 ) {
    const badge = commonChar(sacks[i], sacks[i+1], sacks[i+2]);
    badges.push(badge);
}

const prioritySum = badges.reduce((sum, badge) => {
    if(badge === badge.toLowerCase()) {
        return sum + 1 + (badge.charCodeAt(0) - 'a'.charCodeAt(0));
    }
    else {
        return sum + 27 + (badge.charCodeAt(0) - 'A'.charCodeAt(0));
    }
}, 0);

console.log(prioritySum);