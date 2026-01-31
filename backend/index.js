const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(express.json());


const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");
const protectedRoutes = require("./routes/protected.routes");
const employeeRoutes = require("./routes/employee.routes");
app.use("/api", employeeRoutes);
app.use("/api", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
