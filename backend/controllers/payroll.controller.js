const payrollService = require("../services/payroll.service");

const calculatePayroll = (req, res) => {
  const { employee_id, month } = req.body;

  if (!employee_id || !month) {
    return res.status(400).json({
      message: "employee_id and month are required"
    });
  }

  payrollService.calculatePayroll(employee_id, month, (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          message: "Payroll already calculated for this month"
        });
      }

      return res.status(500).json({
        message: "Server error"
      });
    }

    if (result.notFound) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    res.status(201).json({
      message: "Payroll calculated successfully",
      payroll: result
    });
  });
};

const getPayrollByEmployee = (req, res) => {
  const employeeId = req.params.employee_id;

  payrollService.getPayrollByEmployee(employeeId, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Server error"
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "No payroll records found"
      });
    }

    res.json({
      employee_id: employeeId,
      payroll_history: results
    });
  });
};


module.exports = {
  calculatePayroll,
  getPayrollByEmployee
};
