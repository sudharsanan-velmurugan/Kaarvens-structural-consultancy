import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import UseGetByIDMethod from "../CommonHttpVerbs/UseGetByIdMethod";
import UsePutMethod from "../CommonHttpVerbs/UsePutMethod";

const EditFinance = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the finance ID from the route params

  // Fetch finance details by ID
  const { data, isLoading, error } = UseGetByIDMethod(
    `https://localhost:7175/api/FinanceDetails/${id}`
  );

  // Local state for form input fields
  const [financeInput, setFinanceInput] = useState({
    id: id || "", // Ensure ID is part of the form
    projectName: "",
    status: "In Progress", // Default value
    comments: "",
  });

  // Use the UsePutMethod to get the putRequest function
  const { putRequest } = UsePutMethod(
    `https://localhost:7175/api/FinanceDetails`, // URL without the ID in path
    financeInput // Send the entire financeInput object with ID, projectName, status, and comments
  );

  // Update local state with fetched finance details once available
  useEffect(() => {
    if (data) {
      setFinanceInput({
        id: id,
        projectName: data.projectName || "",
        status: data.status || "In Progress",
        comments: data.comments || "",
      });
    }
  }, [data]);

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFinanceInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await putRequest(); // Call the PUT request

    if (response) {
      navigate("/finance"); // Navigate after a successful update
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="container my-3 d-flex justify-content-center">
      <div className="card shadow-lg p-4" style={{ width: "600px" }}>
        <h1 className="text-center mb-4">Edit Finance</h1>

        <Form onSubmit={handleSubmit}>
          {/* Project Name */}
          <div className="mb-3 row justify-content-center">
            <label className="col-sm-3 col-form-label text-right">
              Project Name:
            </label>
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
                onChange={handleInputChange}
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

          {/* Submit and Back Buttons */}
          <div className="text-center d-flex justify-content-center mt-4">
            <Button
              onClick={() => navigate("/finance")}
              className="btn btn-danger"
              style={{ width: "200px", marginRight: "10px" }}
            >
              Back
            </Button>
            <Button className="btn btn-primary me-2" style={{ width: "200px" }} type="submit">
              Edit Finance
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default EditFinance;
