import { Dispatch, SetStateAction } from "react";
import { InfoBlock, InfoStat, InfoType, Item } from "./Item";
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

      updateTooltipController((t) => (t.locked ? { ...t, locked: false, item: null } : t));

      document.removeEventListener("click", handleDocumentClick);
    };

    document.addEventListener("click", handleDocumentClick);

    return { ...createTooltipController(e, item), locked: true };
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
        <ItemDetails info={controller.item.info} />
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

function ItemDetails({ info }: { info: InfoBlock[] }) {
  if (!info || info.length === 0) {
    return <DummyDetails />;
  }

  return info.map((block) => (
    <>
      <div className="item-info-block">
        {block.map((info, i) => (
          <div key={i}>
            <Info info={info} />
          </div>
        ))}
      </div>
      <hr />
    </>
  ));
}

function Info({ info }: { info: InfoType }) {
  if (info.type === "trait" || info.type === "modifier") {
    return (
      <>
        <div className={`item-info-${info.type}-name`}>{info.name}</div>
        <div>
          <KeywordHighlighter text={info.description} />
        </div>
      </>
    );
  }

  if (info.type === "text") {
    return <KeywordHighlighter text={info.description} />;
  }

  if (info.type === "increase" || info.type === "decrease") {
    return (
      <>
        <span className={`item-details-modifier-${info.type}`}>{info.type === "increase" ? "▲" : "▼"}</span>
        <KeywordHighlighter text={info.description} />
      </>
    );
  }

  if (info.type === "sources") {
    return (
      <>
        <div className={`item-info-sources-name`}>Sources</div>
        {Object.keys(info.sources).map((source) => (
          <>
            <div>{source}</div>
            {info.sources[source].length > 0 && (
              <ul className="item-info-source-locations">
                {info.sources[source].map((location, i) => (
                  <li key={i}>{location}</li>
                ))}
              </ul>
            )}
          </>
        ))}
      </>
    );
  }

  if (info.type === "usage") {
    return (
      <>
        <div className={`item-info-usage-name`}>Usage</div>
        {info.usage.map((u, i) => (
          <div key={i}>{u}</div>
        ))}
      </>
    );
  }

  if (info.type === "stat") {
    return <StatDetail stat={info} />;
  }

  return <div>!! ERROR !!</div>;
}

function StatDetail({ stat }: { stat: InfoStat }) {
  return (
    <div className={clsx(stat.change > 0 && "item-info-stat-increase", stat.change < 0 && "item-info-stat-decrease")}>
      <div className="item-info-stat-values-container">
        <div>
          <span>{stat.name}</span>
          <span className="item-info-stat-change-value">
            {stat.change > 0 ? "+" : "-"}
            {Math.abs(stat.change)}
          </span>
        </div>
        <div className="item-info-stat-value">
          {stat.base + stat.change}
          <sup>{stat.change > 0 ? "↗" : "↘"}</sup>
        </div>
      </div>
      <div
        className="item-info-stat-bar"
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
