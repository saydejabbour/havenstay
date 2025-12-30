// src/api/url.js
export const API_BASE_URL = import.meta.env.VITE_API_URL;

/*
  If backend returns: "uploads/properties/xxx.jpg"
  This converts it to:
  "http://localhost:5000/uploads/properties/xxx.jpg"
  OR
  "https://backend-domain/uploads/properties/xxx.jpg"
*/
export function toImageUrl(imagePath) {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;

  const clean = imagePath.startsWith("/")
    ? imagePath.slice(1)
    : imagePath;

  return `${API_BASE_URL}/${clean}`;
}
