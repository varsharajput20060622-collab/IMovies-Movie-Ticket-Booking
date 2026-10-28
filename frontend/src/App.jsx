import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import React from "react";

export default function App() {
  return <div className="app-shell"><Navbar /><main className="container py-4">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="*" element={<div className="text-center py-5"><h2>Page not found</h2><a href="/">Go home</a></div>} />
    </Routes>
  </main><footer className="footer">IMovies · Your next movie night starts here</footer></div>;
}
