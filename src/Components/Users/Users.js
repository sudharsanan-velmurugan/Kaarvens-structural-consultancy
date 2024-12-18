import React, { useEffect, useState } from "react";
import "./Users.css";
import DataTable from "react-data-table-component";
import { IoSearch } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import {
  removeAuthorizedUsers,
  setAuthorizedUsers,
} from "../../Slice/UserSlice";
import { useDispatch, useSelector } from "react-redux";

const Users = () => {
  const [search, setSearch] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const authorizedUsers = useSelector(
    (state) => state.userInfo.AuthorizedUsers
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // Load user details from the API
    GetUserDeteils();
    GetAuthorizedUsers();
  }, []);

  const GetAuthorizedUsers = () => {
    fetch("https://localhost:7175/api/AuthorizedUsersIds", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json(); // Fix: Correctly parse JSON here
      })
      .then((data) => {
        data.forEach((id) => {
          dispatch(setAuthorizedUsers(id)); // Process each id
        });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        alert("Unable to get data: " + error.message); // Correct placement of catch
      });
  };

  const PostAuthIDs = (id) => {
    const authObj = {
      AuthId: { id },
    };
    fetch("https://localhost:7175/api/AuthorizedUsersIds", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(authObj),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        alert("Unable to Post data: " + error.message);
      });
  };
  const DeleteAuthIds = (id) => {
    fetch(`https://localhost:7175/api/AuthorizedUsersIds?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        alert("Unable to Post data: " + error.message);
      });
  };
  const GetUserDeteils = () => {
    fetch("https://localhost:7175/api/UserDetails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((data) => {
        setUserDetails(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        alert("Unable to get data: " + error.message);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure want to delete user ?")) {
      fetch(`https://localhost:7175/api/UserDetails/${id}`, {
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
          setUserDetails((prev) => prev.filter((user) => user.id !== id));
          alert("User deleted successfully.");
        })
        .catch((error) => {
          console.error("Delete error:", error);
          alert("Unable to delete user: " + error.message);
        });
    }
  };

  const handleAuthorizationChange = (id) => {
    if (!authorizedUsers.includes(id)) {
      dispatch(setAuthorizedUsers(id));
      PostAuthIDs(id);
    } else {
      dispatch(removeAuthorizedUsers(id));
      DeleteAuthIds(id)
    }
  };

  const columns = [
    { name: "User ID", selector: (row) => row.id, sortable: true },
    { name: "First Name", selector: (row) => row.firstName, sortable: true },
    { name: "Last Name", selector: (row) => row.lastName, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Mobile No", selector: (row) => row.mobileNo },
    { name: "Password", selector: (row) => row.password },
    {
      name: "Action",
      cell: (row) => (
        <FaTrash
          onClick={() => handleDelete(row.id)}
          style={{ cursor: "pointer", color: "red", fontSize: "20px" }}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Authorize",
      cell: (row) => (
        <input
          type="checkbox"
          checked={authorizedUsers.includes(row.id)}
          onChange={() => handleAuthorizationChange(row.id)}
        />
      ),
    },
  ];

  return (
    <section className="users-page-container">
      <div className="text-center m-3 d-flex justify-center gap-1">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="text-size 300">
          <IoSearch />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={userDetails.filter((user) =>
          search === ""
            ? userDetails
            : user.firstName.toLowerCase().includes(search.toLowerCase())
        )}
        selectableRows
      ></DataTable>
    </section>
  );
};

export default Users;
