import { Link, NavLink } from "react-router-dom";
import { Home, Building2, Info, Mail, Plus, User, LogOut } from "lucide-react";
import { useState } from "react";

function Navbar({ isLoggedIn, username }) {
  const [open, setOpen] = useState(false);

  // NOTE: When we build signup/login, "username" will come from AuthContext instead of props.

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between relative">

        {/* -------- LEFT: LOGO -------- */}
        <Link to="/" className="flex items-center gap-3">
          <Home className="text-green-900 w-7 h-7" />
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
                {username}
              </button>

              {/* Dropdown */}
              {open && (
                <div className="
                  absolute right-0 mt-2 w-40 
                  bg-white shadow-lg rounded-lg border 
                  py-2 z-50
                ">
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
                      console.log("Logged out"); // TODO: Replace with real logout later
                      setOpen(false);
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
