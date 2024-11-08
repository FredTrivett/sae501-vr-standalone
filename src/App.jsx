import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./components/Logo";
import FileUploader from "./components/FileUploader";
import ProjectList from "./components/ProjectList";

export default function App() {
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("upload");

  const fetchProjects = async () => {
    try {
      const response = await fetch("https://mmi22-16.mmi-limoges.fr/list");
      const data = await response.json();
      const formattedProjects = (data.uploads || []).map((id) => ({
        id,
        name: id,
      }));
      setProjects(formattedProjects);
    } catch (error) {
      console.error("Erreur lors de la récupération des projets:", error);
      setProjects([]);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const tabs = [
    { id: "upload", label: "Upload" },
    { id: "projects", label: "Projects" },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "projects") {
      fetchProjects();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex">
      {/* Background Image */}
      <motion.img
        src="./assets/background.jpg"
        alt="background"
        className="fixed inset-0 w-full h-full object-cover brightness-[0.7]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{ zIndex: -1 }}
      />

      {/* Logo */}
      <motion.div
        className="fixed top-8 left-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Logo />
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-grow"></div>

      {/* Right Panel */}
      <div className="h-screen p-6 fixed right-0" style={{ width: "450px" }}>
        <div className="h-full rounded-3xl bg-black/30 backdrop-blur-2xl border border-white/5 flex flex-col">
          {/* Tab Navigation - Fixed at top */}
          <div className="p-8 pb-0">
            <div className="flex justify-center mb-8">
              <div className="bg-black/20 backdrop-blur-2xl rounded-2xl p-1 flex space-x-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`relative px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${activeTab === tab.id
                      ? "text-white bg-white/10"
                      : "text-white/60 hover:text-white/80"
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto px-8 pb-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "upload" ? (
                  <FileUploader
                    onUploadSuccess={() => {
                      fetchProjects();
                      setActiveTab("projects");
                    }}
                  />
                ) : (
                  <ProjectList projects={projects} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
