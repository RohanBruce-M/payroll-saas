import { useEffect, useState } from "react";
import { getEmployees } from "../services/api";

function Employees({ token }) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await getEmployees(token);
      setEmployees(data);
    };

    fetchEmployees();
  }, [token]);

  return (
    <div>
      <h2>Employees</h2>

      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            {emp.name} - {emp.department} - ₹{emp.salary}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Employees;
