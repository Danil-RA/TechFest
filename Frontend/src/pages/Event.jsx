import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Events() {
    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [message, setMessage] = useState("");

    const loadEvents = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/events"
            );

            const data = await response.json();

            if (response.ok) {
                setEvents(data);
            } else {
                setMessage("Could not load events");
            }
        } catch {
            setMessage("Could not connect to server");
        }
    };

    useEffect(() => {
        loadEvents();
    }, []);

    const handleRegister = (eventId) => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        navigate("/registration", {
            state: {
                eventId: eventId
            }
        });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="app">

            <nav className="navbar">

                <div className="logo">
                    TECH<span>FEST</span>
                </div>

                <button
                    className="nav-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </nav>

            <main className="events-container">

                <section className="events-header">

                    <p className="eyebrow">
                        TECHFEST 2026
                    </p>

                    <h1>
                        Explore Events
                    </h1>

                    <p>
                        Discover competitions, workshops and
                        technical experiences.
                    </p>

                </section>

                {events.length === 0 ? (

                    <div className="empty-state">

                        <h2>
                            No events available
                        </h2>

                        <p>
                            Check back later for upcoming events.
                        </p>

                    </div>

                ) : (

                    <section className="events-grid">

                        {events.map((event) => (

                            <article
                                className="event-card"
                                key={event._id}
                            >

                                <div className="event-top">

                                    <span className="category">
                                        {event.category}
                                    </span>

                                    <span className="fee">
                                        ₹{event.fee}
                                    </span>

                                </div>

                                <h2>
                                    {event.name}
                                </h2>

                                <div className="event-info">

                                    <div>

                                        <span>DATE</span>

                                        <strong>
                                            {new Date(
                                                event.date
                                            ).toLocaleDateString()}
                                        </strong>

                                    </div>

                                    <div>

                                        <span>SEATS</span>

                                        <strong>
                                            {event.seats}
                                        </strong>

                                    </div>

                                </div>

                                <button
                                    className="register-btn"
                                    disabled={event.seats < 1}
                                    onClick={() => handleRegister(event._id)}
                                >
                                    {event.seats < 1
                                        ? "Sold Out"
                                        : "Register Now →"}
                                </button>

                            </article>

                        ))}

                    </section>

                )}

                {message && (
                    <div className="message">
                        {message}
                    </div>
                )}

            </main>

        </div>
    );
}

export default Events;