// src/components/Toast.jsx
function Toast({ variant = "error", title, message, onClose }) {
  const base =
    "fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md rounded-2xl shadow-lg px-4 py-3 flex gap-3 border text-sm";

  const styles =
    variant === "error"
      ? "bg-red-50 border-red-200 text-red-800"
      : "bg-emerald-50 border-emerald-200 text-emerald-900";

  return (
    <div className={`${base} ${styles}`}>
      <div className="flex-1">
        <p className="font-semibold mb-0.5">
          {title || (variant === "error" ? "There was a problem" : "Success")}
        </p>
        <p>{message}</p>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="self-start text-xs font-semibold opacity-70 hover:opacity-100"
      >
        ✕
      </button>
    </div>
  );
}

export default Toast;
