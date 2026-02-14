const express = require("express");
const router = express.Router();
const payrollController = require("../controllers/payroll.controller");
const verifyToken = require("../middlewares/auth.middleware");

router.post("/payroll/calculate", verifyToken, payrollController.calculatePayroll);
router.get("/payroll/:employee_id", verifyToken, payrollController.getPayrollByEmployee);


module.exports = router;
