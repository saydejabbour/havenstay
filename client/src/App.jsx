// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Layout from "./components/Layout.jsx";

// Pages
import Home from "./pages/Home.jsx";
import Properties from "./pages/Properties.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import ListProperty from "./pages/ListProperty.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import PropertyDetails from "./pages/PropertyDetails.jsx";
import BookingPage from "./pages/Booking.jsx";

import { MyPropertiesProvider } from "./context/MyPropertiesContext.jsx";

function App() {
  /* ---------------------------------------------
     Restore auth from localStorage (safe parsing)
  --------------------------------------------- */
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      localStorage.removeItem("user");
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  const isLoggedIn = !!user && !!token;

  // Navbar name
  const username = user?.full_name || "";

  /* ---------------------------------------------
     Keep localStorage synced with state
  --------------------------------------------- */
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");

    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [user, token]);

  /* ---------------------------------------------
     Optional but IMPORTANT:
     On first load, verify token by calling /auth/me
     If token is invalid/expired -> logout automatically
  --------------------------------------------- */
  useEffect(() => {
    const verifyAuth = async () => {
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          // Token invalid -> clear auth
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
          setToken(null);
          return;
        }

        // Refresh user from backend (most correct source)
        const freshUser = await res.json();
        setUser(freshUser);
      } catch (err) {
        // If backend is down, do nothing (keep local state)
        console.log("Auth verification skipped (backend not reachable).");
      }
    };

    verifyAuth();
    // only run when token changes
  }, [token]);

  /* ---------------------------------------------
     Called after successful LOGIN
     Login.jsx already saves token + user in localStorage
  --------------------------------------------- */
  const handleLogin = (loggedUser) => {
    const storedToken = localStorage.getItem("token") || null;
    setUser(loggedUser);
    setToken(storedToken);
  };

  /* ---------------------------------------------
     Called after successful SIGNUP
     SignUp.jsx should save token + user in localStorage
  --------------------------------------------- */
  const handleSignup = (newUser) => {
    const storedToken = localStorage.getItem("token") || null;
    setUser(newUser);
    setToken(storedToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  return (
    <MyPropertiesProvider>
      <Routes>
        {/* Layout wrapper */}
        <Route
          element={
            <Layout
              isLoggedIn={isLoggedIn}
              username={username}
              onLogout={handleLogout}
            />
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
          <Route path="/properties/:id/book" element={<BookingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected routes */}
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

        {/* Auth routes */}
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} isLoggedIn={isLoggedIn} />}
        />

        <Route path="/signup" element={<SignUp onSignup={handleSignup} />} />

        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MyPropertiesProvider>
  );
}

export default App;
