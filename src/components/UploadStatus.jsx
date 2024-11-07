export default function UploadStatus({ status, onCopyToClipboard }) {
  if (!status) return null;

  return (
    <div className="space-y-2">
      <div
        className={`text-center px-4 py-2 rounded-full text-sm font-medium ${status.success
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
          }`}
      >
        {status.message}
      </div>
      {status.success && status.uploadId && (
        <div className="text-center space-y-2">
          <div className="text-sm text-gray-600">
            Upload ID: <span className="font-mono">{status.uploadId}</span>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => onCopyToClipboard(status.uploadId)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              <svg
                className="w-4 h-4 mr-2"
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
              Copier le lien
            </button>
            <a
              href={`https://mmi22-16.mmi-limoges.fr/view/${status.uploadId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-600 hover:text-green-800"
            >
              <svg
                className="w-4 h-4 mr-2"
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
              Voir le projet
            </a>
          </div>
          {status.copyMessage && (
            <div className="text-sm text-green-600">{status.copyMessage}</div>
          )}
        </div>
      )}
    </div>
  );
}
