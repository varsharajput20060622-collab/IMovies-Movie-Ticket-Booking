import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api.js";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);
  useEffect(() => { api.get("/bookings/mine").then(r => setBookings(r.data)).catch(e => setError(e.response?.status === 401 ? "Please log in to view your bookings." : "Could not load bookings.")); }, [refresh]);
  async function cancel(id) {
    if (!window.confirm("Cancel this booking?")) return;
    try { await api.patch(`/bookings/${id}/cancel`); setRefresh(x => x + 1); }
    catch (e) { setError(e.response?.data?.message || "Could not cancel booking."); }
  }
  return <section><span className="eyebrow">YOUR MOVIE PLANS</span><h1 className="mb-4">My bookings</h1>
    {error && <div className="alert alert-warning">{error} {error.includes("log in") && <Link to="/login">Sign in</Link>}</div>}
    {!error && bookings.length === 0 && <div className="empty-state"><h3>No bookings yet</h3><p>Your next movie night is only a few clicks away.</p><Link className="btn btn-primary" to="/">Browse movies</Link></div>}
    <div className="d-grid gap-3">{bookings.map(b => <article className="booking-card" key={b._id}>
      <div><h3>{b.movie?.title || "Movie"}</h3><p className="mb-1">{b.showDate} · {b.showTime} · {b.showtimeLabel}</p><p className="mb-1">Seats: <strong>{b.seats.join(", ")}</strong></p><p className="mb-0">Total: <strong>₹{b.totalAmount}</strong></p></div>
      <div className="text-end"><span className={`status-pill ${b.status}`}>{b.status}</span>{b.status === "confirmed" && <button className="btn btn-outline-danger btn-sm d-block mt-3" onClick={() => cancel(b._id)}>Cancel</button>}</div>
    </article>)}</div>
  </section>;
}
