import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const [enrollments, attempts] = await Promise.all([
    prisma.enrollment.findMany({ where: { userId: session.user.id }, include: { course: true } }),
    prisma.examAttempt.findMany({ where: { userId: session.user.id }, include: { exam: true }, orderBy: { createdAt: "desc" } })
  ]);

  const avg = attempts.length ? Math.round(attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length) : 0;

  return (
    <section>
      <h2>Student Dashboard</h2>
      <div className="card">
        <p><strong>Enrolled courses:</strong> {enrollments.length}</p>
        <p><strong>Average exam score:</strong> {avg}%</p>
      </div>
      <div className="grid">
        <article className="card">
          <h3>My Courses</h3>
          <ul>
            {enrollments.length ? enrollments.map((e) => <li key={e.id}>{e.course.title}</li>) : <li>No courses enrolled yet.</li>}
          </ul>
        </article>
        <article className="card">
          <h3>Exam Attempts</h3>
          <ul>
            {attempts.length ? attempts.map((a) => <li key={a.id}>{a.exam.title}: {a.score}%</li>) : <li>No exam attempts yet.</li>}
          </ul>
        </article>
      </div>
    </section>
  );
}
