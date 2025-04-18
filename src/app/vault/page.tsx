"use client";

import { useState } from "react";
import { Item } from "./Item";
import { DefaultTooltipController, handleClick, handleMouseEnter, handleMouseLeave, ItemTooltip } from "./ItemTooltip";
import { MockItems } from "./MockItems";
import { createGrid, Grid, gridFill, gridIsAvailable } from "./grid";
import clsx from "clsx";

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

  const sortedItems = items.sort((a, b) => {
    const areaA = a.rows * a.cols;
    const areaB = b.rows * b.cols;

    if (areaA !== areaB) return areaB - areaA;
    return b.rows - a.rows;
  });

  for (const item of sortedItems) {
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
          className={clsx(
            "vault-grid-slot",
            "vault-grid-slot-used",
            `vault-item-${placement.item.rarity}`,
            placement.item === tooltipController.item && "vault-grid-slot-selected"
          )}
          style={{
            gridRow: `${placement.row + 1} / span ${placement.item.rows}`,
            gridColumn: `${placement.col + 1} / span ${placement.item.cols}`,
          }}
          onMouseEnter={(e) => handleMouseEnter(tooltipController, setTooltipController, e, placement.item)}
          onMouseLeave={() => handleMouseLeave(tooltipController, setTooltipController)}
          onClick={(e) => handleClick(setTooltipController, e, placement.item)}
        >
          <div className="vault-grid-slot-header">${placement.item.value}</div>
          Item {placement.item.id}
          {placement.item.quantity > 1 && <div className="quantity">x{placement.item.quantity}</div>}
        </div>
      ))}

      {/* Fill empty cells */}
      {Array.from({ length: GRID_ROWS * GRID_COLS }).map((_, i) => {
        const row = Math.floor(i / GRID_COLS);
        const col = i % GRID_COLS;

        const occupied = grid[row][col];
        return !occupied ? <div key={`empty-${i}`} className="vault-grid-slot" /> : null;
      })}

      <ItemTooltip controller={tooltipController} />
    </div>
  );
};

export default function Vault() {
  return <SlotGrid />;
}
