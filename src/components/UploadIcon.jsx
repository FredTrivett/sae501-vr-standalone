export default function UploadIcon({ selected }) {
  return (
    <div className="flex flex-col items-center justify-center pt-5 pb-6">
      {selected ? (
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
            <span className="font-semibold">{selected.name}</span>
          </p>
          <p className="text-xs text-gray-500">Click to change file</p>
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
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500">ZIP files only</p>
        </>
      )}
    </div>
  );
}
