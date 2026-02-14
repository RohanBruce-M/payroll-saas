

#  Frontend 

```md
# Payroll SaaS – Frontend

This is the frontend application for the Payroll SaaS system.

It is built using:

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- shadcn/ui components

The frontend connects to a Node.js + Express backend secured with JWT authentication.

---

## 🚀 Features

- 🔐 Login with JWT authentication
- 📊 Dashboard with real-time payroll statistics
- 👥 Employees listing (from MySQL database)
- 💰 Payroll calculation
- 📅 Payroll history grouped by month
- 📱 Responsive SaaS-style dashboard layout
- 🎨 Modern UI with animations

---

## 🏗 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React (Vite) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Animation | Framer Motion |
| Icons | Lucide React |
| Auth | JWT (from backend) |

---

## 🔗 Backend Integration

The frontend connects to:

```

[http://localhost:5000](http://localhost:5000)

```

### APIs Used:

- `POST /api/auth/login`
- `GET /api/employees`
- `POST /api/payroll/calculate`
- `GET /api/payroll/:employee_id`

JWT token is stored in `localStorage` and attached in request headers:

```

Authorization: Bearer <token>

````

---

## ⚙️ Setup Instructions

### 1️⃣ Install dependencies

```bash
npm install
````

### 2️⃣ Run development server

```bash
npm run dev
```

App will run at:

```
http://localhost:5173
```

---

## 🔐 Demo Credentials

Use backend credentials:

```
Email: admin@test.com
Password: admin123
```

---

## 📂 Project Structure

```
src/
  pages/
    Login.tsx
    DashboardHome.tsx
    Employees.tsx
    PayrollHistory.tsx
  components/
  hooks/
  main.tsx
```

---

## 🧠 Architecture

```
Login → JWT Token → Protected Dashboard
         ↓
     Employees Page → Fetch Employees
         ↓
     Payroll Calculate → Store in DB
         ↓
     Payroll History → Fetch Records
```

---

## 🏁 Status

Frontend fully integrated with backend.

✔ Authentication working
✔ Protected routes working
✔ Real MySQL data displayed
✔ Payroll calculation functional
✔ Payroll history displayed

---

