import ExamClient from "@/components/exam-client";
import { prisma } from "@/lib/prisma";

export default async function ExamsPage() {
  const exam = await prisma.exam.findFirst({ include: { questions: true } });

  if (!exam) return <p>No exams available.</p>;

  return (
    <section>
      <h2>Exams</h2>
      <ExamClient
        examId={exam.id}
        title={exam.title}
        questions={exam.questions.map((q) => ({ id: q.id, prompt: q.prompt, options: JSON.parse(q.optionsJson) as string[] }))}
      />
    </section>
  );
}
