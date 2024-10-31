import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
  const handleBack = () => {
    navigate("/projects");
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
        navigate("/projects");
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        alert("Unable to update project: " + error.message);
      });
  };

  return (
    <section className="container my-3 d-flex justify-content-center">
      <div className="card shadow-lg p-4" style={{ width: "600px" }}>
        <h2 className="text-center mb-4">Edit Project</h2>
        <form onSubmit={handleSubmit}>
          {/* Job Number Field */}
          <div className="mb-3 row justify-content-center">
            <label className="col-sm-3 col-form-label text-right">
              Job No:
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control"
                name="jobNo"
                value={formData.jobNo}
                onChange={handleFormChange}
              />
            </div>
          </div>

          {/* Project Name Field */}
          <div className="mb-3 row justify-content-center">
            <label className="col-sm-3 col-form-label text-right">
              Project Name:
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control"
                name="projectName"
                value={formData.projectName}
                onChange={handleFormChange}
              />
            </div>
          </div>

          {/* Architect Name Field */}
          <div className="mb-3 row justify-content-center">
            <label className="col-sm-3 col-form-label text-right">
              Architect Name:
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control"
                name="architectName"
                value={formData.architectName}
                onChange={handleFormChange}
              />
            </div>
          </div>

          {/* Site Location Field */}
          <div className="mb-3 row justify-content-center">
            <label className="col-sm-3 col-form-label text-right">
              Site Location:
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control"
                name="siteLocation"
                value={formData.siteLocation}
                onChange={handleFormChange}
              />
            </div>
          </div>

          {/* Drawing Details */}
          <h4 className="text-center mt-4">Drawing Details</h4>
          {formData.drawingDetails.map((drawing, index) => (
            <div key={index} className="mb-3">
              <div className="row justify-content-center">
                <label className="col-sm-3 col-form-label text-right">
                  Drawing Name:
                </label>
                <div className="col-sm-7">
                  <input
                    type="text"
                    className="form-control"
                    name="drawingName"
                    value={drawing.drawingName}
                    onChange={(e) => handleDrawingChange(e, index)}
                  />
                </div>
              </div>
              <div className="row justify-content-center mt-3">
                <label className="col-sm-3 col-form-label text-right">
                  Drawing Status:
                </label>
                <div className="col-sm-7">
                  <input
                    type="text"
                    className="form-control"
                    name="drawingStatus"
                    value={drawing.drawingStatus}
                    onChange={(e) => handleDrawingChange(e, index)}
                  />
                </div>
              </div>
              <div className="row justify-content-center mt-3">
                <label className="col-sm-3 col-form-label text-right">
                  Revision:
                </label>
                <div className="col-sm-7">
                  <input
                    type="text"
                    className="form-control"
                    name="revision"
                    value={drawing.revision}
                    onChange={(e) => handleDrawingChange(e, index)}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <div className="text-center mt-4">
            <button
              onClick={handleBack}
              className="btn btn-danger"
              style={{ width: "200px", marginRight: "10px" }}
            >
              Back
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "200px" }}
            >
              Edit Project
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProject;
