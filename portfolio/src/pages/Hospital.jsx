import DetailNav from "../components/DetailNav";
import DetailFooter from "../components/DetailFooter";

import image1 from "/hospital/image1.png";
import image2 from "/hospital/image2.png";

export default function Hospital() {
  return (
    <div className="overflow-x-hidden pb-0 overflow-hidden text-justify leading-none">
      <DetailNav />

      <div className="flex assistant flex-col pb-0 p-7 pt-20 lg:pb-0 lg:p-25">
        <div className="py-8 pt-10 lg:px-85">
          <div className="justify-between pb-2">
            <div className="text-left sinoreta pb-1 text-5xl font-bold lg:text-5xl">
              Hospital Management System
            </div>
            <div className="text-xl pb-2">Digital Patient Record Platform</div>
          </div>
          <div className="">
            <div>
              <b>Role:</b> UI/UX Designer & Front-End Developer.
            </div>
            <div>
              <b>Skills:</b> HTML, CSS, Tailwind, React, Vite, TypeScript,
              Figma, Information Architecture.
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
              Built for HIES (Sonora's children's hospital in Hermosillo, Sonora, Mexico),
              this web-based hospital management system replaces a physical,
              paper-based record-keeping workflow with an organized digital
              platform for managing patient records.
            </div>

            <div className="font-bold pb-1">Problem</div>
            <div className="pb-6">
              Physical record-keeping meant staff regularly lost time
              searching for patient files, with no consistent structure
              governing how records were organized or retrieved. Moving that
              workflow online meant more than digitizing the paper, it meant
              rethinking how records should be structured in the first place
              so staff could actually find what they needed, faster than
              before.
            </div>

                <div className="pb-6">
                  I structured the information architecture around how
                  staff actually search for and use patient records, not
                  around how the data happened to be stored on paper.

                  Interfaces were designed in Figma first, focused on making
                  the transition from physical to digital feel like less
                  friction, not more.
                </div>

            <div className="font-bold pb-1">Solution</div>
            <div className="pb-6">
              I built the platform using React, TypeScript, and Vite,
              styled with Tailwind and CSS, translating the Figma
              designs into a working system. The core of the work was
              structural: organizing patient records into a clear, searchable
              hierarchy so staff could locate a file in a few clicks instead
              of digging through physical folders, directly addressing the
              time-loss problem the original workflow created.
            </div>

              <div className="justify-center flex lg:block">
                <img
                  className="pb-6"
                  loading="lazy"
                  src={image2}
                  alt="Log in page of the Hospital Management System showing a form for staff to enter their credentials"
                />
              </div>


            <div className="font-bold pb-1">Outcome</div>
            <div className="pb-6">
              {/* TODO: fill in with a concrete result if you have one — course grade/feedback,
              specific time-savings figure, instructor evaluation, etc. */}
              The result was a fully digital patient record system with a
              structured, searchable architecture, a direct replacement for
              the physical workflow's biggest weakness, and a project that
              sharpened how I think about information architecture beyond
              just visual UI design. This software is currently on the process of being implemented at 
              HIES (Sonora's children's hospital) in Hermosillo, Sonora, Mexico.
            </div>

            <div className="font-bold pb-1">Reflections</div>
            <div className="pb-6">
              {/* TODO: adjust if there's a more specific takeaway you'd rather highlight */}
              This project pushed me to think about interface design as a
              structural problem first, not just a visual one, since the
              real challenge was reorganizing how records are searched and
              retrieved, not how they look on screen. Seeing the system move
              toward real use at HIES also reinforced how much responsibility
              comes with designing for a healthcare context, where a
              confusing or slow interface has consequences well beyond user
              frustration.
            </div>
          </div>

                      <iframe
                      title="Figma prototype of the Hospital Management System"
              className="w-full aspect-video rounded-[.6rem] pb-6"
              src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/bbn3hdxKPK45w4YRADn8DE/HIES?node-id=798-63&t=Yf2WuxQjrM1TfWae-1"
              allowFullScreen
            />
        </div>

        <DetailFooter />
      </div>
    </div>
  );
}