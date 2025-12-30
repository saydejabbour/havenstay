// src/components/PropertyCard.jsx
import { Link } from "react-router-dom";
import { MapPin, Bed } from "lucide-react";
import { toImageUrl } from "../api/url";

function PropertyCard({ property }) {
  // ✅ Backend fields mapping
  const title = property.title;
  const city = property.city;
  const country = property.country;

  // backend uses: price_per_night, property_type, coverImage
  const pricePerNight = property.price_per_night;
  const propertyType = property.property_type;

  // coverImage = "uploads/properties/xxx.jpg" -> full URL using toImageUrl()
  const coverImageUrl = toImageUrl(property.coverImage);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <img
          src={coverImageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          // ✅ If image missing or broken, show empty background (prevents broken icon)
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />

        <div className="absolute top-3 right-3 bg-emerald-900 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
          ${pricePerNight}/night
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-emerald-900 mb-1 line-clamp-1">
          {title}
        </h3>

        <div className="flex items-center text-sm text-slate-600 mb-2">
          <MapPin className="h-4 w-4 mr-1 text-emerald-800" />
          <span>
            {city}, {country}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm mb-3">
          <span className="px-3 py-1 rounded-full bg-amber-300/70 text-emerald-900 font-medium">
            {propertyType}
          </span>

          <span className="flex items-center gap-1 text-slate-600">
            <Bed className="h-4 w-4" />
            {property.bedrooms} beds
          </span>
        </div>

        <p className="text-sm text-slate-600 line-clamp-2 mb-4">
          {property.description}
        </p>

        <Link
          to={`/properties/${property.id}`}
          className="block w-full text-center bg-emerald-900 text-white py-2.5 rounded-lg font-semibold hover:bg-emerald-800 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default PropertyCard;
