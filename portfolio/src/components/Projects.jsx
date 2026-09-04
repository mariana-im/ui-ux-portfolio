import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import guardian from "/guardian/image2.png";
import visualize from "/visualize/image1.png";
import sih from "/sih/image3.png";
import hospital from "/hospital/image3.png";
import seing from "/seing/image1.png";
import sazonlocal from "/sazonlocal/image1.png";
import skycheck from "/skycheck/image1.png";
import ludicjam from "/ludicjam/image1.png";

const projectRowClass = "lg:flex lg:justify-between relative";
const titleWrapClass =
  "flex gap-10 text-[1.1rem] lg:text-[1.3rem] items-center";
const titleBlockClass = "flex flex-col min-w-0";
const bigTitleClass =
  "sinoreta whitespace-nowrap overflow-hidden hover:scale-102 ease-in-out duration-300 transition-transform text-ellipsis text-[3rem] lg:text-[4rem] cursor-pointer";
const tagsWrapClass =
  "flex items-center lg:items-start lg:flex-col justify-between mt-1 lg:mt-0";
const tagsTextClass = "lg:text-[1.3rem] text-[1.1rem] font-bold";
const moreButtonClass =
  "group flex border border-[.15rem] gap-2 justify-center rounded-[1.05rem] px-3 lg:px-4 text-[1.1rem] p-[.4rem] lg:p-2";
const arrowClass =
  "transition-transform duration-300 ease-in-out group-hover:translate-x-1 w-[1.1rem]";

const projects = [
  {
    label: "Educational RPG & HCI Research",
    title: "Guardian of the True North",
    tags: "Design • UX Research • Accessibility",
    to: "/guardian",
    image: guardian,
  },
  {
    label: "Cross-platform mobile app for Oracle",
    title: "Visualize",
    tags: "UI/UX • Full-stack • Android • iOS",
    to: "/visualize",
    image: visualize,
  },
  {
    label: "Smart traffic management platform",
    title: "Traffic Control",
    tags: "UI/UX • Front-end • Web • Government-Linked",
    to: "/sih",
    image: sih,
  },
  {
    label: "Hospital management platform",
    title: "Hospital OS",
    tags: "UI/UX • Front-end • Web • Government-Linked",
    to: "/hospital",
    image: hospital,
  },
  {
    label: "Cooking App",
    title: "Sazón Local",
    tags: "UI/UX • Mobile",
    to: "/sazonlocal",
    image: sazonlocal,
  },
  {
    label: "Weather App",
    title: "Sky Check",
    tags: "UI/UX • Front-end • Mobile • Web",
    to: "/skycheck",
    image: skycheck,
  },
];

const otherProjects = [
  {
    label: "Videogame Focused Hackathon",
    title: "Ludic Jam",
    tags: "Visual Identity • Lead Organizer",
    to: "/ludicjam",
    image: ludicjam,
  },
];

function ProjectRow({ label, title, tags, to, onHoverChange, showHint }) {
  const navigate = useNavigate();

  return (
    <div>
      <div className={projectRowClass}>
        <div className={titleWrapClass}>
          <div className={titleBlockClass}>
            <div>{label}</div>
            <div className="flex items-end gap-4">
              <div
                className={bigTitleClass}
                onMouseEnter={() => onHoverChange(true)}
                onMouseLeave={() => onHoverChange(false)}
                onClick={() => navigate(to)}
              >
                {title}
              </div>
              {showHint && (
                <div className="hidden lg:flex items-center mb-[.4rem] gap-1 text-[1rem] text-gray-400 whitespace-nowrap transition-opacity duration-300 ease-in-out">
                  <span>←</span>
                  <span>hover me</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={tagsWrapClass}>
          <div className={tagsTextClass}>{tags}</div>
          <Link to={to} className="self-end">
            <div className={moreButtonClass}>
              <div>More</div>
              <img className={arrowClass} src="Arrow.svg" alt="" />
            </div>
          </Link>
        </div>
      </div>
      <div className="p-3" />
      <hr />
      <div className="p-3" />
    </div>
  );
}

function HoverPreview({ image, visible, position }) {
  return (
    <div
      className="fixed pointer-events-none z-50 transition-opacity duration-150 ease-out"
      style={{
        left: position.x + 24,
        top: position.y - 90,
        opacity: visible ? 1 : 0,
      }}
    >
      <img
        src={image}
        alt=""
        className="w-[22rem] h-[14rem] object-cover rounded-[.6rem] shadow-[0_1rem_2.5rem_rgba(0,0,0,.25)]"
      />
    </div>
  );
}

export default function Projects({ projectsRef, otherRef }) {
  const [hovered, setHovered] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hintDismissed, setHintDismissed] = useState(false);
  const containerRef = useRef(null);

  function handleMouseMove(e) {
    setPos({ x: e.clientX, y: e.clientY });
  }

  const hoveredData =
    hovered != null
      ? [...projects, ...otherProjects][hovered]
      : null;

  return (
    <>
      <div
        ref={projectsRef}
        id="projects"
        className="min-h-screen min-w-screen leading-none assistant pt-30 p-7 lg:pt-30 lg:p-25 leading-none"
        onMouseMove={handleMouseMove}
      >
        <div>
          <div className="sinoreta text-[4.5rem] lg:text-[5.5rem] mb-10 lg:mb-20">
            Projects
          </div>
          <div>
            {projects.map((p, i) => (
              <ProjectRow
                key={p.to}
                label={p.label}
                title={p.title}
                tags={p.tags}
                to={p.to}
                showHint={i === 0 && !hintDismissed}
                onHoverChange={(isHovering) => {
                  setHovered(isHovering ? i : null);
                  if (i === 0 && isHovering) setHintDismissed(true);
                }}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="hidden sinoreta text-[2.5rem] lg:text-[4rem] my-20 mb-10 lg:my-20">
            Other
          </div>
          <div ref={otherRef} id="other" className="hidden">
            {otherProjects.map((p, i) => (
              <ProjectRow
                key={p.to}
                label={p.label}
                title={p.title}
                tags={p.tags}
                to={p.to}
                onHoverChange={(isHovering) =>
                  setHovered(isHovering ? projects.length + i : null)
                }
              />
            ))}
          </div>
        </div>
      </div>

      {hoveredData && (
        <HoverPreview
          image={hoveredData.image}
          visible={hovered != null}
          position={pos}
        />
      )}
    </>
  );
}