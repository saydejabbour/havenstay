// src/pages/Properties.jsx
import { useMemo, useState } from "react";
import PropertyCard from "../components/PropertyCard.jsx";
import { useMyProperties } from "../context/MyPropertiesContext.jsx";

const countries = [
  "All Countries",
  "Greece",
  "Switzerland",
  "France",
  "USA",
  "Norway",
  "Thailand",
  "Italy",
  "Spain",
];

const types = ["All Types", "Apartment", "Studio", "Villa", "Chalet", "Hut"];

const bedroomsOptions = ["All", "1", "2", "3", "4"];

function PropertiesPage() {
  const { properties } = useMyProperties();

  const [country, setCountry] = useState("All Countries");
  const [type, setType] = useState("All Types");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("All");

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (country !== "All Countries" && p.country !== country) return false;
      if (type !== "All Types" && p.type !== type) return false;
      if (bedrooms !== "All" && p.bedrooms !== Number(bedrooms)) return false;
      if (minPrice && p.price < Number(minPrice)) return false;
      if (maxPrice && p.price > Number(maxPrice)) return false;
      return true;
    });
  }, [properties, country, type, minPrice, maxPrice, bedrooms]);

  return (
    <div className="min-h-screen bg-[#f5f0e8] pb-16">
      <div className="max-w-6xl mx-auto px-4 pt-16">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-emerald-900 mb-3">
            Browse Properties
          </h1>
          <p className="text-slate-600">
            Find your ideal accommodation from our collection
          </p>
        </div>

        {/* Filter bar (exactly your old design) */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
          <h2 className="text-lg font-semibold text-emerald-900 mb-4">
            Filter Properties
          </h2>

          <div className="grid md:grid-cols-5 gap-4">
            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Country
              </label>
              <div className="relative">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full h-11 rounded-lg bg-[#f7f0de] border border-transparent px-3 pr-9 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/40"
                >
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Property Type
              </label>
              <div className="relative">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full h-11 rounded-lg bg-[#f7f0de] border border-transparent px-3 pr-9 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/40"
                >
                  {types.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Min price */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Min Price ($)
              </label>
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full h-11 rounded-lg bg-[#f7f0de] border border-transparent px-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/40"
              />
            </div>

            {/* Max price */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Max Price ($)
              </label>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full h-11 rounded-lg bg-[#f7f0de] border border-transparent px-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/40"
              />
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Bedrooms
              </label>
              <div className="relative">
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full h-11 rounded-lg bg-[#f7f0de] border border-transparent px-3 pr-9 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/40"
                >
                  {bedroomsOptions.map((b) => (
                    <option key={b} value={b}>
                      {b === "All" ? "All" : `${b} beds`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Properties grid */}
        <div className="mb-4 text-sm text-slate-700">
          Showing <span className="font-semibold">{filtered.length}</span>{" "}
          properties
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PropertiesPage;
