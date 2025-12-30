// src/pages/PropertyDetails.jsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { MapPin, Check } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import api from "../api/api";
import { toImageUrl } from "../api/url";

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // backend response shape:
  // { property: {...}, images: [...], amenities: [...] }
  const [property, setProperty] = useState(null);
  const [images, setImages] = useState([]);
  const [amenities, setAmenities] = useState([]);

  // active image URL for big display
  const [activeImage, setActiveImage] = useState("");

  // Build a clean thumbnails list (cover first if exists)
  const thumbnailUrls = useMemo(() => {
    const urls = (images || [])
      .map((img) => toImageUrl(img.imagePath || img.image_path || img.image_url))
      .filter(Boolean);

    // if property has coverImage (from list endpoint) it may not exist here,
    // but we can still support it if present
    const cover = property?.coverImage ? toImageUrl(property.coverImage) : "";
    if (cover && !urls.includes(cover)) {
      return [cover, ...urls];
    }
    return urls;
  }, [images, property]);

  useEffect(() => {
    async function fetchDetails() {
      try {
        setLoading(true);
        setError("");

        const res = await api.get(`/properties/${id}`);

        const p = res.data?.property || null;
        const imgs = res.data?.images || [];
        const ams = res.data?.amenities || [];

        setProperty(p);
        setImages(imgs);
        setAmenities(ams);

        // Pick initial active image:
        // 1) cover image in images list (is_cover=1) if exists
        // 2) first image
        // 3) empty
        const coverRow = imgs.find((x) => Number(x.is_cover) === 1);
        const firstImg = coverRow || imgs[0];

        if (firstImg && firstImg.imagePath) {
          setActiveImage(toImageUrl(firstImg.imagePath));
        } else if (firstImg && firstImg.image_path) {
          setActiveImage(toImageUrl(firstImg.image_path));
        } else if (p?.coverImage) {
          setActiveImage(toImageUrl(p.coverImage));
        } else {
          setActiveImage("");
        }
      } catch (e) {
        setError(e?.response?.data?.error || e?.response?.data?.message || "Failed to load property");
        setProperty(null);
        setImages([]);
        setAmenities([]);
        setActiveImage("");
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
        <p className="text-lg text-slate-700">Loading...</p>
      </div>
    );
  }

  // Error / not found state
  if (error || !property) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-3">{error || "Property not found."}</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f7f0de] text-slate-700 text-sm font-medium shadow hover:bg-[#f1e5cd]"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8] pb-16">
      <div className="max-w-6xl mx-auto px-4 pt-10">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f7f0de] text-slate-700 text-sm font-medium shadow hover:bg-[#f1e5cd] mb-6"
        >
          ← Back
        </button>

        <div className="bg-white rounded-3xl shadow-md overflow-hidden mb-8">
          {/* Big Image */}
          <div className="w-full h-[420px] bg-slate-100">
            {activeImage ? (
              <img
                src={activeImage}
                alt={property.title}
                className="w-full h-[420px] object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : null}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-8 py-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-emerald-900 mb-2">
                {property.title}
              </h1>

              <div className="flex items-center text-sm text-slate-600 mb-2">
                <MapPin className="h-4 w-4 mr-1 text-emerald-800" />
                <span>
                  {property.city}, {property.country}
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <span className="px-3 py-1 rounded-full bg-amber-300/80 text-emerald-900 font-medium">
                  {property.property_type}
                </span>
                <span className="text-slate-600">
                  {property.bedrooms} Bedrooms • {property.bathrooms} Bathrooms
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-emerald-900">
                ${property.price_per_night}
                <span className="text-base font-normal text-slate-600">
                  /night
                </span>
              </div>

              <Link
                to={`/properties/${property.id}/book`}
                className="mt-3 inline-flex justify-center px-6 py-2.5 bg-emerald-900 text-white rounded-lg font-semibold hover:bg-emerald-800 transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>

        {/* Thumbnails */}
        {thumbnailUrls.length > 0 && (
          <div className="mb-10 flex gap-4 overflow-x-auto pb-2">
            {thumbnailUrls.map((url, idx) => (
              <button
                key={url + idx}
                onClick={() => setActiveImage(url)}
                className={`h-24 w-40 flex-shrink-0 rounded-xl overflow-hidden border-2 ${
                  activeImage === url ? "border-emerald-800" : "border-transparent"
                }`}
              >
                <img src={url} alt="Property" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Description + amenities */}
        <div className="bg-white rounded-3xl shadow-md p-8">
          <h2 className="text-xl font-semibold text-emerald-900 mb-3">
            Description
          </h2>
          <p className="text-slate-700 mb-6">{property.description}</p>

          <hr className="my-4 border-[#efe2c9]" />

          <h3 className="text-xl font-semibold text-emerald-900 mb-4">
            Features & Amenities
          </h3>

          {amenities.length === 0 ? (
            <p className="text-slate-600">No amenities listed.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-y-3">
              {amenities.map((a) => (
                <div key={a.id} className="flex items-center gap-2 text-slate-700">
                  <Check className="h-4 w-4 text-emerald-800" />
                  <span>{a.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
