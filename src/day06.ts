import * as fs from 'fs';

const input = getInput();

export function partA() {
    return getMarker(input, 4);
}

export function partB() {
   return getMarker(input, 14);
}

function getInput() {
    return fs.readFileSync('./src/day06input.txt', 'utf8');
}

function getMarker(message: string, l: number): number {
    let marker = 0;
    message.split('').reduce((prev, curr, i, arr) => {
        if(prev.length < (l-1)) {
            return prev += curr;
        }
        const found = checkDuplicates(prev + curr);
        if(found !== 0) {
            return prev.slice(1) + curr;
        } else {
            marker = i+1;
            arr.splice(0);
        }
        return prev;
    });
    return marker;
}

function checkDuplicates(s: string) {
    let found = 0;
    [...s].forEach((val, i, arr) => {
        const regex = new RegExp(`${val}`, 'g');
        found += (s.match(regex)?.length ?? 0) > 1 ? 1 : 0;
    });
    return found;
}
