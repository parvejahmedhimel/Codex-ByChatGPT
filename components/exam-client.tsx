"use client";

import { useState } from "react";

type Question = { id: string; prompt: string; options: string[] };

export default function ExamClient({ examId, title, questions }: { examId: string; title: string; questions: Question[] }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState("");

  async function submitExam() {
    const payload = {
      examId,
      answers: questions.map((q) => ({ questionId: q.id, answerIndex: answers[q.id] ?? -1 }))
    };

    const res = await fetch("/api/exams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) {
      setResult(data.error ?? "Submission failed");
      return;
    }

    setResult(`Score: ${data.score}% (${data.correct}/${data.total})`);
  }

  return (
    <div className="card">
      <h3>{title}</h3>
      {questions.map((q, i) => (
        <div key={q.id}>
          <p><strong>Q{i + 1}.</strong> {q.prompt}</p>
          {q.options.map((opt, idx) => (
            <label key={idx} style={{ display: "block", marginBottom: 4 }}>
              <input
                type="radio"
                name={q.id}
                checked={answers[q.id] === idx}
                onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: idx }))}
              /> {opt}
            </label>
          ))}
        </div>
      ))}
      <button onClick={submitExam}>Submit Exam</button>
      {result ? <p>{result}</p> : null}
    </div>
  );
}
