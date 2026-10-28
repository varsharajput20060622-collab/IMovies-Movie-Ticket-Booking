import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api.js";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  function change(e) { setForm({ ...form, [e.target.name]: e.target.value }); }
  async function submit(e) {
    e.preventDefault(); setError(""); setBusy(true);
    try {
      const { data } = await api.post("/auth/login", form);
      localStorage.setItem("imovies_token", data.token);
      localStorage.setItem("imovies_user", JSON.stringify(data.user));
      navigate("/");
      window.location.reload();
    } catch (err) { setError(err.response?.data?.message || "Login failed."); }
    finally { setBusy(false); }
  }
  return <div className="auth-wrap"><form className="auth-card" onSubmit={submit}>
    <span className="eyebrow">WELCOME BACK</span><h1>Sign in</h1><p className="text-secondary">Your movie night is waiting.</p>
    {error && <div className="alert alert-danger py-2">{error}</div>}
    <label className="form-label">Email</label><input className="form-control mb-3" name="email" type="email" value={form.email} onChange={change} required />
    <label className="form-label">Password</label><input className="form-control mb-4" name="password" type="password" value={form.password} onChange={change} required />
    <button className="btn btn-primary w-100" disabled={busy}>{busy ? "Signing in..." : "Sign in"}</button>
    <p className="mt-3 mb-0 text-center">New here? <Link to="/register">Create an account</Link></p>
  </form></div>;
}
