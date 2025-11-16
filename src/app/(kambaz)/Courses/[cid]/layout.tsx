"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation"; 
import { FaAlignJustify } from "react-icons/fa6";

import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";
import { RootState } from "../../store";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();                                
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const course = courses.find((c: any) => c._id === cid);
  const { currentUser } = useSelector((s: RootState) => s.accountReducer);
  const { enrollments } = useSelector((s: RootState) => s.enrollmentsReducer);

  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    const isStaff = ["FACULTY", "ADMIN"].includes(currentUser.role ?? "");
    const enrolled = enrollments.some((e) => e.user === currentUser._id && e.course === cid);
    if (!isStaff && !enrolled) {
      router.replace("/Dashboard");
    }
  }, [cid, currentUser, enrollments, router]);

  if (!currentUser) {
    return (
      <div className="container py-4">
        <div className="alert alert-warning mb-0">
          <strong>Login required.</strong> Please sign in to view course content.
        </div>
      </div>
    );
  }

  return (
    <div id="wd-courses">
      <style>{`
        #wd-courses { padding-left: 0px; padding-right: 16px; padding-top: 8px; }
        @media (min-width: 768px) { #wd-courses { padding-left: 140px; } }
      `}</style>

      <div className="d-flex align-items-center gap-3">
        <button
          type="button"
          aria-label="Toggle course navigation"
          aria-controls="wd-courses-navigation"
          aria-expanded={showNav}
          className="btn p-0 border-0 bg-transparent"
          onClick={() => setShowNav((s) => !s)}
        >
          <FaAlignJustify className="text-danger" style={{ fontSize: 28 }} />
        </button>

        <h2 className="text-danger m-0">
          <Breadcrumb course={{ name: course?.name ?? "" }} />
        </h2>
      </div>

      <hr className="mt-2" />

      <div className="d-flex gap-4">
        {showNav && (
          <aside
            aria-label="Course navigation"
            className="d-none d-md-block"
            style={{ width: 220, minWidth: 220 }}
          >
            <CourseNavigation cid={cid} />
          </aside>
        )}

        <main className="flex-grow-1">{children}</main>
      </div>
    </div>
  );
}
