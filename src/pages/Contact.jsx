import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

function Contact() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const triggerError = (msg) => {
    setErrorMsg(msg);
    setShowError(true);
    setTimeout(() => setShowError(false), 4000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) return triggerError("Please enter your full name.");
    if (!form.email.trim()) return triggerError("Please enter your email address.");
    if (!validateEmail(form.email))
      return triggerError("Please enter a valid email address.");
    if (!form.message.trim()) return triggerError("Please enter your message.");

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);

    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] py-12 px-4 relative">
      {/* SUCCESS TOAST */}
      {showSuccess && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#faf4e5] border border-[#d9d2c2] text-[#123524] shadow-[0_8px_24px_rgba(0,0,0,0.08)] rounded-2xl px-6 py-4 w-[350px] animate-fadeIn z-50">
          <h3 className="font-semibold mb-1">Message Sent!</h3>
          <p className="text-sm text-[#35564a]">
            Thank you for contacting us. We'll get back to you soon.
          </p>
        </div>
      )}

      {/* ERROR TOAST */}
      {showError && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#fde8e6] border border-[#f5b5ae] text-[#7a1f12] shadow-[0_8px_24px_rgba(0,0,0,0.08)] rounded-2xl px-6 py-4 w-[350px] animate-fadeIn z-50">
          <h3 className="font-semibold mb-1">There was a problem</h3>
          <p className="text-sm">{errorMsg}</p>
        </div>
      )}

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#123524]">
          Get in Touch
        </h1>
        <p className="mt-4 text-[#35564a] text-sm md:text-base">
          Have questions? We'd love to hear from you. Send us a message and
          we'll respond as soon as possible.
        </p>
        <div className="mt-4 w-24 mx-auto border-t border-[#ded4c7]" />
      </div>

      {/* Main layout */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Left side – form */}
        <div className="md:col-span-2">
          <div className="bg-white border border-[#f1ede7] rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Full name */}
              <div>
                <label className="block text-sm font-medium text-[#123524] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-md border-none bg-[#f3ebdc] px-4 py-3 text-sm text-[#123524] placeholder:text-[#7f9488] focus:outline-none focus:ring-2 focus:ring-[#123524]/70"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[#123524] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full rounded-md border-none bg-[#f3ebdc] px-4 py-3 text-sm text-[#123524] placeholder:text-[#7f9488] focus:outline-none focus:ring-2 focus:ring-[#123524]/70"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-[#123524] mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Tell us how we can help you..."
                  className="w-full rounded-md border-none bg-[#f3ebdc] px-4 py-3 text-sm text-[#123524] placeholder:text-[#7f9488] resize-none focus:outline-none focus:ring-2 focus:ring-[#123524]/70"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full rounded-md bg-[#123524] text-white py-3 text-sm font-semibold tracking-wide hover:bg-[#0f2a1c] active:scale-[0.99] transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Right side – contact cards */}
        <div className="space-y-6">
          {/* Email card */}
          <div className="bg-white border border-[#f1ede7] rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.04)] p-6 flex items-start gap-4 hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)] hover:-translate-y-[2px] transition">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dcefe4] text-xl text-[#123524]">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-[#123524]">Email</h3>
              <a
                href="mailto:info@havenstay.com"
                className="block text-sm text-[#35564a] mt-1 underline underline-offset-2 decoration-[#c4bba9]"
              >
                info@havenstay.com
              </a>
              <a
                href="mailto:support@havenstay.com"
                className="block text-sm text-[#35564a] underline underline-offset-2 decoration-[#c4bba9]"
              >
                support@havenstay.com
              </a>
            </div>
          </div>

          {/* Phone card */}
          <div className="bg-white border border-[#f1ede7] rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.04)] p-6 flex items-start gap-4 hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)] hover:-translate-y-[2px] transition">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dcefe4] text-xl text-[#123524]">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-[#123524]">Phone</h3>
              <a
                href="tel:+15551234567"
                className="block text-sm text-[#35564a] mt-1 underline underline-offset-2 decoration-[#c4bba9]"
              >
                +1 (555) 123-4567
              </a>
              <p className="text-sm text-[#35564a]">Mon–Fri 9am–6pm EST</p>
            </div>
          </div>

          {/* Location card */}
          <div className="bg-white border border-[#f1ede7] rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.04)] p-6 flex items-start gap-4 hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)] hover:-translate-y-[2px] transition">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dcefe4] text-xl text-[#123524]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-[#123524]">Location</h3>
              <a
                href="https://www.google.com/maps?q=123+Travel+Street+New+York+NY+10001"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-[#35564a] mt-1 underline underline-offset-2 decoration-[#c4bba9]"
              >
                123 Travel Street
                <br />
                New York, NY 10001
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Toast animation */}
      <style>
        {`
        .animate-fadeIn {
          animation: fadeInUp 0.35s ease-out;
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translate(-50%, 20px); }
          100% { opacity: 1; transform: translate(-50%, 0); }
        }
      `}
      </style>
    </div>
  );
}

export default Contact;
