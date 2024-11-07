import { useState, useEffect } from "react";
import Logo from "./components/Logo";
import FileUploader from "./components/FileUploader";
import ProjectList from "./components/ProjectList";

export default function App() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await fetch(
        "http://mmi22-16.mmi-limoges.fr:3000/projects"
      );
      const data = await response.json();
      setProjects(data.uploads);
    } catch (error) {
      console.error("Erreur lors de la récupération des projets:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-top justify-center p-4 pt-12">
      <div className="max-w-6xl w-full grid grid-cols-[1fr_2fr] gap-8">
        <div className="p-6 space-y-6">
          <div className="flex justify-center mb-2">
            <Logo />
          </div>
          <FileUploader />
        </div>
        <ProjectList projects={projects} />
      </div>
    </div>
  );
}
