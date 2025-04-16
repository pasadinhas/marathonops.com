import "./glitch.css";

type GlitchEffectProperties = {
  className: string;
  stacks: number;
  text: string;
};

export default function GlitchEffect({ className, stacks, text }: GlitchEffectProperties) {
  return (
    <div
      className={`glitch ${className}`}
      style={{ "--stacks": stacks } as React.CSSProperties}
    >
      {[...Array(stacks).keys()].map((i) => (
        <span className="quote" key={i} style={{ "--index": i } as React.CSSProperties}>
          {text}
        </span>
      ))}
    </div>
  );
}
