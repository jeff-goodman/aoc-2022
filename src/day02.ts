import * as fs from 'fs';

type Rule = { [key: string]: string };
type PlayValue = { [key: string]: number };

const playValue: PlayValue = {
    A: 1,
    B: 2,
    C: 3,
};

const playValuePartA: PlayValue  = {
    X: 1,
    Y: 2,
    Z: 3,
};

const winRule: Rule = {
    A: "C",
    B: "A",
    C: "B",
};

const loseRule: Rule = Object.fromEntries(
    Object.entries(winRule).map(a => a.reverse())
);

const guide = getInput();

export function partA(): number {
    let score = 0;
    guide.map(pair => {
        const p1 = playValue[pair[0]];
        const p2 = playValuePartA[pair[1]];
        score += getScore(p1, p2);
    });
    return score;
}

export function partB(): number {
    let score = 0;
    guide.map((pair: string[]) => {
        const p1 = playValue[pair[0]];
        let p2 = 0;
        if (pair[1] === 'X') {
            p2 = playValue[winRule[pair[0]]];
        } else if (pair[1] === 'Y') {
            p2 = playValue[pair[0]];
        } else if (pair[1] === 'Z') {
            p2 = playValue[loseRule[pair[0]]];
        }
        score += getScore(p1, p2);
    });
    return score;
}


function getInput(): string[][] {
    const input = fs.readFileSync('./src/day02input.txt', 'utf8');
    return input.split('\n').map(a => a.split(' '));
}

function getScore(p1: number, p2: number): number {
    let score = 0;
    const diff = p2 - p1;
    if (diff === -2 || diff === 1) {
        score += p2 + 6;
    } else if (diff === 0) {
        score += p2 + 3;
    } else {
        score += p2;
    }
    return score;
}