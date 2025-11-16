"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { 
  FiBookOpen, 
  FiUsers, 
  FiEdit3, 
  FiTrash2, 
  FiPlus, 
  FiRefreshCw,
  FiCheckCircle,
  FiXCircle,
  FiArrowRight,
  FiFilter
} from "react-icons/fi";

import { enroll, unenroll, setEnrollments } from "../Enrollments/reducer";
import {
  findEnrollmentsForCurrentUser,
  enrollInCourse,
  unenrollFromCourse,
} from "../Enrollments/client";

import {
  addNewCourse,
  deleteCourse,
  updateCourse,
  setCourses,
} from "../Courses/reducer";
import * as courseClient from "../Courses/client";

type Course = {
  _id: string;
  number?: string;
  code?: string;
  name?: string;
  title?: string;
  description?: string;
  image: string;
  startDate: string;
  endDate: string;
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);

  const isStudent =
    !!currentUser &&
    currentUser.role !== "FACULTY" &&
    currentUser.role !== "ADMIN";

  const [showEnrollmentsOnly, setShowEnrollmentsOnly] = useState(true);

  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "NEW-0000",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/reactjs.jpg",
    description: "New Description",
  });

  const isEnrolled = (courseId: string) =>
    !!currentUser &&
    enrollments.some(
      (e) => e.user === currentUser._id && e.course === courseId
    );

  const visibleCourses: Course[] =
    showEnrollmentsOnly && currentUser
      ? (courses as Course[]).filter((c) => isEnrolled(c._id))
      : (courses as Course[]);

  useEffect(() => {
    const load = async () => {
      if (!currentUser) {
        dispatch(setCourses([]));
        dispatch(setEnrollments([]));
        return;
      }

      try {
        const allCourses = await courseClient.fetchAllCourses();
        dispatch(setCourses(allCourses));

        const userEnrollments = await findEnrollmentsForCurrentUser();
        dispatch(setEnrollments(userEnrollments));
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      }
    };

    load();
  }, [currentUser, dispatch]);

  const onAddNewCourse = async () => {
    try {
      const newCourse = await courseClient.createCourse(course);
      dispatch(setCourses([...courses, newCourse]));
    } catch (err) {
      console.error("Create course failed", err);
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    try {
      await courseClient.deleteCourse(courseId);
      dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const onUpdateCourse = async () => {
    try {
      await courseClient.updateCourse(course);
      dispatch(
        setCourses(courses.map((c) => (c._id === course._id ? course : c)))
      );
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleAdd = () => dispatch(addNewCourse(course));
  const handleUpdate = () => dispatch(updateCourse(course));
  const handleDelete =
    (courseId: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch(deleteCourse(courseId));
    };

  const handleEnrollClick =
    (c: Course) => async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!currentUser) return;

      try {
        await enrollInCourse(c._id);
        dispatch(enroll({ user: currentUser._id, course: c._id }));
      } catch (err) {
        console.error("Enroll failed", err);
      }
    };

  const handleUnenrollClick =
    (c: Course) => async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!currentUser) return;

      try {
        await unenrollFromCourse(c._id);
        dispatch(unenroll({ user: currentUser._id, course: c._id }));
      } catch (err) {
        console.error("Unenroll failed", err);
      }
    };

  return (
    <div
      id="wd-dashboard"
      style={{ padding: "20px 16px 40px 140px", overflowX: "hidden" }}
    >
      <style>{`
        @media (max-width: 767.98px) {
          #wd-dashboard { padding-left: 0 !important; }
        }
        @media (min-width: 1920px) {
          .wd-col-5xl { flex: 0 0 20%; max-width: 20%; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .premium-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          background: #fff;
          overflow: hidden;
          animation: fadeInUp 0.6s ease-out;
        }

        .premium-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
        }

        .premium-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #0d6efd, #6610f2);
          transform: scaleX(0);
          transition: transform 0.4s ease;
          z-index: 1;
        }

        .premium-card:hover::before {
          transform: scaleX(1);
        }

        .card-img-overlay-premium {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .premium-card:hover .card-img-overlay-premium {
          opacity: 1;
        }

        .course-image-container {
          position: relative;
          overflow: hidden;
          height: 180px;
        }

        .course-image-container img {
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .premium-card:hover .course-image-container img {
          transform: scale(1.1);
        }

        .btn-premium {
          transition: all 0.3s ease;
          border: none;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .btn-premium:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }

        .btn-premium:active {
          transform: translateY(0);
        }

        .action-buttons {
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s ease;
        }

        .premium-card:hover .action-buttons {
          opacity: 1;
          transform: translateY(0);
        }

        .course-badge {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          animation: slideIn 0.5s ease-out;
        }

        .enrolled-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 4px;
          box-shadow: 0 4px 12px rgba(17, 153, 142, 0.3);
        }

        .header-title {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
          animation: slideIn 0.6s ease-out;
        }

        .form-control-premium {
          border: 2px solid #e9ecef;
          border-radius: 12px;
          padding: 12px 16px;
          transition: all 0.3s ease;
          font-size: 0.95rem;
        }

        .form-control-premium:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.15);
          transform: translateY(-2px);
        }

        .go-button {
          position: absolute;
          bottom: 16px;
          left: 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 8px 20px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 6px;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }

        .premium-card:hover .go-button {
          opacity: 1;
          transform: translateX(0);
        }

        .go-button:hover {
          transform: translateX(4px) !important;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .filter-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 10px 24px;
          border-radius: 25px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .filter-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .course-description {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #6c757d;
          font-size: 0.9rem;
          line-height: 1.5;
          min-height: 48px;
        }
      `}</style>

      <div className="container-fluid px-2">
        <h1 id="wd-dashboard-title" className="header-title mb-4">
          <FiBookOpen style={{ marginRight: '12px', display: 'inline' }} />
          Dashboard
        </h1>
        <hr style={{ border: '2px solid #e9ecef', borderRadius: '2px' }} />

        <div className="d-flex align-items-center mb-2">
          {!!currentUser && !isStudent && <h5 className="m-0 d-flex align-items-center" style={{ color: '#495057', fontWeight: 600 }}>
            <FiPlus style={{ marginRight: '8px' }} />
            New Course
          </h5>}
          <div className="ms-auto d-inline-flex gap-2">
            {!!currentUser && isStudent && (
              <button
                className="filter-button"
                onClick={() => setShowEnrollmentsOnly((prev) => !prev)}
                id="wd-enrollments-toggle"
              >
                <FiFilter />
                {showEnrollmentsOnly ? "All Courses" : "Enrollments"}
              </button>
            )}
          </div>
        </div>

        {!!currentUser && !isStudent && (
          <>
            <FormControl
              className="mb-2 form-control-premium"
              placeholder="New Course"
              value={course.name ?? ""}
              onChange={(e) => setCourse({ ...course, name: e.target.value })}
            />
            <FormControl
              className="mb-2 form-control-premium"
              placeholder="New Description"
              as="textarea"
              rows={3}
              value={course.description ?? ""}
              onChange={(e) =>
                setCourse({ ...course, description: e.target.value })
              }
            />
            <h5 className="d-flex align-items-center mb-2">
              <span className="m-0"></span>
              <span className="ms-auto d-inline-flex gap-2">
                <button
                  className="btn btn-warning btn-premium"
                  id="wd-update-course-click"
                  onClick={onUpdateCourse}
                >
                  <FiRefreshCw />
                  Update
                </button>

                <button
                  className="btn btn-primary btn-premium"
                  id="wd-add-new-course-click"
                  onClick={onAddNewCourse}
                >
                  <FiPlus />
                  Add
                </button>
              </span>
            </h5>
          </>
        )}

        <hr style={{ border: '2px solid #e9ecef', borderRadius: '2px' }} />
        <h2 id="wd-dashboard-published" className="m-0 mb-3" style={{ fontWeight: 600, color: '#212529' }}>
          <FiUsers style={{ marginRight: '10px', display: 'inline' }} />
          {currentUser
            ? `My Courses (${visibleCourses.length})`
            : "My Courses (0)"}
        </h2>
        <hr style={{ border: '2px solid #e9ecef', borderRadius: '2px' }} />

        {!currentUser && (
          <div className="alert alert-light border" role="alert">
            <FiBookOpen style={{ marginRight: '8px' }} />
            Login to see the courses.
          </div>
        )}

        <Row className="g-4">
          {visibleCourses.map((c, index) => {
            const code = c.number;
            const title = c.name;
            const enrolled = isEnrolled(c._id);

            return (
              <Col
                key={c._id}
                xs={12}
                sm={6}
                md={6}
                lg={4}
                xl={3}
                className="d-flex align-items-stretch wd-col-5xl"
              >
                <Link
                  href={`/Courses/${c._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark w-100"
                >
                  <Card className="h-100 premium-card position-relative">
                    {enrolled && isStudent &&(
                      <div className="enrolled-badge">
                        <FiCheckCircle size={14} />
                        Enrolled
                      </div>
                    )}

                    <div className="course-image-container">
                      <CardImg
                        variant="top"
                        src={c.image}
                        alt={`${code ?? ""} thumbnail`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <div className="card-img-overlay-premium"></div>
                    </div>

                    <CardBody style={{ minHeight: 130 }}>
                      <div className="mb-2">
                        <span className="course-badge">
                          <FiBookOpen size={14} />
                          {code || "COURSE"}
                        </span>
                      </div>

                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden mb-3" style={{ 
                        fontWeight: 700,
                        fontSize: '1.05rem',
                        color: '#212529'
                      }}>
                        {code ? `${code} ` : ""}
                        {title}
                      </CardTitle>

                      <div className="position-absolute end-0 bottom-0 m-3 d-flex gap-2">
                        {currentUser && isStudent ? (
                          enrolled ? (
                            <button
                              className="btn btn-danger btn-sm btn-premium"
                              id="wd-unenroll-btn"
                              onClick={handleUnenrollClick(c)}
                            >
                              <FiXCircle size={14} />
                              Unenroll
                            </button>
                          ) : (
                            <button
                              className="btn btn-success btn-sm btn-premium"
                              id="wd-enroll-btn"
                              onClick={handleEnrollClick(c)}
                            >
                              <FiCheckCircle size={14} />
                              Enroll
                            </button>
                          )
                        ) : (
                          !!currentUser &&
                          !isStudent && (
                            <>
                              <button
                                id="wd-edit-course-click"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setCourse(c);
                                }}
                                className="btn btn-warning btn-sm btn-premium"
                              >
                                <FiEdit3 size={14} />
                                Edit
                              </button>
                              <button
                                className="btn btn-danger btn-sm btn-premium"
                                id="wd-delete-course-click"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  onDeleteCourse(c._id);
                                }}
                              >
                                <FiTrash2 size={14} />
                                Delete
                              </button>
                            </>
                          )
                        )}
                      </div>

                      <CardText
                        className="wd-dashboard-course-description overflow-hidden mb-3"
                        style={{ height: 48, lineHeight: 1.4, color: '#6c757d', fontSize: '0.9rem' }}
                      >
                        {c.description}
                      </CardText>

                      <span
                        className="d-inline-flex align-items-center justify-content-center"
                        style={{
                          width: 36,
                          height: 32,
                          borderRadius: 8,
                          border: "1px solid rgba(0,0,0,0.12)",
                          background: "#fff",
                          color: "#6c757d",
                        }}
                        aria-label="Go to course"
                      >
                        <span className="btn btn-primary btn-sm">Go</span>
                      </span>
                    </CardBody>
                  </Card>
                </Link>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}