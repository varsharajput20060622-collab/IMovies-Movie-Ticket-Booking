import mongoose from "mongoose";

const showtimeSchema = new mongoose.Schema({
  label: { type: String, required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  time: { type: String, required: true }, // HH:mm
  price: { type: Number, required: true, min: 0 }
}, { _id: true });

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  genre: { type: String, default: "Drama" },
  language: { type: String, default: "Hindi" },
  duration: { type: String, default: "2h 10m" },
  rating: { type: Number, default: 8.0 },
  posterUrl: { type: String, default: "" },
  showtimes: [showtimeSchema]
}, { timestamps: true });

export default mongoose.model("Movie", movieSchema);
