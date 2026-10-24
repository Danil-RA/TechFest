import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://techfest-backend-7otn.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {

        localStorage.setItem("token", data.token);

        navigate("/events");

      } else {
        setMessage(data.message);
      }

    } catch {
      setMessage("Could not connect to server");
    }
  };

  return (
    <div className="app">

      <nav className="navbar">

        <div className="logo">
          TECH<span>FEST</span>
        </div>

      </nav>

      <main className="auth-container">

        <div className="auth-card">

          <div className="auth-heading">

            <p className="eyebrow">
              WELCOME BACK
            </p>

            <h1>
              Ready to explore?
            </h1>

            <p>
              Login to discover events and reserve your
              seat.
            </p>

          </div>

          <form onSubmit={handleLogin}>

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              className="primary-btn"
              type="submit"
            >
              Login
            </button>

          </form>

          <p className="switch-text">

            Don't have an account?

            <button
              className="text-btn"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>

          </p>

          {message && (
            <div className="message">
              {message}
            </div>
          )}

        </div>

      </main>

    </div>
  );
}

export default Login;
