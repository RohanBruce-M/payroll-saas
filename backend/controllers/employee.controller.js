const employeeService = require("../services/employee.service");

const getEmployees = (req, res) => {
  const employees = employeeService.getAllEmployees();
  res.json(employees);
};

const createEmployee = (req, res) => {
  const employeeData = req.body;

  const newEmployee = employeeService.createEmployee(employeeData);

  res.status(201).json({
    message: "Employee created successfully",
    employee: newEmployee
  });
};

const updateEmployee = (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  const updatedEmployee = employeeService.updateEmployee(id, updatedData);

  if (!updatedEmployee) {
    return res.status(404).json({
      message: "Employee not found"
    });
  }

  res.json({
    message: "Employee updated successfully",
    employee: updatedEmployee
  });
};


module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee
};

