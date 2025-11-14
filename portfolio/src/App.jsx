import './App.css'
import MainPage from './components/MainPage'
import SazonLocal from './components/SazonLocal'
import SkyCheck from './components/SkyCheck'
import MotionLab from './components/MotionLab'

import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="overflow-x-hidden w-full">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/skycheck" element={<SkyCheck/>}/>
          <Route path="/sazonlocal" element={<SazonLocal/>}/>
          <Route path="/motionlab" element={<MotionLab/>}/>
        </Routes>
      </Router>
    </div>
    
  )
}

export default App
