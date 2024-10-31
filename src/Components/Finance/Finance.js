import React from "react";
import { Table, Container, Spinner } from "react-bootstrap"; 
import { FaTrash, FaPen } from "react-icons/fa";
import UseGetMethod from "../CommonHttpVerbs/UseGetMethod"; 
import { useNavigate } from "react-router-dom";

const Finance = () => {
  const navigate = useNavigate();
  
  const { data: financeData, isLoading, refetch } = UseGetMethod('https://localhost:7175/api/FinanceDetails');

  const handleDeleteFinance = (id) => {
    if (window.confirm("Are you sure you want to delete this Finance Entry?")) {
      fetch(`https://localhost:7175/api/FinanceDetails?id=${id}`, {
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
          alert("Finance Entry deleted successfully.");
          refetch(); // Call refetch after successful deletion
        })
        .catch((error) => {
          console.error("Delete error:", error);
          alert("Unable to delete Finance Entry: " + error.message);
        });
    }
  };

  const handleEditFinance = (id) => {
     // Prevents default action if this is part of a form or link
    navigate(`/editfinance/${id}`); // Ensure this path is correct
  };

  const handleCreateTask = () => {
    navigate('/createfinance');
  };

  return (
    <Container className="mt-5">
      <div className="mb-4" style={{ width: "150px" }}>
        <button onClick={handleCreateTask} className="btn btn-primary btn-sm">
          Create Finance
        </button>
      </div>

      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Loading...</p>
        </div>
      ) : (
        <Table striped bordered hover responsive="sm">
          <thead className="table-dark">
            <tr>
              <th>S.No</th>
              <th>Project Name</th>
              <th>Project Status</th>
              <th>Comments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {financeData.length > 0 ? (
              financeData.map((finance, i) => (
                <tr key={finance.id}> {/* Use unique ID for key */}
                  <td>{i + 1}</td>
                  <td>{finance.projectName}</td>
                  <td>{finance.status}</td>
                  <td>{finance.comments}</td>
                  <td>
                    <FaPen
                      className="text-success me-3"
                      style={{ cursor: "pointer" }}
                      onClick={()=>handleEditFinance(finance.id)} // Ensure this calls the correct function
                    />
                    <FaTrash
                      className="text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteFinance(finance.id)} // Ensure this calls the delete function
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center bg-white">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Finance;
