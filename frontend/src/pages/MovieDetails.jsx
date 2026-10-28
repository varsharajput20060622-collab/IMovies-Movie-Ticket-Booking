import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api.js";

const rows = "ABCDEFGHIJ".split("");
const seats = rows.flatMap(row => Array.from({ length: 10 }, (_, i) => `${row}${String(i + 1).padStart(2, "0")}`));

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [showId, setShowId] = useState("");
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);
  const user = JSON.parse(localStorage.getItem("imovies_user") || "null");

  async function load() {
    const { data } = await api.get(`/movies/${id}`);
    setMovie(data);
    setShowId(current => current || data.showtimes?.[0]?._id || "");
  }
  useEffect(() => { load().catch(() => setError("Could not load this movie.")); }, [id]);
  const show = useMemo(() => movie?.showtimes?.find(s => s._id === showId), [movie, showId]);
  const booked = movie?.bookedSeats?.[showId] || [];
  function toggleSeat(seat) {
    setSelected(current => current.includes(seat) ? current.filter(s => s !== seat) : current.length < 10 ? [...current, seat] : current);
  }
  async function book() {
    if (!user) { setError("Please log in before booking."); return; }
    if (!selected.length) { setError("Select at least one seat."); return; }
    setError(""); setSuccess(""); setBusy(true);
    try {
      await api.post("/bookings", { movieId: id, showtimeId: showId, seats: selected });
      setSuccess(`Booking confirmed for ${selected.join(", ")}!`);
      setSelected([]);
      await load();
    } catch (err) { setError(err.response?.data?.message || "Booking failed."); await load().catch(() => {}); }
    finally { setBusy(false); }
  }

  if (!movie) return <div className="py-5 text-center">{error || "Loading movie..."}</div>;
  return <div className="movie-detail">
    <Link to="/" className="back-link">← All movies</Link>
    <div className="detail-hero row g-4 mt-2 mb-4">
      <div className="col-md-4"><img className="detail-poster" src={movie.posterUrl} alt={movie.title} /></div>
      <div className="col-md-8 d-flex flex-column justify-content-center"><span className="eyebrow">NOW SHOWING</span><h1>{movie.title}</h1><p className="lead">{movie.description}</p><p>{movie.genre} · {movie.language} · {movie.duration} · ★ {movie.rating}</p>
        <label className="form-label mt-3">Choose a showtime</label>
        <div className="d-flex flex-wrap gap-2">{movie.showtimes.map(s => <button key={s._id} className={`showtime-btn ${showId === s._id ? "active" : ""}`} onClick={() => {setShowId(s._id); setSelected([]); setSuccess("");}}><strong>{s.time}</strong><small>{s.label} · ₹{s.price}</small></button>)}</div>
      </div>
    </div>
    <div className="booking-panel">
      <div className="d-flex justify-content-between flex-wrap gap-2 align-items-center"><div><span className="eyebrow">PICK YOUR SPOT</span><h2>Select seats</h2></div><span className="text-secondary small">Maximum 10 seats per booking</span></div>
      <div className="screen">SCREEN THIS WAY</div>
      <div className="seat-grid">{seats.map(seat => <button key={seat} aria-label={`Seat ${seat}`} disabled={booked.includes(seat)} onClick={() => toggleSeat(seat)} className={`seat ${booked.includes(seat) ? "booked" : selected.includes(seat) ? "selected" : ""}`}>{seat}</button>)}</div>
      <div className="seat-legend"><span><i className="legend-dot available"></i>Available</span><span><i className="legend-dot selected-dot"></i>Selected</span><span><i className="legend-dot booked-dot"></i>Booked</span></div>
      {error && <div className="alert alert-danger mt-3">{error} {error.includes("log in") && <Link to="/login">Login</Link>}</div>}
      {success && <div className="alert alert-success mt-3">{success} <Link to="/my-bookings">View bookings</Link></div>}
      <div className="checkout-row mt-4"><div><span className="text-secondary">Selected: </span>{selected.length ? selected.join(", ") : "No seats"}<div className="total-price">₹{(show?.price || 0) * selected.length}</div></div><button className="btn btn-primary btn-lg" onClick={book} disabled={busy || !show}>{busy ? "Booking..." : "Confirm booking"}</button></div>
      <p className="small text-secondary mt-3 mb-0">Demo only: no payment is collected. Seat selection is revalidated by the server when booking.</p>
    </div>
  </div>;
}
