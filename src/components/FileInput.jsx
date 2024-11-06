import React from "react";

export default function FileInput({ selectedFile, onFileChange, disabled }) {
  return (
    <div className="relative">
      <input
        type="file"
        accept=".zip"
        className="hidden"
        id="file-upload"
        onChange={onFileChange}
        disabled={disabled}
      />
      <label
        htmlFor="file-upload"
        className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg ${
          disabled
            ? "bg-gray-100 cursor-not-allowed"
            : "bg-gray-50 hover:bg-gray-100 cursor-pointer"
        } transition-colors`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {selectedFile ? (
            <SelectedFileContent fileName={selectedFile.name} />
          ) : (
            <UploadPrompt disabled={disabled} />
          )}
        </div>
      </label>
    </div>
  );
}

function SelectedFileContent({ fileName }) {
  return (
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
        Selected file: <span className="font-semibold">{fileName}</span>
      </p>
      <p className="text-xs text-gray-500">Click to change file</p>
    </>
  );
}

function UploadPrompt({ disabled }) {
  return (
    <>
      <svg
        className={`w-10 h-10 mb-3 ${
          disabled ? "text-gray-300" : "text-gray-400"
        }`}
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
        />
      </svg>
      <p className="mb-2 text-sm text-gray-500">
        <span className="font-semibold">
          {disabled ? "Upload in progress..." : "Click to upload"}
        </span>{" "}
        {!disabled && "or drag and drop"}
      </p>
      <p className="text-xs text-gray-500">ZIP files only</p>
    </>
  );
}
