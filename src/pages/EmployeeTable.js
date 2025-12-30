import React, { useState, useEffect } from "react";
import './pages.css';
import { itemService } from "../services/item";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FiPlus } from "react-icons/fi";
import AddTaskPopup from "../Modal/itemModal"
import ConformationPopup from "../Modal/conformationmodal"
import Loader from "./Loader";
export default function EmployeeTable() {
  const [popupopen, setPopupopen] = useState(false);
  const [popupopen2, setPopupopen2] = useState(false);
  const [taskitems, setTaskitems] = useState([])
  const formatDate = (date) => date.toISOString().split("T")[0];
  const [startdate, setStartdate] = useState(formatDate(new Date()));
  const [enddate, setEnddate] = useState(formatDate(new Date()));
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [popupdata, setPopupdata] = useState(null)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItems();
    const mockUsers = [
      { id: 1, name: "John" },
      { id: 2, name: "Kumar" },
      { id: 3, name: "Priya" }
    ];
    setUsers(mockUsers);
    const newUser = localStorage.getItem("Username")
    setSelectedUser(newUser)
    setUsers(prevUsers => [...prevUsers, {id:mockUsers.length,name:newUser}]);
  }, []);
  const fetchItems = async () => {
          setLoading(true)
    try {
      const res = await itemService.Getitems();
      console.log('apires', res); 
          setLoading(false)
             // actual response data
      setTaskitems(res);
    } catch (error) {
          setLoading(false)
      console.error(error);
    }
  };
  const handleFilter = () => {
    console.log('startdate', startdate)
    console.log('enddate', enddate)
    console.log('selectedUser', selectedUser)
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const open = Boolean(anchorEl);

  const edititem = () => {
    setPopupdata({ header: 'Edit Task', Edit: true })
    setPopupopen(true)
  }
  const deleteitem = () => {
    setPopupdata({ header: 'confirmation', title: 'Are you sure you want to delete this item?' })
    setPopupopen2(true)
  }
  const popupopenmodal = () => {
    setPopupopen(true)
    setPopupdata({ header: 'Add New Task', Edit: false })
  }
  const handleAddTask = async (formData) => {
    console.log('formData',formData)
        console.log('selectedItem',selectedItem)
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
    if (popupdata?.Edit) {
    if(!selectedItem?._id) return
      try {
        console.log("Received from child:", payload);
        const res = await itemService.Edititem(selectedItem?._id, payload);
        console.log(res);
        fetchItems()

      } catch (error) {
        console.error("Create item failed:", error);
      }
    } else {
      try {
        console.log("Received from child:", payload);
        const res = await itemService.Createitem(payload);
        console.log(res);
        fetchItems()

      } catch (error) {
        console.error("Create item failed:", error);
      }
    }
  };

  const handleAddTask2 = async () => {
    console.log('selectedItem',selectedItem)
    try {
      if (selectedItem?._id != null) {
        const res = await itemService.Deleteitem(selectedItem?._id);
        console.log(res);
        fetchItems()
      }

    } catch (error) {
      console.error("Create item failed:", error);
    }
  };

  const handleClick = (event, item) => {
    console.log(item)
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // setSelectedItem(null);
  };

  if (loading) {
    return <Loader />
  } else {
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
              taskitems.map((item, idx) => {
                return (<tr key={idx}>
                  <td ><span>{item.Name}</span><br></br> <span>{item.Date}</span></td>
                  <td>{item.Priority}</td>
                  <td>{item.Task}</td>
                  <td>{item.Workinghours}hours</td>
                  <td>
                    <button className="action-btn">
                      <div>
                        <Button onClick={(e) => handleClick(e, item)}>
                          &#8942;
                        </Button>
                      </div>

                    </button>
                  </td>
                </tr>)
              }

              )
            )}
          </tbody>
        </table>
      </div>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => {
          edititem();
          handleClose();
        }}>
          Edit
        </MenuItem>

        <MenuItem onClick={() => {
          deleteitem();
          handleClose();
        }}>
          Delete
        </MenuItem>
      </Menu>


      {/* popupopen  */}
      <AddTaskPopup data={popupdata} open={popupopen} onClose={() => setPopupopen(false)} onSubmit={handleAddTask} />
      {/* popupopen 2 */}
      <ConformationPopup data={popupdata} open={popupopen2} onClose={() => setPopupopen2(false)} onSubmit={handleAddTask2} />

    </div>

  );
  }
};





