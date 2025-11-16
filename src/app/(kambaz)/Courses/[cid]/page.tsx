"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useParams, useRouter } from "next/navigation";

export default function CoursesPage() {
  const { currentUser } = useSelector((s: RootState) => s.accountReducer);
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();

  useEffect(() => {
    if (currentUser && cid) {
      router.replace(`/Courses/${encodeURIComponent(cid)}/Home`);
    }
  }, [currentUser, cid, router]);

 if (!currentUser) {
  return (
    <div id="wd-courses">
      <style>{`
        #wd-courses {
          padding-left: 0px;
          padding-right: 16px;
          padding-top: 8px;
        }
        @media (min-width: 768px) {
          #wd-courses { padding-left: 140px; } /* keep space for left rail */
        }
      `}</style>


      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "calc(100vh - 16px)" }}
      >
        <div
          className="alert alert-warning text-center shadow-sm mb-0"
          role="alert"
          style={{ maxWidth: 820 }}
        >
          <strong>Login required.</strong> Please sign in to view course content.
        </div>
      </div>
    </div>
  );
}

  return null;
}
