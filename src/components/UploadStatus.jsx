import React from "react";

export default function UploadStatus({ status, onCopyLink }) {
  return (
    <div className="space-y-2">
      <div
        className={`text-center px-4 py-2 rounded-full text-sm font-medium ${
          status.success
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
              onClick={() => onCopyLink(status.uploadId)}
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
          </div>
          {status.copyMessage && (
            <div className="text-sm text-green-600">{status.copyMessage}</div>
          )}
        </div>
      )}
    </div>
  );
}
