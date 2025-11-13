import AboutPage from './AboutPage'
import PortfolioPage from './PortfolioPage'
import ProjectsPage from './ProjectsPage'

const MainPage = () => {
    return (
        <div className='overflow-x-hidden'>  
            <PortfolioPage/>
            <ProjectsPage/>
            <AboutPage/>
        </div>
    );
};

export default MainPage