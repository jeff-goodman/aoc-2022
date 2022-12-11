import * as fs from "fs";

interface Monkey {
    items: number[];
    operatorMethod: string;
    operatorValue: number | string;
    testValue: number;
    onTrue: number;
    onFalse: number;
    count: number;
}

interface MonkeyModulo {
    items: number[][];
    operatorMethod: string;
    operatorValue: number | string;
    testValue: number;
    onTrue: number;
    onFalse: number;
    count: number;
}

const input = getInput();
const monkeyData = input.split('\n\n').map(m => m.split('\n'));

export function partA() {
    const monkeys: Monkey[] = getStartingMonkeys(monkeyData);
    // console.dir({monkeys}, {depth: null});
    for(let round = 1; round <= 20; round++) {
        for(let m = 0; m < monkeys.length; m++) {
            const len = monkeys[m].items.length;
            for(let i = 0; i < len; i++) {
                let [worry] = monkeys[m].items.splice(0, 1);
                monkeys[m].count++;
                let value: number;
                if(monkeys[m].operatorValue === 'old') {
                    value = worry;
                } else {
                    value = Number(monkeys[m].operatorValue);
                }
                switch(monkeys[m].operatorMethod) {
                    case '+':
                        worry += value;
                        break;
                    case '*':
                        worry *= value;
                        break;
                }
                worry = Math.floor(worry / 3);
                let throwTo: number;
                if(worry % monkeys[m].testValue === 0) {
                    throwTo = monkeys[m].onTrue;
                } else {
                    throwTo = monkeys[m].onFalse;
                }
                monkeys[throwTo].items.push(worry);
            }
        }
    }
    const monkeyBusiness = monkeys.map(m => m.count);
    monkeyBusiness.sort((a, b) => b - a);
    // console.dir({monkeys}, {depth: null});
    return monkeyBusiness[0] * monkeyBusiness[1];
}

export function partB() {
    const divisor = Number.MAX_SAFE_INTEGER;
    const monkeyStart = getStartingMonkeys(monkeyData)
    const monkeys: MonkeyModulo[] = monkeyStart.map(m => {
        return {
            ...m,
            items: m.items.map(i => {
                const it: number[] = [];
                for(let n = 0; n < monkeyStart.length; n++) {
                    let newValue = i;
                    while (newValue % monkeyStart[n].testValue === 0) {
                        newValue /= monkeyStart[n].testValue
                    }
                    it.push(newValue)
                }
                return it;
            }),
        }
    });

    // 32446636740 is too high
    // console.dir({monkeys}, {depth: null});
    for(let round = 1; round <= 20; round++) {
        for(let m = 0; m < monkeys.length; m++) {
            const len = monkeys[m].items.length;
            for(let i = 0; i < len; i++) {
                let [worry] = monkeys[m].items.splice(0, 1);
                monkeys[m].count++;
                let value: number[];
                value = monkeys.map((monkey, ind) => {
                    if(monkey.operatorValue === 'old') {
                        return worry[ind];
                    } else {
                        return +monkey.operatorValue;
                    }
                });

                console.log({ round, i, value, worry });
                switch(monkeys[m].operatorMethod) {
                    case '+':
                        worry = worry.map((w, ind) => {
                            let newValuePlus = w + value[ind];
                            while (newValuePlus % monkeys[ind].testValue === 0) {
                                newValuePlus /= monkeys[ind].testValue;
                            }
                            return newValuePlus;
                        });
                        break;
                    case '*':
                        worry = worry.map((w, ind) => {
                            let multiplier = value[ind];
                            let newValueTimes = w * multiplier;
                            while (newValueTimes % monkeys[ind].testValue === 0) {
                                newValueTimes /= monkeys[ind].testValue;
                            }
                            return newValueTimes;
                        });
                        break;
                }
                let throwTo: number;
                if(worry[m] % monkeys[m].testValue === 0) {
                    throwTo = monkeys[m].onTrue;
                } else {
                    throwTo = monkeys[m].onFalse;
                }
                monkeys[throwTo].items.push(worry);
            }
        }
    }
    const monkeyBusiness = monkeys.map(m => m.count);
    monkeyBusiness.sort((a, b) => b - a);
    console.dir({monkeys}, {depth: null});

    return monkeyBusiness[0] * monkeyBusiness[1];
}

function getInput() {
  return fs.readFileSync("./src/day11input.txt", "utf8");
}

function getStartingMonkeys(monkeyData: string[][]): Monkey[] {
    const monkeys: Monkey[] = [];
    for(let i = 0; i < monkeyData.length; i++) {
        monkeys[i] = {
            items: monkeyData[i][1].substring(17).split(', ').map(Number),
            operatorMethod: monkeyData[i][2].substring(23, 24),
            operatorValue: monkeyData[i][2].split(' ').pop() ?? 0,
            testValue: Number(monkeyData[i][3].split(' ').pop()),
            onTrue: Number(monkeyData[i][4].split(' ').pop()),
            onFalse: Number(monkeyData[i][5].split(' ').pop()),
            count: 0,
        };
    }
    return monkeys;
}

