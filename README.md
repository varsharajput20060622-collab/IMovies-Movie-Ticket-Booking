# IMovies — Movie Ticket Booking (MERN)

A beginner-friendly full-stack movie ticket booking project based on the project brief in your screenshot.

## Tech stack
- Frontend: React + Vite + Bootstrap
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Authentication: JWT + bcryptjs

## Features included
- Browse movies and view showtimes
- Register and log in
- Select seats and create a booking
- View your bookings
- Admin-ready movie model and seed script (demo movies)
- Basic validation and error handling

> This is a learning/demo project. Before real-world use, add payment integration, production security hardening, rate limiting, and a proper seat-locking transaction strategy.

## Requirements
Install Node.js (LTS) and MongoDB Community Server, or use a MongoDB Atlas connection string.

## 1. Configure backend
```bash
cd backend
copy .env.example .env
npm install
```
Open `backend/.env` and set `MONGO_URI`. Keep the `JWT_SECRET` private.

## 2. Add demo movies
```bash
npm run seed
```

## 3. Start backend
```bash
npm run dev
```
Backend runs at `http://localhost:5000`.

## 4. Start frontend (new terminal)
```bash
cd frontend
npm install
npm run dev
```
Open the Vite URL shown in the terminal (usually `http://localhost:5173`).

## Demo flow
1. Register a user.
2. Log in.
3. Open a movie and select a showtime.
4. Choose seats and book.
5. Open **My Bookings** to see reservations.

## Project structure
```text
imovies-movie-ticket-booking/
├── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── middleware/auth.js
│   │   ├── models/{User,Movie,Booking}.js
│   │   ├── routes/{auth,movies,bookings}.js
│   │   ├── seed.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/Navbar.jsx
    │   ├── pages/{Home,Login,Register,MovieDetails,MyBookings}.jsx
    │   ├── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── styles.css
    ├── index.html
    └── package.json
```
