import { Link, NavLink } from "react-router-dom";
import { Home, Building2, Info, Mail, Plus, User, LogOut } from "lucide-react";
import logo from "../images/havenstay-logo.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar({ isLoggedIn, username, onLogout }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // initial value: from localStorage or from username prop or "Guest user"
  const [displayName, setDisplayName] = useState(
    () => localStorage.getItem("profileFullName") || username || "Guest user"
  );

  // 🔥 listen for profile updates
  useEffect(() => {
    const handleProfileUpdated = () => {
      const savedName = localStorage.getItem("profileFullName");
      if (savedName && savedName.trim() !== "") {
        setDisplayName(savedName);
      } else {
        setDisplayName(username || "Guest user");
      }
    };

    window.addEventListener("profileUpdated", handleProfileUpdated);

    // cleanup
    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdated);
    };
  }, [username]);

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between relative">
        {/* -------- LEFT: LOGO -------- */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="HavenStay Logo"
            className="w-10 h-10 rounded-lg object-cover"
          />

          <div>
            <h1 className="text-xl font-semibold text-green-900">HavenStay</h1>
            <p className="text-xs text-gray-600 -mt-1">
              Find comfort wherever you go
            </p>
          </div>
        </Link>

        {/* -------- NAV LINKS -------- */}
        <nav className="flex items-center gap-6">
          {/* ---- Home ---- */}
          <NavLink
            to="/"
            className="
              flex items-center gap-1 
              text-green-900 
              px-3 py-2 rounded-full 
              hover:bg-green-100 
              transition
            "
          >
            <Home size={18} />
            Home
          </NavLink>

          {/* ---- Properties ---- */}
          <NavLink
            to="/properties"
            className="
              flex items-center gap-1 
              text-green-900 
              px-3 py-2 rounded-full 
              hover:bg-green-100 
              transition
            "
          >
            <Building2 size={18} />
            Properties
          </NavLink>

          {/* ---- About ---- */}
          <NavLink
            to="/about"
            className="
              flex items-center gap-1 
              text-green-900 
              px-3 py-2 rounded-full 
              hover:bg-green-100 
              transition
            "
          >
            <Info size={18} />
            About
          </NavLink>

          {/* ---- Contact ---- */}
          <NavLink
            to="/contact"
            className="
              flex items-center gap-1 
              text-green-900 
              px-3 py-2 rounded-full 
              hover:bg-green-100 
              transition
            "
          >
            <Mail size={18} />
            Contact
          </NavLink>

          {/* ---- List your place ---- */}
          {isLoggedIn && (
            <Link
              to="/list-property"
              className="
                flex items-center gap-2 
                bg-green-900 text-white 
                px-4 py-2 
                rounded-lg 
                hover:bg-green-800 
                transition shadow-sm
              "
            >
              <Plus size={18} />
              List your place
            </Link>
          )}

          {/* -------- USER DROPDOWN -------- */}
          {isLoggedIn && (
            <div className="relative">
              {/* Avatar + Username button */}
              <button
                onClick={() => setOpen(!open)}
                className="
                  flex items-center gap-2 
                  text-green-900 
                  px-3 py-2 rounded-full 
                  hover:bg-green-100 
                  transition
                "
              >
                <User size={18} />
                {displayName}
              </button>

              {/* Dropdown */}
              {open && (
                <div
                  className="
                    absolute right-0 mt-2 w-40 
                    bg-white shadow-lg rounded-lg border 
                    py-2 z-50
                  "
                >
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
                    onClick={() => setOpen(false)}
                  >
                    <User size={18} />
                    My Profile
                  </Link>

                  <button
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition w-full text-left"
                    onClick={() => {
                      console.log("Logged out");
                      setOpen(false);

                      if (onLogout) {
                        onLogout(); // clears the user in App.jsx
                      }

                      navigate("/"); // redirect to home page
                    }}
                  >
                    <LogOut size={18} />
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ---- If NOT logged in ---- */}
          {!isLoggedIn && (
            <Link
              to="/login"
              className="
                bg-green-900 text-white 
                px-5 py-2 rounded-lg 
                hover:bg-green-800 
                transition shadow-sm
              "
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
