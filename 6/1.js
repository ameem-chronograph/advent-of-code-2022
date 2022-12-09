const fs = require('fs');
const data = fs.readFileSync('./input.txt', "utf8")

let currStart = 0;
let i = 1;
const MARKER_LENGTH = 4;

while(i < data.length) {
    for(let j = currStart; j < i; j++) {
        if(data[j] === data[i]) {
            currStart = j + 1;
        }
    }
    if(i - currStart + 1 === MARKER_LENGTH) {
        console.log(i + 1);
        break;
    }
    i++;
}

console.log(data.slice(currStart, currStart + MARKER_LENGTH))