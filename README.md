# Payroll SaaS Application
#change into dev branch to see the folder structure


## 📌 Project Overview
Payroll SaaS is a full-stack web application designed to manage employees and payroll-related operations in an organization.  
The project is developed incrementally to understand real-world backend, frontend, database, and authentication workflows.

Up to **Week 3**, the focus has been on:
- Backend architecture
- Database integration
- Authentication
- Frontend–backend integration

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- JavaScript
- Fetch API

### Backend
- Node.js
- Express.js
- JWT (JSON Web Token) Authentication

### Database
- MySQL (via MySQL Workbench)
- mysql2 driver

---

## 📂 Project Structure

### Frontend
```

frontend/
└── src/
├── pages/
│   ├── Login.jsx
│   └── Employees.jsx
├── App.jsx
└── main.jsx

```

### Backend
```

backend/
├── config/
│   ├── db.js
│   └── jwt.js
├── controllers/
│   ├── auth.controller.js
│   └── employee.controller.js
├── routes/
│   ├── auth.routes.js
│   ├── employee.routes.js
│   ├── health.routes.js
│   └── protected.routes.js
├── middlewares/
│   └── auth.middleware.js
├── index.js
├── package.json
└── .gitignore

```

### Database
```

database/
└── schema.md

```

---

## 🔐 Authentication (JWT)

- Login endpoint implemented using JWT
- Credentials are validated on backend
- On successful login, a JWT token is generated
- Token is required to access protected APIs
- Token is passed from frontend to backend using `Authorization: Bearer <token>`

---

## 👥 Employee Module (Backend – DB Based)

Employee APIs are fully connected to **MySQL database**.

### Implemented APIs
| Method | Endpoint | Description |
|------|--------|------------|
| POST | `/api/employees` | Create employee |
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/:id` | Get employee by ID |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |

### Features
- Uses MySQL instead of in-memory data
- Unique email constraint enforced
- Proper HTTP status codes returned
- Data persists after server restart

---

## 🗄️ Database Schema (Week 3)

### Database Name
```

payroll_saas

```

### Employees Table
- id (Primary Key, Auto Increment)
- name
- email (Unique)
- phone
- department
- salary
- created_at
- updated_at

Schema is documented in `database/schema.md`.

---

## 🖥️ Frontend Implementation (Week 3)

### Login Page
- User logs in using credentials
- JWT token received from backend
- Token stored in React state
- App conditionally renders next page

### Employees Page
- Displayed after successful login
- Fetches employee data using JWT token
- Calls protected backend API
- Displays employee list from MySQL database

This demonstrates **end-to-end full-stack integration**.

---

## 🔄 End-to-End Flow (Week 3)

```

Login UI
↓
POST /api/auth/login
↓
JWT token generated
↓
Token stored in frontend
↓
GET /api/employees (protected)
↓
MySQL database
↓
Employee list displayed on UI

```

---

## ✅ Week 3 Status

✔ MySQL database connected  
✔ Backend APIs fully DB-based  
✔ JWT authentication working  
✔ Frontend integrated with backend  
✔ Protected data fetched and displayed  
✔ End-to-end flow tested successfully  
✔ Code pushed to GitHub (`dev` branch)





