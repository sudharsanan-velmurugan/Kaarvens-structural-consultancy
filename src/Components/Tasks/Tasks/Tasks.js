import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import { useNavigate } from 'react-router-dom';

const Tasks = () => {
  
  // Sample task data
  const taskData = [
    {
      taskId: 1,
      taskName: "Design UI Mockups",
      taskOwner: "Alice Johnson",
      assignee: "John Smith",
      startDate: "2024-10-01",
      dueDate: "2024-10-10",
      status: "In Progress",
      comments: "UI wireframes are almost done.Client feedback is pending."
    },
    {
      taskId: 2,
      taskName: "Implement Backend API",
      taskOwner: "Alice Johnson",
      assignee: "Michael Brown",
      startDate: "2024-10-05",
      dueDate: "2024-10-15",
      status: "Pending",
      comments: "Waiting for the database schema.API specifications are finalized."
    },
    {
      taskId: 3,
      taskName: "Set Up Database",
      taskOwner: "Bob Williams",
      assignee: "Sarah Lee",
      startDate: "2024-10-02",
      dueDate: "2024-10-12",
      status: "Completed",
      comments: "Database setup completed.Ready for API integration."
    },
    {
      taskId: 4,
      taskName: "Create Testing Plan",
      taskOwner: "Charlie Green",
      assignee: "Emma Davis",
      startDate: "2024-10-08",
      dueDate: "2024-10-18",
      status: "In Progress",
      comments: "Test cases being written.Automation tools under evaluation."
    },
    {
      taskId: 5,
      taskName: "Deploy to Staging",
      taskOwner: "David Clark",
      assignee: "John Smith",
      startDate: "2024-10-09",
      dueDate: "2024-10-20",
      status: "Not Started",
      comments: "Deployment scripts are ready.Need confirmation on environment setup.Deployment scripts are ready.Need confirmation on environment setup.Deployment scripts are ready.Need confirmation on environment setup."
    }
  ];

  const navigate = useNavigate()
  const handleCreateTask = () =>{
    navigate('/createtask')
  }
  
  return (
    <div className="container mt-4">
      <div >
        <button onClick={handleCreateTask} className='btn btn-primary'>Create Task</button>
      </div>
      <h2 className="mb-4">Task List</h2>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Task ID</th>
            <th>Task Name</th>
            <th>Task Owner</th>
            <th>Assignee</th>
            <th>Start Date</th>
            <th>Due Date</th>
            <th>Status</th>
            <th style={{ width: '30%' }}>Comments</th> {/* Set a wider width for the Comments column */}
          </tr>
        </thead>
        <tbody>
          {taskData.map((task, index) => (
            <tr key={index}>
              <td>{task.taskId}</td>
              <td>{task.taskName}</td>
              <td>{task.taskOwner}</td>
              <td>{task.assignee}</td>
              <td>{task.startDate}</td>
              <td>{task.dueDate}</td>
              <td>{task.status}</td>
              <td>{task.comments} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tasks;
