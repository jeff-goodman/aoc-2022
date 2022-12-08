import * as fs from 'fs';

type TreeContent = {
    [key: string]: File | Folder;
};

type File = number;

interface Folder {
    [key: string]: TreeContent;
}

const commands = getInput();
const tree: Folder = {};
let currentFolder = 'root';
tree[currentFolder] = {};

export function partA() {
    let i = 0;

    while(i < commands.length) {
        const cmd = getCommand(commands[i]);
        const output = commands[i];
        i++;

        if (cmd === undefined) {

            if (output.startsWith('dir ')) {
                tree[currentFolder][output.substring(4)] = {};
                continue;
            } else {
                const [size, filename] = output.split(' ');
                addFile(filename, +size);
                tree[currentFolder][filename] = +size;
                continue;
            }

        } else if (['cd /', 'ls'].includes(cmd)) {
            continue;
        } else if (cmd?.startsWith('cd ..')) {
            currentFolder = currentFolder.substring(0, currentFolder.lastIndexOf('/'))
            continue;
        } else if(cmd?.startsWith('cd ')) {
            currentFolder += `/${cmd.substring(3)}`;
            continue;
        }

    }
    console.log(tree);
}

export function partB() {


}

function getInput() {
    return fs.readFileSync('./src/day07input.txt', 'utf8').split('\n');
}

function getCommand(s: string): string | undefined {
    if(s.startsWith('$ ')) {
        return s.substring(2);
    }
    return undefined;
}

function addFile(filename: string, size: number) {
    const path = currentFolder.split('/');
    tree[path]

}
