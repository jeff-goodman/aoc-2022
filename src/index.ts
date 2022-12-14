import * as day01 from "./day01";
import * as day02 from "./day02";
import * as day03 from "./day03";
import * as day04 from "./day04";
import * as day05 from "./day05";
import * as day06 from "./day06";
import * as day07 from "./day07";
import * as day08 from "./day08";
import * as day10 from "./day10";
import * as day11 from "./day11";

const startTime = Date.now();
console.log({
    welcomeTo: 'Advent of Code 2022',
});

console.table({
    day01A: day01.partA(),
    day01B: day01.partB(),
    day02A: day02.partA(),
    day02B: day02.partB(),
    day03A: day03.partA(),
    day03B: day03.partB(),
    day04A: day04.partA(),
    day04B: day04.partB(),
    day05A: day05.partA(),
    day05B: day05.partB(),
    day06A: day06.partA(),
    day06B: day06.partB(),
    day07A: day07.partA(),
    day07B: day07.partB(),
    day08A: day08.partA(),
    day08B: day08.partB(),
    day10A: day10.partA(),
    day10B: day10.partB(),
    day11A: day11.partA(),
    day11B: day11.partB(),
});

console.log({
    timeElapsed: Date.now() - startTime,
})