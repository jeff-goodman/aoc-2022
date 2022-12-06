import * as fs from 'fs';
import { exit } from 'process';

const input = getInput();

export function partA() {
    let marker = 0;
    input.split('').reduce((prev, curr, i, arr) => {
        if(prev.length < 3) {
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

export function partB() {
    let marker = 0;
    input.split('').reduce((prev, curr, i, arr) => {
        if(prev.length < 13) {
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

function getInput() {
    return fs.readFileSync('./src/day06input.txt', 'utf8');
}

function checkDuplicates(s: string) {
    let found = 0;
    [...s].forEach((val, i, arr) => {
        const regex = new RegExp(`${val}`, 'g');
        found += (s.match(regex)?.length ?? 0) > 1 ? 1 : 0;
    });
    return found;
}
