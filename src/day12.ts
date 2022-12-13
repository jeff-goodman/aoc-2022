import * as fs from "fs";

const map = getInput();
let paths: number[][][] = []; // [X, Y]

export function partA() {
    let start: number[] = [];
    let end: number[] = [];
    map.forEach((r, i) => {
        if(r.indexOf('S') >= 0) start = [i, r.indexOf('S')];
        if(r.indexOf('E') >= 0) end = [i, r.indexOf('E')];
    });
    paths.push([start]);

    let found = false;
    let foundPath: number[][] = [];
    let loops = 0;
    while(!found) {
        console.log({ loops, len: paths.length });
        loops++;
        const newPaths: number[][][] = [];
        for(let i = 0; i < paths.length; i++) {
            const last = paths[i][paths[i].length-1];
            const lastHeight = getHeight(last);
            getOpts(last, lastHeight).forEach(loc => {
                // if(paths[i].findIndex(([x, y]) => x === loc[0] && y === loc[1]) === -1) {
                    // console.log('not found, adding to path');
                    newPaths.push([
                        ...paths[i],
                        loc,
                    ]);
                    if(loc[0] === end[0] && loc[1] === end[1]) {
                        found = true;
                        foundPath = [
                            ...paths[i],
                            loc,
                        ];
                    }
                // } else {
                    // console.log('already found');
                // }
            });
            // newPaths.sort((a, b) => b.length - a.length);
            // newPaths.splice(10_000);
        }
        paths = newPaths;
    }
    return foundPath.length;

}

export function partB() {

}

function getHeight(loc: number[]): number {
    const a = map[loc[0]][loc[1]];
    let h = 'e'.charCodeAt(0);
    if(a === 'S') h = 96;
    if(a === 'E') h = 123;
    return h;
}

function getOpts(loc: number[], height: number): number[][] {
    const opts: number[][] = []
    // check up
    if(map[loc[0]-1] !== undefined) {
        const up = map[loc[0]-1][loc[1]].charCodeAt(0);
        if(up !== undefined && up <= height+1) {
            opts.push([loc[0]-1, loc[1]])
        }
    }

    // check down
    if(map[loc[0]+1] !== undefined) {
        const down = map[loc[0]+1][loc[1]].charCodeAt(0);
        if(down !== undefined && down <= height+1) {
            opts.push([loc[0]+1, loc[1]])
        }
    }

    // check left
    const left = map[loc[0]][loc[1]-1]?.charCodeAt(0);
    if(left !== undefined && left <= height+1) {
        opts.push([loc[0], loc[1]-1])
    }

    // check right
    const right = map[loc[0]][loc[1]+1]?.charCodeAt(0);
    if(right !== undefined && right <= height+1) {
        opts.push([loc[0], loc[1]+1])
    }

    return opts;
}

function getInput() {
  return fs.readFileSync("./src/day12input.txt", "utf8").split('\n');
}