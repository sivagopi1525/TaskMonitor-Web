import React, { useState, useEffect } from "react";
import './pages.css';
import { itemService } from "../services/item";

export default function EmployeeTable() {
  const [taskitems,setTaskitems]=useState([])
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  useEffect(() => {
      const fetchItems = async () => {
    try {
      const res = await itemService.Getitems();
      console.log(res);        // actual response data
      setTaskitems([res]);
    } catch (error) {
      console.error(error);
    }
  };

  fetchItems();
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
            <th>Priority</th>
            <th>Description</th>
            <th>Working</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {taskitems.length === 0 ? (
            <tr>
              <td colSpan="4" className="no-data">
                No updates found
              </td>
            </tr>
          ) : (
            taskitems.map((item) => (
              <tr key={item._id}>
                <td><span>{item.username}</span><br></br> <span>{item.updatedAt}</span></td>
                <td>{item.Priority}</td>
                <td>{item.Task}</td>
                <td>{item.Workinghours}hours</td>
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





