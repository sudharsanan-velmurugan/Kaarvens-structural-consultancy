import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap"; // Import Bootstrap components
import { useNavigate } from "react-router-dom";

const CreateFinance = () => {
  const navigate = useNavigate();
  const [financeInput, setFinanceInput] = useState({
    projectName: "",
    status: "In Progress", // Default value
    comments: "",
  });

  // Handles all input field changes (projectName, comments, status)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFinanceInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Specifically handle the select input change for status
  const handleStatusChange = (e) => {
    const { value } = e.target;
    setFinanceInput((prev) => ({
      ...prev,
      status: value, // Update the status field in financeInput
    }));
  };

  const handleBack = ()=>{
    navigate('/finance')
  }
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    fetch("https://localhost:7175/api/FinanceDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(financeInput),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        alert("Finance Detail Created successfully.");
        navigate("/finance"); // Navigate to another route on successful submission
      })
      .catch((error) => {
        alert("Unable to Create Finance: " + error.message);
      });
  };

  return (
    <section className="container my-3 d-flex justify-content-center">
      <div className="card shadow-lg p-4" style={{ width: '600px' }}>
        <h1 className="text-center mb-4">Create Finance</h1>

        <Form onSubmit={handleSubmit}>
          {/* Project Name */}
          <div className="mb-3 row justify-content-center">
            <label className="col-sm-3 col-form-label text-right">Project Name:</label>
            <div className="col-sm-7">
              <Form.Control
                type="text"
                name="projectName"
                placeholder="Enter project name"
                value={financeInput.projectName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Status */}
          <div className="mb-3 row justify-content-center">
            <label className="col-sm-3 col-form-label text-right">Status:</label>
            <div className="col-sm-7">
              <Form.Select
                name="status"
                value={financeInput.status}
                onChange={handleStatusChange}
                required
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </Form.Select>
            </div>
          </div>

          {/* Comments */}
          <div className="mb-3 row justify-content-center">
            <label className="col-sm-3 col-form-label text-right">Comments:</label>
            <div className="col-sm-7">
              <textarea
                className="form-control"
                rows="4"
                placeholder="Enter comments"
                name="comments"
                value={financeInput.comments}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center d-flex justify-content-center mt-4">
            <Button
              onClick={handleBack}
              className="btn btn-danger"
              style={{ width: "200px"  }}
            >
              Back
            </Button>
            <Button className="btn btn-primary me-2" style={{ width: '200px' ,marginLeft: "10px"}} type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default CreateFinance;
