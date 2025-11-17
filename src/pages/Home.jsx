// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { Search, MapPin, Bed } from "lucide-react";

import heroImage from "../images/hero-villa.jpg";
import house1 from "../images/house1.jpg";
import house2 from "../images/house2.jpg";
import house3 from "../images/house3.jpg";

const featuredProperties = [
  {
    id: 1,
    title: "Luxury Beachfront Villa",
    location: "Santorini, Greece",
    type: "Villa",
    beds: "4 beds",
    price: "$450/night",
    image: house1,
    description:
      "Experience the ultimate island getaway in this stunning beachfront villa with infinity pool and panoramic sea views.",
  },
  {
    id: 2,
    title: "Mountain Chalet Retreat",
    location: "Zermatt, Switzerland",
    type: "Chalet",
    beds: "3 beds",
    price: "$380/night",
    image: house2,
    description:
      "Cozy alpine chalet nestled in the mountains with breathtaking views. Perfect for ski lovers and nature escapes.",
  },
  {
    id: 3,
    title: "Modern City Apartment",
    location: "Paris, France",
    type: "Apartment",
    beds: "2 beds",
    price: "$220/night",
    image: house3,
    description:
      "Stylish apartment in the heart of the city, close to cafes, museums, and iconic landmarks.",
  },
];

function Home() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#f5f0e8]">
      {/* HERO SECTION */}
      <section className="relative h-[640px] w-full overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${heroImage})` }}
        />

        {/* Soft dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/5" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center max-w-6xl px-4 pb-16 mx-auto text-center text-white sm:px-6 pt-28">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Find Your Perfect Stay
          </h1>

          <p className="mb-8 text-lg sm:text-xl md:text-2xl">
            Discover amazing accommodations around the world
          </p>

          {/* 🔍 Search card */}
          <div className="w-full max-w-4xl px-6 py-5 shadow-xl bg-white/95 rounded-3xl sm:px-8 sm:py-6">
            <div className="grid grid-cols-1 md:grid-cols-[1.1fr,1.1fr,0.9fr] gap-4 items-end">
              {/* Country */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-[#123524] mb-2 text-center md:text-left">
                  Country
                </label>
                <div className="relative">
                  <select
                    className="h-12 w-full rounded-2xl bg-[#f7f1e4] border border-[#e3d8c7] px-4 pr-9 text-sm text-[#123524] appearance-none focus:outline-none focus:ring-2 focus:ring-[#123524]"
                    defaultValue="all"
                  >
                    <option value="all">All Countries</option>
                    <option value="greece">Greece</option>
                    <option value="switzerland">Switzerland</option>
                    <option value="france">France</option>
                    <option value="usa">USA</option>
                    <option value="norway">Norway</option>
                    <option value="thailand">Thailand</option>
                    <option value="italy">Italy</option>
                    <option value="spain">Spain</option>
                  </select>
                  {/* custom arrow */}
                  <span className="pointer-events-none absolute right-3 inset-y-0 flex items-center text-[#8b7d6b] text-xs">
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
                    className="h-12 w-full rounded-2xl bg-[#f7f1e4] border border-[#e3d8c7] px-4 pr-9 text-sm text-[#123524] appearance-none focus:outline-none focus:ring-2 focus:ring-[#123524]"
                    defaultValue="all"
                  >
                    <option value="all">All Types</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="studio">Studio</option>
                    <option value="cabin">Cabin</option>
                    <option value="hotel">Hotel</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 inset-y-0 flex items-center text-[#8b7d6b] text-xs">
                    ▾
                  </span>
                </div>
              </div>

              {/* Search button */}
              <div className="flex flex-col">
                {/* invisible label to align height */}
                <label className="mb-2 text-sm text-transparent select-none">
                  Search
                </label>
                <button
                  className="h-12 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123524] px-6 text-sm font-semibold text-white hover:bg-[#0f2a1c] transition"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Stays</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES HEADER */}
      <section className="bg-[#f5f0e8] py-14 sm:py-16">
        <div className="max-w-4xl px-4 mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123524] mb-3">
            Featured Properties
          </h2>
          <p className="text-base sm:text-lg text-[#3c6a5c]">
            Hand-picked selections for your next adventure
          </p>
        </div>
      </section>

      {/* FEATURED PROPERTIES GRID */}
      <section className="bg-[#f5f0e8] pb-16">
        <div className="max-w-6xl px-4 mx-auto sm:px-6">
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.map((property) => (
              <article
                key={property.id}
                className="bg-[#f7f1e4] rounded-3xl shadow-md hover:shadow-xl transition overflow-hidden group"
              >
                {/* Image with zoom on hover */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Price badge */}
                  <div className="absolute top-4 right-4 bg-[#123524] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full shadow">
                    {property.price}
                  </div>
                </div>

                {/* Content */}
                <div className="px-5 pt-5 pb-6 sm:px-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-[#123524] mb-1">
                    {property.title}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center gap-1 text-sm text-[#3c6a5c] mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{property.location}</span>
                  </div>

                  {/* Type + beds */}
                  <div className="flex items-center justify-between mb-3 text-sm">
                    <span className="font-semibold text-[#c9823a]">
                      {property.type}
                    </span>
                    <div className="flex items-center gap-1 text-[#3c6a5c]">
                      <Bed className="w-4 h-4" />
                      <span>{property.beds}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#4b4b4b] leading-relaxed line-clamp-3 mb-4">
                    {property.description}
                  </p>

                  {/* View details button -> goes to /properties */}
                  <Link
                    to="/properties"
                    className="block w-full text-center rounded-2xl bg-[#123524] text-white text-sm font-semibold py-3 hover:bg-[#0f2a1c] transition"
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
