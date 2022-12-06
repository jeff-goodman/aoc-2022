import * as fs from 'fs';
import { exit } from 'process';

const rucksacks = getRucksacks();

export function partA() {
    return rucksacks.reduce((value, rucksack) => {
        const duplicate = getDuplicate(rucksack);
        return value += duplicate ? getValue(duplicate) : 0;
    }, 0);
}

export function partB() {
    const duplicates: string[] = [];
    for(let i = 0; i < rucksacks.length; i += 3 ) {
        duplicates.push(getTriplicate([
            rucksacks[i][0] + rucksacks[i][1],
            rucksacks[i+1][0] + rucksacks[i+1][1],
            rucksacks[i+2][0] + rucksacks[i+2][1],
        ])!);
    }
    return duplicates.reduce((value, item) => value += getValue(item), 0)
}

function getValue(item: string) {
    const scores = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return scores.indexOf(item) + 1;
}

function getDuplicate([a, b]: [string, string]) {
    const arrA = a.split('');
    let found: string | undefined;
    arrA.forEach(a => {
        if (b.indexOf(a) !== -1) {
            found = a;
            exit;
        }
    });
    return found;
}

function getTriplicate([a, b, c]: [string, string, string]) {
    const arrA = a.split('');
    let found: string | undefined;
    arrA.forEach(a => {
        if(b.indexOf(a) !== -1) {
            if(c.indexOf(a) !== -1) {
                found = a;
                exit;
            }
        }
    });
    return found;
}

function getRucksacks(): any[] {
    const input = fs.readFileSync('./src/day03input.txt', 'utf8');
    const rucksacks = input.split('\n');
    return rucksacks.map(rucksack => {
        return [rucksack.slice(0, rucksack.length / 2), rucksack.slice(rucksack.length / 2)]
    });
}