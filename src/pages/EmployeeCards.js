import { useEffect, useState } from "react";
import './pages.css';
import { itemService } from "../services/item";
import Loader from "./Loader";
export default function EmployeeCards() {
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
    return(
    <div className="row g-3 mt-3">
       {loading && <Loader />}
      {taskitems.map((emp,index) => (
        <div className="col-md-6 col-lg-4" key={emp._id} onClick={() => cardhandleRowClick(emp)}>
          <div className="card shadow-sm p-3 h-100">
            <h5 className="card-title">{emp.name}</h5>
            <p className="card-text"><strong>Email:</strong> {emp.email}</p>
            <p className="card-text"><strong>Rank:</strong> {index*12}</p>
          </div>
        </div>
      ))}
    </div>
    );
}

function cardhandleRowClick(emp) {
  alert(`Employee Details:\n\nID: ${emp.id}\nName: ${emp.name}\nPosition: ${emp.position}\nRank: ${emp.rank}\nCredit: ${emp.credit}\nDebit: ${emp.debit}`);
}
