export type Grid = boolean[][];

export function createGrid(rows: number, cols: number) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => false)
  );
}

export function gridIsAvailable(
  grid: Grid,
  r: number,
  c: number,
  rows: number,
  cols: number
) {
  for (let dr = 0; dr < rows; dr++) {
    for (let dc = 0; dc < cols; dc++) {
      if (grid[r + dr][c + dc]) {
        return false;
      }
    }
  }
  return true;
}

export function gridFill(
  grid: Grid,
  r: number,
  c: number,
  rows: number,
  cols: number
) {
  for (let dr = 0; dr < rows; dr++) {
    for (let dc = 0; dc < cols; dc++) {
      grid[r + dr][c + dc] = true;
    }
  }
}
