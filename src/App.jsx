export default function App() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("file-upload");
    const file = fileInput.files[0];

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("File uploaded successfully!");
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload file: " + error.message);
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
              />
              <label
                htmlFor="file-upload"
                className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
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
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">ZIP files only</p>
                </div>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors"
            >
              Upload File
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
