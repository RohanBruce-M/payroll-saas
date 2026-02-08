const employeeService = require("../services/employee.service");

const getEmployees = (req, res) => {
  employeeService.getAllEmployees((err, results) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }
    res.json(results);
  });
};

const createEmployee = (req, res) => {
  employeeService.createEmployee(req.body, (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ message: "Email already exists" });
      }
      return res.status(500).json({ message: "Server error" });
    }
    res.status(201).json({ message: "Employee added successfully" });
  });
};

const updateEmployee = (req, res) => {
  employeeService.updateEmployee(req.params.id, req.body, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee updated successfully" });
  });
};

const deleteEmployee = (req, res) => {
  employeeService.deleteEmployee(req.params.id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  });
};

const getEmployeeById = (req, res) => {
  employeeService.getEmployeeById(req.params.id, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(results[0]);
  });
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById
};

