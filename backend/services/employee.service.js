const db = require("../config/db");

const getAllEmployees = (callback) => {
  const query = "SELECT * FROM employees";
  db.query(query, callback);
};

const createEmployee = (employee, callback) => {
  const query = `
    INSERT INTO employees (name, email, phone, department, salary)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [
    employee.name,
    employee.email,
    employee.phone,
    employee.department,
    employee.salary
  ];

  db.query(query, values, callback);
};

const updateEmployee = (id, employee, callback) => {
  const query = `
    UPDATE employees
    SET name = ?, email = ?, phone = ?, department = ?, salary = ?
    WHERE id = ?
  `;
  const values = [
    employee.name,
    employee.email,
    employee.phone,
    employee.department,
    employee.salary,
    id
  ];

  db.query(query, values, callback);
};

const deleteEmployee = (id, callback) => {
  const query = "DELETE FROM employees WHERE id = ?";
  db.query(query, [id], callback);
};

const getEmployeeById = (id, callback) => {
  const query = "SELECT * FROM employees WHERE id = ?";
  db.query(query, [id], callback);
};

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById
};



