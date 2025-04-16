import { useEffect, useState } from "react";
import GlitchEffect from "./glitch/GlitchEffect";

type BinaryCountdownProperties = {
  targetDate: Date;
};

export default function BinaryCountdown({
  targetDate,
}: BinaryCountdownProperties) {
  const [secondsRemaining, setSecondsRemaining] = useState("");

  useEffect(() => {
    setInterval(() => {
      const secondsRemaining = Math.max(
        0,
        Math.floor((targetDate.getTime() - Date.now()) / 1000)
      );
      setSecondsRemaining(secondsRemaining.toString(2));
    });
  }, [targetDate]);

  return (
    <GlitchEffect
      text={secondsRemaining}
      stacks={7}
      className="countdown-container"
    />
  );
}
