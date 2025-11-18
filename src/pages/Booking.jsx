// src/pages/Booking.jsx
import { useParams, useNavigate } from "react-router-dom";
import { properties } from "../data/properties";
import { MapPin } from "lucide-react";
import { useState } from "react";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find((p) => p.id === Number(id));

  // alert banner (error or success)
  const [alert, setAlert] = useState(null);
  // alert = { type: "error" | "success", title: string, message: string }

  if (!property) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
        <p className="text-lg text-slate-700">Property not found.</p>
      </div>
    );
  }

  const showError = (message) => {
    setAlert({
      type: "error",
      title: "There was a problem",
      message,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showSuccess = (message) => {
    setAlert({
      type: "success",
      title: "Booking Sent!",
      message,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });

    // optional: auto-hide after a few seconds
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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

    // ===== VALIDATION WITH DIFFERENT MESSAGES =====
    if (!fullName) {
      showError("Please enter your full name.");
      return;
    }
    if (!email) {
      showError("Please enter your email address.");
      return;
    }
    if (!phone) {
      showError("Please enter your phone number or WhatsApp.");
      return;
    }
    if (!checkIn || !checkOut) {
      showError("Please select both check-in and check-out dates.");
      return;
    }
    if (!guests) {
      showError("Please select the number of guests.");
      return;
    }
    if (!contactMethod) {
      showError("Please choose your preferred contact method.");
      return;
    }
    if (!paymentMethod) {
      showError("Please choose your preferred payment method.");
      return;
    }

    // ===== SUCCESS =====
    showSuccess(
      `Thank you! Your booking request for "${property.title}" has been submitted. We'll contact you soon to confirm.`
    );

    form.reset();
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

        {/* ALERT BANNER (like your screenshots) */}
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
              <div className="relative">
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
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  
                </span>
              </div>
            </div>

            {/* Preferred Contact Method */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Preferred Contact Method *
              </label>
              <div className="relative">
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
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  
                </span>
              </div>
            </div>

            {/* Preferred Payment Method */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Preferred Payment Method *
              </label>
              <div className="relative">
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
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  
                </span>
              </div>
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
                className="w-full h-11 rounded-lg bg-emerald-900 text-white font-semibold hover:bg-emerald-800 transition-colors"
              >
                Confirm Booking
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
