let employees = [
 {
      id: 1,
      name: "rohan",
      email: "rohan@test.com",
      department: "HR",
      salary: 50000
    },
    {
      id: 2,
      name: "vijay",
      email: "vijay@test.com",
      department: "Engineering",
      salary: 60000
    }
];

const getAllEmployees = () => {
  return employees;
};

const createEmployee = (employeeData) => {
  const newEmployee = {
    id: employees.length + 1,
    ...employeeData
  };

  employees.push(newEmployee);
  return newEmployee;
};

const updateEmployee = (id, updatedData) => {
  const index = employees.findIndex(emp => emp.id === id);

  if (index === -1) {
    return null;
  }

  employees[index] = {
    ...employees[index],
    ...updatedData
  };

  return employees[index];
};


module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee
};



