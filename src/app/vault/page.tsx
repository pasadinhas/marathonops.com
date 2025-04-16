type Item = {
  id: number;
  rarity: string;
  value: number;
  quantity: number;
  rows: number;
  cols: number;
};

type Placement = {
  item: Item;
  row: number;
  col: number;
};

const GRID_ROWS = 10;
const GRID_COLS = 8;

const items: Item[] = [
  { id: 0, rows: 2, cols: 4, rarity: "superior", value: 1200, quantity: 1 },
  { id: 1, rows: 2, cols: 2, rarity: "enhanced", value: 600, quantity: 1 },
  { id: 2, rows: 2, cols: 2, rarity: "prestige", value: 4200, quantity: 1 },
  { id: 3, rows: 1, cols: 2, rarity: "enhanced", value: 120, quantity: 1 },
  { id: 4, rows: 1, cols: 2, rarity: "deluxe", value: 75, quantity: 1 },
  { id: 5, rows: 1, cols: 2, rarity: "standard", value: 30, quantity: 14 },
  { id: 6, rows: 1, cols: 1, rarity: "standard", value: 15, quantity: 240 },
  { id: 7, rows: 1, cols: 1, rarity: "enhanced", value: 25, quantity: 5 },
  { id: 8, rows: 1, cols: 1, rarity: "enhanced", value: 25, quantity: 1 },
  { id: 9, rows: 1, cols: 1, rarity: "enhanced", value: 40, quantity: 2 },
  { id: 10, rows: 1, cols: 1, rarity: "enhanced", value: 30, quantity: 1 },
  { id: 11, rows: 1, cols: 1, rarity: "enhanced", value: 5, quantity: 8 },
];

const checkIfItemFits = (grid: boolean[][], r: number, c: number, rows: number, cols: number) => {
  for (let dr = 0; dr < rows; dr++) {
    for (let dc = 0; dc < cols; dc++) {
      if (grid[r + dr][c + dc]) {
        return false;
      }
    }
  }
  return true;
}

const updateGrid = (grid: boolean[][], r: number, c: number, rows: number, cols: number) => {
  for (let dr = 0; dr < rows; dr++) {
    for (let dc = 0; dc < cols; dc++) {
      grid[r + dr][c + dc] = true;
    }
  }
}

const placeItem = (grid: boolean[][], item: Item): Placement | null => {
  for (let r = 0; r <= GRID_ROWS - item.rows; r++) {
    for (let c = 0; c <= GRID_COLS - item.cols; c++) {
      if (checkIfItemFits(grid, r, c, item.rows, item.cols)) {
        updateGrid(grid, r, c, item.rows, item.cols);
        return { item, row: r, col: c };
      }
    }
  }
  return null;
}

const generateGrid = () => {
  // Matrix of cells take are already taken.
  const grid: boolean[][] = Array.from({ length: GRID_ROWS }, () =>
    Array.from({ length: GRID_COLS }, () => false)
  );

  const placements: Placement[] = [];

  for (const item of items) {
    const placement = placeItem(grid, item)
    if (placement) {
      placements.push(placement);
    }
  }

  return { grid, placements };
};

const SlotGrid = () => {
  const { grid, placements } = generateGrid();

  return (
    <div
      className="vault-grid"
      style={{
        gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
        gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
        gap: "10px",
      }}
    >
      {placements.map((placement) => (
        <div
          key={placement.item.id}
          className={`vault-grid-slot vault-item-${placement.item.rarity}`}
          style={{
            gridRow: `${placement.row + 1} / span ${placement.item.rows}`,
            gridColumn: `${placement.col + 1} / span ${placement.item.cols}`,
          }}
        >
          <div className="header">${placement.item.value}</div>
          Item {placement.item.id}
          {placement.item.quantity > 1 && <div className="quantity">x{placement.item.quantity}</div>}
        </div>
      ))}

      {/* Fill empty cells */}
      {Array.from({ length: GRID_ROWS * GRID_COLS }).map((_, i) => {
        const row = Math.floor(i / GRID_COLS);
        const col = i % GRID_COLS;

        const occupied = grid[row][col]
        return !occupied ? (
          <div
            key={`empty-${i}`}
            className="vault-grid-slot"
            style={{
              gridRow: row + 1,
              gridColumn: col + 1,
            }}
          />
        ) : null;
      })}
    </div>
  );
};

export default function Vault() {
  return <SlotGrid />
}