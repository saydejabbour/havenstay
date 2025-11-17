// src/pages/SignUp.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Toast from "../components/Toast";

function SignUp({ onSignup }) {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // toast state
  const [toast, setToast] = useState(null);
  const showToast = (variant, message, title) => {
    setToast({ variant, message, title });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName) {
      showToast("error", "Please enter your full name.");
      return;
    }
    if (!email) {
      showToast("error", "Please enter your email address.");
      return;
    }
    if (!email.includes("@")) {
      showToast("error", "Please enter a valid email address.");
      return;
    }
    if (!password || !confirm) {
      showToast("error", "Please fill in both password fields.");
      return;
    }
    if (password.length < 6) {
      showToast("error", "Password should be at least 6 characters long.");
      return;
    }
    if (password !== confirm) {
      showToast("error", "Passwords do not match.");
      return;
    }

    // success
    onSignup(fullName); // sets username in App + localStorage
    showToast(
      "success",
      "Your HavenStay account has been created successfully.",
      "Account created"
    );

    setTimeout(() => {
      navigate("/");
    }, 700);
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
              className="w-full rounded-lg border border-slate-200 bg-[#f8f0e2] px-3 py-2 text-sm
                         text-emerald-900 placeholder:text-emerald-900/50
                         focus:outline-none focus:ring-2 focus:ring-emerald-900/70"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-lg border border-slate-200 bg-[#f8f0e2] px-3 py-2 text-sm
                         text-emerald-900 placeholder:text-emerald-900/50
                         focus:outline-none focus:ring-2 focus:ring-emerald-900/70"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-lg border border-slate-200 bg-[#f8f0e2] px-3 py-2 text-sm
                         text-emerald-900 placeholder:text-emerald-900/50
                         focus:outline-none focus:ring-2 focus:ring-emerald-900/70"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full rounded-lg border border-slate-200 bg-[#f8f0e2] px-3 py-2 text-sm
                         text-emerald-900 placeholder:text-emerald-900/50
                         focus:outline-none focus:ring-2 focus:ring-emerald-900/70"
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full mt-3 rounded-lg bg-emerald-900 text-white py-2.5 text-sm font-medium hover:bg-emerald-800 transition"
          >
            Sign Up
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
