import React from "react";
import FileInput from "./FileInput";
import UploadButton from "./UploadButton";
import UploadStatus from "./UploadStatus";

export default function UploadForm({
  selectedFile,
  onFileChange,
  onSubmit,
  uploadStatus,
  onCopyLink,
  isUploading,
}) {
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

          <form className="space-y-6" onSubmit={onSubmit}>
            <FileInput
              selectedFile={selectedFile}
              onFileChange={onFileChange}
              disabled={isUploading}
            />

            <UploadButton disabled={!selectedFile} isUploading={isUploading} />

            {uploadStatus && (
              <UploadStatus status={uploadStatus} onCopyLink={onCopyLink} />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
