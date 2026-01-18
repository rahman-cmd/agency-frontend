import React, { Suspense, useEffect } from "react";
// routing
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
// types
import { SET_ADMIN } from "./store/admin/types";

// pages
import Admin from "./pages/Admin";
import TotalIncome from "./pages/TotalIncome";
import Creators from "./pages/Creators";
import HostHistory from "./pages/HostHistory";
import { AgencyRedeem } from "./pages/AgencyRedeem";
import HostRequest from "./pages/hostRequest/HostRequest";
import AgencyTarget from "./pages/AgencyTarget";
import LanguageSwitcher from "./languageSwitcher/LanguageSwitcher";
import i18n from "./i18n";

// layout
import AgencyLayout from "./layouts/AgencyLayout";

function App() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.admin);
  const token = localStorage.getItem("TOKEN");
  const key = localStorage.getItem("KEY");
  const navigate = useNavigate();
  const location = useLocation();

  // When Open In Local
  // const params = new URLSearchParams(window.location.search);
  // const agencyId = params.get("id") || localStorage.getItem("agencyId");
  // localStorage.setItem("agencyId", agencyId);

  useEffect(() => {
    if (!token && !key) return;
    dispatch({ type: SET_ADMIN, payload: token });
  }, [token, key, dispatch]);

  // When Open in Server
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");
    const language = queryParams.get("language");

   if (
  language &&
  [
    "en", // English
    "ar", // Arabic
    "bn", // Bengali
    "zh", // Chinese Simplified
    "fr", // French
    "de", // German
    "hi", // Hindi
    "it", // Italian
    "id", // Indonesian
    "ko", // Korean
    "pt", // Portuguese
    "ru", // Russian
    "es", // Spanish
    "sw", // Swahili
    "tr", // Turkish
    "te", // Telugu
    "ta", // Tamil
    "ur"  
  ].includes(language.toLowerCase())
) {
  const normalizedLang = language.toLowerCase();
  localStorage.setItem("language", normalizedLang);
  i18n.changeLanguage(normalizedLang);
}


    if (id) {
      localStorage.setItem("agencyId", id);
      navigate("/agencypanel/homePage", { replace: true });
    } else if (localStorage.getItem("agencyId")) {
      navigate("/agencypanel/homePage", { replace: true });
    }
  }, []);

  return (
    <div className="App">
      <LanguageSwitcher/>
      <Suspense fallback={""}>
        <Routes>
          {/* 👇 Wrap all agency routes in AgencyLayout */}
          <Route path="/agencypanel" element={<AgencyLayout />}>
            <Route path="homePage" element={<Admin />} />
            <Route path="Income" element={<TotalIncome />} />
            <Route path="creators" element={<Creators />} />
            <Route path="creatorRequest" element={<HostRequest />} />
            <Route path="hosthistory" element={<HostHistory />} />
            <Route path="agencyredeem" element={<AgencyRedeem />} />
            <Route path="agencytarget" element={<AgencyTarget />} />
          </Route>

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/agencypanel/homePage" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
