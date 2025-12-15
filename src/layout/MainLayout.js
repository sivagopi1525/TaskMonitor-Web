import { Outlet } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {
  Landmark,
  LogOut,
  TableOfContents,
  IdCard,
  Facebook,
  Instagram,
  Twitch,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
export default function MainLayout() {
  return (
    <div>
      <AppHeader />

      {/* All nested pages load here */}
      <Outlet />

      <AppFooter />
    </div>
  );
}


// ✅ Header Component
function AppHeader() {
  const navigate = useNavigate(); // ✅ moved inside component

  const goToHome = () => navigate("/main/home");
  const goToEmployeeTable = () => navigate("/main/EmployeeTable");
  const goToEmployeeCards = () => navigate("/main/EmployeeCards");
  const handleLogout = () => navigate('/login');

  return (
    <div className="header d-flex align-items-center justify-content-between p-3 bg-light shadow-sm">
      <div style={{ width: "25%", textAlign: "center" }}>
        <Landmark size={28} onClick={goToHome} style={{ cursor: "pointer" }} />
      </div>
      <div style={{ width: "50%", textAlign: "center" }}>
        <h2>Welcome Employee Tracker</h2>
      </div>
      <div
        style={{
          width: "25%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TableOfContents
          onClick={goToEmployeeTable}
          style={{ cursor: "pointer" }}
        />
        <IdCard onClick={goToEmployeeCards} style={{ cursor: "pointer" }} />
        <LogOut size={28} onClick={handleLogout} style={{ cursor: "pointer" }} />
      </div>
    </div>
  );
}

// ✅ Footer Component
function AppFooter() {
  return (
    <div className="appfooter bg-dark text-white text-center py-3 mt-4">
      <p>© 2025 Employee Tracker. All rights reserved.</p>
      <div className="socialmediaicons">
        <Facebook size={22} style={{ margin: "0 5px" }} />
        <Instagram size={22} style={{ margin: "0 5px" }} />
        <Twitch size={22} style={{ margin: "0 5px" }} />
        <Twitter size={22} style={{ margin: "0 5px" }} />
        <Linkedin size={22} style={{ margin: "0 5px" }} />
        <Youtube size={22} style={{ margin: "0 5px" }} />
      </div>
    </div>
  );
}