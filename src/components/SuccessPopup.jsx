export default function SuccessPopup({
  isOpen,
  uploadId,
  onClose,
  onCopyToClipboard,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-lg"
        onClick={onClose}
      />

      {/* Popup content */}
      <div className="relative transform transition-all max-w-sm w-full">
        <div className="bg-white/20 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
          {/* Success icon */}
          <div className="p-6 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-white"
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
            </div>

            {/* Title and content */}
            <h3 className="text-xl font-medium text-white mb-2">
              Upload Successful
            </h3>
            <p className="text-white/70 text-sm mb-6">
              Your project has been uploaded successfully
            </p>

            {/* Upload ID */}
            <div className="w-full bg-white/10 rounded-xl p-3 mb-6">
              <p className="text-white/50 text-xs mb-1">Upload ID</p>
              <p className="font-mono text-white/90 text-sm">{uploadId}</p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col w-full space-y-3">
              <button
                onClick={() => onCopyToClipboard(uploadId)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="w-4 h-4 text-white/70 group-hover:text-white/90 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                  <span className="text-white/90 text-sm font-medium">
                    Copy Link
                  </span>
                </div>
              </button>

              <a
                href={`https://mmi22-16.mmi-limoges.fr/view/${uploadId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="w-4 h-4 text-white/70 group-hover:text-white/90 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <span className="text-white/90 text-sm font-medium">
                    View Project
                  </span>
                </div>
              </a>

              <button
                onClick={onClose}
                className="text-white/50 text-sm hover:text-white/70 transition-colors mt-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
