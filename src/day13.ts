import * as fs from "fs";

const input = getInput();

export function partA() {
    // 10602 is too high

    // console.dir({ input }, {depth: null})
    const results: boolean[] = [];
    for(let i = 0; i < input.length; i++) {
        results[i] = evaluatePair(input[i][0], input[i][1]);
    }
    // console.log({ results })
    return results.reduce((prev, curr, index) => curr ? prev + index + 1 : prev, 0)
}

export function partB() {

}

function evaluatePair(a: any, b: any): boolean {
    console.log(`Comparing ${a} with ${b}`);
    if(!isNaN(a) && !isNaN(b)) {
        // Both are numbers, so compare
        return a < b;
    }
    if(!isNaN(a)) a = [a];
    if(!isNaN(b)) b = [b];
    let i: number;
    for(i = 0; i < a.length; i++) {
        if(b[i] === undefined) {
            console.log('  - Right side ran out of items');
            return false
        };
        if(evaluatePair(a[i], b[i])) {
            console.log('  - Left side is smaller');
            return true
        } else if (!isNaN(a[i]) && !isNaN(b[i]) && a[i] > b[i]) {
            console.log('  - Right side is smaller');
            return false;
        };
    }
    if(b[i] !== undefined) {
        console.log('  - Left side ran out of items');
        return true
    }
    console.log('  - Both sides ran out of items');
    return false;
}


function getInput() {
  return fs.readFileSync("./src/day13input.txt", "utf8")
    .split('\n\n')
    .map(pair => pair.split('\n').map(entry => JSON.parse(entry)));
}