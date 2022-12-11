import * as fs from "fs";

const grid = getInput();

export function partA() {
  return countVisibleTrees(grid);
}

export function partB() {

  // 2442960 is too high

  let score = 0;
  for(let row = 0; row < grid.length; row++) {
    for(let col = 0; col < grid[0].length; col++) {
      if(row === 0 || row === grid.length-1 || col === 0 || col === grid[0].length-1) {
        continue;
      }
      const tree = grid[row][col];
      const treesLeft = grid[row].filter((val, i) => i < col);
      const treesRight = grid[row].filter((val, i) => i > col);
      const colData = grid.map(row => row[col]);
      const treesAbove = colData.filter((val, i) => i < row);
      const treesBelow = colData.filter((val, i) => i > row);
      const newScore =
        getViewScore(treesLeft.reverse(), tree) *
        getViewScore(treesRight, tree) *
        getViewScore(treesAbove.reverse(), tree) *
        getViewScore(treesBelow, tree);
      // console.log({
      //   row, col, tree, newScore,
      //   treesLeft, treesRight,
      //   treesAbove, treesBelow,
      // })
      score = Math.max(score, newScore);
    }
  }
  return score;
}

function getViewScore(trees: number[], tree: number) {
  let score = 0;
  for(let n = 0; n < trees.length; n++) {
    if(trees[n] < tree) {
      score++;
    } else {
      score++;
      return score;
    }
  }
  return score;
}

function countVisibleTrees(grid: number[][]): number {
  let count = 0;
  for(let row = 0; row < grid.length; row++) {
    for(let col = 0; col < grid[0].length; col++) {
      if(row === 0 || row === grid.length-1 || col === 0 || col === grid[0].length-1) {
        count++;
        continue;
      }
      const tree = grid[row][col];
      const treesLeft = grid[row].filter((val, i) => i < col);
      const treesRight = grid[row].filter((val, i) => i > col)
      const colData = grid.map(row => row[col]);
      const treesAbove = colData.filter((val, i) => i < row);
      const treesBelow = colData.filter((val, i) => i > row);
      if (
        tree > Math.max(...treesLeft) ||
        tree > Math.max(...treesRight) ||
        tree > Math.max(...treesAbove) ||
        tree > Math.max(...treesBelow)
      ) {
        count++;
      }
      // console.log({
      //   row, col, tree,
      //   treesLeft, treesRight,
      //   treesAbove, treesBelow,
      //   count
      // })
    }
  }
  return count;

}

function getInput() {
  const rows = fs.readFileSync("./src/day08input.txt", "utf8").split('\n');
  return rows.map(row => row.split('').map(Number));
}
