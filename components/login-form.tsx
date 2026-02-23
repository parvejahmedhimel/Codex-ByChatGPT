"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(formData: FormData) {
    setError("");

    const response = await signIn("credentials", {
      email: String(formData.get("email")),
      password: String(formData.get("password")),
      redirect: false
    });

    if (response?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form action={onSubmit} className="card">
      <h3>Login</h3>
      <label>Email</label>
      <input name="email" type="email" required />
      <label>Password</label>
      <input name="password" type="password" required />
      <button type="submit">Sign in</button>
      {error ? <p style={{ color: "#dc2626" }}>{error}</p> : null}
    </form>
  );
}
