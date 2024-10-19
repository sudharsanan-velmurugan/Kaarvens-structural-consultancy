import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateProject.css'; // Keep if you have custom styles

const CreateProject = () => {
    const navigate = useNavigate();

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

    const addDrawing = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            drawingDetails: [
                ...prevFormData.drawingDetails,
                { drawingName: '', drawingStatus: '', revision: '' },
            ],
        }));
    };

    const removeDrawing = (index) => {
        const updatedDrawings = formData.drawingDetails.filter((_, i) => i !== index);
        setFormData((prevFormData) => ({
            ...prevFormData,
            drawingDetails: updatedDrawings,
        }));
    };
    const handleBack = ()=>{
      navigate('/projects')
    }

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

            alert("Project Created Successfully")
            navigate("/projects");
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <section className="container my-3 d-flex justify-content-center">
            <div className="card shadow-lg p-4" style={{ width: '600px' }}>
                <h2 className="text-center mb-4">Create Project</h2>
                <form onSubmit={handleSubmit}>
                    {/* Job Number Field */}
                    <div className="mb-3 row justify-content-center">
                        <label className="col-sm-3 col-form-label text-right">Job No:</label>
                        <div className="col-sm-7">
                            <input
                                type="text"
                                className="form-control"
                                name="jobNo"
                                value={formData.jobNo}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Project Name Field */}
                    <div className="mb-3 row justify-content-center">
                        <label className="col-sm-3 col-form-label text-right">Project Name:</label>
                        <div className="col-sm-7">
                            <input
                                type="text"
                                className="form-control"
                                name="projectName"
                                value={formData.projectName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Architect Name Field */}
                    <div className="mb-3 row justify-content-center">
                        <label className="col-sm-3 col-form-label text-right">Architect Name:</label>
                        <div className="col-sm-7">
                            <input
                                type="text"
                                className="form-control"
                                name="architectName"
                                value={formData.architectName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Site Location Field */}
                    <div className="mb-3 row justify-content-center">
                        <label className="col-sm-3 col-form-label text-right">Site Location:</label>
                        <div className="col-sm-7">
                            <input
                                type="text"
                                className="form-control"
                                name="siteLocation"
                                value={formData.siteLocation}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Drawing Details */}
                    <h4 className="text-center mt-4">Drawing Details</h4>
                    {formData.drawingDetails.map((drawing, index) => (
                        <div key={index} className="mb-3">
                            <div className="row justify-content-center">
                                <label className="col-sm-3 col-form-label text-right">Drawing Name:</label>
                                <div className="col-sm-7">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="drawingName"
                                        value={drawing.drawingName}
                                        onChange={(e) => handleDrawingChange(index, e)}
                                    />
                                </div>
                            </div>
                            <div className="row justify-content-center mt-3">
                                <label className="col-sm-3 col-form-label text-right">Drawing Status:</label>
                                <div className="col-sm-7">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="drawingStatus"
                                        value={drawing.drawingStatus}
                                        onChange={(e) => handleDrawingChange(index, e)}
                                    />
                                </div>
                            </div>
                            <div className="row justify-content-center mt-3">
                                <label className="col-sm-3 col-form-label text-right">Revision:</label>
                                <div className="col-sm-7">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="revision"
                                        value={drawing.revision}
                                        onChange={(e) => handleDrawingChange(index, e)}
                                    />
                                </div>
                            </div>
                            {formData.drawingDetails.length > 1 && (
                                <div className="text-center">
                                    <button
                                        type="button"
                                        className="btn btn-danger mt-2 w-50"
                                        onClick={() => removeDrawing(index)}
                                    >
                                        Remove Drawing
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Add Drawing Button */}
                    <div className="text-center">
                        <button
                            type="button"
                            className="btn btn-secondary mt-3 w-50"
                            onClick={addDrawing}
                        >
                            Add Another Drawing
                        </button>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center mt-4">
                        <button type="submit" className="btn btn-primary" style={{ width: '200px' }}>
                            Create Project
                        </button>
                        <button onClick={handleBack}  className="btn btn-danger" style={{ width: '200px',marginLeft:'10px' }}>
                            Back
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default CreateProject;
