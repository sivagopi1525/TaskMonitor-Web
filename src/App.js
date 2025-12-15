import { BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import EmployeeTable from "./pages/EmployeeTable";
import EmployeeCards from "./pages/EmployeeCards";
import Login from "./pages/loginpage";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layout/MainLayout";
import PrivateRoute from "./PrivateRoute";


function App() {
  return (
    <BrowserRouter >
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Main Module */}
        <Route
          path="/main"
          element={
            <PrivateRoute>
              <MainLayout />   {/* header + sidebar + outlet */}
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="home" element={<Home />} />
          <Route path="EmployeeTable" element={<EmployeeTable />} />
          <Route path="EmployeeCards" element={<EmployeeCards />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}



export default App;
