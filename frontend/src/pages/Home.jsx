// import React from "react";
import  React,{ useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api.js";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  useEffect(() => { api.get("/movies").then(r => setMovies(r.data)).catch(() => setError("Could not load movies. Make sure the backend and MongoDB are running.")); }, []);
  const filtered = movies.filter(m => `${m.title} ${m.genre} ${m.language}`.toLowerCase().includes(search.toLowerCase()));
  return <>
    <section className="hero mb-5">
      <div className="hero-copy"><span className="eyebrow">YOUR CINEMA, YOUR WAY</span><h1>Big stories.<br/><span>Big screen.</span></h1>
        <p>Discover your next favourite movie and book the perfect seat in seconds.</p>
        <a href="#movies" className="btn btn-primary btn-lg">Explore movies</a></div>
      <div className="hero-art"><div className="ticket-shape"><span>NOW SHOWING</span><strong>YOUR<br/>NEXT<br/>STORY</strong><small>✦ IMOVIES ✦</small></div></div>
    </section>
    <section id="movies">
      <div className="section-heading d-flex flex-wrap align-items-end justify-content-between gap-3 mb-4">
        <div><span className="eyebrow">FIND YOUR FILM</span><h2>Now showing</h2></div>
        <input className="form-control search-box" placeholder="Search title, genre, language..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      {error && <div className="alert alert-warning">{error}</div>}
      <div className="row g-4">
        {filtered.map(movie => <div className="col-sm-6 col-lg-4" key={movie._id}>
          <article className="movie-card h-100">
            <div className="poster-wrap"><img src={movie.posterUrl || "https://placehold.co/600x800?text=IMovies"} alt={`${movie.title} poster`} onError={e => {e.currentTarget.src = "https://placehold.co/600x800/171724/ffffff?text=IMovies";}}/><span className="rating">★ {movie.rating}</span></div>
            <div className="movie-info"><div className="d-flex justify-content-between gap-2"><h3>{movie.title}</h3><span className="duration">{movie.duration}</span></div>
              <p>{movie.genre} · {movie.language}</p><p className="movie-description">{movie.description}</p>
              <Link to={`/movies/${movie._id}`} className="btn btn-primary w-100">Book tickets</Link>
            </div>
          </article>
        </div>)}
      </div>
      {!error && filtered.length === 0 && <p className="text-secondary">No movies match your search.</p>}
    </section>
  </>;
}
