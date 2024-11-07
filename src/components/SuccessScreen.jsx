import React, { useState } from "react";
import Toast from "./Toast";

export default function SuccessScreen({ uploadId, onReset }) {
  const [toastMessage, setToastMessage] = useState("");

  const handleCopyLink = async () => {
    const url = `https://mmi22-48.mmi-limoges.fr/view/${uploadId}`;

    try {
      await navigator.clipboard.writeText(url);
      setToastMessage("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
      setToastMessage("Failed to copy link");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage("")}
        type="success"
      />

      <div className="max-w-xl w-full">
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6 text-center">
          <div className="flex justify-center mb-2">
            <svg
              width="136.2"
              height="13.8"
              viewBox="0 0 454 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M406.562 0.631989H453.091V4.40799H429.091V20.984H440.867V24.824H429.091V41.592H453.091V45.432H406.562V0.631989Z"
                fill="black"
              />
              <path
                d="M356.125 0.631989H378.589V41.592H402.909V45.432H356.125V0.631989Z"
                fill="black"
              />
              <path
                d="M315.068 0.631989H333.756L353.596 45.432H329.404L322.684 30.584H308.604L302.844 45.432H298.172L315.068 0.631989ZM320.892 26.68L315.068 13.688L310.012 26.68H320.892Z"
                fill="black"
              />
              <path
                d="M269.572 4.40799H252.74V0.631989H308.868V4.40799H291.971V45.432H269.572V4.40799Z"
                fill="black"
              />
              <path
                d="M208.25 0.631989H227.066L245.754 23.032V0.631989H249.594V45.432H234.554L212.154 15.608V45.432H208.25V0.631989Z"
                fill="black"
              />
              <path
                d="M114.85 0.631989H136.61L151.586 34.488L164.194 0.631989H173.794L188.514 33.72L200.802 0.631989H205.73L188.834 45.432H169.442L160.162 24.44L152.226 45.432H134.69L114.85 0.631989Z"
                fill="black"
              />
              <path
                d="M88.8895 45.752C83.1722 45.752 78.0095 44.8773 73.4015 43.128C68.7935 41.3787 65.1455 38.7973 62.4575 35.384C59.8122 31.928 58.4895 27.7893 58.4895 22.968C58.4895 18.1893 59.8335 14.0933 62.5215 10.68C65.2095 7.26665 68.8362 4.68532 73.4015 2.93599C78.0095 1.14399 83.1722 0.247986 88.8895 0.247986C94.5642 0.247986 99.6842 1.14399 104.25 2.93599C108.858 4.68532 112.484 7.26665 115.13 10.68C117.818 14.0933 119.162 18.1893 119.162 22.968C119.162 27.7893 117.818 31.928 115.13 35.384C112.484 38.7973 108.858 41.3787 104.25 43.128C99.6842 44.8773 94.5642 45.752 88.8895 45.752ZM88.8895 41.976C90.6815 41.976 92.0042 41.1653 92.8575 39.544C93.5828 38.3067 94.0735 36.1093 94.3295 32.952C94.4575 31.288 94.5215 27.96 94.5215 22.968C94.5215 17.9333 94.4148 14.3707 94.2015 12.28C94.0735 9.71999 93.6042 7.77865 92.7935 6.45599C91.9402 4.83465 90.6388 4.02399 88.8895 4.02399C87.0975 4.02399 85.7535 4.83465 84.8575 6.45599C84.1322 7.73598 83.6628 9.67732 83.4495 12.28C83.2788 14.4987 83.1935 18.0613 83.1935 22.968C83.1935 28.5147 83.2575 31.8427 83.3855 32.952C83.5562 35.896 84.0255 38.0933 84.7935 39.544C85.6895 41.1653 87.0548 41.976 88.8895 41.976Z"
                fill="black"
              />
              <path
                d="M0 0.631989H33.664C39.7653 0.631989 45.0347 2.80799 49.472 7.15999C53.8667 11.5547 56.064 16.824 56.064 22.968C56.064 29.1973 53.8667 34.5093 49.472 38.904C45.0773 43.256 39.808 45.432 33.664 45.432H0V0.631989ZM26.24 41.72C28.672 41.72 30.4213 40.9307 31.488 39.352C32.512 37.816 33.152 35.64 33.408 32.824C33.6213 30.9893 33.728 27.704 33.728 22.968C33.728 19.2987 33.6 15.8 33.344 12.472C33.088 9.95466 32.448 8.03466 31.424 6.71199C30.3573 5.13332 28.6293 4.34399 26.24 4.34399H22.4V41.72H26.24Z"
                fill="black"
              />
            </svg>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Upload Successful!
            </h2>
            <p className="text-gray-600">Your experience is ready to begin</p>

            <div className="flex flex-col space-y-3">
              <a
                href={`https://mmi22-48.mmi-limoges.fr/view/${uploadId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
              >
                Start Experience
              </a>

              <button
                onClick={handleCopyLink}
                className="inline-flex items-center justify-center py-3 px-6 text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 rounded-lg font-semibold transition-colors"
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
                Copy Link
              </button>
            </div>

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
