import "./globals.css";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata = {
  title: "EduLaunch Pro",
  description: "Course selling and online exam platform"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <header className="topbar">
          <div className="container row between">
            <h1>EduLaunch Pro</h1>
            <nav className="row gap">
              <Link href="/">Home</Link>
              <Link href="/courses">Courses</Link>
              <Link href="/exams">Exams</Link>
              <Link href="/dashboard">Dashboard</Link>
              {session?.user ? <Link href="/api/auth/signout">Sign out</Link> : <Link href="/login">Login</Link>}
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
