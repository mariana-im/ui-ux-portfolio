import DetailNav from "../components/DetailNav";
import DetailFooter from "../components/DetailFooter";

import image1 from "/guardian/image1.png";
import image2 from "/guardian/image2.png";
import image3 from "/guardian/image3.png";
import image4 from "/guardian/image4.png";
import image5 from "/guardian/image5.png";
import image6 from "/guardian/image6.png";
import image7 from "/guardian/image7.png";
import image8 from "/guardian/image8.png";
import image9 from "/guardian/image9.png";
import image10 from "/guardian/image10.png";

export default function Guardian() {
    return (
        <div className="overflow-x-hidden pb-0 overflow-hidden text-justify leading-none">
            <DetailNav />

            <div className="flex assistant flex-col pb-0 p-7 pt-20 lg:pb-0 lg:p-25">
                <div className="py-8 pt-10 lg:px-85">
                    <div className="justify-between pb-2">
                        <div className="text-left sinoreta pb-1 text-5xl font-bold lg:text-5xl">
                            Guardian of the True North
                        </div>
                        <div className="text-xl pb-2">Educational Game & HCI Research</div>
                    </div>
                    <div className="">
                        <div>
                            <b>Role:</b> Game Designer, Developer, and Accessibility Researcher.
                        </div>
                        <div>
                            <b>Skills:</b> Game Design, Unity, C#, UX Research, Usability
                            Testing, Accessibility Auditing, Culturally-Responsive Design,
                            Figma, Data Analytics.
                        </div>
                        <div>
                            <b>Timeline:</b> July 2026 – Present.
                        </div>
                    </div>
                </div>
                <hr />

                <div className="pt-8 gap-40 lg:px-85">
                    <div className="">
                        <div className="font-bold pb-1">Overview</div>
                        <div className="pb-6">
                            Guardian of the True North is a 2D educational RPG that I got to work on during
                            my Mitacs Globalink Research Internship, where players explore
                            regions of Canada including Quebec, the West Coast, and the Prairies,
                            and learn cultural knowledge through lived gameplay rather than
                            memorized facts.
                        </div>
                        <div className="font-bold pb-1">Problem</div>
                        <div className="pb-6">
                            Traditional cultural education relies heavily on isolated facts
                            and rote memorization, offering little context for why
                            something matters. In Guardian of the True North, players learn culture by living it, exploring,
                            interacting, and discovering. The challenge was to reduce bugs, implement new features, and address accessibility issues in the game while ensuring that the
                            content was culturally accurate and responsibly represented.
                        </div>

                        
<div className="flex justify-between pb-6">
                        <img
                            className="w-[48%]"
                            loading="lazy"
                            src={image2}
                            alt="Prairie's region scene from the game"
                        />


                        <img
                            className="w-[48%]"
                            loading="lazy"
                            src={image3}
                            alt="Minigame screen from the game where players order totems in the correct sequence"
                        />
                        </div>

                        <div className="font-bold pb-1">Solution</div>
                        <div className="pb-6">
                            I audited the game against the{" "}
                            <a
                                href="https://gameaccessibilityguidelines.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                Game Accessibility Guidelines
                            </a>
                            , identifying gaps in visual contrast and control complexity.
                            From there, I implemented fixes such as new higher-contrast assets,
                            dialogue indicators, and simplified controls, and validated
                            them through user testing. Alongside this, I fixed several bugs,
                            improved code quality and redesigned user interfaces to improve style
                            consistency.
                        </div>

                        <div className="flex justify-center">
                        <img className="w-[30%]" src={image5} alt="Double double (coffee)" />
                        <img className="w-[30%]" src={image7} alt="Snow brush" />
                        <img className="w-[30%]" src={image8} alt="Toque (beanie)" />
                        </div>

                        <div className="flex justify-center pb-6">
                        <img className="w-[30%]" src={image9} alt="Chesterfield (couch)" />
                        <img className="w-[30%]" src={image10} alt="Bunny hug (hoodie)" />
                        </div>

                        <div className="font-bold">Outcome</div>
                        <div className="pb-6">
                            We evaluated the game with 30 participants, using a
                            25-item pre/post cultural knowledge quiz, a UX questionnaire
                            (miniPXI) measuring usability and engagement, and gameplay
                            telemetry tracking behavior like movement efficiency and idle
                            time. Full quantitative analysis of the learning and
                            experience data is ongoing, contributing to an HCI research
                            paper.
                        </div>

                        <div className="font-bold">Reflections</div>
                        <div className="pb-6">
                            This project pushed me to treat accessibility as a core design
                            constraint from the start, not an afterthought, auditing
                            against a real framework and seeing how small changes in
                            contrast and control complexity meaningfully affect who can
                            actually play and learn from a game. It also taught me how
                            important it is to represent culture accurately and respectfully
                            through design, doing it responsibly takes real research,
                            not just good intentions.

                        </div>
                    </div>
<div className="flex justify-between pb-6">
                        <img
                            className="w-[48%]"
                            loading="lazy"
                            src={image1}
                            alt="Cozy room where players can explore and interact with objects"
                        />


                        <img
                            className="w-[48%]"
                            loading="lazy"
                            src={image4}
                            alt="Knowledge check quiz screen shown after exploring a room and its objects"
                        />
                        </div>
                </div>

                <DetailFooter />
            </div>
        </div>
    );
}