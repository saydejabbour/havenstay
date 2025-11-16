import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";    // ⭐ ADD THIS
import Login from "./pages/Login.jsx";

// Pages
import Home from "./pages/Home.jsx";
import Properties from "./pages/Properties.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import ListProperty from "./pages/ListProperty.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  const isLoggedIn = true; // fake for now
  const username = "sayde jabbour";

  return (
    <Routes>

      {/* ⭐ All pages with Navbar + Footer */}
      <Route element={<Layout isLoggedIn={isLoggedIn} username={username} />}>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

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
      </Route>

      {/* ⭐ Login page WITHOUT Navbar + Footer */}
      <Route path="/login" element={<Login />} />

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
