import React from "react"; 
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("imovies_user") || "null");
  function logout() {
    localStorage.removeItem("imovies_token");
    localStorage.removeItem("imovies_user");
    navigate("/");
    window.location.reload();
  }
  return <nav className="navbar navbar-expand-lg navbar-dark site-nav">
    <div className="container">
      <Link className="navbar-brand brand" to="/">I<span>MOVIES</span></Link>
      <div className="d-flex align-items-center gap-3">
        <NavLink className="nav-link" to="/">Movies</NavLink>
        {user && <NavLink className="nav-link" to="/my-bookings">My Bookings</NavLink>}
        {user ? <><span className="user-greeting d-none d-md-inline">Hi, {user.name}</span><button className="btn btn-outline-light btn-sm" onClick={logout}>Logout</button></>
          : <><Link className="btn btn-outline-light btn-sm" to="/login">Login</Link><Link className="btn btn-primary btn-sm" to="/register">Sign up</Link></>}
      </div>
    </div>
  </nav>;
}
