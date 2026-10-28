import { Router } from "express";
import Movie from "../models/Movie.js";
import Booking from "../models/Booking.js";

const router = Router();

router.get("/", async (_req, res) => {
  const movies = await Movie.find().sort({ title: 1 });
  res.json(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).json({ message: "Movie not found." });
  const bookings = await Booking.find({ movie: movie._id, status: "confirmed" }).select("showtimeId seats");
  const bookedSeats = {};
  for (const booking of bookings) {
    const key = String(booking.showtimeId);
    bookedSeats[key] ||= [];
    bookedSeats[key].push(...booking.seats);
  }
  res.json({ ...movie.toObject(), bookedSeats });
});

export default router;
