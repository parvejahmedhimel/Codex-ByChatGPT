import EnrollButton from "@/components/enroll-button";
import { prisma } from "@/lib/prisma";

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <section>
      <h2>Courses</h2>
      <div className="grid">
        {courses.map((course) => (
          <article key={course.id} className="card">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p><strong>${course.price}</strong> · {course.level}</p>
            <EnrollButton courseId={course.id} />
          </article>
        ))}
      </div>
    </section>
  );
}
