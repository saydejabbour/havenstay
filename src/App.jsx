// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home.jsx";
import Properties from "./pages/Properties.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import ListProperty from "./pages/ListProperty.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";

function App() {
  const isLoggedIn = true; // fake for now
  const username = "sayde jabbour";

  return (
    <div className="w-full min-h-screen bg-[#f5f0e8] text-slate-900">
      <Navbar isLoggedIn={isLoggedIn} username={username} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

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

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
