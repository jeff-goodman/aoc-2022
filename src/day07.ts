import * as fs from 'fs';

const input = getInput();
const folders: {[key: string]: number} = {'/': 0};
let currentFolder = '';

//  higher than 1_293_692

export function partA() {
    buildList();
    let total = 0;
    Object.values(folders).forEach(value => {
        if(value <= 100_000) {
            total += value;
        }
    });
    return total;
}

export function partB() {
    const totalSpace = 70_000_000;
    const neededSpace = 30_000_000;
    const usedSpace = folders['/'];
    const unusedSpace = totalSpace - usedSpace;
    const toDelete = neededSpace - unusedSpace;
    const bigEnough = Object.values(folders).filter(val => val > toDelete);
    return Math.min(...bigEnough);
}

function getInput() {
    return fs.readFileSync('./src/day07input.txt', 'utf8').split('\n');
}

function buildList() {
    input.forEach(cmd => {
        if (cmd.startsWith('$ cd ..')) {
            let newFolder: string;
            if(currentFolder.lastIndexOf('/') === 0) {
                newFolder = '/';
            } else {
                newFolder = currentFolder.substring(0, Math.max(0, currentFolder.lastIndexOf('/')));
            }
            currentFolder = newFolder;
        } else if (cmd.startsWith('$ cd ')) {
            const prevFolder = currentFolder;
            if(currentFolder.length < 1 || currentFolder === '/') {
                currentFolder += cmd.substring(5);
             } else {
                currentFolder += `/${cmd.substring(5)}`;
             }
        } else if (cmd.startsWith('$ ls')) {
            // do nothing
        } else if (cmd.startsWith('dir ')) {
            const temp = currentFolder.length <= 1 ? currentFolder + cmd.substring(4) : currentFolder + `/${cmd.substring(4)}`;
            if(!folders[temp]) {
                folders[temp] = 0;
            }
        } else {
            const [size, filename] = cmd.split(' ');
            Object.entries(folders).forEach(([key, value]) => {
                if(currentFolder.startsWith(key)) {
                    folders[key] = value + Number(size);
                }
            })
        }
    })
}
