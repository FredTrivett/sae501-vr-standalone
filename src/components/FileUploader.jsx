import { useState } from "react";
import UploadStatus from "./UploadStatus";
import UploadIcon from "./UploadIcon";
import UploadButton from "./UploadButton";

export default function FileUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [projectName, setProjectName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setUploadStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("file-upload");
    const file = fileInput.files[0];

    if (!file) {
      setUploadStatus({ success: false, message: "Please select a file" });
      return;
    }

    if (!projectName || /\s/.test(projectName)) {
      setUploadStatus({ success: false, message: "Please enter a valid project name (no spaces)" });
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
        setUploadStatus({
          success: true,
          message: "Upload successful",
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
      setUploadStatus({
        success: false,
        message: `Upload failed: ${error.message}`,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const copyToClipboard = (uploadId) => {
    const url = `https://mmi22-16.mmi-limoges.fr/view/${uploadId}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setUploadStatus((prev) => ({
          ...prev,
          copyMessage: "Lien copié !",
        }));
        setTimeout(() => {
          setUploadStatus((prev) => ({
            ...prev,
            copyMessage: null,
          }));
        }, 2000);
      })
      .catch((err) => console.error("Erreur lors de la copie:", err));
  };

  return (
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
          <UploadIcon selected={selectedFile} />
        </label>
      </div>

      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        placeholder="Nom du projet (sans espaces)"
        className="w-full p-2 border border-gray-300 rounded"
        required
      />

      <button
        type="submit"
        className={`w-full py-2 px-4 font-semibold rounded-lg shadow-md transition-colors relative ${selectedFile && projectName
          ? "bg-blue-600 hover:bg-blue-700 text-white"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        disabled={!selectedFile || isUploading || !projectName}
      >
        <UploadButton isUploading={isUploading} />
      </button>

      <UploadStatus status={uploadStatus} onCopyToClipboard={copyToClipboard} />
    </form>
  );
}
