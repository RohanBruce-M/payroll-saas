const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");

const login = (req, res) => {
  const { email, password } = req.body;

  
  if (email === "admin@test.com" && password === "admin123") {
    const payload = {
      email: email,
      role: "HR"
    };

    const token = jwt.sign(payload, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn
    });

    return res.json({
      message: "Login successful",
      token: token
    });
  }

  return res.status(401).json({
    message: "Invalid credentials"
  });
};

module.exports = {
  login
};
