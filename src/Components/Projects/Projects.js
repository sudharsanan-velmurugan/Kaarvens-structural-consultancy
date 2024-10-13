import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaPen } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Table, Button, InputGroup, FormControl } from "react-bootstrap";

const Projects = () => {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState([]);
  const [search, setSearch] = useState("");

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
          getProjects();
          alert("Project deleted successfully.");
        })
        .catch((error) => {
          console.error("Delete error:", error);
          alert("Unable to delete project: " + error.message);
        });
    }
  };

  const handleEdit = (id) => {
    navigate(`/editproject/${id}`);
  };

  function TableHead() {
    return (
      <thead className="tablehead bg-primary text-white">
        <tr>
          <th>S.No</th>
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
        {projectData
          .filter((project) =>
            search.toLowerCase() === ""
              ? project
              : project.projectName
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                project.architectName
                  .toLowerCase()
                  .includes(search.toLowerCase())
          )
          .map((project, i) => (
            <React.Fragment key={project.id}>
              {/* Project Details Row */}
              <tr>
                <td>{i + 1}</td> {/* Serial Number */}
                <td>{project.jobNo}</td>
                <td>{project.projectName}</td>
                <td>{project.architectName}</td>
                <td>{project.siteLocation || "-"}</td> {/* Site Location */}
                <td colSpan={3}></td> {/* Leave space for drawing rows */}
                <td>
                  <FaTrash
                    onClick={() => handleDelete(project.id)}
                    style={{ cursor: "pointer", color: "red" }}
                  />
                  <FaPen
                    onClick={() => handleEdit(project.id)}
                    style={{
                      cursor: "pointer",
                      color: "blue",
                      marginLeft: "15px",
                    }}
                  />
                </td>
              </tr>

              {/* Drawing Details Rows */}
              {project.drawingDetails.map((drawing, index) => (
                <tr key={index}>
                  {/* Empty cells for project columns */}
                  <td></td> {/* Empty for Serial No */}
                  <td></td> {/* Empty for Job No */}
                  <td></td> {/* Empty for Project Name */}
                  <td></td> {/* Empty for Architect Name */}
                  <td></td> {/* Empty for Site Location */}
                  {/* Drawing Details */}
                  <td>{drawing.drawingName}</td> {/* Drawing Name */}
                  <td>{drawing.drawingStatus}</td> {/* Drawing Status */}
                  <td>{drawing.revision || "-"}</td> {/* Revision */}
                </tr>
              ))}
            </React.Fragment>
          ))}
      </tbody>
    );
  }

  return (
    <div className="project-container p-4">
      <h2 className="mb-4 text-center">Projects</h2>
      <div className="project-header d-flex justify-content-between align-items-center mb-4 w-75">
        <Link to="/createproject" className="w-25 m-2 ">
          <Button className="custom-create-btn text-white me-2 bg-success ">
            Create Project
          </Button>
        </Link>
        <Button className="custom-refresh-btn w-25">Refresh</Button>

        <div className="text-end">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder=" Search Projects"
          />
          <IoSearch style={{ marginLeft: "3px", fontSize: "19px" }} />
        </div>
      </div>

      <Table striped bordered hover responsive>
        <TableHead />
        <TableBody />
      </Table>
    </div>
  );
};

export default Projects;
