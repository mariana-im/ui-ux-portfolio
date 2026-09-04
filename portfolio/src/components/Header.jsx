import { useState } from "react";
import DrawFloat from "./DrawFloat";

export default function Header({ homeRef, onProjectsClick, onHomeClick, onAboutClick }) {
  const [active, setActive] = useState(null);

  return (
    <div ref={homeRef} id="home" className="min-h-screen min-w-screen leading-none">
      <div className="sm:justify-start justify-center flex">
        <div className="flex p-5 gap-3 sm:p-10 pt-6 fixed z-20 sm:gap-6">
          <div className="flex items-stretch text-[1.2rem] sm:text-[1.3rem] border border-[.15rem] rounded-[1.05rem] bg-white">
            <button
              onClick={() => {
                setActive("home");
                onHomeClick();
              }}
              className={`flex items-center h-full transition duration-300 ease-in-out hover:bg-gray-200 rounded-full px-3 active:scale-90 ${
                active === "home" ? "" : ""
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                setActive("projects");
                onProjectsClick();
              }}
              className={`flex items-center h-full transition duration-300 ease-in-out hover:bg-gray-200 rounded-full px-3 active:scale-90 ${
                active === "projects" ? "" : ""
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => {
                setActive("about");
                onAboutClick();
              }}
              className={`flex items-center h-full transition duration-300 ease-in-out hover:bg-gray-200 rounded-full px-3 active:scale-90 ${
                active === "about" ? "" : ""
              }`}
            >
              About
            </button>
          </div>
          <div className="hover:bg-black active:scale-90 border-black transition duration-300 ease-in-out hover:text-white text-[1.2rem] sm:text-[1.3rem] border border-[.15rem] rounded-[1.05rem] bg-white items-center justify-center align-center flex px-[.6rem]">
            <a target="_blank" href="MarianaIslasCV.pdf">
              Resume
            </a>
          </div>
        </div>
      </div>

      <div className="relative h-screen overflow-hidden">
        {/* Background layer: interactive draw canvas, sits behind everything.
            DrawFloat's own root is already `relative` internally (it needs
            that for its canvas/hint children), so we give IT the absolute
            positioning via a wrapper rather than passing "absolute" into
            its className directly — avoids a relative/absolute class clash
            that was pushing it into normal document flow and shoving the
            name off-screen. */}
        <div className="absolute inset-0 z-0">
          <DrawFloat className="h-full w-full" />
        </div>

        {/* Foreground: name + tagline, non-interactive so drawing works through it */}
        <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center">
          <div className="text-[3.7rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[8rem] sinoreta">
            Mariana Islas
          </div>
          <div className="mt-3 text-[1.2rem] sm:text-[1.2rem] md:text-[1.5rem] lg:text-[2.5rem] sinoreta">
            UI/UX Designer • Accessibility • Developer
          </div>
        </div>
      </div>
    </div>
  );
}