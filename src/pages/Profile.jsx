// src/pages/Profile.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Phone, Home } from "lucide-react";
import PropertyCard from "../components/PropertyCard.jsx";
import { useMyProperties } from "../context/MyPropertiesContext.jsx";

function Profile() {
  const navigate = useNavigate();
  const { properties } = useMyProperties();

  const myProperties = properties.filter((p) => p.isUser);
  const count = myProperties.length;

  const [fullName, setFullName] = useState(
    () => localStorage.getItem("profileFullName") || ""
  );
  const [phone, setPhone] = useState(
    () => localStorage.getItem("profilePhone") || ""
  );

  const handleSaveProfile = () => {
    localStorage.setItem("profileFullName", fullName);
    localStorage.setItem("profilePhone", phone);
    window.dispatchEvent(new Event("profileUpdated"));
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] pb-16">
      {/* HEADER */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10">
        <h1 className="text-4xl font-bold text-[#123524]">My Profile</h1>
        <p className="text-[#3c6a5c] mt-1">
          Manage your account and properties
        </p>
      </div>

      {/* ACCOUNT DETAILS CARD */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-10">
        <div className="bg-white rounded-3xl p-8 shadow-md border border-[#e3e3e3]">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-[#123524]">
              Account Details
            </h2>

            <button
              type="button"
              onClick={handleSaveProfile}
              className="bg-[#f5f0e8] text-[#123524] px-5 py-2 rounded-xl font-medium border border-[#e1deca]"
            >
              Edit Profile
            </button>
          </div>

          {/* FULL NAME */}
          <div className="mt-6">
            <label className="text-[#123524] font-medium flex items-center gap-2 mb-2">
              <User size={18} /> Full Name
            </label>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-[#f7f5ef] border border-[#ece8dd] rounded-xl py-3 px-4 text-[#123524] placeholder:text-[#123524]/50 focus:outline-none focus:ring-2 focus:ring-[#123524]/40"
            />
          </div>

          {/* PHONE */}
          <div className="mt-6">
            <label className="text-[#123524] font-medium flex items-center gap-2 mb-2">
              <Phone size={18} /> Phone
            </label>
            <input
              type="tel"
              placeholder="enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#f7f5ef] border border-[#ece8dd] rounded-xl py-3 px-4 text-[#123524] placeholder:text-[#123524]/50 focus:outline-none focus:ring-2 focus:ring-[#123524]/40"
            />
          </div>
        </div>
      </div>

      {/* MY PROPERTIES SECTION */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-16">
        <div>
          <div className="flex items-center gap-2">
            <Home className="text-[#123524]" size={28} />
            <h2 className="text-3xl font-semibold text-[#123524]">
              My Properties
            </h2>
          </div>

          <p className="text-[#3c6a5c] mt-1">
            {count} {count === 1 ? "property" : "properties"} listed
          </p>
        </div>

        {count === 0 ? (
          <div className="bg-white rounded-3xl p-14 shadow-md border border-[#e3e3e3] mt-6 text-center">
            <Home size={42} className="text-[#3c6a5c] mx-auto mb-4" />

            <h3 className="text-xl font-semibold text-[#123524]">
              No properties yet
            </h3>
            <p className="text-[#3c6a5c] mt-1">
              Start earning by listing your first property
            </p>

            <button
              onClick={() => navigate("/list-property")}
              className="mt-6 bg-[#123524] text-white px-6 py-3 rounded-xl font-medium shadow-md"
            >
              Add Your Property
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 shadow-md border border-[#e3e3e3] mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {myProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => navigate("/list-property")}
                className="bg-[#123524] text-white px-6 py-3 rounded-xl font-medium shadow-md"
              >
                Add Another Property
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
