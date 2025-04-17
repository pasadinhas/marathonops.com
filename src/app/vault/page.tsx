"use client";

import { useState } from "react";
import { Item } from "./Item";
import { DefaultTooltipController, handleMouseEnter, handleMouseLeave, ItemTooltip } from "./ItemTooltip";
import { MockItems } from "./MockItems";
import { createGrid, Grid, gridFill, gridIsAvailable } from "./grid";

type Placement = {
  item: Item;
  row: number;
  col: number;
};

const GRID_ROWS = 10;
const GRID_COLS = 8;

const placeItem = (grid: boolean[][], item: Item): Placement | null => {
  for (let r = 0; r <= GRID_ROWS - item.rows; r++) {
    for (let c = 0; c <= GRID_COLS - item.cols; c++) {
      if (gridIsAvailable(grid, r, c, item.rows, item.cols)) {
        gridFill(grid, r, c, item.rows, item.cols);
        return { item, row: r, col: c };
      }
    }
  }
  return null;
};

const generateGrid = (items: Item[]) => {
  const grid: Grid = createGrid(GRID_ROWS, GRID_COLS);

  const placements: Placement[] = [];

  for (const item of items) {
    const placement = placeItem(grid, item);
    if (placement) {
      placements.push(placement);
    }
  }

  return { grid, placements };
};

const SlotGrid = () => {
  const { grid, placements } = generateGrid(MockItems);

  const [tooltipController, setTooltipController] = useState(DefaultTooltipController);

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
          onMouseEnter={(e) => handleMouseEnter(setTooltipController, e, placement.item)}
          onMouseLeave={(e) => handleMouseLeave(setTooltipController, e, placement.item)}
        >
          <div className="header">${placement.item.value}</div>
          Item {placement.item.id}
          {placement.item.quantity > 1 && (
            <div className="quantity">x{placement.item.quantity}</div>
          )}
        </div>
      ))}

      {/* Fill empty cells */}
      {Array.from({ length: GRID_ROWS * GRID_COLS }).map((_, i) => {
        const row = Math.floor(i / GRID_COLS);
        const col = i % GRID_COLS;

        const occupied = grid[row][col];
        return !occupied ? (
          <div
            key={`empty-${i}`}
            className="vault-grid-slot"
           
          />
        ) : null;
      })}

      <ItemTooltip controller={tooltipController} />
    </div>
  );
};

export default function Vault() {
  return <SlotGrid />;
}
