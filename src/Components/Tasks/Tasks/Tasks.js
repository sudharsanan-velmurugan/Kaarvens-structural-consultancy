import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaTrash, FaPen } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useSelector } from "react-redux";

const Tasks = () => {
  const [taskData, setTaskData] = useState([]);
  const [search, setSearch] = useState("");
  const [task, setTask] = useState("allTasks");

  const loggedInUser = useSelector((state) => state.userInfo.loggedInUser);
  const currentUser = loggedInUser?.firstName;

  const getTaskData = () => {
    fetch("https://localhost:7175/api/TaskDetails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP status Error:${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setTaskData(data);
      })
      .catch((err) => {
        alert("Unable to get task data " + err.message);
      });
  };

  useEffect(() => {
    getTaskData();
  }, []);

  const navigate = useNavigate();
  const handleCreateTask = () => {
    navigate("/createtask");
  };
  const handleEdit = (id) => {
    navigate(`/edittask/${id}`);
  };

  const handleDeleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this Task?")) {
      fetch(`https://localhost:7175/api/TaskDetails?id=${id}`, {
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
          // Re-fetch the task list from the server to stay in sync
          getTaskData();
          alert("Task deleted successfully.");
        })
        .catch((error) => {
          console.error("Delete error:", error);
          alert("Unable to delete Task: " + error.message);
        });
    }
  };

  const formatDate = (date) => {
    return new Date(date).toISOString().slice(0, 10);
  };

  const filterByUser = taskData.filter((data) => {
    return task === "allTasks" ? data : data.taskOwner === currentUser;
  });

  const filteredTasks = filterByUser.filter((task) => {
    return search === ""
      ? task
      : task.taskName.toLowerCase().includes(search.toLowerCase()) ||
          task.taskOwner.toLowerCase().includes(search.toLowerCase()) ||
          task.assignee.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Task List</h2>

      {/* Top section: Create Task, Search, and Filter */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* Create Task Button */}
        <div style={{ width: "auto", marginRight: "15px" }}>
          <button style={{padding:'10px 30px'}} onClick={handleCreateTask} className="btn btn-primary btn-sm">
            Create Task
          </button>
        </div>

        {/* Search Box */}
        <div style={{ width: "auto", marginRight: "15px" }}>
          <div className="input-group">
            <input
              type="text"
              className="form-control form-control-sm"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
            />
            <span className="input-group-text">
              <IoSearch />
            </span>
          </div>
        </div>

        {/* Filter Dropdown */}
        <div style={{ width: "auto" }}>
          <select
            className="form-select form-select-sm"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          >
            <option value="allTasks">All Tasks</option>
            <option value="myTasks">My Tasks</option>
          </select>
        </div>
      </div>

      {/* Task Table */}
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
            <th style={{ width: "30%" }}>Comments</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <tr key={index}>
                <td>{task.taskId}</td>
                <td>{task.taskName}</td>
                <td>{task.taskOwner}</td>
                <td>{task.assignee}</td>
                <td>{formatDate(task.startDate)}</td>
                <td>{formatDate(task.dueDate)}</td>
                <td>{task.status}</td>
                <td>{task.comments}</td>
                <td>
                  <FaPen
                    style={{ marginRight: "10px", color: "green", cursor: "pointer" }}
                    onClick={() => handleEdit(task.taskId)}
                  />
                  <FaTrash
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleDeleteTask(task.taskId)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No Records Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
