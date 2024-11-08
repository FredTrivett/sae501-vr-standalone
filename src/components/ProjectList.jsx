import { useState, useMemo } from "react";

const ITEMS_PER_PAGE = 6;

const truncateName = (name, maxLength = 20) => {
  if (name.length <= maxLength) return name;
  return `${name.slice(0, maxLength)}...`;
};


export default function ProjectList({ projects, refreshProjects }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = useMemo(() => {
    if (!Array.isArray(projects)) return [];
    return projects.filter((project) =>
      (project?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [projects, searchQuery]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  return (
    <div className="space-y-8">
      {/* Header and Search */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium text-white/90">Your Projects</h2>
          <div className="flex items-center justify-end gap-2">
            <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-white/70">
              {filteredProjects.length} total
            </span>
            <button
              className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-white hover:bg-white/20 transition duration-300"
            >
              Refresh
            </button>
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search projects..."
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white/90 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm pl-10"
          />
          <svg
            className="w-4 h-4 text-white/50 absolute left-3 top-1/2 transform -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Project List */}
      <div className="space-y-3">
        {paginatedProjects.map((project) => (
          <div
            key={project.id}
            className="group relative bg-white/10 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-white/70"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-white/90 font-medium text-sm truncate"
                    title={project.name}
                  >
                    {truncateName(project.name)}
                  </h3>
                </div>
              </div>
              <a
                href={`https://mmi22-16.mmi-limoges.fr/view/${project.id}`}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1.5 rounded-lg bg-white/10 text-white/90 hover:bg-white/30 text-xs font-medium flex items-center space-x-1"
              >
                <span>View</span>
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-all duration-300 ${currentPage === i + 1
                ? "bg-white/20 text-white"
                : "text-white/70 hover:bg-white/10"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-white/50 text-sm">No projects found</div>
        </div>
      )}
    </div>
  );
}
