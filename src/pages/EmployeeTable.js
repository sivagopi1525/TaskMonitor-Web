import React, { useState, useEffect } from "react";
import './pages.css';
import { itemService } from "../services/item";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FiPlus } from "react-icons/fi";
import AddTaskPopup from "../Modal/itemModal"
export default function EmployeeTable() {
  const [popupopen, setPopupopen] = useState(false);
  const [taskitems, setTaskitems] = useState([])
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  useEffect(() => {

    fetchItems();
    const mockUsers = [
      { id: 1, name: "John" },
      { id: 2, name: "Kumar" },
      { id: 3, name: "Priya" }
    ];
    setUsers(mockUsers);
  }, []);
  const fetchItems = async () => {
    try {
      const res = await itemService.Getitems();
      console.log(res);        // actual response data
      setTaskitems(res);
    } catch (error) {
      console.error(error);
    }
  };
  const handleFilter = () => {
    console.log('startdate', startdate)
    console.log('enddate', enddate)
    console.log('selectedUser', selectedUser)
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const edititem = () => {
    handleClose()
  }
  const deleteitem = () => {
    handleClose()
  }
  const popupopenmodal = () => {
    setPopupopen(true)
  }
  const handleAddTask = async (formData) => {
    try {
      const now = new Date();

      const payload = {
        ...formData,
        Date: now.toLocaleString("en-IN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        Name: localStorage.getItem("Username"),
      };

      console.log("Received from child:", payload);
      const res = await itemService.Createitem(payload);
      console.log(res);
      fetchItems()

    } catch (error) {
      console.error("Create item failed:", error);
    }
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
          <div>
            <button className="filter-btn" onClick={popupopenmodal}>
              <FiPlus /> Add
            </button>
          </div>
        </div>
      </div>
      <div className="table-card">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Name/Date</th>
              <th>Priority level</th>
              <th>Task Description</th>
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
                  <td><span>{item.Name}</span><br></br> <span>{item.Date}</span></td>
                  <td>{item.Priority}</td>
                  <td>{item.Task}</td>
                  <td>{item.Workinghours}hours</td>
                  <td>
                    <button className="action-btn">
                      <div>
                        <Button
                          id="basic-button"
                          aria-controls={open ? 'basic-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={handleClick}
                        >
                          &#8942;
                        </Button>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          slotProps={{
                            list: {
                              'aria-labelledby': 'basic-button',
                            },
                          }}
                        >
                          <MenuItem onClick={edititem}>Edit</MenuItem>
                          <MenuItem onClick={deleteitem}>Delete</MenuItem>
                        </Menu>
                      </div>

                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>


      <AddTaskPopup
        onClose={() => setPopupopen(false)}
      />
      <AddTaskPopup
        open={popupopen}
        onClose={() => setPopupopen(false)}
        onSubmit={handleAddTask}
      />

    </div>

  );

};





