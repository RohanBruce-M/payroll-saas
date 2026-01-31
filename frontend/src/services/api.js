const API_BASE_URL = "http://localhost:5000/api";

export const login = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  return response.json();
};

export const getEmployees = async (token) => {
  const response = await fetch(`${API_BASE_URL}/employees`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.json();
};
