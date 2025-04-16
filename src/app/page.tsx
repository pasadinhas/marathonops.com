"use client";

import Glitch from "./components/glitch/glitch";
import { useEffect, useState } from "react";

export default function Home() {
  const [secondsRemaining, setSecondsRemaining] = useState("");
  const marathonReleaseTimestamp = new Date("2025-09-23T00:00:00Z").getTime();

  useEffect(() => {
    setInterval(() => {
      const secondsRemaining = Math.max(
        0,
        Math.floor((marathonReleaseTimestamp - Date.now()) / 1000)
      );
      setSecondsRemaining(secondsRemaining.toString(2));
    });
  }, [marathonReleaseTimestamp]);

  return (
    <>
      <div className="header">
        <div className="header-icon-container">
          <object type="image/svg+xml" data="img/marathon.svg"></object>
        </div>
        <div className="header-navigation-container">
          <span className="header-navigation-title">Marathon Ops</span>
        </div>
      </div>
      <div className="content">
        <div className="hero-banner">
          <Glitch
            text={secondsRemaining}
            stacks={7}
            className="countdown-container"
          />
          <Glitch
            text="Escape will make me God"
            stacks={4}
            className="quote-container"
          />
        </div>
        <div className="features-grid">
          <div className="feature-title feature-grid-title-1">
            <span>Vault</span>
          </div>
          <div className="feature-title feature-grid-title-2">
            <span>Contracts</span>
          </div>
          <div className="feature-title feature-grid-title-3">
            <span>Black Market</span>
          </div>
          <div className="feature-description feature-grid-description-1">
            <p>
              Have full access to your vault, check which items are the most
              valuable and manage your vault&apos;s content.
            </p>
          </div>
          <div className="feature-description feature-grid-description-2">
            <p>
              Check the available contracts from each faction, but remember -
              MIDA is watching.
            </p>
          </div>
          <div className="feature-description feature-grid-description-3">
            <p>
              Be on the lookout for bargains on the Black Market. Track the
              price history of each item and make the best deal.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
