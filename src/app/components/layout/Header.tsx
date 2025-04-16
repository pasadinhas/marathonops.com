"use client";

import { usePathname } from "next/navigation";
import { MarathonIcon } from "./MarathonIcon";
import Link from "next/link";
import clsx from "clsx";

export default function Header() {
  const pathname = usePathname();
  const navLinks = [
    { href: "/", label: "[ Home ]" },
    { href: "/loadouts", label: "[ Loadouts ]" },
    { href: "/vault", label: "[ Vault ]" },
  ];

  return (
    <div className="header">
      <div className="header-icon-container">
        <MarathonIcon color="black" />
      </div>
      <nav className="header-navigation-container">
        <span className="header-navigation-title">Marathon Ops</span>
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              "nav-item",
              pathname === "/" && href === "/" && "nav-item-active",
              href !== "/" && pathname.startsWith(href) && "nav-item-active"
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
