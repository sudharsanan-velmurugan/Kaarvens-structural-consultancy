import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProject = () => {
  const { id } = useParams();
  console.log("Id:",id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: id || '',
    jobNo: '',
    projectName: '',
    architectName: '',
    siteLocation: '',
    drawingDetails: [],
  });

  useEffect(() => {
    fetch(`https://localhost:7175/api/ProjectDetails/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched project details:', data); // Log the fetched data
        setFormData({
          ...data,
          drawingDetails: data.drawingDetails || [],
        });
      })
      .catch((error) => {
        console.error('Error fetching project details:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDrawingChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDrawings = formData.drawingDetails.map((drawing, i) =>
      i === index ? { ...drawing, [name]: value } : drawing
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      drawingDetails: updatedDrawings,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:7175/api/ProjectDetails', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json-patch+json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update project');
      }

      const data = await response.json();
      console.log('Project updated successfully', data);
      navigate("/projects");
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  return (
    <div className='edit-project-container'>
      <h2>Edit Project {id}</h2>
      <form className="edit-project-form-group" onSubmit={handleSubmit}>
        <label>
          Job No:
          <input
            type="text"
            name="jobNo"
            value={formData.jobNo || ''}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Project Name:
          <input
            type="text"
            name="projectName"
            value={formData.projectName || ''}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Architect Name:
          <input
            type="text"
            name="architectName"
            value={formData.architectName || ''}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Site Location:
          <input
            type="text"
            name="siteLocation"
            value={formData.siteLocation || ''}
            onChange={handleChange}
          />
        </label>
        <br />
        <h3>Drawing Details</h3>
        {formData.drawingDetails && formData.drawingDetails.length > 0 ? (
          formData.drawingDetails.map((drawing, index) => (
            <div key={index}>
              <label>
                Drawing Name:
                <input
                  type="text"
                  name="drawingName"
                  value={drawing.drawingName || ''}
                  onChange={(e) => handleDrawingChange(index, e)}
                />
              </label>
              <br />
              <label>
                Drawing Status:
                <input
                  type="text"
                  name="drawingStatus"
                  value={drawing.drawingStatus || ''}
                  onChange={(e) => handleDrawingChange(index, e)}
                />
              </label>
              <br />
              <label>
                Revision:
                <input
                  type="text"
                  name="revision"
                  value={drawing.revision || ''}
                  onChange={(e) => handleDrawingChange(index, e)}
                />
              </label>
              <br />
            </div>
          ))
        ) : (
          <p>No drawing details available.</p>
        )}
        <button type="submit">Update Project</button>
      </form>
    </div>
  );
};

export default EditProject;
