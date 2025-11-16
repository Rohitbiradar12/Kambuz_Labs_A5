"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid, LiaHistorySolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser, FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { MdVideoLibrary } from "react-icons/md";
import { useMemo, useState } from "react";

type NavItem = {
  id: string;
  href: string;
  label: string;
  iconInactive: React.ReactNode;
  iconActive: React.ReactNode;
  textInactive: string;
  textActive: string;
};

export default function KambazNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [courseOpen, setCourseOpen] = useState(false);
  const [mobileAccountOpen, setMobileAccountOpen] = useState(false);

  const courseMatch = useMemo(() => pathname?.match(/^\/Courses\/([^/]+)/), [pathname]);
  const cid = courseMatch?.[1] ?? null;
  const onCourse = !!cid;

  const navLinks: NavItem[] = [
    {
      id: "account",
      href: "/Account",
      label: "Account",
      iconInactive: <FaRegCircleUser className="fs-3 text-white" />,
      iconActive: <FaRegCircleUser className="fs-3 text-secondary" />,
      textInactive: "text-white",
      textActive: "text-danger",
    },
    {
      id: "dashboard",
      href: "/Dashboard",
      label: "Dashboard",
      iconInactive: <AiOutlineDashboard className="fs-3 text-danger" />,
      iconActive: <AiOutlineDashboard className="fs-3 text-danger" />,
      textInactive: "text-white",
      textActive: "text-danger",
    },
   {
  id: "/Courses/RS101",          
  href: "/Courses/RS101",        
  label: "Courses",
  iconInactive: <LiaBookSolid className="fs-3 text-danger" />,
  iconActive: <LiaBookSolid className="fs-3 text-danger" />,
  textInactive: "text-white",
  textActive: "text-danger",
},

    {
      id: "calendar",
      href: "/Calendar",
      label: "Calendar",
      iconInactive: <IoCalendarOutline className="fs-3 text-danger" />,
      iconActive: <IoCalendarOutline className="fs-3 text-danger" />,
      textInactive: "text-white",
      textActive: "text-danger",
    },
    {
      id: "inbox",
      href: "/Inbox",
      label: "Inbox",
      iconInactive: <FaInbox className="fs-3 text-danger" />,
      iconActive: <FaInbox className="fs-3 text-danger" />,
      textInactive: "text-white",
      textActive: "text-danger",
    },
    {
      id: "history",
      href: "/History",
      label: "History",
      iconInactive: <LiaHistorySolid className="fs-3 text-danger" />,
      iconActive: <LiaHistorySolid className="fs-3 text-danger" />,
      textInactive: "text-white",
      textActive: "text-danger",
    },
    {
      id: "studio",
      href: "/Studio",
      label: "Studio",
      iconInactive: <MdVideoLibrary className="fs-3 text-danger" />,
      iconActive: <MdVideoLibrary className="fs-3 text-danger" />,
      textInactive: "text-white",
      textActive: "text-danger",
    },
    {
      id: "help",
      href: "/Help",
      label: "Help",
      iconInactive: <LiaCogSolid className="fs-3 text-danger" />,
      iconActive: <LiaCogSolid className="fs-3 text-danger" />,
      textInactive: "text-white",
      textActive: "text-danger",
    },
    {
      id: "labs",
      href: "/Labs",
      label: "Labs",
      iconInactive: <LiaBookSolid className="fs-3 text-danger" />,
      iconActive: <LiaBookSolid className="fs-3 text-danger" />,
      textInactive: "text-white",
      textActive: "text-danger",
    },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <ListGroup
        id="wd-kambaz-navigation"
        className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
        style={{ width: 120 }}
      >
        <ListGroupItem
          className="bg-black border-0 text-center pt-3 pb-2"
          as="a"
          href="https://www.northeastern.edu/"
          target="_blank"
          id="wd-neu-link"
        >
          <img src="/NEU.png" width={70} alt="Northeastern University" />
        </ListGroupItem>

        {navLinks.map((it) => {
          const active = isActive(it.href);
          const bg = active ? "bg-white" : "bg-black";
          const text = active ? it.textActive : it.textInactive;
          return (
            <ListGroupItem key={it.id} className={`border-0 text-center ${bg}`}>
              <Link
                href={it.href}
                id={`wd-${it.id}-link`}
                className={`${text} text-decoration-none d-block`}
                style={{ lineHeight: 1.1, fontSize: 14 }}
              >
                <div className="d-flex flex-column align-items-center">
                  {active ? it.iconActive : it.iconInactive}
                  <div className="mt-1">{it.label}</div>
                </div>
              </Link>
            </ListGroupItem>
          );
        })}
      </ListGroup>

      <MobileTopBar
        title={onCourse ? `Course ${cid}` : "Kambaz"}
        onOpen={() => setIsOpen((prev) => !prev)}
        onOpenCourse={() => setCourseOpen((prev) => !prev)}
        showCourseButton={onCourse}
      />

      {isOpen && (
        <MobileDrawer onClose={() => setIsOpen(false)}>
          <div className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom">
            <img src="/canvas.svg" alt="Canvas" width={184} height={84} />
            <button
              aria-label="Close"
              onClick={() => setIsOpen(false)}
              className="btn"
              style={{ background: "transparent", border: "none", fontSize: 28, lineHeight: 1, color: "#dc3545" }}
            >
              ×
            </button>
          </div>

          <div className="d-flex flex-column px-4 py-3" style={{ gap: 18 }}>
            
            <button
              onClick={() => setMobileAccountOpen((s) => !s)}
              className="btn d-flex align-items-center justify-content-between px-0"
              style={{
                color: "#dc3545",
                background: "transparent",
                border: "none",
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              <span className="d-flex align-items-center" style={{ gap: 14 }}>
                <FaRegCircleUser className="fs-4" />
                Account
              </span>
              {mobileAccountOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {mobileAccountOpen && (
              <div className="ps-5 d-flex flex-column" style={{ gap: 12 }}>
                <Link
                  href="/Account/Signin"
                  onClick={() => setIsOpen(false)}
                  className="text-decoration-none"
                  style={{ color: "#dc3545", fontWeight: 500, fontSize: 16 }}
                >
                  Signin
                </Link>
                <Link
                  href="/Account/Signup"
                  onClick={() => setIsOpen(false)}
                  className="text-decoration-none"
                  style={{ color: "#dc3545", fontWeight: 500, fontSize: 16 }}
                >
                  Signup
                </Link>
                <Link
                  href="/Account/Profile"
                  onClick={() => setIsOpen(false)}
                  className="text-decoration-none"
                  style={{ color: "#dc3545", fontWeight: 500, fontSize: 16 }}
                >
                  Profile
                </Link>
                <hr className="mt-2 mb-0" />
              </div>
            )}

            
            {navLinks
              .filter((it) => it.id !== "account")
              .map((it) => {
                const active = isActive(it.href);
                return (
                  <Link
                    key={`m-${it.id}`}
                    href={it.href}
                    onClick={() => setIsOpen(false)}
                    className="text-decoration-none d-flex align-items-center"
                    style={{ color: "#dc3545", fontWeight: active ? 700 : 500, gap: 14, fontSize: 18 }}
                  >
                    <span className="fs-4">{active ? it.iconActive : it.iconInactive}</span>
                    <span>{it.label}</span>
                  </Link>
                );
              })}
          </div>
        </MobileDrawer>
      )}

      <MobileCourseSheet
        open={courseOpen}
        onClose={() => setCourseOpen(false)}
        cid={cid ?? ""}
      />
    </>
  );
}

function MobileTopBar({
  title,
  onOpen,
  onOpenCourse,
  showCourseButton,
}: {
  title: string;
  onOpen: () => void;
  onOpenCourse: () => void;
  showCourseButton: boolean;
}) {
  return (
    <div
      className="d-flex d-md-none align-items-center bg-black text-white px-3 py-2 position-fixed top-0 start-0 end-0"
      style={{ zIndex: 10000, height: 56 }}
    >
      <button
        aria-label="Open menu"
        className="btn p-0 me-2"
        onClick={onOpen}
        style={{ color: "white", border: "none", background: "transparent", fontSize: 22 }}
      >
        &#9776;
      </button>
      <div className="flex-grow-1 text-center fw-bold">{title}</div>
      {showCourseButton ? (
        <button
          aria-label="Open course menu"
          onClick={onOpenCourse}
          className="btn p-0"
          style={{ color: "white", border: "1px solid rgba(255,255,255,.15)", background: "transparent", width: 36, height: 36, borderRadius: 10 }}
        >
          ▾
        </button>
      ) : (
        <div style={{ width: 36 }} />
      )}
    </div>
  );
}

function MobileDrawer({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 99998 }}
      />
      <div
        role="dialog"
        aria-modal
        className="position-fixed top-0 start-0 w-100 h-100 bg-white"
        style={{ zIndex: 99999, animation: "slideIn .28s cubic-bezier(.2,.9,.2,1)" }}
      >
        {children}
      </div>
      <style>{`
        @keyframes slideIn { from { transform: translateX(-100%);} to { transform: translateX(0);} }
      `}</style>
    </>
  );
}

