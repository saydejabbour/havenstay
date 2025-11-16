// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Home } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[#23473A] text-[#F5F0E6] mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2">
            <Home className="w-6 h-6" />
            <span className="text-2xl font-semibold">HavenStay</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed max-w-md">
            Find comfort wherever you go. Your perfect accommodation is just a
            click away.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/properties" className="hover:underline">Properties</Link></li>
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5" />
              <span>info@havenstay.com</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5" />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              <span>123 Travel Street, City</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="border-t border-[#3c6353] mt-4">
        <p className="text-center text-xs text-[#d2d7d1] py-4">
          © {new Date().getFullYear()} HavenStay. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
