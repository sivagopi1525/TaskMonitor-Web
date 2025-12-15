import React from 'react';
import './pages.css';
import jsondata from "../Json_Data/employee.json";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Home() {
  // Bar chart data
  let barchartdata = jsondata.map(emp => ({
    name: emp.name,
    sales: emp.Details.credit - emp.Details.debit
  }));

  // Pie chart data
  let piechartdata = jsondata.map(emp => ({
    name: emp.name,
    value: emp.Details.credit + emp.Details.debit
  }));

  return (
    <div className="home-container">

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
