import React, { useState } from 'react';

import "./CreateProject.css"
import { useNavigate } from 'react-router-dom';
const CreateProject = () => {
    const navigate = useNavigate()
  // Initialize state to store form data
  const [formData, setFormData] = useState({
    jobNo: '',
    projectName: '',
    architectName: '',
    siteLocation: '',
    drawingDetails: [
      {
        drawingName: '',
        drawingStatus: '',
        revision: '',
      },
    ],
  });

  // Handle form input changes for main project details
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle drawing details changes
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

  // Add a new drawing field
  const addDrawing = () => {
    
    setFormData((prevFormData) => ({
      ...prevFormData,
      drawingDetails: [
        ...prevFormData.drawingDetails,
        { drawingName: '', drawingStatus: '', revision: '' },
      ],
    }));
  };

  // Remove a drawing field
  const removeDrawing = (index) => {
    const updatedDrawings = formData.drawingDetails.filter((_, i) => i !== index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      drawingDetails: updatedDrawings,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:7175/api/ProjectDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      console.log('Project created successfully', data);
      // Optionally, reset form or show a success message
      navigate("/projects")
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='create-project-container'>
      <h2>Create Project</h2>
      <form className="create-project-form-group" onSubmit={handleSubmit}>
        <label>
          Job No:
          <input
            type="text"
            name="jobNo"
            value={formData.jobNo}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Project Name:
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Architect Name:
          <input
            type="text"
            name="architectName"
            value={formData.architectName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Site Location:
          <input
            type="text"
            name="siteLocation"
            value={formData.siteLocation}
            onChange={handleChange}
          />
        </label>
        <br />
        <h3>Drawing Details</h3>
        {formData.drawingDetails.map((drawing, index) => (
          <div key={index}>
            <label>
              Drawing Name:
              <input
                type="text"
                name="drawingName"
                value={drawing.drawingName}
                onChange={(e) => handleDrawingChange(index, e)}
              />
            </label>
            <br />
            <label>
              Drawing Status:
              <input
                type="text"
                name="drawingStatus"
                value={drawing.drawingStatus}
                onChange={(e) => handleDrawingChange(index, e)}
              />
            </label>
            <br />
            <label>
              Revision:
              <input
                type="text"
                name="revision"
                value={drawing.revision}
                onChange={(e) => handleDrawingChange(index, e)}
              />
            </label>
            <br />
            {formData.drawingDetails.length > 1 && (
              <button type="button" onClick={() => removeDrawing(index)}>
                Remove Drawing
              </button>
            )}
            <br />
          </div>
        ))}
        <button className="create-project-link" type="button" onClick={addDrawing}>
          Add Another Drawing
        </button>
        <br />
        <button className="create-project-link" type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default CreateProject;
