// src/pages/ListProperty.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMyProperties } from "../context/MyPropertiesContext.jsx";

const FEATURES = [
  "WiFi",
  "Pool",
  "Parking",
  "Air Conditioning",
  "Pet Friendly",
  "Kitchen",
  "Balcony",
];

function ListProperty() {
  const navigate = useNavigate();
  const { addProperty } = useMyProperties();

  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [features, setFeatures] = useState([]);

  const toggleFeature = (feature) => {
    setFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProperty = {
      id: Date.now(),
      title,
      country,
      city,
      type,
      price: Number(price),
      bedrooms: Number(bedrooms),
      bathrooms: bathrooms ? Number(bathrooms) : 0,
      mainImage:
        imageUrl ||
        "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1200",
      images: imageUrl ? [imageUrl] : [],
      category: type,
      description,
      amenities: features,
      isUser: true,
    };

    addProperty(newProperty);

    // reset form (optional)
    setTitle("");
    setCountry("");
    setCity("");
    setType("");
    setPrice("");
    setBedrooms("");
    setBathrooms("");
    setDescription("");
    setImageUrl("");
    setFeatures([]);

    navigate("/profile");
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-6 sm:p-8 lg:p-10">
          <header className="mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-[#124131] mb-2">
              List Your Property
            </h1>
            <p className="text-slate-600 text-base sm:text-lg">
              Share your space with travelers worldwide
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Property Title */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#124131]">
                Property Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Beautiful beachfront villa"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-2xl border-0 bg-[#f5efe1] px-4 py-3 text-sm sm:text-base text-slate-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#124131]"
              />
            </div>

            {/* Country + City */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#124131]">
                  Country <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full rounded-2xl border-0 bg-[#f5efe1] px-4 py-3 text-sm sm:text-base text-slate-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#124131]"
                >
                  <option value="" disabled>
                    Select country
                  </option>
                  <option>Greece</option>
                  <option>Switzerland</option>
                  <option>France</option>
                  <option>USA</option>
                  <option>Norway</option>
                  <option>Thailand</option>
                  <option>Italy</option>
                  <option>Spain</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#124131]">
                  City <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Barcelona"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-2xl border-0 bg-[#f5efe1] px-4 py-3 text-sm sm:text-base text-slate-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#124131]"
                />
              </div>
            </div>

            {/* Property Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#124131]">
                Property Type <span className="text-rose-500">*</span>
              </label>
              <select
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-2xl border-0 bg-[#f5efe1] px-4 py-3 text-sm sm:text-base text-slate-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#124131]"
              >
                <option value="" disabled>
                  Select type
                </option>
                <option>Apartment</option>
                <option>Studio</option>
                <option>Villa</option>
                <option>Chalet</option>
                <option>Hut</option>
              </select>
            </div>

            {/* Price + Bedrooms + Bathrooms */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#124131]">
                  Price per night ($) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  placeholder="150"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full rounded-2xl border-0 bg-[#f5efe1] px-4 py-3 text-sm sm:text-base text-slate-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#124131] appearance-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#124131]">
                  Bedrooms <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  placeholder="2"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full rounded-2xl border-0 bg-[#f5efe1] px-4 py-3 text-sm sm:text-base text-slate-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#124131] appearance-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#124131]">
                  Bathrooms
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="1"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  className="w-full rounded-2xl border-0 bg-[#f5efe1] px-4 py-3 text-sm sm:text-base text-slate-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#124131] appearance-none"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#124131]">
                Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe your property..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-2xl border-0 bg-[#f5efe1] px-4 py-3 text-sm sm:text-base text-slate-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#124131] resize-none"
              />
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#124131]">
                Image URL <span className="text-slate-400 text-xs">(optional)</span>
              </label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full rounded-2xl border-0 bg-[#f5efe1] px-4 py-3 text-sm sm:text-base text-slate-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#124131]"
              />
            </div>

            {/* Features */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-[#124131]">Features</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-10">
                {FEATURES.map((feature) => (
                  <label
                    key={feature}
                    className="inline-flex items-center gap-3 text-sm text-slate-900"
                  >
                    <input
                      type="checkbox"
                      checked={features.includes(feature)}
                      onChange={() => toggleFeature(feature)}
                      className="h-5 w-5 rounded-full border-2 border-[#124131] bg-white accent-[#124131] focus:ring-[#124131] focus:ring-2 focus:ring-offset-0"
                    />
                    <span>{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full rounded-2xl bg-[#124131] text-white font-semibold text-base sm:text-lg py-3.5 sm:py-4 shadow-sm hover:bg-[#0f3527] transition-colors"
              >
                Publish Property
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ListProperty;
