import Link from "next/link";

export default function HomePage() {
  return (
    <section>
      <div className="card">
        <span className="badge">Next.js + TypeScript + Prisma + Auth</span>
        <h2>Sell Courses, Take Exams, Track Progress</h2>
        <p>This is a production-style starter with real DB-backed users, enrollments, and exam attempts.</p>
        <div className="row gap">
          <Link href="/register"><button>Get Started</button></Link>
          <Link href="/courses">Browse Courses</Link>
        </div>
      </div>
    </section>
  );
}
