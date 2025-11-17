

const PortfolioPage = () => {
    return (
        <div className="overflow-x-hidden sm:min-h-screen justify-between flex flex-col bg-[#FFF7F1] p-10">
            <div className="flex gap-10 assistant text-3xl">
                <a href="/ui-ux-portfolio/MarianaIslasCV.pdf" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-105 underline" target="_blank">Resume</a>
                <a href="https://www.linkedin.com/in/marianaislasm" className="transition-transform duration-300 hover:scale-105 underline" target="_blank">LinkedIn</a>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="sinoreta text-[#FF0080] text-9xl">PORTFOLIO</div>
                <div className="assistant text-3xl">Mariana Islas Mondragón</div>
            </div>
            <div className="flex assistant justify-between text-3xl">
                <div className="flex gap-10">
                    
                </div>
                <div className="flex-col text-right">
                    <div>+52 (662) 165 4217 <br/> marianaislasm2004@gmail.com</div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioPage