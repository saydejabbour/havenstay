// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Layout from "./components/Layout";

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
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("havenstayUser");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("havenstayUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("havenstayUser");
    }
  }, [user]);

  const isLoggedIn = !!user;
  const username = user?.fullName || "";

  const handleSignup = (fullName) => {
    setUser({ fullName });
  };

  const handleLogin = () => {
    if (!user) {
      setUser({ fullName: "Guest user" });
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <MyPropertiesProvider>
      <Routes>
        {/* Layout pages */}
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

          <Route
            path="/list-property"
            element={
              isLoggedIn ? <ListProperty /> : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/profile"
            element={
              isLoggedIn ? <Profile /> : <Navigate to="/login" replace />
            }
          />
        </Route>

        {/* Auth pages */}
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
