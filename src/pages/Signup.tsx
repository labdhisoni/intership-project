import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = 'http://localhost:3000';

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role
  const navigate = useNavigate();

  const handleSignup = async () => {
    const response = await fetch(`${API_URL}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });

    if (response.ok) {
      alert("Signup successful!");
      navigate("/");
    } else {
      alert("Signup failed!");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br/>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br/>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="owner">Owner</option>
      </select><br/>
      <button onClick={handleSignup}>Signup</button><br/>
      <a href="/">Already have an account? Login</a>
    </div>
  );
}

export default Signup;
