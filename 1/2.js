const fs = require('fs');

function insert(arr, value) {
    let i = arr.length - 1;
    if(arr[i] >= value) {
        return arr;
    }
    arr[i] = value;
    while(i > 0 && arr[i] > arr[i - 1]) {
        let temp = arr[i - 1];
        arr[i - 1] = arr[i];
        arr[i] = temp; 
        i--;
    }
    return arr;
}

const values = fs.readFileSync('./input.txt', 'utf8').split('\n');
let curr = 0;
let top3 = [0, 0, 0]; 
for(let value of values) {
    if(value === '') {
        insert(top3, curr);
        curr = 0;
    }
    else {
        curr += parseInt(value);
    }
}
console.log(top3.reduce((acc, curr) => acc + curr));
