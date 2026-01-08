import React, { useEffect, useState } from 'react';
import './pages.css';
import { itemService } from "../services/item";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import Loader from './Loader';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Home() {
  const [loading, setLoading] = useState(false);
const [taskitems, setTaskitems] = useState([])
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await itemService.GetUsers();
      console.log('apires', res);
      setLoading(false)
      // actual response data
      setTaskitems(res);
    } catch (error) {
      setLoading(false)
      console.error(error);
    }
  };
  // Bar chart data
  let barchartdata = taskitems.map((emp,index) => ({
    name: emp.name,
    sales: (index + 100) * (index + 100)
  }));

  // Pie chart data
  let piechartdata = taskitems.map((emp, index) => ({
    name: emp.name,
    value: (index + 100) * (index + 100)
  }));

  return (
    <div className="home-container">
 {loading && <Loader />}
      {/* Bar Chart  */}
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barchartdata} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={piechartdata} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
              {piechartdata.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
