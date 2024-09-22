import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaPen } from "react-icons/fa";
import "./Projects.css";
import searchImg from "../../Images/search.jpg";

const Projects = () => {
  const [projectData, setProjectData] = useState([]);

  // Fetch projects from API
  function getProjects() {
    fetch("https://localhost:7175/api/ProjectDetails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors", // This ensures CORS mode is enabled
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProjectData(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error); // Log error details
        alert("Unable to get data: " + error.message);
      });
  }

  useEffect(() => {
    getProjects();
  }, []);

  function TableHead() {
    return (
      <thead className="tablehead">
        <tr>
          <th>Job No</th>
          <th>Project Name</th>
          <th>Architect Name</th>
          <th>Site Location</th>
          <th>Drawings</th>
          <th>Drawing Status</th>
          <th>Revision</th>
          <th>Action</th>
        </tr>
      </thead>
    );
  }

  function TableBody() {
    return (
      <tbody className="tablebody">
        {projectData.map((project) => (
          <React.Fragment key={project.id}>
            {/* Project Details Row */}
            <tr>
              <td>{project.jobNo}</td>
              <td>{project.projectName}</td>
              <td>{project.architectName}</td>
              <td>{project.siteLocation || '-'}</td>
              <td colSpan={4}></td> {/* Leave space for drawing rows */}
            </tr>
            {/* Drawing Details Rows */}
            {project.drawingDetails.map((drawing, index) => (
              <tr key={index}>
                <td colSpan={4}></td> {/* Empty cells for the project columns */}
                <td>{drawing.drawingName}</td>
                <td>{drawing.drawingStatus}</td>
                <td>{drawing.revision}</td>
                <td>
                  <FaTrash />
                  <FaPen />
                </td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    );
  }

  return (
    <div className='project-container'>
       <h2>Projects</h2>
      <div className='project-header'>

           <Link to="/createproject">Create project</Link>
           <button onClick={getProjects}>Refresh</button>
          <div className='search-box'>
          <input type='text' placeholder='Search' />
          <img src={searchImg} alt="Search img"  />
          </div>

      </div>
       <table className='project-body'>
          <TableHead/>
          <TableBody/>
      </table>
    </div>
  );
};

export default Projects;