function MobileCourseSheet({
  open,
  onClose,
  cid,
}: {
  open: boolean;
  onClose: () => void;
  cid: string;
}) {
  const height = "50vh";
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          top: 56,
          bottom: 0,
          background: open ? "rgba(0,0,0,0.35)" : "transparent",
          transition: "background .22s ease, opacity .22s ease",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          zIndex: 9997,
        }}
      />
      <div
        role="dialog"
        aria-modal={open ? true : undefined}
        className="d-md-none"
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          top: 56,
          height: open ? height : 0,
          transform: open ? "translateY(0)" : "translateY(-6px)",
          transition: "height 360ms cubic-bezier(.22,.9,.3,1), transform 300ms ease",
          background: "#fff",
          color: "#dc3545",
          zIndex: 9998,
          overflow: "hidden",
          borderBottomLeftRadius: 14,
          borderBottomRightRadius: 14,
          boxShadow: "0 10px 40px rgba(2,6,23,0.12)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div style={{ height: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 56, height: 4, borderRadius: 99, background: "rgba(0,0,0,0.06)" }} />
        </div>
        <div style={{ padding: "8px 16px", height: `calc(${height} - 10px)`, overflowY: "auto" }}>
          <div className="d-flex flex-column" style={{ gap: 14 }}>
            <Link href={`/Courses/${cid}/Home`} onClick={onClose} className="text-decoration-none" style={{ color: "#dc3545", fontWeight: 700, fontSize: 18 }}>Home</Link>
            <Link href={`/Courses/${cid}/Modules`} onClick={onClose} className="text-decoration-none" style={{ color: "#dc3545", fontSize: 18 }}>Modules</Link>
            <Link href={`/Courses/${cid}/Piazza`} onClick={onClose} className="text-decoration-none" style={{ color: "#dc3545", fontSize: 18 }}>Piazza</Link>
            <Link href={`/Courses/${cid}/Zoom`} onClick={onClose} className="text-decoration-none" style={{ color: "#dc3545", fontSize: 18 }}>Zoom</Link>
            <Link href={`/Courses/${cid}/Assignments`} onClick={onClose} className="text-decoration-none" style={{ color: "#dc3545", fontSize: 18 }}>Assignments</Link>
            <Link href={`/Courses/${cid}/Quizzes`} onClick={onClose} className="text-decoration-none" style={{ color: "#dc3545", fontSize: 18 }}>Quizzes</Link>
            <Link href={`/Courses/${cid}/Grades`} onClick={onClose} className="text-decoration-none" style={{ color: "#dc3545", fontSize: 18 }}>Grades</Link>
            <Link href={`/Courses/${cid}/People/Table`} onClick={onClose} className="text-decoration-none" style={{ color: "#dc3545", fontSize: 18 }}>People</Link>
          </div>
        </div>
      </div>
    </>
  );
}
