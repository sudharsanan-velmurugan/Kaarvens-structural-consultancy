import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
  const navigate = useNavigate();
  const [firstNames, setFirstNames] = useState([]);
  const [formInputs, setFormInputs] = useState({
    taskName: '',
    taskOwner: '',
    assignee: '',
    startDate: '',
    dueDate: '',
    status: 'Open', // Set a default status
    comments: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const GetUserDeteils = () => {
    fetch('https://localhost:7175/api/UserDetails', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch user details');
        }
        return res.json();
      })
      .then((data) => {
        const firstNameArray = data.map((user) => user.firstName); 
        setFirstNames(firstNameArray); 
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        alert('Unable to get data: ' + error.message);
      });
  };

  useEffect(() => {
    GetUserDeteils();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formattedInputs = {
      taskId: 0, // Default taskId
      taskName: formInputs.taskName,
      taskOwner: formInputs.taskOwner,
      assignee: formInputs.assignee,
      startDate: new Date(formInputs.startDate).toISOString(),
      dueDate: new Date(formInputs.dueDate).toISOString(),
      status: formInputs.status,
      comments: formInputs.comments
    };
    
    console.log("Submitting the following data:", JSON.stringify(formattedInputs)); // Log the payload

    try {
      const response = await fetch('https://localhost:7175/api/TaskDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedInputs),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Response error data:", errorData); // Log error response
        throw new Error(`Error: ${response.status} - ${errorData.message || 'Unknown error'}`);
      }

      const data = await response.json();
      alert('Task created successfully!');
      navigate('/tasks'); 
    } catch (error) {
      alert('Error: ' + error.message);
      console.error('Error details:', error);
    }
  };
  
  return (
    <section className="container my-3 d-flex justify-content-center">
      <div className="card shadow-lg p-4" style={{ width: '600px' }}>
        <h1 className="text-center mb-4">Create Task</h1>

        <form onSubmit={handleSubmit}>
          {/* Task Name */}
          <div className="mb-3 row justify-content-center">
            <label className="col-sm-3 col-form-label text-right">Task Name:</label>
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Task Name"
                name="taskName"
                value={formInputs.taskName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Task Owner */}
          <div className="mb-3 row justify-content-center">
            <label className="col-sm-3 col-form-label text-right">Task Owner:</label>
            <div className="col-sm-7">
              <select
                className="form-control"
                name="taskOwner"
                value={formInputs.taskOwner}
                onChange={handleInputChange}
              >
                <option default>Select Task Owner</option>
                {firstNames.map((firstName, index) => (
                  <option key={index} value={firstName}>
                    {firstName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Assignee */}
          <div className="mb-3 row justify-content-center">
            <label className="col-sm-3 col-form-label text-right">Assignee:</label>
            <div className="col-sm-7">
              <select
                className="form-control"
                name="assignee"
                value={formInputs.assignee}
                onChange={handleInputChange}
              >
                <option default>Select Assignee</option>
                {firstNames.map((firstName, index) => (
                  <option key={index} value={firstName}>
                    {firstName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Start Date */}
          <div className="mb-3 row justify-content-center">
            <label className="col-sm-3 col-form-label text-right">Start Date:</label>
            <div className="col-sm-7">
              <input
                type="date"
                className="form-control"
                name="startDate"
                value={formInputs.startDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Due Date */}
          <div className="mb-3 row justify-content-center">
            <label className="col-sm-3 col-form-label text-right">Due Date:</label>
            <div className="col-sm-7">
              <input
                type="date"
                className="form-control"
                name="dueDate"
                value={formInputs.dueDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Status */}
          <div className="mb-3 row justify-content-center">
            <label className="col-sm-3 col-form-label text-right">Status:</label>
            <div className="col-sm-7">
              <select
                className="form-select"
                name="status"
                value={formInputs.status}
                onChange={handleInputChange}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
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
                value={formInputs.comments}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center d-flex justify-content-center mt-4">
            <button className="btn btn-primary me-2" style={{ width: '200px' }} type='submit'>
              Create Task
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateTask;
