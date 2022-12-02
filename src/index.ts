import * as day01 from "./day01";
import * as day02 from "./day02";

const startTime = Date.now();
console.log({
    welcomeTo: 'Advent of Code 2022',
});

console.table({
    day01A: day01.partA(),
    day01B: day01.partB(),
    day02A: day02.partA(),
    day02B: day02.partB(),
});

console.log({
    timeElapsed: Date.now() - startTime,
})