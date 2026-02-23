"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
      })
    });

    setLoading(false);

    if (!res.ok) {
      const payload = await res.json();
      setError(payload.error ?? "Registration failed");
      return;
    }

    router.push("/login");
  }

  return (
    <form action={onSubmit} className="card">
      <h3>Create your account</h3>
      <label>Name</label>
      <input name="name" required />
      <label>Email</label>
      <input name="email" type="email" required />
      <label>Password</label>
      <input name="password" type="password" minLength={6} required />
      <button type="submit" disabled={loading}>{loading ? "Creating..." : "Register"}</button>
      {error ? <p style={{ color: "#dc2626" }}>{error}</p> : null}
    </form>
  );
}
