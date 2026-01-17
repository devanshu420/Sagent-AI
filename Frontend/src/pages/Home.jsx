import React, { useContext, useState } from "react";
import { UserContext } from "../context/user.context";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios";

const Home = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();

  function createProject(e) {
    e.preventDefault();
    console.log({ projectName });
    setIsModalOpen(false);
    setProjectName("");


    axios.post("api/project/create-project", {
      name: projectName,
    }).then((response) => {
      console.log(response.data.project);
      // setProjects([...projects, response.data.project]);
      // setIsModalOpen(false);
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="text-sm text-zinc-400">Manage and create your projects</p>
      </div>

      {/* Projects Grid */}
      <div className="flex flex-wrap gap-4">
        {/* New Project Card */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-4 hover:bg-zinc-800 transition shadow-md"
        >
          <span className="text-sm font-medium">New Project</span>
          <i className="ri-link"></i>
        </button>

        {/* Project Cards */}
        {/* {projects.map((project) => (
          <div
            key={project._id}
            onClick={() =>
              navigate("/project", {
                state: { project },
              })
            }
            className="min-w-55 cursor-pointer rounded-xl border border-zinc-800 bg-zinc-900 p-4 hover:bg-zinc-800 transition shadow-md"
          >
            <h2 className="font-semibold text-lg">{project.name}</h2>
            <div className="mt-2 flex items-center gap-2 text-sm text-zinc-400">
              <i className="ri-user-line"></i>
              {project.users.length} collaborators
            </div>
          </div>
        ))} */}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Box */}
          <div className="relative w-[90%] max-w-md rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Create New Project</h2>

            <form onSubmit={createProject} className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-300 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter project name"
                  className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-medium"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;

// import { useState } from "react";

// const Modal = ({ show, onClose }) => {
//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Overlay */}
//       <div
//         className="absolute inset-0 bg-black/70 backdrop-blur-sm"
//         onClick={onClose}
//       />

//       {/* Modal */}
//       <div className="relative w-[90%] max-w-md bg-zinc-900 text-white rounded-2xl shadow-2xl border border-zinc-800 animate-scaleIn">
//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
//           <h2 className="text-lg font-semibold">Create Project</h2>
//           <button
//             onClick={onClose}
//             className="text-zinc-400 hover:text-white transition"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Body */}
//         <form className="px-6 py-5 space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-zinc-300 mb-1">
//               Project Name
//             </label>
//             <input
//               type="text"
//               placeholder="Enter project name"
//               className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
//             />
//           </div>

//           {/* Actions */}
//           <div className="flex justify-end gap-3 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-sm rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 transition font-medium"
//             >
//               Create
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default function Home() {
//   const [showModal, setShowModal] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted");
//     setShowModal(false);
//   };
//   return (
//     <main className="min-h-screen bg-zinc-950 text-white p-6">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold">Projects</h1>
//         <p className="text-zinc-400 text-sm">
//           Create and manage your AI projects
//         </p>
//       </div>

//       {/* Projects Grid */}
//       <div className="flex flex-wrap gap-4">
//         {/* New Project Button */}
//         <button
//           onClick={() => setShowModal(true)}
//           className="group flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-4 hover:bg-zinc-800 transition shadow-md"
//         >
//           <span className="text-sm font-medium">New Project</span>
//           <i className="ri-link ml-2"></i>
//         </button>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <Modal show={showModal} onClose={handleSubmit} />
//       )}
//     </main>
//   );
// }
