const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");

const login = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required"
      });
    }

    if (email === "admin@test.com" && password === "admin123") {
      const token = jwt.sign(
        { email, role: "HR" },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn }
      );

      return res.json({
        message: "Login successful",
        token
      });
    }

    return res.status(401).json({
      message: "Invalid credentials"
    });

  } catch (error) {
    console.error("LOGIN ERROR 👉", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

module.exports = { login };

