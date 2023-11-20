import { useState } from "react";
import NavigationLinks from "./NavigationLinks";

export default function MobileNavbar() {
  const [isShowing, setIsShowing] = useState<boolean>(false);

  return (
    <nav>
      {/* Sliding Panel */}
      {isShowing && (
        <div className="absolute left-0 top-0 flex h-full w-screen flex-col bg-blue-900 pb-[36px] text-white">
          <div className="flex h-full flex-col items-center justify-evenly text-2xl text-white opacity-100">
            <NavigationLinks />
          </div>
        </div>
      )}
      {/* Bottom Nav Bar */}
      <div className="justify-left fixed bottom-0 left-0 flex h-[36px] w-full items-center bg-blue-900 px-2 text-white">
        <button
          className="flex items-center"
          onClick={() => {
            setIsShowing(!isShowing);
          }}
        >
          <span className="sr-only">Navigation Toggle</span>
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </nav>
  );
}
