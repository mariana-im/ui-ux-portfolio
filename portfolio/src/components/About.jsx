import qme from "/qme.png";

export default function About({ aboutRef }) {
  return (
    <div
      ref={aboutRef}
      id="about"
      className="assistant w-screen pt-25 p-7 lg:p-25 lg:h-screen items-center align-center justify-center flex flex-col leading-none"
    >
      <div className="sinoreta text-[4.5rem] lg:text-[5.5rem] text-center mb-10 lg:mb-20">
        About Me
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-40">
        <div className="lg:w-[45%] items-center flex justify-center text-[2rem] text-justify">
          Hello! I'm Mariana Islas, a UI/UX designer passionate about creating experiences that are intentional, accessible, and genuinely usable.
 <br /> <br />
I love combining creativity with logic. Designing with accessibility in mind from the start, then building it myself to make sure that intention carries all the way through.
        </div>
        <div className="items-center flex justify-center">
          <img
            className="rounded-[50%] xl:h-[15rem] h-[15rem] w-[14.5rem] xl:w-[14.5rem]"
            src={qme}
            alt="A photo of Mariana Islas"
          />
        </div>
      </div>
    </div>
  );
}
