import { useState } from "react";
import UploadIcon from "./UploadIcon";
import UploadButton from "./UploadButton";

export default function FileUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("file-upload");
    const file = fileInput.files[0];

    if (!file) {
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("projectName", projectName);

    try {
      const response = await fetch("https://mmi22-16.mmi-limoges.fr/add", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadSuccess({
          uploadId: data.uploadId,
        });
        setSelectedFile(null);
        setProjectName("");
        fileInput.value = "";
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const copyToClipboard = (uploadId) => {
    const url = `https://mmi22-16.mmi-limoges.fr/view/${uploadId}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        // Show brief success message
        setUploadSuccess((prev) => ({
          ...prev,
          copyMessage: "Link copied!",
        }));
        setTimeout(() => {
          setUploadSuccess((prev) => ({
            ...prev,
            copyMessage: null,
          }));
        }, 2000);
      })
      .catch((err) => console.error("Error copying:", err));
  };

  return (
    <div className="space-y-8">
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
            className="relative flex flex-col items-center justify-center w-full h-44 border border-white/20 rounded-xl cursor-pointer bg-white/10 hover:bg-white/20 transition-all duration-300"
          >
            <UploadIcon selected={selectedFile} />
          </label>
        </div>

        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Nom du projet (sans espaces)"
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white/90 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
          required
        />

        <button
          type="submit"
          className={`w-full py-3 px-4 font-medium rounded-lg transition-all duration-300 text-sm ${
            selectedFile && projectName
              ? "bg-white/20 hover:bg-white/30 text-white/90"
              : "bg-white/10 text-white/30 cursor-not-allowed"
          }`}
          disabled={!selectedFile || isUploading || !projectName}
        >
          <UploadButton isUploading={isUploading} />
        </button>
      </form>

      {uploadSuccess && (
        <div className="p-4 rounded-xl bg-white/10 border border-white/20 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-green-200"
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
            <div>
              <h3 className="text-sm font-medium text-white/90">
                Upload Successful
              </h3>
              <p className="text-xs text-white/60">
                Project ID: {uploadSuccess.uploadId}
              </p>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => copyToClipboard(uploadSuccess.uploadId)}
              className="flex-1 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 text-xs font-medium text-white/90 flex items-center justify-center space-x-2"
            >
              <svg
                className="w-4 h-4"
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
              <span>{uploadSuccess.copyMessage || "Copy Link"}</span>
            </button>
            <a
              href={`https://mmi22-16.mmi-limoges.fr/view/${uploadSuccess.uploadId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 text-xs font-medium text-white/90 flex items-center justify-center space-x-2"
            >
              <svg
                className="w-4 h-4"
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
              <span>View Project</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
