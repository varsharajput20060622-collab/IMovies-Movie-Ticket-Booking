import "dotenv/config";
import { connectDB } from "./config/db.js";
import Movie from "./models/Movie.js";

const today = new Date();
const date = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const movies = [
  {
    title: "The Last Horizon", genre: "Sci-Fi", language: "English", duration: "2h 08m", rating: 8.4,
    description: "A crew races across the stars to find a new home for humanity.",
    posterUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80",
    showtimes: [{ label: "Morning", date, time: "10:30", price: 180 }, { label: "Afternoon", date, time: "14:00", price: 220 }, { label: "Evening", date, time: "19:15", price: 260 }]
  },
  {
    title: "City of Dreams", genre: "Drama", language: "Hindi", duration: "2h 15m", rating: 7.9,
    description: "Two strangers find courage and connection in a busy city.",
    posterUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
    showtimes: [{ label: "Morning", date, time: "11:00", price: 150 }, { label: "Afternoon", date, time: "15:30", price: 190 }, { label: "Evening", date, time: "20:00", price: 230 }]
  },
  {
    title: "The Hidden Kingdom", genre: "Adventure", language: "English", duration: "1h 56m", rating: 8.1,
    description: "A young explorer discovers a forgotten world beneath the mountains.",
    posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    showtimes: [{ label: "Morning", date, time: "09:45", price: 170 }, { label: "Afternoon", date, time: "13:20", price: 210 }, { label: "Evening", date, time: "18:45", price: 250 }]
  }
];

try {
  await connectDB();
  await Movie.deleteMany({});
  await Movie.insertMany(movies);
  console.log("Demo movies added.");
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  process.exit();
}
