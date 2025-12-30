// src/pages/Booking.jsx
import { useParams, useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { useMyProperties } from "../context/MyPropertiesContext.jsx";

// ✅ NEW: backend axios instance
import api from "../api/api.js";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { properties } = useMyProperties();
  const property = properties.find((p) => String(p.id) === id);

  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!property) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
        <p className="text-lg text-slate-700">Property not found.</p>
      </div>
    );
  }

  const showAlert = (type, title, message) => {
    setAlert({ type, title, message });
    window.scrollTo({ top: 0, behavior: "smooth" });

    // auto hide success
    if (type === "success") {
      setTimeout(() => setAlert(null), 4000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const form = e.currentTarget;
    const data = new FormData(form);

    const fullName = (data.get("fullName") || "").trim();
    const email = (data.get("email") || "").trim();
    const phone = (data.get("phone") || "").trim();
    const checkIn = data.get("checkIn");
    const checkOut = data.get("checkOut");
    const guests = data.get("guests");
    const contactMethod = data.get("contactMethod");
    const paymentMethod = data.get("paymentMethod");
    const specialRequests = (data.get("specialRequests") || "").trim();

    // ✅ UI validation (fast). backend still validates too.
    if (!fullName) return showAlert("error", "There was a problem", "Please enter your full name.");
    if (!email) return showAlert("error", "There was a problem", "Please enter your email address.");
    if (!phone) return showAlert("error", "There was a problem", "Please enter your phone number or WhatsApp.");
    if (!checkIn || !checkOut) return showAlert("error", "There was a problem", "Please select both check-in and check-out dates.");
    if (!guests) return showAlert("error", "There was a problem", "Please select the number of guests.");
    if (!contactMethod) return showAlert("error", "There was a problem", "Please choose your preferred contact method.");
    if (!paymentMethod) return showAlert("error", "There was a problem", "Please choose your preferred payment method.");

    // ✅ payload matches backend + your bookings table
    const payload = {
      property_id: Number(property.id),
      guest_name: fullName,
      guest_email: email,
      guest_phone: phone,
      check_in: checkIn,
      check_out: checkOut,
      guests_count: Number(guests),
      preferred_contact_method: contactMethod,
      preferred_payment_method: paymentMethod,
      special_requests: specialRequests || null,
    };

    try {
      setLoading(true);

      const res = await api.post("/bookings", payload);

      // ✅ message comes from backend
      const toastType = res.data?.toastType || "success";
      const msg = res.data?.message || "Done ✅";

      showAlert(
        toastType === "success" ? "success" : "error",
        toastType === "success" ? "Booking Sent!" : "There was a problem",
        msg
      );

      if (toastType === "success") {
        form.reset();
      }
    } catch (err) {
      // ✅ error message comes from backend
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Booking failed. Please try again.";

      showAlert("error", "There was a problem", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] pb-16">
      <div className="max-w-4xl mx-auto px-4 pt-12">
        {/* Summary card */}
        <div className="bg-white rounded-3xl shadow-md p-6 mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-emerald-900 mb-1">
              Book Your Stay
            </h1>
            <p className="font-semibold text-slate-800">{property.title}</p>
            <div className="flex items-center text-sm text-slate-600 mt-1">
              <MapPin className="h-4 w-4 mr-1 text-emerald-800" />
              <span>
                {property.city}, {property.country}
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
          </div>
        </div>

        {/* ALERT BANNER */}
        {alert && (
          <div
            className={`mb-6 rounded-3xl px-6 py-4 shadow-lg border
            ${
              alert.type === "error"
                ? "bg-[#ffecec] border-[#f3b8b8] text-[#7c1b1b]"
                : "bg-[#f7f0de] border-[#e7ddc2] text-emerald-900"
            }`}
          >
            <p className="font-semibold mb-1">{alert.title}</p>
            <p className="text-sm">{alert.message}</p>
          </div>
        )}

        {/* Booking form */}
        <div className="bg-white rounded-3xl shadow-md p-8">
          <h2 className="text-xl font-semibold text-emerald-900 mb-6">
            Booking Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Full Name *
              </label>
              <input
                name="fullName"
                type="text"
                placeholder="Full Name"
                className="w-full h-11 rounded-lg bg-[#f7f0de] border border-transparent px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/40"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email *
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full h-11 rounded-lg bg-[#f7f0de] border border-transparent px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/40"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Phone Number / WhatsApp *
              </label>
              <input
                name="phone"
                type="tel"
                placeholder="+1 234 567 8900"
                className="w-full h-11 rounded-lg bg-[#f7f0de] border border-transparent px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/40"
              />
              <p className="mt-1 text-xs text-slate-500">
                We'll contact you to confirm your stay.
              </p>
            </div>

            {/* Dates */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Check-in Date *
                </label>
                <input
                  name="checkIn"
                  type="date"
                  className="w-full h-11 rounded-lg bg-[#f7f0de] border border-transparent px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/40"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Check-out Date *
                </label>
                <input
                  name="checkOut"
                  type="date"
                  className="w-full h-11 rounded-lg bg-[#f7f0de] border border-transparent px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/40"
                />
              </div>
            </div>

            {/* Guests */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Number of Guests *
              </label>
              <select
                name="guests"
                className="w-full h-11 rounded-lg bg-[#f7f0de] border border-transparent px-3 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/40"
                defaultValue=""
              >
                <option value="" disabled>
                  Select guests
                </option>
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5+ Guests</option>
              </select>
            </div>

            {/* Preferred Contact Method */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Preferred Contact Method *
              </label>
              <select
                name="contactMethod"
                className="w-full h-11 rounded-lg bg-[#f7f0de] border border-transparent px-3 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/40"
                defaultValue=""
              >
                <option value="" disabled>
                  Select contact method
                </option>
                <option value="phone">Phone call</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="email">Email</option>
              </select>
            </div>

            {/* Preferred Payment Method */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Preferred Payment Method *
              </label>
              <select
                name="paymentMethod"
                className="w-full h-11 rounded-lg bg-[#f7f0de] border border-transparent px-3 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/40"
                defaultValue=""
              >
                <option value="" disabled>
                  Select payment method
                </option>
                <option value="cash">Cash on arrival</option>
                <option value="card">Card on arrival</option>
                <option value="bank">Bank transfer</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Special Requests (optional)
              </label>
              <textarea
                name="specialRequests"
                rows={4}
                placeholder="Any special requests or questions?"
                className="w-full rounded-lg bg-[#f7f0de] border border-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/40"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="pt-4 flex flex-col gap-3">
              <button
                type="submit"
                disabled={loading}
                className={`w-full h-11 rounded-lg font-semibold transition-colors
                  ${
                    loading
                      ? "bg-emerald-900/60 text-white cursor-not-allowed"
                      : "bg-emerald-900 text-white hover:bg-emerald-800"
                  }`}
              >
                {loading ? "Submitting..." : "Confirm Booking"}
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full h-11 rounded-lg bg-transparent text-emerald-900 font-medium flex items-center justify-center gap-2"
              >
                ← Back to property
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Booking;
