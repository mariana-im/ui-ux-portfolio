const PortfolioPage = () => {
    return (
        <div className="sm:min-h-screen justify-between flex flex-col bg-[#FFF7F1] p-10">
            <div className="flex sinoreta justify-between text-[#FFF7F1] text-4xl">
                <div>PROJECTS</div>
                <div>ABOUT ME</div>
                <div>RESUME</div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="sinoreta text-[#FF0080] text-9xl">PORTFOLIO</div>
                <div className="assistant text-3xl">Mariana Islas Mondragón</div>
            </div>
            <div className="flex assistant justify-between text-3xl text-[#FF0080]">
                <div className="flex gap-10">
                    <a href="https://www.linkedin.com/in/marianaislasm" target="_blank"><br/>LinkedIn</a>
                    <a href="https://github.com/mariana-im" target="_blank"><br/>GitHub</a>
                </div>
                <div className="flex-col text-right">
                    <div>+52 (662) 165 4217 <br/> marianaislasm2004@gmail.com</div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioPage