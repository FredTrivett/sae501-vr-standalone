import React from "react";

export default function SuccessScreen({ uploadId, onReset }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-xl w-full">
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6 text-center">
          <div className="flex justify-center mb-2">
            <img src="/DOWNTALE.svg" alt="DOWNTALE Logo" className="w-32" />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Upload Successful!
            </h2>
            <p className="text-gray-600">Your experience is ready to begin</p>

            <a
              href={`http://localhost:3000/view/${uploadId}`}
              //   href={`http://mmi22-16.mmi-limoges.fr/view/${uploadId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
            >
              Start Experience
            </a>

            <button
              onClick={onReset}
              className="mt-4 text-sm text-gray-500 hover:text-gray-700"
            >
              Upload another file
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
