import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Project from "../pages/Project";

const ProjectRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />  
          <Route path="/project" element={<Project />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default ProjectRoutes