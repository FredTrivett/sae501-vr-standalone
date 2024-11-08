export default function UploadIcon({ selected }) {
  const truncateFileName = (name, maxLength = 30) => {
    if (!name) return "";
    if (name.length <= maxLength) return name;
    const extension = name.split(".").pop();
    const nameWithoutExt = name.slice(0, -(extension.length + 1));
    const truncatedName = `${nameWithoutExt.slice(
      0,
      maxLength
    )}...${extension}`;
    return truncatedName;
  };

  return (
    <div className="flex flex-col items-center justify-center pt-5 pb-6">
      {selected ? (
        <>
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
            <svg
              className="w-6 h-6 text-white/90"
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
          <div className="text-center px-4">
            <p className="mb-2 text-sm text-white/90">
              Selected file:{" "}
              <span className="font-medium text-white" title={selected.name}>
                {truncateFileName(selected.name)}
              </span>
            </p>
            <p className="text-xs text-white/50 hover:text-white/70 transition-colors">
              Click to change file
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:bg-white/30 transition-colors">
            <svg
              className="w-6 h-6 text-white/90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <div className="text-center px-4">
            <p className="mb-2 text-sm text-white/90">
              <span className="font-medium">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-white/50">ZIP files only</p>
          </div>
        </>
      )}
    </div>
  );
}
