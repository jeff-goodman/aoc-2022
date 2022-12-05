import * as fs from 'fs';

export function partA() {
    const { stacks, moves }: { stacks: string[][], moves: number[][]} = getInput();
    moves.forEach((move: number[]) => {
        for(let i = 1; i <= move[0]; i++) {
            const val = stacks[move[1] -1].pop();
            if(val) stacks[move[2] -1].push(val);
        }
    });
    return stacks.reduce((prev, curr) => {
        return prev + curr.pop();
    }, '');
}

export function partB() {
    const { stacks, moves }: { stacks: string[][], moves: number[][]} = getInput();
    moves.forEach((move: number[]) => {
        const val = stacks[move[1] -1].splice(-move[0], move[0]);
        if(val) stacks[move[2] -1].push(...val);
    });
    return stacks.reduce((prev, curr) => {
        return prev + curr.pop();
    }, '');
}

function getInput(): {stacks: string[][], moves: number[][] } {
    const input = fs.readFileSync('./src/day05input.txt', 'utf8');
    const chunks = input.split('\n\n');
    const stacks: string[][] = [];
    const moves: number[][] = []

    const rows = chunks[0].split('\n');
    rows.forEach(row => {
        row.match(/.{1,4}/g)?.reduce((prev, curr, i) => {
            if(!stacks[i]) stacks[i] = []
            if(curr.trim().length && isNaN(+curr)) return stacks[i].unshift(curr.charAt(1));
            return 0;
        }, 0);
    });

    const rows2 = chunks[1].split('\n');
    rows2.forEach((row, i) => {
        row.match(/(\d+)/g)?.reduce((prev, curr) => {
            if(!moves[i]) moves[i] = [];
            return moves[i].push(+curr)
        }, 0);
    }, 0)

    return { stacks, moves };
}