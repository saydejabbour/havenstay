// src/pages/SignUp.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Toast from "../components/Toast";
import api from "../api/api";

function SignUp({ onSignup }) {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState(null);
  const showToast = (variant, message, title) => {
    setToast({ variant, message, title });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    // ✅ frontend ONLY blocks obvious mismatch
    if (password !== confirm) {
      showToast("error", "Passwords do not match", "Signup failed");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/signup", {
        full_name: fullName.trim(),
        email: email.trim(),
        password,
      });

      // ✅ backend success message
      showToast("success", res.data.message, "Account created");

      // save auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (onSignup) {
        onSignup(res.data.user);
      }

      setTimeout(() => {
        navigate("/");
      }, 700);
    } catch (err) {
      // ✅ backend error message (email exists, missing fields, etc.)
      const msg =
        err.response?.data?.message ||
        "Unable to create account. Please try again.";

      showToast("error", msg, "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center px-4">
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-emerald-900 hover:underline text-sm font-medium"
      >
        ← Back to home
      </Link>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.08)] p-8">
        <h1 className="text-3xl font-semibold text-emerald-900 mb-2">
          Sign Up
        </h1>
        <p className="text-sm text-slate-600 mb-8">
          Create your HavenStay account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full rounded-lg border text-slate-600 bg-[#f8f0e2] px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-emerald-900/70"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-lg border text-slate-600 bg-[#f8f0e2] px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-emerald-900/70"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-lg border text-slate-600 bg-[#f8f0e2] px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-emerald-900/70"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full rounded-lg border text-slate-600 bg-[#f8f0e2] px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-emerald-900/70"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-3 rounded-lg py-2.5 text-sm font-medium transition
              ${
                loading
                  ? "bg-emerald-900/60 text-white cursor-not-allowed"
                  : "bg-emerald-900 text-white hover:bg-emerald-800"
              }`}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-900 font-semibold">
            Log in
          </Link>
        </p>
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

export default SignUp;
