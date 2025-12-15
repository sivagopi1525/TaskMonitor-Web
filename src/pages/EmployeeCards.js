import employees from "../Json_Data/employee.json";
import './pages.css';

export default function EmployeeCards() {
    return(
    <div className="row g-3 mt-3">
      {employees.map(emp => (
        <div className="col-md-6 col-lg-4" key={emp.id} onClick={() => cardhandleRowClick(emp)}>
          <div className="card shadow-sm p-3 h-100">
            <h5 className="card-title">{emp.name}</h5>
            <p className="card-text"><strong>Position:</strong> {emp.position}</p>
            <p className="card-text"><strong>Rank:</strong> {emp?.Details?.rank}</p>
            <p className="card-text"><strong>Credit:</strong> {emp?.Details?.credit} €</p>
            <p className="card-text"><strong>Debit:</strong> {emp?.Details?.debit} €</p>
            <p className="card-text"><strong>Profit:</strong> {emp?.Details?.credit - emp?.Details?.debit} €</p>
          </div>
        </div>
      ))}
    </div>
    );
}

function cardhandleRowClick(emp) {
  alert(`Employee Details:\n\nID: ${emp.id}\nName: ${emp.name}\nPosition: ${emp.position}\nRank: ${emp.rank}\nCredit: ${emp.credit}\nDebit: ${emp.debit}`);
}
