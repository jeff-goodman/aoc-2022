import * as fs from 'fs';

const pairs = getPairs();

export function partA() {
    let i = 0;
    pairs.forEach(pair => {
        if(
            (+pair[0][0] >= +pair[1][0] && +pair[0][1] <= +pair[1][1]) ||
            (+pair[1][0] >= +pair[0][0] && +pair[1][1] <= +pair[0][1])
        ) i++;
    });
    return i;
}

export function partB() {
    let i = 0;
    pairs.forEach(pair => {
        if(
            inRange(pair[0][0], pair[1]) ||
            inRange(pair[0][1], pair[1]) ||
            inRange(pair[1][0], pair[0]) ||
            inRange(pair[1][1], pair[0])
        ) i++;
    });
    return i;
}

function inRange(num: string, range: string[]) {
    return +num >= +range[0] && +num <= +range[1];
}

function getPairs(): any[][] {
    const input = fs.readFileSync('./src/day04input.txt', 'utf8');
    const pairs: any[][] = [];
    input.split('\n').reduce((prev, curr) => {
        pairs.push(curr.split(',').map(pair => pair.split('-')));
        return 0;
    }, 0);
    return pairs;
}