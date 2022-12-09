const fs = require('fs');

const values = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split('\n');
let curr = 0;
let max = 0;
for(let value of values) {
    if(value === '') {
        max = Math.max(max, curr);
        curr = 0;
    }
    else {
        curr += parseInt(value);
    }
}
console.log(max);