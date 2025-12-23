import SazonLocal from '/sazonlocal.png'
import SkyCheck from '/skycheck.png'
import MotionLab from '/motionlab.png'
import {Link} from "react-router-dom"

const ProjectsPage = () => {
    return (
        <div className="overflow-x-hidden pt-10 px-10 sinoreta bg-[#fcfaf7] h-screen flex justify-between">
            <div className="overflow-hidden relative flex flex-col">
                <div className="flex flex-col animate-scroll will-change-transform gap-10 text-l">
                    <div>HTML</div>
                    <div>CSS</div>
                    <div>JAVASCRIPT</div>
                    <div>REACT</div>
                    <div>TAILWIND</div>
                    <div>FIGMA</div>
                    <div>BOOTSTRAP</div>
                    <div>CANVA</div>
                    <div>PYTHON</div>
                    <div>GITHUB</div>
                    <div>GAMEMAKER</div>
                    <div>UNREAL ENGINE</div>

                    <div>HTML</div>
                    <div>CSS</div>
                    <div>JAVASCRIPT</div>
                    <div>REACT</div>
                    <div>TAILWIND</div>
                    <div>FIGMA</div>
                    <div>BOOTSTRAP</div>
                    <div>CANVA</div>
                    <div>PYTHON</div>
                    <div>GITHUB</div>
                    <div>GAMEMAKER</div>
                    <div>UNREAL ENGINE</div>

                    <div>HTML</div>
                    <div>CSS</div>
                    <div>JAVASCRIPT</div>
                    <div>REACT</div>
                    <div>TAILWIND</div>
                    <div>FIGMA</div>
                    <div>BOOTSTRAP</div>
                    <div>CANVA</div>
                    <div>PYTHON</div>
                    <div>GITHUB</div>
                    <div>GAMEMAKER</div>
                    <div>UNREAL ENGINE</div>
                </div>
            </div>
            <div className="p-5 h-full flex flex-col justify-center items-center">
                <div className="flex flex-col items-center justify-center">
                    <div className='flex gap-10 mb-[10%]'>
                        <Link to="/sazonlocal">
                            <img className='transition-transform duration-300 hover:scale-103 shadow-xl w-[95%] rounded-[1rem] h-[12rem]' src={SazonLocal}/>
                        </Link>
                        
                        <Link to="/skycheck">
                            <img className='transition-transform duration-300 hover:scale-103 shadow-xl w-[95%] rounded-[1rem] h-[12rem]' src={SkyCheck}/>
                        </Link>
                    </div>
                    <div className='flex'>
                        <Link to="/motionlab">
                            <img className='transition-transform duration-300 hover:scale-103 shadow-xl w-[100%] rounded-[1rem] h-[13.2rem]' src={MotionLab}/>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="overflow-hidden relative text-l text-right">
                <div className="flex flex-col will-change-transform animate-scroll gap-10">
                    <div>GAMEDEV</div>
                    <div>PUBLIC SPEAKING</div>
                    <div>TEAMWORK</div>
                    <div>MARIOKART PRO</div>
                    <div>EVENT ORGANIZER</div>
                    <div>MENTORSHIP</div>
                    <div>EMPATHY</div>
                    <div>PATIENCE</div>
                    <div>PROACTIVE</div>
                    <div>SELF-DRIVEN</div>
                    <div>ADAPTABLE</div>

                    <div>GAMEDEV</div>
                    <div>PUBLIC SPEAKING</div>
                    <div>TEAMWORK</div>
                    <div>MARIOKART PRO</div>
                    <div>EVENT ORGANIZER</div>
                    <div>MENTORSHIP</div>
                    <div>EMPATHY</div>
                    <div>PATIENCE</div>
                    <div>PROACTIVE</div>
                    <div>SELF-DRIVEN</div>
                    <div>ADAPTABLE</div>

                    <div>GAMEDEV</div>
                    <div>PUBLIC SPEAKING</div>
                    <div>TEAMWORK</div>
                    <div>MARIOKART PRO</div>
                    <div>EVENT ORGANIZER</div>
                    <div>MENTORSHIP</div>
                    <div>EMPATHY</div>
                    <div>PATIENCE</div>
                    <div>PROACTIVE</div>
                    <div>SELF-DRIVEN</div>
                    <div>ADAPTABLE</div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage