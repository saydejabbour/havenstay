// src/pages/ListProperty.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import { API_BASE_URL } from "../api/url";


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

  // form fields
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([]);

  // ✅ files instead of image URL
  const [coverFile, setCoverFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);

  const [loading, setLoading] = useState(false);

  // toast
  const [toast, setToast] = useState(null);
  const showToast = (variant, message, title) => {
    setToast({ variant, message, title });
  };

  const toggleFeature = (feature) => {
    setFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      showToast("error", "You must login first.", "Unauthorized");
      return;
    }

    try {
      setLoading(true);

      // 1) Create property in DB
      const createRes = await fetch(`${API_BASE_URL}/properties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          country,
          city,
          property_type: type,
          price_per_night: price,
          bedrooms,
          bathrooms,
          description,
          amenities: features, // backend maps by name
        }),
      });

      const createData = await createRes.json();

      if (!createRes.ok) {
        showToast("error", createData.message || "Failed to create property.");
        return;
      }

      const propertyId = createData.property_id;

      // 2) Upload images (cover + gallery)
      const formData = new FormData();

      // cover is required for your requirement (1 cover image)
      if (!coverFile) {
        showToast("error", "Please upload a cover image.");
        return;
      }

      formData.append("cover", coverFile);

      // gallery is optional (but supports many)
      for (let i = 0; i < galleryFiles.length; i++) {
        formData.append("images", galleryFiles[i]);
      }

      const uploadRes = await fetch(
        `${API_BASE_URL}/properties/${propertyId}/images`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        showToast("error", uploadData.message || "Failed to upload images.");
        return;
      }

      // ✅ success messages from backend
      showToast("success", uploadData.message || "Property published ✅", "Success");

      // reset form
      setTitle("");
      setCountry("");
      setCity("");
      setType("");
      setPrice("");
      setBedrooms("");
      setBathrooms("");
      setDescription("");
      setFeatures([]);
      setCoverFile(null);
      setGalleryFiles([]);

      setTimeout(() => {
        navigate("/profile");
      }, 700);
    } catch (err) {
      console.log(err);
      showToast("error", "Server not reachable. Make sure backend is running on port 5000.");
    } finally {
      setLoading(false);
    }
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
                disabled={loading}
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
                  disabled={loading}
                  className="w-full rounded-2xl border-0 bg-[#f5efe1] px-4 py-3 text-sm sm:text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#124131]"
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
                  disabled={loading}
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
                disabled={loading}
                className="w-full rounded-2xl border-0 bg-[#f5efe1] px-4 py-3 text-sm sm:text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#124131]"
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
                  disabled={loading}
                  className="w-full rounded-2xl border-0 bg-[#f5efe1] px-4 py-3 text-sm sm:text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#124131] appearance-none"
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
                  disabled={loading}
                  className="w-full rounded-2xl border-0 bg-[#f5efe1] px-4 py-3 text-sm sm:text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#124131] appearance-none"
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
                  disabled={loading}
                  className="w-full rounded-2xl border-0 bg-[#f5efe1] px-4 py-3 text-sm sm:text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#124131] appearance-none"
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
                disabled={loading}
                className="w-full rounded-2xl border-0 bg-[#f5efe1] px-4 py-3 text-sm sm:text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#124131] resize-none"
              />
            </div>

            {/* ✅ Cover image (required) */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#124131]">
                Cover Image <span className="text-rose-500">*</span>
              </label>
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                required
                disabled={loading}
                onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                className="w-full"
              />
            </div>

            {/* ✅ Gallery images (optional multiple) */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#124131]">
                Gallery Images <span className="text-slate-400 text-xs">(optional)</span>
              </label>
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                multiple
                disabled={loading}
                onChange={(e) => setGalleryFiles(Array.from(e.target.files || []))}
                className="w-full"
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
                      disabled={loading}
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
                disabled={loading}
                className={`w-full rounded-2xl text-white font-semibold text-base sm:text-lg py-3.5 sm:py-4 shadow-sm transition-colors
                  ${loading ? "bg-[#124131]/60 cursor-not-allowed" : "bg-[#124131] hover:bg-[#0f3527]"}
                `}
              >
                {loading ? "Publishing..." : "Publish Property"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {toast && (
        <Toast
          variant={toast.variant}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default ListProperty;
