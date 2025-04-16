import "./glitch.css";

type GlitchProperties = {
  className: string;
  stacks: number;
  text: string;
};

export default function Glitch({ className, stacks, text }: GlitchProperties) {
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
