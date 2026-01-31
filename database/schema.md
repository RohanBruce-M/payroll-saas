# Payroll SaaS – Database Schema

## Employees
- id (PK)
- name
- email
- department_id (FK)
- salary
- role

## Departments
- id (PK)
- name

## Clients
- id (PK)
- name
- address

## Attendance
- id (PK)
- employee_id (FK)
- date
- status

## Payroll
- id (PK)
- employee_id (FK)
- month
- gross_salary
- deductions
- net_salary

## Relationships
- One Department → Many Employees
- One Employee → Many Attendance records
- One Employee → Many Payroll records
