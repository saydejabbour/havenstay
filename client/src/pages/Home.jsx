// src/pages/Home.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import heroImage from "../images/hero-villa.jpg";

function Home() {
  // IMPORTANT: values match the arrays in Properties.jsx
  const [country, setCountry] = useState("All Countries");
  const [type, setType] = useState("All Types");
  const navigate = useNavigate();

  const handleSearch = () => {
    // Send readable labels in the URL (same strings used in Properties.jsx)
    const params = new URLSearchParams();
    params.set("country", country);
    params.set("type", type);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <main className="bg-[#f5f0e8]">
      {/* HERO SECTION */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${heroImage})` }}
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/5" />

        {/* Centered Content */}
        <div className="relative z-10 flex flex-col items-center max-w-6xl px-4 pt-24 mx-auto text-center text-white sm:px-6">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Find Your Perfect Stay
          </h1>

          <p className="max-w-2xl mb-8 text-lg sm:text-xl md:text-2xl">
            Discover amazing accommodations around the world
          </p>

          {/* SEARCH CARD */}
          <div className="w-full max-w-4xl px-6 py-5 shadow-xl bg-white/95 rounded-3xl sm:px-8 sm:py-6 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-[1.1fr,1.1fr,0.9fr] gap-4 items-end">
              {/* Country */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-[#123524] mb-2 text-center md:text-left">
                  Country
                </label>
                <div className="relative">
                  <select
                    className="h-12 w-full rounded-2xl bg-[#f7f0e4] border border-[#e3d8c7] px-4 pr-10 text-sm text-[#123524] appearance-none focus:outline-none focus:ring-2 focus:ring-[#123524]"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="All Countries">All Countries</option>
                    <option value="Greece">Greece</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="France">France</option>
                    <option value="USA">USA</option>
                    <option value="Norway">Norway</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Italy">Italy</option>
                    <option value="Spain">Spain</option>
                  </select>
                  {/* Dropdown arrow */}
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8b7d6b] text-xs">
                    ▾
                  </span>
                </div>
              </div>

              {/* Property Type */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-[#123524] mb-2 text-center md:text-left">
                  Property Type
                </label>
                <div className="relative">
                  <select
                    className="h-12 w-full rounded-2xl bg-[#f7f0e4] border border-[#e3d8c7] px-4 pr-10 text-sm text-[#123524] appearance-none focus:outline-none focus:ring-2 focus:ring-[#123524]"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="All Types">All Types</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Studio">Studio</option>
                    <option value="Villa">Villa</option>
                    <option value="Chalet">Chalet</option>
                    <option value="Hut">Hut</option>
                  </select>
                  {/* Dropdown arrow */}
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8b7d6b] text-xs">
                    ▾
                  </span>
                </div>
              </div>

              {/* Search Button */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm text-transparent select-none">
                  Search
                </label>
                <button
                  onClick={handleSearch}
                  className="h-12 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123524] px-6 text-sm font-semibold text-white hover:bg-[#0f2a1c] transition"
                >
                  <Search className="w-4 h-4" />
                  Search Stays
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
