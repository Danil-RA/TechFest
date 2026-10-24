import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://techfest-backend-7otn.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Account created successfully. Please login.");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
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
            <p className="eyebrow">TECHFEST 2026</p>

            <h1>Join the experience.</h1>

            <p>
              Create your account and explore exciting
              technical events.
            </p>
          </div>

          <form onSubmit={handleSignup}>

            <label>Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="primary-btn" type="submit">
              Create Account
            </button>

          </form>

          <p className="switch-text">
            Already have an account?

            <button
              className="text-btn"
              onClick={() => navigate("/login")}
            >
              Login
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

export default Signup;
