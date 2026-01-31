import { useState } from "react";
import Login from "./pages/Login";
import Employees from "./pages/Employees";

function App() {
  const [token, setToken] = useState(null);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Payroll SaaS</h1>

      {!token ? (
        <Login onLogin={setToken} />
      ) : (
        <Employees token={token} />
      )}
    </div>
  );
}

export default App;
