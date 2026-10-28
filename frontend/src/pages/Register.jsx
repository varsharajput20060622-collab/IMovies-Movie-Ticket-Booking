import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api.js";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  function change(e) { setForm({ ...form, [e.target.name]: e.target.value }); }
  async function submit(e) {
    e.preventDefault(); setError(""); setBusy(true);
    try {
      const { data } = await api.post("/auth/register", form);
      localStorage.setItem("imovies_token", data.token);
      localStorage.setItem("imovies_user", JSON.stringify(data.user));
      navigate("/");
      window.location.reload();
    } catch (err) { setError(err.response?.data?.message || "Registration failed."); }
    finally { setBusy(false); }
  }
  return <div className="auth-wrap"><form className="auth-card" onSubmit={submit}>
    <span className="eyebrow">JOIN IMOVIES</span><h1>Create account</h1><p className="text-secondary">Book seats for your next favourite film.</p>
    {error && <div className="alert alert-danger py-2">{error}</div>}
    <label className="form-label">Full name</label><input className="form-control mb-3" name="name" value={form.name} onChange={change} required />
    <label className="form-label">Email</label><input className="form-control mb-3" name="email" type="email" value={form.email} onChange={change} required />
    <label className="form-label">Password (minimum 6 characters)</label><input className="form-control mb-4" name="password" type="password" minLength="6" value={form.password} onChange={change} required />
    <button className="btn btn-primary w-100" disabled={busy}>{busy ? "Creating account..." : "Create account"}</button>
    <p className="mt-3 mb-0 text-center">Already registered? <Link to="/login">Sign in</Link></p>
  </form></div>;
}
