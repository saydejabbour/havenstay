// src/pages/ResetPassword.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Toast from "../components/Toast";
import { API_BASE_URL } from "../api/url";


function ResetPassword() {
  const navigate = useNavigate();

  // Step control
  const [step, setStep] = useState(1); // 1 = request code, 2 = reset password
  const [loading, setLoading] = useState(false);

  // inputs
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");


  // toast
  const [toast, setToast] = useState(null);
  const showToast = (variant, message, title) => {
    setToast({ variant, message, title });
  };

  // Step 1: request reset code
  const handleRequestCode = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast("error", data.message || "Failed to generate reset code.");
        return;
      }

      // backend returns reset_token for testing (no email yet)
      setResetToken(data.reset_token || "");
      setStep(2);

      showToast("success", data.message, "Reset Code Ready");
    } catch (err) {
      console.log(err);
      showToast("error", "Server not reachable. Make sure backend is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: reset password using code
  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reset_token: resetToken.trim(),
          new_password: newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast("error", data.message || "Failed to reset password.");
        return;
      }

      showToast("success", data.message, "Password Updated");

      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (err) {
      console.log(err);
      showToast("error", "Server not reachable. Make sure backend is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.08)] p-8">
        <h1 className="text-3xl font-semibold text-emerald-900 mb-2">
          Reset Password
        </h1>

        {step === 1 ? (
          <>
            <p className="text-sm text-slate-600 mb-8">
              Enter your email to generate a reset code.
            </p>

            <form onSubmit={handleRequestCode} className="space-y-5">
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
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full mt-3 rounded-lg py-2.5 text-sm font-medium transition
                  ${loading ? "bg-emerald-900/60 text-white cursor-not-allowed" : "bg-emerald-900 text-white hover:bg-emerald-800"}`}
              >
                {loading ? "Generating..." : "Generate reset code"}
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="text-sm text-slate-600 mb-6">
              Paste the reset code and choose a new password.
            </p>

            <form onSubmit={handleResetPassword} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Reset Code
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-200 bg-[#f8f0e2] px-3 py-2 text-sm
                             text-emerald-900 placeholder:text-emerald-900/50
                             focus:outline-none focus:ring-2 focus:ring-emerald-900/70"
                  placeholder="Paste code here"
                  value={resetToken}
                  onChange={(e) => setResetToken(e.target.value)}
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
                />
              </div>

              {/* NOTE: confirm check can be done in backend later;
                  if you want STRICT "backend messages only", remove this if block. */}
              {confirm && newPassword && confirm !== newPassword && (
                <p className="text-xs text-red-700">
                  Passwords do not match (UI hint).
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full mt-3 rounded-lg py-2.5 text-sm font-medium transition
                  ${loading ? "bg-emerald-900/60 text-white cursor-not-allowed" : "bg-emerald-900 text-white hover:bg-emerald-800"}`}
              >
                {loading ? "Updating..." : "Reset password"}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full rounded-lg py-2 text-sm font-medium text-emerald-900 hover:underline"
                disabled={loading}
              >
                ← Back to email step
              </button>
            </form>
          </>
        )}

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
