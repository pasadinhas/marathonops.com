type MarathonIconProperties = {
  color: string
}

export function MarathonIcon({color = "black"}: MarathonIconProperties) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
    >
      <defs>
        <mask id="marathon-mask">
          <rect width="100%" height="100%" fill="white" />
          <circle cx="50" cy="38" r="31" fill="black" />
          <rect width="12" height="50" fill="black" x="44" y="50%" />
        </mask>
      </defs>
      <circle cx="50" cy="50" r="50" fill={color} mask="url(#marathon-mask)" />
    </svg>
  );
}
