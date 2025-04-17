import { Dispatch, SetStateAction } from "react";
import { Detail, Item, Modifier, Stat } from "./Item";
import KeywordHighlighter from "../components/KeywordHighlighter";
import { clsx } from "clsx";

export type TooltipController = {
  item: Item | null;
  x: number;
  y: number;
  side: "left" | "right";
  locked: boolean;
};

type Updater = Dispatch<SetStateAction<TooltipController>>;

function createTooltipController(e: React.MouseEvent, item: Item | null): TooltipController {
  const rect = (e.target as HTMLElement).getBoundingClientRect();
  const side = rect.left < window.innerWidth / 2 ? "right" : "left";

  return {
    x: side === "right" ? rect.right + 10 : rect.left - 10,
    y: rect.top,
    item,
    side,
    locked: false,
  };
}

export function handleMouseEnter(
  controller: TooltipController,
  updateTooltipController: Updater,
  e: React.MouseEvent,
  item: Item | null
) {
  if (controller.locked) return;

  updateTooltipController(createTooltipController(e, item));
}

export function handleMouseLeave(controller: TooltipController, updateTooltipController: Updater) {
  if (controller.locked) return;
  updateTooltipController((t) => ({ ...t, item: null }));
}

export function handleClick(updateTooltipController: Updater, e: React.MouseEvent, item: Item) {
  updateTooltipController(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const element = e.target as HTMLElement;
      if (element.closest(".vault-grid-slot-used") || element.closest(".item-tooltip")) {
        return;
      }
      
      updateTooltipController((t) =>
        t.locked ? { ...t, locked: false, item: null } : t
      );
      
      document.removeEventListener("click", handleDocumentClick);
    };
  
    document.addEventListener("click", handleDocumentClick);

    return { ...createTooltipController(e, item), locked: true }
  });
}

export const DefaultTooltipController: TooltipController = {
  x: 0,
  y: 0,
  item: null,
  side: "right",
  locked: false,
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
        right: controller.side === "left" ? window.innerWidth - controller.x : undefined,
        top: controller.y,
      }}
    >
      <div className="item-tooltip-header">
        <div className="item-tooltip-header-name">{controller.item?.name}</div>
        <div className="item-tooltip-header-badges">
          <div className="item-tooltip-badge item-tooltip-badge-rarity">{controller.item?.rarity}</div>
          <div className="item-tooltip-badge item-tooltip-badge-type">{controller.item?.type}</div>
        </div>
      </div>
      <div className="item-tooltip-content">
        <ItemDetails details={controller.item.details} />
        <div className="item-tooltip-credits">
          <span className="credits-icon"></span>
          <span>Credits</span>
          <span className="credits-value">{controller.item.value}</span>
        </div>
      </div>
    </div>
  );
}

function DummyDetails() {
  return (
    <>
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia voluptates et, qui nesciunt provident quas
        temporibus facere voluptate reiciendis omnis repellat cum quos quam repudiandae accusantium recusandae hic
        incidunt repellendus.
      </span>
      <hr />
      <span>Hello world</span>
      <hr />
    </>
  );
}

function ItemDetails({ details }: { details: Detail[] }) {
  if (!details || details.length === 0) {
    return <DummyDetails />;
  }

  return details.map((detail) => (
    <>
      <DetailBlock detail={detail} />
      <hr />
    </>
  ));
}

function DetailBlock({ detail }: { detail: Detail }) {
  if (detail.type === "modifiers" && detail.modifiers) {
    return (
      <div className="item-details-modifiers">
        {detail.modifiers.map((modifier, i) => (
          <div key={i} className="item-details-modifier">
            <ModifierDetail modifier={modifier} />
          </div>
        ))}
      </div>
    );
  }

  if (detail.type === "stats" && detail.stats) {
    return (
      <div className="item-details-modifiers">
        {detail.stats.map((stat, i) => (
          <div key={i} className="item-details-stat">
            <StatDetail stat={stat} />
          </div>
        ))}
      </div>
    );
  }

  return <span>{detail.type}</span>;
}

function ModifierDetail({ modifier }: { modifier: Modifier }) {
  if (modifier.type === "trait" || modifier.type === "modifier") {
    return (
      <>
        <div className={`item-${modifier.type}-name`}>{modifier.name}</div>
        <div>
          <KeywordHighlighter text={modifier.description} />
        </div>
      </>
    );
  }

  if (modifier.type === "text") {
    return <KeywordHighlighter text={modifier.description} />;
  }

  if (modifier.type === "increase" || modifier.type === "decrease") {
    return (
      <div>
        <span className={`item-details-modifier-${modifier.type}`}>{modifier.type === "increase" ? "▲" : "▼"}</span>
        <KeywordHighlighter text={modifier.description} />
      </div>
    );
  }

  return <span>!! ERROR !!</span>;
}

function StatDetail({ stat }: { stat: Stat }) {
  return (
    <div
      className={clsx(
        "item-details-stat",
        stat.change > 0 && "item-details-stat-increase",
        stat.change < 0 && "item-details-stat-decrease"
      )}
    >
      <div className="item-details-stat-values-container">
        <div>
          <span className="item-details-stat-name">{stat.name}</span>
          <span className="item-details-stat-change-value">
            {stat.change > 0 ? "+" : "-"}
            {Math.abs(stat.change)}
          </span>
        </div>
        <div className="item-details-stat-value">
          {stat.base + stat.change}
          <sup>{stat.change > 0 ? "↗" : "↘"}</sup>
        </div>
      </div>
      <div
        className="item-details-stat-bar"
        style={
          {
            "--progress-bar-base-fill": `${stat.base}%`,
            "--progress-bar-change-fill": `${Math.abs(stat.change)}%`,
            "--progress-bar-change-left": `${stat.change > 0 ? stat.base : stat.base + stat.change}%`,
          } as React.CSSProperties
        }
      ></div>
    </div>
  );
}
