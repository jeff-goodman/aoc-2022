import * as fs from 'fs';

const elves = getElves();

export function partA(): number {
    return Math.max(...elves)
}

export function partB(): number {
    elves.sort((a, b) => b - a);
    const top3 = elves.slice(0, 3);
    return (top3.reduce((a, b) => a + b, 0));

}

function getElves(): number[] {
    const input = fs.readFileSync('./src/day01input.txt', 'utf8');

    const elves: number[] = [];
    input.split('\n\n').map(e => {
        const total = e.split('\n').reduce((a, b) => a + +b, 0);
        elves.push(total);
    });

    return elves;

}