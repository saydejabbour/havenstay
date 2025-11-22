import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Building2,
  Info,
  Mail,
  Plus,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import logo from "../images/havenstay-logo.png";
import { useState, useEffect } from "react";

function Navbar({ isLoggedIn, username, onLogout }) {
  const navigate = useNavigate();

  // profile dropdown (desktop)
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // mobile hamburger menu
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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

    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdated);
    };
  }, [username]);

  // helper to close mobile menu after clicking a link
  const closeMobileMenu = () => setIsMobileOpen(false);

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

        {/* -------- DESKTOP NAV -------- */}
        <nav className="hidden md:flex items-center gap-6">
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

          {/* -------- USER DROPDOWN (DESKTOP) -------- */}
          {isLoggedIn && (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
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

              {isProfileOpen && (
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
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <User size={18} />
                    My Profile
                  </Link>

                  <button
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition w-full text-left"
                    onClick={() => {
                      console.log("Logged out");
                      setIsProfileOpen(false);

                      if (onLogout) {
                        onLogout();
                      }

                      navigate("/");
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

        {/* -------- MOBILE HAMBURGER BUTTON -------- */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-lg border border-green-900 text-green-900"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* -------- MOBILE NAV (DROPDOWN) -------- */}
      {isMobileOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200 px-6 pb-4 space-y-2">
          <NavLink
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2 py-2 text-green-900"
          >
            <Home size={18} />
            Home
          </NavLink>

          <NavLink
            to="/properties"
            onClick={closeMobileMenu}
            className="flex items-center gap-2 py-2 text-green-900"
          >
            <Building2 size={18} />
            Properties
          </NavLink>

          <NavLink
            to="/about"
            onClick={closeMobileMenu}
            className="flex items-center gap-2 py-2 text-green-900"
          >
            <Info size={18} />
            About
          </NavLink>

          <NavLink
            to="/contact"
            onClick={closeMobileMenu}
            className="flex items-center gap-2 py-2 text-green-900"
          >
            <Mail size={18} />
            Contact
          </NavLink>

          {isLoggedIn && (
            <>
              <Link
                to="/list-property"
                onClick={closeMobileMenu}
                className="flex items-center gap-2 py-2 text-green-900"
              >
                <Plus size={18} />
                List your place
              </Link>

              <Link
                to="/profile"
                onClick={closeMobileMenu}
                className="flex items-center gap-2 py-2 text-green-900"
              >
                <User size={18} />
                My Profile
              </Link>

              <button
                className="flex items-center gap-2 py-2 text-green-900 w-full text-left"
                onClick={() => {
                  console.log("Logged out");
                  closeMobileMenu();
                  if (onLogout) onLogout();
                  navigate("/");
                }}
              >
                <LogOut size={18} />
                Log out
              </button>
            </>
          )}

          {!isLoggedIn && (
            <Link
              to="/login"
              onClick={closeMobileMenu}
              className="flex items-center gap-2 py-2 text-green-900"
            >
              <User size={18} />
              Login
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}

export default Navbar;
