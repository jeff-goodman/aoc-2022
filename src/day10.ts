import * as fs from "fs";

const commands = getInput();
const cycles: number[] = [];
let X = 1;

export function partA() {
    buildCycles();
    return [20, 60, 100, 140, 180, 220].reduce((sum, n) => {
        return sum += n * cycles[n-1]
    }, 0);
}

export function partB() {
    let hPos = 0;
    const screen = cycles.reduce((screen, val, i) => {
        if(i % 40 === 0) {
            screen += '\n';
            hPos = 0;
        };
        if(val >= hPos-1 && val <= hPos+1) {
            screen += '#';
        } else {
            screen += '.';
        }
        hPos++;
        return screen;
    }, '');
    console.log(screen);
    return 0;
}

function getInput() {
  return fs.readFileSync("./src/day10input.txt", "utf8").split('\n');
}

function buildCycles() {
    commands.forEach((cmd, i) => {
        cycles[cycles.length] = X;
        if(cmd === 'noop') {
            // do nothing
        }
        if(cmd.startsWith('addx')) {
            const [instr, n] = cmd.split(' ');
            cycles[cycles.length] = X;
            X += +n;
        }
    })
}
