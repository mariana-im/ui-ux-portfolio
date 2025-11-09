import Image1 from '/skycheck/image1.png'
import Image2 from '/skycheck/image2.png'
import Image3 from '/skycheck/image3.png'

const SkyCheck = () => {
    return (
        <div className="bg-[#FFF4EC] p-20 pb-0 overflow-hidden assistant items-center flex flex-col text-center">
            <div className="pb-5">
                <div className="sinoreta text-7xl">SkyCheck</div>
                <div className="text-3xl">Climate Monitoring App</div>
            </div>
            <div className="bg-[#FFF7F1] w-screen">
                <div className="text-2xl">
                    <div className="p-20">SkyCheck is a web-based climate platform from the 2025 NASA Space Apps Challenge that provides real-time and historical weather data for farmers, companies, and travelers.</div>
                    <img className="w-screen" src={Image1}/>
                    <div className="p-20">The interfaces were designed in Figma and the desktop version was implemented using React, HTML, and CSS, featuring dashboards, location selection, and clear visualizations for sky conditions.</div>
                    <img className='w-screen' src={Image2}/>
                    <div className="p-20">SkyCheck makes complex weather information accessible, helping users plan for extreme conditions and make informed decisions in agriculture, logistics, and travel.</div>
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

export default SkyCheck