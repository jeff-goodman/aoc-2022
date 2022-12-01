import * as day01 from "./day01";
import * as day25 from "./day25";

console.log({
    welcomeTo: 'Advent of Code 2022',
});

console.table({
    day01A: day01.partA(),
    day01B: day01.partB(),
    day25: day25.run(),
});