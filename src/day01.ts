import * as fs from 'fs';

export function partA(): number {
    const elves = getElves();
    return Math.max(...elves)
}

export function partB(): number {
    const elves = getElves();
    elves.sort((a, b) => b - a);
    const top3 = elves.slice(0, 3);
    return (top3.reduce((a, b) => a + b, 0));

}

function getElves(): number[] {
    const input = fs.readFileSync('./src/day01input.txt', 'utf8');

    const elves: number[] = [];
    input.split('\n\n').map(e => {
        let total = 0;
        e.split('\n').forEach(c => total += +c);
        elves.push(total);
    });

    return elves;

}