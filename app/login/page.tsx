"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const loginpage = () => {
  const [form, setForm] = useState({
    email: 'p1@gmail.com',
    password: '12345'
  });
  
  const [loading, setLoading] = useState(false);
  const router = useRouter();

 const submit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // SAVE TOKEN
      localStorage.setItem("token", data.token);

      alert("Login successful");
      router.push("/");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-15 border border-white/10 bg-transparent p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Blog Login</h2>

      <form onSubmit={submit} className="flex flex-col gap-3">

        <input required type="email"
          placeholder="Email"
          className="border p-2"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} />

        <input required
          type="password"
          placeholder="Password"
          className="border p-2"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })} />

        <button disabled={loading}
          className="bg-blue-600 text-white py-2 rounded">
          {loading ? 'Logging...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default loginpage