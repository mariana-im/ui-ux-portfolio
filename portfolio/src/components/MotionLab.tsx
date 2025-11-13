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
                    <div className="p-20">MotionLab makes learning physics interactive and engaging through dynamic visualizations. Instead of static textbook explanations, it helps students understand abstract concepts more clearly.</div>
                    <img className="w-screen" src={Image1}/>
                    <div className="p-20">I worked as both a UI/UX designer and front-end developer, creating user flows, prototypes, and a reusable component system in Figma, and later implementing parts of the app with HTML, CSS, and JavaScript. </div>
                    <img className='w-screen' src={Image2}/>
                    <div className="p-20">MotionLab won first place in Software Development at ExpoIngenierías 2025 at Tecnológico de Monterrey and is now being implemented at the Sonora Norte campus.</div>
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