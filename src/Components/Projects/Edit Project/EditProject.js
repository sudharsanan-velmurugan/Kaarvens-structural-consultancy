import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Create Project/CreateProject"
const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    jobNo: "",
    projectName: "",
    architectName: "",
    siteLocation: "",
    drawingDetails: [
      {
        drawingName: "",
        drawingStatus: "",
        revision: "",
      },
    ],
  });

  // Fetch project details by id
  function getProjects() {
    fetch(`https://localhost:7175/api/ProjectDetails/${id}`, {
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
        setFormData(data); // Set the fetched data to the form state
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        alert("Unable to get data: " + error.message);
      });
  }

  useEffect(() => {
    getProjects();
  }, [id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDrawingChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDrawings = formData.drawingDetails.map((drawing, i) =>
      i === index ? { ...drawing, [name]: value } : drawing
    );
    setFormData((prev) => ({
      ...prev,
      drawingDetails: updatedDrawings,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submit action

    fetch(`https://localhost:7175/api/ProjectDetails`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(formData), // Send the updated formData
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        alert("Project updated successfully!");
        setFormData(data); // Optionally reset the form with the updated data
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        alert("Unable to update project: " + error.message);
      });
      navigate("/projects")
  };

  return (
    <div className="create-project-container">
    <form onSubmit={handleSubmit} className='create-project-form-group'>
      <div>
        <label htmlFor="jobNo">Job No</label>
        <input
          type="text"
          name="jobNo"
          value={formData.jobNo}
          onChange={handleFormChange}
        />
      </div>
      <div>
        <label htmlFor="projectName">Project Name</label>
        <input
          type="text"
          name="projectName"
          value={formData.projectName}
          onChange={handleFormChange}
        />
      </div>
      <div>
        <label htmlFor="architectName">Architect Name</label>
        <input
          type="text"
          name="architectName"
          value={formData.architectName}
          onChange={handleFormChange}
        />
      </div>
      <div>
        <label htmlFor="siteLocation">Site Location</label>
        <input
          type="text"
          name="siteLocation"
          value={formData.siteLocation}
          onChange={handleFormChange}
        />
      </div>

      <div>
        {formData.drawingDetails.map((drawing, index) => (
          <div key={index} >
            <div>
              <label htmlFor={`drawingName-${index}`}>Drawing Name</label>
              <input
                type="text"
                name="drawingName"
                value={drawing.drawingName}
                onChange={(e) => handleDrawingChange(e, index)}
              />
            </div>
            <div>
              <label htmlFor={`drawingStatus-${index}`}>Drawing Status</label>
              <input
                type="text"
                name="drawingStatus"
                value={drawing.drawingStatus}
                onChange={(e) => handleDrawingChange(e, index)}
              />
            </div>
            <div>
              <label htmlFor={`revision-${index}`}>Revision</label>
              <input
                type="text"
                name="revision"
                value={drawing.revision}
                onChange={(e) => handleDrawingChange(e, index)}
              />
            </div>
          </div>
        ))}
      </div>

      <button className="create-project-link" type="submit">Edit project</button>
    </form>
    </div>
  );
};

export default EditProject;
