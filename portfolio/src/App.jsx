import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import SIH from "./pages/SIH";
import Hospital from "./pages/Hospital";
import Seing from "./pages/Seing";
import Visualize from "./pages/Visualize";
import Guardian from "./pages/Guardian";
import SkyCheck from "./pages/SkyCheck";
import SazonLocal from "./pages/SazonLocal";
import MotionLab from "./pages/MotionLab";
import Leyendas from "./pages/Leyendas";
import LudicJam from "./pages/LudicJam";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="overflow-x-hidden w-full">
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hospital" element={<Hospital />} />
          <Route path="/seing" element={<Seing />} />
          <Route path="/sih" element={<SIH />} />
          <Route path="/visualize" element={<Visualize />} />
          <Route path="/guardian" element={<Guardian />} />
          <Route path="/skycheck" element={<SkyCheck />} />
          <Route path="/sazonlocal" element={<SazonLocal />} />
          <Route path="/motionlab" element={<MotionLab />} />
          <Route path="/leyendas" element={<Leyendas />} />
          <Route path="/ludicjam" element={<LudicJam />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
