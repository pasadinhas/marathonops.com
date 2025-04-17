const KEYWORDS = ["exfil", "Immobilize", "Overheat", "Toxin", "Hardware"];
const KEYWORD_REGEX = new RegExp(`(${KEYWORDS.join("|")})`, "gi");

export default function KeywordHighlighter({ text }: { text: string }) {
  return text.split(KEYWORD_REGEX).map((part, i) =>
    KEYWORDS.some((keyword) => part.toLowerCase() === keyword.toLowerCase()) ? (
      <span key={i} className="highlight-keyword">
        {part}
      </span>
    ) : (
      part
    )
  );
}
