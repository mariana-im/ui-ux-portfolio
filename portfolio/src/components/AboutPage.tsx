import Myself from '/me.png'

const AboutPage = () => {
    return (
        <div className='overflow-x-hidden h-screen w-screen items-center flex bg-[#FFF7F1] pl-20 py-20 gap-10'>
            <div className='w-[50%]'>
                <div className='sinoreta text-7xl text-[#FF0080] mb-10'>About Me</div>
                <div className='assistant text-3xl text-justify'>Hello! I am Mariana Islas a designer that is passionate about creating visual experiences that communicate with intention. <br/><br/> 

                I have participated in educational, cultural, and digital projects, where design stands out for its aesthetics, clarity, and ease of use. <br/><br/>

                I love combining creativity with logic, always striving for each project to create a genuine connection with people. </div>
            </div>
            <div className='w-[50%] flex justify-center'>
                <img className="w-[70%]" src={Myself}/>
            </div>
        </div>
    );
};

export default AboutPage