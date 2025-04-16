"use client";

import GlitchEffect from "./components/glitch/GlitchEffect";
import BinaryCountdown from "./components/BinaryCountdown";

const MARATHON_RELEASE_DATE = new Date("2025-09-23T00:00:00Z")

export default function Home() {
  return (
        <div className="hero-banner">
          <BinaryCountdown targetDate={MARATHON_RELEASE_DATE} />
          <GlitchEffect
            text="Escape will make me God"
            stacks={4}
            className="quote-container"
          />
        </div>

  );
}
