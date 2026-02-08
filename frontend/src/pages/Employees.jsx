import { useEffect, useState } from "react";

function Employees({ token }) {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/employees", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to fetch employees");
          return;
        }

        setEmployees(data);
      } catch (err) {
        setError("Server error");
      }
    };

    fetchEmployees();
  }, [token]);

  return (
    <div>
      <h2>Employees</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            {emp.name} – {emp.department} – ₹{emp.salary}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Employees;


