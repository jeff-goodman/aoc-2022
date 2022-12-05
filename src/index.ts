import * as day01 from "./day01";
import * as day02 from "./day02";
import * as day04 from "./day04";
import * as day05 from "./day05";

const startTime = Date.now();
console.log({
    welcomeTo: 'Advent of Code 2022',
});

console.table({
    day01A: day01.partA(),
    day01B: day01.partB(),
    day02A: day02.partA(),
    day02B: day02.partB(),
    day04A: day04.partA(),
    day04B: day04.partB(),
    day05A: day05.partA(),
    day05B: day05.partB(),
});

console.log({
    timeElapsed: Date.now() - startTime,
})