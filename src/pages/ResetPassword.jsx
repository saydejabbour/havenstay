// src/pages/ResetPassword.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Toast from "../components/Toast";

function ResetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [toast, setToast] = useState(null);
  const showToast = (variant, message, title) => {
    setToast({ variant, message, title });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !newPassword || !confirm) {
      showToast("error", "Please fill in all fields.");
      return;
    }

    if (!email.includes("@")) {
      showToast("error", "Please enter a valid email address.");
      return;
    }

    if (newPassword.length < 6) {
      showToast("error", "Password should be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirm) {
      showToast("error", "Passwords do not match.");
      return;
    }

    // Here you would normally call your backend to reset the password.
    // For now we just show a success toast and redirect to login.
    showToast(
      "success",
      "Your password has been reset successfully.",
      "Password updated"
    );

    setTimeout(() => {
      navigate("/login");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.08)] p-8">
        <h1 className="text-3xl font-semibold text-emerald-900 mb-2">
          Reset Password
        </h1>
        <p className="text-sm text-slate-600 mb-8">
          Enter your email and choose a new password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              New Password
            </label>
            <input
              type="password"
              className="w-full rounded-lg border border-slate-200 bg-[#f8f0e2] px-3 py-2 text-sm
                         text-emerald-900 placeholder:text-emerald-900/50
                         focus:outline-none focus:ring-2 focus:ring-emerald-900/70"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Confirm New Password
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
            Reset password
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          <Link to="/login" className="text-emerald-900 font-semibold">
            Back to login
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

export default ResetPassword;
