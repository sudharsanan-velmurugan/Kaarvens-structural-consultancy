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
      mode: "cors",
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
        console.error("Fetch error:", error);
        alert("Unable to get data: " + error.message);
      });
  }

  useEffect(() => {
    getProjects();
  }, []);

  // DELETE project by ID
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      fetch(`https://localhost:7175/api/ProjectDetails/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          // Remove deleted project from the UI
          setProjectData((prevData) => prevData.filter((project) => project.id !== id));
          alert("Project deleted successfully.");
        })
        .catch((error) => {
          console.error("Delete error:", error);
          alert("Unable to delete project: " + error.message);
        });
    }
  };

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
              <td>
                <FaTrash onClick={() => handleDelete(project.id)} style={{ cursor: "pointer", color: "red" }} />
                <FaPen style={{ cursor: "pointer", color: "blue" }} />
              </td>
            </tr>
            {/* Drawing Details Rows */}
            {project.drawingDetails.map((drawing, index) => (
              <tr key={index}>
                <td colSpan={4}></td> {/* Empty cells for the project columns */}
                <td>{drawing.drawingName}</td>
                <td>{drawing.drawingStatus}</td>
                <td>{drawing.revision}</td>
                <td></td> {/* No actions for drawings */}
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    );
  }

  return (
    <div className="project-container">
      <h2>Projects</h2>
      <div className="project-header">
        <Link to="/createproject">Create project</Link>
        <button onClick={getProjects}>Refresh</button>
        <div className="search-box">
          <input type="text" placeholder="Search" />
          <img src={searchImg} alt="Search img" />
        </div>
      </div>
      <table className="project-body">
        <TableHead />
        <TableBody />
      </table>
    </div>
  );
};

export default Projects;
