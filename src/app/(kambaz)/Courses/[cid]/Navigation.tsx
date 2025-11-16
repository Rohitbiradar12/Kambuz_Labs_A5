"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation({ cid }: { cid: string }) {
  const pathname = usePathname();
  const encodedCid = encodeURIComponent(cid);

  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ] as const;

  const hrefFor = (label: (typeof links)[number]) =>
    label === "People"
      ? `/Courses/${encodedCid}/People/Table`
      : `/Courses/${encodedCid}/${label}`;

  const isActive = (label: (typeof links)[number], href: string) => {
    if (!pathname) return false;
    if (label === "People") return pathname.startsWith(`/Courses/${cid}/People`);
    return pathname === href || pathname.startsWith(href + "/") || pathname.startsWith(href);
  };

  const idFor = (label: (typeof links)[number]) =>
    `wd-course-${label.toLowerCase()}-link`;

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((label) => {
        const href = hrefFor(label);
        const active = isActive(label, href);
        return (
          <Link
            key={label}
            href={href}
            id={idFor(label)}
            className={`list-group-item border-0 ${active ? "active" : "text-danger"}`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
