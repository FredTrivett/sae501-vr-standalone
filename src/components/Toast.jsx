import React, { useEffect } from "react";

export default function Toast({
  message,
  type = "success",
  onClose,
  duration = 2000,
}) {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const baseStyles =
    "fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out";
  const typeStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
  };

  return (
    <div
      className={`${baseStyles} ${typeStyles[type]} ${
        message ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
      role="alert"
    >
      <div className="flex items-center space-x-2">
        {type === "success" && (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
}
