import { MarathonIcon } from "./MarathonIcon";

export default function Header() {
  return (
    <div className="header">
      <div className="header-icon-container">
        <MarathonIcon color="black" />
      </div>
      <div className="header-navigation-container">
        <span className="header-navigation-title">Marathon Ops</span>
      </div>
    </div>
  );
}
