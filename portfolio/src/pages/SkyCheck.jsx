import DetailNav from "../components/DetailNav";
import DetailFooter from "../components/DetailFooter";

import image1 from "/skycheck/image1.png";
import image2 from "/skycheck/image2.png";
import image3 from "/skycheck/image3.png";

export default function SkyCheck() {
  return (
    <div className="overflow-x-hidden pb-0 overflow-hidden text-justify leading-none">
      <DetailNav />

      <div className="flex assistant flex-col pb-0 p-7 pt-20 lg:pb-0 lg:p-25">
        <div className="py-8 pt-10 lg:px-85">
          <div className="justify-between pb-2">
            <div className="text-left sinoreta pb-1 text-5xl font-bold lg:text-5xl">
              Sky Check
            </div>
            <div className="text-xl pb-2">Climate Monitoring App</div>
          </div>
          <div className="">
            <div>
              <b>Role:</b> UI/UX Designer &amp; Front-End Developer.
            </div>
            <div>
              <b>Skills:</b> UI/UX Design, User-Centered Design, Data
              Visualization, HTML, CSS, Tailwind, React, Vite, TypeScript,
              Figma.
            </div>
            <div>
              <b>Timeline:</b> Fall 2025.
            </div>
          </div>
        </div>
        <hr />

        <div className="pt-8 gap-40 lg:px-85">
          <div className="">
            <div className="font-bold pb-1">Overview</div>
            <div className="pb-6">
              SkyCheck is a web-based climate monitoring platform developed
              for the 2025 NASA Space Apps Challenge. It provides users with
              access to real-time and historical weather data to support
              planning and decision-making in different fields like
              agriculture, logistics, and travel.
            </div>
            <div className="pb-6">
              <img className="" src={image1} alt="SkyCheck weather visualization interface for desktop showing a map with a search bar, historical data, and a current weather forecast" />
            </div>

            <div className="font-bold pb-1">Problem</div>
            <div className="pb-6">
              Climate data is often complex, fragmented, and difficult to
              interpret for non-technical users. The challenge was to design
              a clear and accessible interface that presents large amounts of
              weather and sky-condition data in a way that supports
              confident, informed decisions across different use cases.
            </div>

            <div className="font-bold pb-1">Solution</div>
            <div className="pb-6">
              I designed and built an interface that pulls real-time and
              historical data from Meteomatics and NASA datasets, then
              simplifies complex, multi-variable weather information into
              clear, digestible visual formats. Rather than presenting raw
              data, the design focused on surfacing exactly what a
              non-expert user needs to make a decision, prioritizing
              clarity over completeness at every screen.
            </div>

                <div className="pb-6">
                  During testing, we received feedback from a
                  professional in the agriculture field who confirmed that
                  SkyCheck could be a valuable tool for planning and
                  decision-making.
                </div>
              <div className="pb-6">
                <img
                  className=""
                  loading="lazy"
                  src={image3}
                  alt="SkyCheck weather visualization interface for mobile showing a map with a search bar, historical data, and a current weather forecast"
                />
              </div>

            <div className="font-bold pb-1">Outcome</div>
            <div className="pb-6">
              {/* TODO: fill in with a concrete result if you have one — where it
              placed at NASA Space Apps, any judge/participant feedback,
              whether it moved beyond the hackathon prototype, etc. */}
              SkyCheck was built and demoed as part of the 2025 NASA Space
              Apps Challenge, translating fragmented climate data into an
              interface that non-technical users could actually act on,
              with positive feedback from an agriculture professional
              confirming its real-world planning value.
            </div>
            <div className="flex justify-center">
              <img
                className="pb-6"
                loading="lazy"
                src={image2}
                alt="SkyCheck dashboard showing weather data and visualizations"
              />
            </div>

            <div className="font-bold pb-1">Reflections</div>
            <div className="pb-6">
              This project strengthened my ability to design clear,
              data-driven interfaces and translate complex information into
              usable visual experiences. Working on SkyCheck reinforced the
              importance of thoughtful dashboards, effective visualizations,
              and user-centered decisions when designing tools meant for
              real-world planning and analysis.
            </div>
          </div>

          
                      <iframe 
                      title="Figma prototype of the SkyCheck weather visualization app"
              className="w-full aspect-video rounded-[.6rem] pb-6"
              src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/nHVVtA6R9tq7aPOUHNIlbL/SkyCheck?node-id=0-1&t=ujYrM1bJ3syFf1P3-1"
              allowFullScreen
            />
        </div>

        <DetailFooter />
      </div>
    </div>
  );
}