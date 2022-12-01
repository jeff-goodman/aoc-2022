import * as fs from 'fs';

function getPoints(): number[][] {
    const input = fs.readFileSync('./src/day25input.txt', 'utf8');
    const pointsInput = input.split('\n');
    const points: number[][] = [];

    pointsInput.forEach(p => {
        let coords: number[] = [];
        coords = p.split(',').map(c => +c);
        points.push(coords);
    })
    return points;
}

export function run() {
    return getPoints().length;
}