import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { examId, answers } = await request.json();
  if (!examId || !Array.isArray(answers)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const questions = await prisma.examQuestion.findMany({ where: { examId } });
  const answerMap = new Map<string, number>(answers.map((a: { questionId: string; answerIndex: number }) => [a.questionId, a.answerIndex]));

  let correct = 0;
  for (const q of questions) {
    if (answerMap.get(q.id) === q.answerIndex) correct += 1;
  }

  const score = Math.round((correct / questions.length) * 100);

  await prisma.examAttempt.create({
    data: {
      userId: session.user.id,
      examId,
      score
    }
  });

  return NextResponse.json({ score, correct, total: questions.length });
}
