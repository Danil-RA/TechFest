import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Registration() {
  const navigate = useNavigate();
  const location = useLocation();

  const eventId = location.state?.eventId;

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");
  const [message, setMessage] = useState("");

  const register = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!eventId) {
      setMessage("No event selected");
      return;
    }

    try {
      const response = await fetch(
        "https://techfest-backend-7otn.onrender.com/api/registrations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            department,
            course,
            eventId,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful!");
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

        <button
          className="nav-btn"
          onClick={() => navigate("/events")}
        >
          Back to Events
        </button>

      </nav>

      <main className="auth-container">

        <div className="auth-card">

          <div className="auth-heading">

            <p className="eyebrow">
              TECHFEST 2026
            </p>

            <h1>
              Event Registration
            </h1>

            <p>
              Enter your details to register for the event.
            </p>

          </div>

          <form onSubmit={register}>

            <label>Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Department</label>

            <input
              type="text"
              placeholder="Enter your department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />

            <label>Course</label>

            <input
              type="text"
              placeholder="Enter your course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
            />

            <button
              className="primary-btn"
              type="submit"
            >
              Register
            </button>

          </form>

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

export default Registration;
