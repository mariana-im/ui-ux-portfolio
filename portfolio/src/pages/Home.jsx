import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Projects from "../components/Projects";
import About from "../components/About";

export default function Home() {
  const projectsRef = useRef(null);
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash && document.querySelector(location.hash)) {
      document
        .querySelector(location.hash)
        .scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const scrollToProjects = () =>
    projectsRef.current?.scrollIntoView({ behavior: "smooth" });
  const scrollToHome = () =>
    homeRef.current?.scrollIntoView({ behavior: "smooth" });
  const scrollToAbout = () =>
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div>
      <Header
        homeRef={homeRef}
        onProjectsClick={scrollToProjects}
        onHomeClick={scrollToHome}
        onAboutClick={scrollToAbout}
      />
      <Projects projectsRef={projectsRef} homeRef={homeRef} />
      <About aboutRef={aboutRef} />
    </div>
  );
}
