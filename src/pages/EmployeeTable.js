import React, { useState, useEffect } from "react";
import './pages.css';

export default function EmployeeTable() {
const updates = [
  { id: 1, username: "John", date: "2025-12-01", description: "Fixed UI alignment issues in login page", workingHours: "7.5" },
  { id: 2, username: "Kumar", date: "2025-12-02", description: "API integration for user attendance", workingHours: "8" },
  { id: 3, username: "Priya", date: "2025-12-03", description: "Updated employee dashboard components,Updated employee dashboard components,Updated employee dashboard components,Updated employee dashboard components,Updated employee dashboard components,Updated employee dashboard components,Updated employee dashboard components", workingHours: "7.0" },
  { id: 4, username: "Arun", date: "2025-12-04", description: "Bug fix: dropdown filter issues", workingHours: "8" },
  { id: 5, username: "Vijay", date: "2025-12-05", description: "Created new reusable button component", workingHours: "6.5" },
  { id: 6, username: "Siva", date: "2025-12-06", description: "Added pagination for tasks table", workingHours: "7" },
  { id: 7, username: "Meena", date: "2025-12-07", description: "Database schema update for work logs", workingHours: "8.5" },
  { id: 8, username: "Rahul", date: "2025-12-08", description: "Improved performance of reports page", workingHours: "7.5" },
  { id: 9, username: "Lakshmi", date: "2025-12-09", description: "Code review and cleanup activities", workingHours: "6" },
  { id: 10, username: "Karthik", date: "2025-12-10", description: "Implemented new validation rules", workingHours: "7" }
];

  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  useEffect(() => {
    const mockUsers = [
      { id: 1, name: "John" },
      { id: 2, name: "Kumar" },
      { id: 3, name: "Priya" }
    ];
    setUsers(mockUsers);
  }, []);

  const handleFilter = () => {
    console.log('startdate',startdate)
    console.log('enddate',enddate)
    console.log('selectedUser',selectedUser)
  };

  return (
    <div>
    <div className="filter-container">
      {/* Card */}
      <div className="filter-card">
        <div className="filterdate">
        <input
          type="date"
          value={startdate}
          onChange={(e) => setStartdate(e.target.value)}
          className="input-box"
        />
        </div>
         <div className="filterdate">
        <input
          type="date"
          value={enddate}
          onChange={(e) => setEnddate(e.target.value)}
          className="input-box"
        />
        </div>

        <div className="filterdeopdown">
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="input-box"
        >
          <option value="">-- Select --</option>
          <option value="all">All Users</option>
          {users.map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>
        </div>


        <div>
        <button className="filter-btn" onClick={handleFilter}>
          Filter
        </button>
        </div>
      </div>
    </div>
        <div className="table-card">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Name/Date</th>
            <th>Update Description</th>
            <th>Working Hours</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {updates.length === 0 ? (
            <tr>
              <td colSpan="4" className="no-data">
                No updates found
              </td>
            </tr>
          ) : (
            updates.map((item) => (
              <tr key={item.id}>
                <td><span>{item.username}</span><br></br> <span>{item.date}</span></td>
                <td>{item.description}</td>
                <td>{item.workingHours}</td>
                <td>
                  <button className="action-btn">•••</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    </div>
  );

};





