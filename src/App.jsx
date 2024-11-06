import React, { useState } from "react";

export default function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const copyToClipboard = (uploadId) => {
    const url = `http://mmi22-16.mmi-limoges.fr:3000/view/${uploadId}`;
    navigator.clipboard.writeText(url)
      .then(() => {
        setUploadStatus(prev => ({
          ...prev,
          copyMessage: "Lien copié !"
        }));
        setTimeout(() => {
          setUploadStatus(prev => ({
            ...prev,
            copyMessage: null
          }));
        }, 2000);
      })
      .catch(err => console.error('Erreur lors de la copie:', err));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setUploadStatus(null); // Reset status when new file is selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("file-upload");
    const file = fileInput.files[0];

    if (!file) {
      setUploadStatus({ success: false, message: "Please select a file" });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "https://mmi22-16.mmi-limoges.fr/add",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUploadStatus({
          success: true,
          message: "Upload successful",
          uploadId: data.uploadId,
        });
        // Reset file input and selected file after successful upload
        setSelectedFile(null);
        fileInput.value = "";
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus({
        success: false,
        message: `Upload failed: ${error.message}`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-xl w-full">
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          <div className="flex justify-center mb-2">
            <img src="/DOWNTALE.svg" alt="DOWNTALE Logo" className="w-32" />
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Upload Your ZIP File
            </h1>
            <p className="mt-2 text-gray-600">
              Please select a ZIP file to upload
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="file"
                accept=".zip"
                className="hidden"
                id="file-upload"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file-upload"
                className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {selectedFile ? (
                    <>
                      <svg
                        className="w-10 h-10 mb-3 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        Selected file:{" "}
                        <span className="font-semibold">
                          {selectedFile.name}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        Click to change file
                      </p>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">ZIP files only</p>
                    </>
                  )}
                </div>
              </label>
            </div>

            <button
              type="submit"
              className={`w-full py-2 px-4 font-semibold rounded-lg shadow-md transition-colors ${selectedFile
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              disabled={!selectedFile}
            >
              Upload File
            </button>

            {uploadStatus && (
              <div className="space-y-2">
                <div
                  className={`text-center px-4 py-2 rounded-full text-sm font-medium ${uploadStatus.success
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                    }`}
                >
                  {uploadStatus.message}
                </div>
                {uploadStatus.success && uploadStatus.uploadId && (
                  <div className="text-center space-y-2">
                    <div className="text-sm text-gray-600">
                      Upload ID: <span className="font-mono">{uploadStatus.uploadId}</span>
                    </div>
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={() => copyToClipboard(uploadStatus.uploadId)}
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
                        href={`http://mmi22-16.mmi-limoges.fr:3000/view/${uploadStatus.uploadId}`}
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
                    {uploadStatus.copyMessage && (
                      <div className="text-sm text-green-600">
                        {uploadStatus.copyMessage}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
