const db = require("../config/db");

// =========================
// CALCULATE PAYROLL
// =========================
const calculatePayroll = (employeeId, month, callback) => {
  const getEmployeeQuery = "SELECT salary FROM employees WHERE id = ?";

  db.query(getEmployeeQuery, [employeeId], (err, results) => {
    if (err) return callback(err);

    if (results.length === 0) {
      return callback(null, { notFound: true });
    }

    const baseSalary = results[0].salary;

    const grossSalary = baseSalary;
    const deductions = grossSalary * 0.1; // 10% tax
    const netSalary = grossSalary - deductions;

    const insertQuery = `
      INSERT INTO payroll (employee_id, month, gross_salary, deductions, net_salary)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      insertQuery,
      [employeeId, month, grossSalary, deductions, netSalary],
      (insertErr) => {
        if (insertErr) {
          return callback(insertErr);
        }

        callback(null, {
          employeeId,
          month,
          grossSalary,
          deductions,
          netSalary
        });
      }
    );
  });
};

// =========================
// GET PAYROLL BY EMPLOYEE
// =========================
const getPayrollByEmployee = (employeeId, callback) => {
  const query = `
    SELECT month, gross_salary, deductions, net_salary, created_at
    FROM payroll
    WHERE employee_id = ?
    ORDER BY created_at DESC
  `;

  db.query(query, [employeeId], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

module.exports = {
  calculatePayroll,
  getPayrollByEmployee
};
