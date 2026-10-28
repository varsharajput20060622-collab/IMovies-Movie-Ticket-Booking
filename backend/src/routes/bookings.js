import { Router } from "express";
import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

router.post("/", async (req, res) => {
  try {
    const { movieId, showtimeId, seats } = req.body;
    if (!mongoose.isValidObjectId(movieId) || !mongoose.isValidObjectId(showtimeId)) {
      return res.status(400).json({ message: "Invalid movie or showtime." });
    }
    if (!Array.isArray(seats) || seats.length < 1 || seats.length > 10) {
      return res.status(400).json({ message: "Choose between 1 and 10 seats." });
    }
    if (new Set(seats).size !== seats.length || seats.some(s => !/^[A-J](0[1-9]|10)$/.test(s))) {
      return res.status(400).json({ message: "Seat selection is invalid." });
    }
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: "Movie not found." });
    const show = movie.showtimes.id(showtimeId);
    if (!show) return res.status(404).json({ message: "Showtime not found." });

    const existing = await Booking.find({
      movie: movieId, showtimeId, showDate: show.date, showTime: show.time, status: "confirmed",
      seats: { $in: seats }
    });
    if (existing.length) return res.status(409).json({ message: `Already booked: ${existing.flatMap(b => b.seats).filter(s => seats.includes(s)).join(", ")}` });

    const booking = await Booking.create({
      user: req.user.id, movie: movie._id, showtimeId,
      showtimeLabel: show.label, showDate: show.date, showTime: show.time,
      seats, totalAmount: show.price * seats.length
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Booking failed. Please try again." });
  }
});

router.get("/mine", async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id })
    .populate("movie", "title posterUrl genre")
    .sort({ createdAt: -1 });
  res.json(bookings);
});

router.patch("/:id/cancel", async (req, res) => {
  const booking = await Booking.findOne({ _id: req.params.id, user: req.user.id });
  if (!booking) return res.status(404).json({ message: "Booking not found." });
  if (booking.status === "cancelled") return res.status(400).json({ message: "Booking is already cancelled." });
  booking.status = "cancelled";
  await booking.save();
  res.json(booking);
});

export default router;
