import { Dispatch, SetStateAction } from "react";
import { Item } from "./Item";

export type TooltipController = {
  item: Item | null;
  x: number;
  y: number;
  side: "left" | "right";
};

type Updater = Dispatch<SetStateAction<TooltipController>>;

export function handleMouseEnter(
  updateTooltipController: Updater,
  e: React.MouseEvent,
  item: Item | null
) {
  const rect = (e.target as HTMLElement).getBoundingClientRect();
  const side = rect.left < window.innerWidth / 2 ? "right" : "left";

  updateTooltipController({
    x: side === "right" ? rect.right + 10 : rect.left - 10,
    y: rect.top,
    item,
    side,
  });
}

export function handleMouseLeave(updateTooltipController: Updater) {
  updateTooltipController((t) => ({ ...t, item: null }));
}

export const DefaultTooltipController: TooltipController = {
  x: 0,
  y: 0,
  item: null,
  side: "right",
};

export function ItemTooltip({ controller }: { controller: TooltipController }) {
  if (!controller.item) {
    return;
  }

  return (
    <div
      className={`item-tooltip vault-item-${controller.item?.rarity}`}
      style={{
        left: controller.side === "right" ? controller.x : undefined,
        right:
          controller.side === "left"
            ? window.innerWidth - controller.x
            : undefined,
        top: controller.y,
      }}
    >
      <div className="item-tooltip-header">
        <div className="item-tooltip-header-name">
          Distance Runner v{controller.item?.id}
        </div>
        <div className="item-tooltip-header-badges">
          <div className="item-tooltip-badge item-tooltip-badge-rarity">
            {controller.item?.rarity}
          </div>
          <div className="item-tooltip-badge item-tooltip-badge-implant">
            Implant
          </div>
        </div>
      </div>
      <div className="item-tooltip-content">
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
          voluptates et, qui nesciunt provident quas temporibus facere voluptate
          reiciendis omnis repellat cum quos quam repudiandae accusantium
          recusandae hic incidunt repellendus.
        </span>
        <hr />
        <span>Hello world</span>
      </div>
    </div>
  );
}
