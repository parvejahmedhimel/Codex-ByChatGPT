"use client";

import { useState } from "react";

export default function EnrollButton({ courseId }: { courseId: string }) {
  const [message, setMessage] = useState("");

  async function enroll() {
    const res = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId })
    });

    const data = await res.json();
    setMessage(data.message ?? data.error);
  }

  return (
    <div>
      <button onClick={enroll}>Enroll / Purchase</button>
      {message ? <p>{message}</p> : null}
    </div>
  );
}
