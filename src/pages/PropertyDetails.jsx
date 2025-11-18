// src/pages/PropertyDetails.jsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { properties } from "../data/properties";
import { MapPin, Check } from "lucide-react";
import { useState } from "react";

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find((p) => p.id === Number(id));

  const [activeImage, setActiveImage] = useState(
    property ? property.mainImage : ""
  );

  if (!property) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
        <p className="text-lg text-slate-700">Property not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8] pb-16">
      <div className="max-w-6xl mx-auto px-4 pt-10">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f7f0de] text-slate-700 text-sm font-medium shadow hover:bg-[#f1e5cd] mb-6"
        >
          ← Back
        </button>

        {/* Main image */}
        <div className="bg-white rounded-3xl shadow-md overflow-hidden mb-8">
          <img
            src={activeImage}
            alt={property.title}
            className="w-full h-[420px] object-cover"
          />

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
                  {property.type}
                </span>
                <span className="text-slate-600">
                  {property.bedrooms} Bedrooms
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-emerald-900">
                ${property.price}
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

        {/* Image thumbnails */}
        <div className="mb-10 flex gap-4 overflow-x-auto pb-2">
          {property.images.map((img) => (
            <button
              key={img}
              onClick={() => setActiveImage(img)}
              className={`h-24 w-40 flex-shrink-0 rounded-xl overflow-hidden border-2 ${
                activeImage === img
                  ? "border-emerald-800"
                  : "border-transparent"
              }`}
            >
              <img
                src={img}
                alt="Property"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Description + amenities */}
        <div className="bg-white rounded-3xl shadow-md p-8">
          <h2 className="text-xl font-semibold text-emerald-900 mb-3">
            Description
          </h2>
          <p className="text-slate-700 mb-6">{property.description}</p>

          <hr className="my-4 border-[#efe2c9]" />

          <h3 className="text-xl font-semibold text-emerald-900 mb-4">
            Features &amp; Amenities
          </h3>
          <div className="grid md:grid-cols-3 gap-y-3">
            {property.amenities.map((amenity) => (
              <div
                key={amenity}
                className="flex items-center gap-2 text-slate-700"
              >
                <Check className="h-4 w-4 text-emerald-800" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
