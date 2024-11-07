export default function ProjectList({ projects }) {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Projets</h2>
      <ul>
        {projects.map((project) => (
          <li key={project} className="flex justify-between items-center">
            <span>{project}</span>
            <a
              href={`http://mmi22-16.mmi-limoges.fr:3000/view/${project}`}
              className="text-blue-600 hover:underline"
            >
              Accéder
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
