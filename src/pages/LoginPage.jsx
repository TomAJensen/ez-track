import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import EzTrackWelcome from "../components/EzTrackWelcome.jsx";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  const redirectTo = location.state?.from?.pathname || "/bug-list";

  async function handleSubmit(e) {
    e.preventDefault();
    const { username, password } = Object.fromEntries(new FormData(e.target));

    try {
      const res = await fetch("http://10.0.0.72:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const { token } = await res.json();
      login(token);                    // store token in context + localStorage
      navigate(redirectTo, { replace: true }); // go to original destination
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <div><EzTrackWelcome/></div>
      <div ><h3>Please Log in.</h3></div>
      <form onSubmit={handleSubmit}>
        <input style={{width:"25%"}} className="bugInput" name="username" placeholder="Username" required />
        <input style={{width:"25%"}} className="bugInput" name="password" type="password" placeholder="Password" required />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div><button type="submit">Log In</button></div>
      </form>
    </div>
  );
}