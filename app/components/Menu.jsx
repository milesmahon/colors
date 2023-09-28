import { useState } from "react";
import NavigationMenu from "./NavigationMenu.jsx";
import Image from "next/image";

export default function Menu() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <span className="menu absolute hover:opacity-70 top-10 right-10" onClick={() => setShowMenu(!showMenu)}>
      <svg aria-hidden="true" width="20" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.172974" width="20" height="3" rx="1.5" fill="rgb(var(--foreground-rgb))"></rect>
        <rect x="0.172974" y="7" width="20" height="3" rx="1.5" fill="rgb(var(--foreground-rgb))"></rect>
        <rect x="0.172974" y="14" width="20" height="3" rx="1.5" fill="rgb(var(--foreground-rgb))"></rect>
      </svg>
      <style jsx>{`
        .menu {
          position: inline-block;
          cursor: pointer;
          z-index: 100;
        }`
      }</style>
      {showMenu ?
        <div className="menu absolute bg-secondary right-10 w-64 top-10 p-10">
          <NavigationMenu closeMenu={() => setShowMenu(false)} />
        </div>
        : <div></div>
      }
    </span>
  );
}
