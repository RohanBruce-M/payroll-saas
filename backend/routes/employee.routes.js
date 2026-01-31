const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employee.controller");
const verifyToken = require("../middlewares/auth.middleware");

// READ
router.get("/employees", verifyToken, employeeController.getEmployees);

// CREATE
router.post("/employees", verifyToken, employeeController.createEmployee);

// UPDATE
router.put("/employees/:id", verifyToken, employeeController.updateEmployee);


module.exports = router;
