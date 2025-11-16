// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Properties from "./pages/Properties.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import ListProperty from "./pages/ListProperty.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";

function App() {
  // ❗ TEMP: fake logged-in state
  // later we will replace this with AuthContext + real login
  const isLoggedIn = false;

  return (
    // make sure the root fills the whole screen and uses a light background
    <div className="w-full min-h-screen bg-[#f5f0e8] text-slate-900">
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes – only when logged in */}
        <Route
          path="/list-property"
          element={
            isLoggedIn ? <ListProperty /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" replace />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
