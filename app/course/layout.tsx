import type { Metadata } from "next";
import "@/app/globals.css";

export default function CourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="max-w-3xl mx-auto my-12">
      {children}
    </main>
  );
}


