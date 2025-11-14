import Image1 from '/motionlab/image1.png'
import Image2 from '/motionlab/image2.png'
import Image3 from '/motionlab/image3.png'

const MotionLab = () => {
    return (
        <div className="overflow-x-hidden bg-[#FFF4EC] p-20 pb-0 overflow-hidden assistant items-center flex flex-col text-center">
            <div className="pb-5">
                <div className="sinoreta text-7xl">Motion Lab</div>
                <div className="text-3xl">Educational Software</div>
            </div>
            <div className="bg-[#FFF7F1] w-screen">
                <div className="text-2xl">
                    <div className="p-20">MotionLab is an interactive educational tool that helps students learn physics through real-time visualizations instead of static textbook diagrams.</div>
                    <img className="w-screen" src={Image1}/>
                    <div className="p-20">I worked on both the user interface and the user experience: creating user flows, building prototypes, and ensuring that each interaction felt intuitive for students. I focused on making the learning process smoother by clarifying navigation, improving the readability of information, and designing interactions that give immediate visual feedback. I also implemented parts of the interface using HTML, CSS, and JavaScript.</div>
                    <img className='w-screen' src={Image2}/>
                    <div className="p-20">The project won first place in Software Development at ExpoIngenierías 2025 at Tecnológico de Monterrey and is currently being implemented at the Sonora Norte campus.</div>
                    <img className="w-screen" src={Image3}/>
                </div>
                <div className='bg-[#FFF4EC] sinoreta justify-evenly justify-center flex p-5 font-medium'>
                    <div>Mariana Islas Mondragón</div>
                    <div>marianaislasm2004@gmail.com</div>
                    <div>+52 (662) 165 4217</div>
                </div>
            </div>
            
        </div>
    );
};

export default MotionLab