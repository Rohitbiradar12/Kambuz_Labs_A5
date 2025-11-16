"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

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

  const isStudent = currentUser?.role === "STUDENT" || currentUser?.role === "USER";

  const [showEnrollmentsOnly, setShowEnrollmentsOnly] = useState(false);

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
      `}</style>

      <div className="container-fluid px-2">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <hr />

        <div className="d-flex align-items-center mb-2">
          {!!currentUser && !isStudent && <h5 className="m-0">New Course</h5>}
          <div className="ms-auto d-inline-flex gap-2">
            {!!currentUser && isStudent && (
              <button
                className="btn btn-primary"
                onClick={() => setShowEnrollmentsOnly((prev) => !prev)}
                id="wd-enrollments-toggle"
              >
                {showEnrollmentsOnly ? "All Courses" : "Enrollments"}
              </button>
            )}
          </div>
        </div>

        {!!currentUser && !isStudent && (
          <>
            <FormControl
              className="mb-2"
              placeholder="New Course"
              value={course.name ?? ""}
              onChange={(e) => setCourse({ ...course, name: e.target.value })}
            />
            <FormControl
              className="mb-2"
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
                  className="btn btn-warning"
                  id="wd-update-course-click"
                  onClick={onUpdateCourse}
                >
                  Update
                </button>

                <button
                  className="btn btn-primary"
                  id="wd-add-new-course-click"
                  onClick={onAddNewCourse}
                >
                  Add
                </button>
              </span>
            </h5>
          </>
        )}

        <hr />
        <h2 id="wd-dashboard-published">
          {currentUser
            ? `My Courses (${visibleCourses.length})`
            : "My Courses (0)"}
        </h2>
        <hr />

        {!currentUser && (
          <div className="alert alert-light border" role="alert">
            Login to see the courses.
          </div>
        )}

        <Row className="g-4">
          {visibleCourses.map((c) => {
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
                  <Card className="h-100 shadow-sm position-relative">
                    <CardImg
                      variant="top"
                      src={c.image}
                      alt={`${code ?? ""} thumbnail`}
                      style={{
                        width: "100%",
                        height: 160,
                        objectFit: "cover",
                        borderTopLeftRadius: 6,
                        borderTopRightRadius: 6,
                      }}
                    />

                    <CardBody style={{ minHeight: 130 }}>
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {code ? `${code} ` : ""}
                        {title}
                      </CardTitle>

                      <div className="position-absolute end-0 bottom-0 m-3 d-flex gap-2">
                        {currentUser && isStudent ? (
                          enrolled ? (
                            <button
                              className="btn btn-danger btn-sm"
                              id="wd-unenroll-btn"
                              onClick={handleUnenrollClick(c)}
                            >
                              Unenroll
                            </button>
                          ) : (
                            <button
                              className="btn btn-success btn-sm"
                              id="wd-enroll-btn"
                              onClick={handleEnrollClick(c)}
                            >
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
                                className="btn btn-warning btn-sm"
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                id="wd-delete-course-click"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  onDeleteCourse(c._id);
                                }}
                              >
                                Delete
                              </button>
                            </>
                          )
                        )}
                      </div>

                      <CardText
                        className="wd-dashboard-course-description overflow-hidden mb-3"
                        style={{ height: 48, lineHeight: 1.4 }}
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
