import React, { useState } from "react";
import UploadForm from "./components/UploadForm";
import SuccessScreen from "./components/SuccessScreen";

export default function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setUploadStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setUploadStatus({ success: false, message: "Please select a file" });
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // const response = await fetch("http://localhost:3000/upload", {
      const response = await fetch("https://f-trivett.mmi-limoges.fr/upload", {
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

  const handleCopyLink = (uploadId) => {
    // const url = `http://localhost:3000/view/${uploadId}`;
    const url = `https://f-trivett.mmi-limoges.fr/view/${uploadId}`;
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

  const handleReset = () => {
    setUploadStatus(null);
    setSelectedFile(null);
  };

  if (uploadStatus?.success) {
    return (
      <SuccessScreen uploadId={uploadStatus.uploadId} onReset={handleReset} />
    );
  }

  return (
    <UploadForm
      selectedFile={selectedFile}
      onFileChange={handleFileChange}
      onSubmit={handleSubmit}
      uploadStatus={uploadStatus}
      onCopyLink={handleCopyLink}
      isUploading={isUploading}
    />
  );
}
