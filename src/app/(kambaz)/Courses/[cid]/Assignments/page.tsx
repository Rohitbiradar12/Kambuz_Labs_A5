"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, ListGroup, Badge, Modal } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import {
  FaPlus,
  FaGripVertical,
  FaCheckCircle,
  FaEllipsisV,
  FaChevronDown,
  FaTrash,
  FaPencilAlt,
} from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  deleteAssignment as deleteAssignmentAction,
  setAssignments,
  type Assignment,
} from "../Assignments/reducer";
import * as client from "./client";

function fmtDateTime(dt: string) {
  const d = new Date(dt);
  const month = d.toLocaleString("en-US", { month: "short" });
  const day = d.getDate();
  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;
  return `${month} ${day} at ${hours}:${minutes} ${ampm}`;
}

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((s: RootState) => s.assignmentsReducer);
  const { currentUser } = useSelector((s: RootState) => s.accountReducer);
  const isStudent = currentUser?.role === "STUDENT";

  const courseAssignments = assignments.filter((a) => a.course === cid);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const askDelete = (id: string) => {
    setPendingDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (pendingDeleteId) {
      await client.deleteAssignment(pendingDeleteId);
      dispatch(deleteAssignmentAction(pendingDeleteId));
    }
    setConfirmOpen(false);
    setPendingDeleteId(null);
  };

  const cancelDelete = () => {
    setConfirmOpen(false);
    setPendingDeleteId(null);
  };

  const fetchAssignments = async () => {
    if (!cid) return;
    const serverAssignments: Assignment[] = await client.findAssignmentsForCourse(
      String(cid)
    );
    dispatch(setAssignments(serverAssignments));
  };

  useEffect(() => {
    fetchAssignments();

  }, [cid]);

  return (
    <div id="wd-assignments" className="pt-2">

      <div className="d-flex align-items-center gap-2 mb-3">
        <div className="flex-grow-1 position-relative">
          <BiSearch
            className="position-absolute top-50 translate-middle-y ms-2 text-secondary"
            size={18}
          />
          <input
            type="text"
            id="wd-search-assignment"
            placeholder="Search..."
            className="form-control ps-5 shadow-sm"
          />
        </div>

        {!isStudent && (
          <>
            <button
              id="wd-add-assignment-group"
              className="btn btn-secondary px-3"
            >
              + Group
            </button>
            <button
              id="wd-add-assignment"
              className="btn btn-danger px-3"
              onClick={() =>
                router.push(`/Courses/${cid}/Assignments/new`)
              }
            >
              + Assignment
            </button>
          </>
        )}
      </div>

      <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between border rounded-1 bg-light px-2 py-2 mb-2">
        <div className="d-flex align-items-center gap-2 mb-2 mb-md-0">
          <FaGripVertical className="text-secondary" />
          <button
            type="button"
            className="btn btn-link link-dark text-decoration-none p-0 d-inline-flex align-items-center"
            aria-expanded="true"
            aria-label="Toggle assignments section"
          >
            <FaChevronDown className="me-2" />
            <span className="fw-semibold text-uppercase">Assignments</span>
          </button>
        </div>

        <div className="d-flex align-items-center gap-2">
          <Badge
            bg="light"
            text="dark"
            className="border rounded-pill px-3 py-2"
          >
            40% of Total
          </Badge>
          <Button size="sm" variant="light" className="border">
            <FaPlus />
          </Button>
          <Button size="sm" variant="light" className="border">
            <FaEllipsisV />
          </Button>
        </div>
      </div>

      <ListGroup id="wd-assignment-list" className="rounded-0">
        {courseAssignments.map((a) => (
          <AssignmentRow
            key={a._id}
            href={`/Courses/${cid}/Assignments/${a._id}`}
            title={a.title}
            subTop="Multiple Modules"
            subMidStrong="Available from"
            subMidTail={` ${fmtDateTime(a.available)}`}
            subBot={`Due ${fmtDateTime(a.due)} | ${a.points} pts`}
            canManage={!isStudent}
            onEdit={() =>
              router.push(`/Courses/${cid}/Assignments/${a._id}`)
            }
            onDelete={() => askDelete(a._id)}
          />
        ))}
      </ListGroup>

      <Modal show={confirmOpen} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete assignment?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This action cannot be undone. Are you sure you want to delete this
          assignment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button
            variant="danger"
            id="wd-confirm-delete"
            onClick={confirmDelete}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

function AssignmentRow({
  href,
  title,
  subTop,
  subMidStrong,
  subMidTail,
  subBot,
  canManage,
  onEdit,
  onDelete,
}: {
  href: string;
  title: string;
  subTop: string;
  subMidStrong: string;
  subMidTail: string;
  subBot: string;
  canManage: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <ListGroup.Item className="p-0 border-0">
      <div className="d-flex align-items-stretch border-top border-bottom bg-white">
        <div
          className="d-flex align-items-center"
          style={{ borderLeft: "3px solid #198754" }}
          aria-hidden
        >
          <FaGripVertical className="text-secondary ms-2 me-2" />
        </div>

        <div className="flex-grow-1 py-3 px-3">
          <div className="d-flex flex-column flex-sm-row align-items-start justify-content-between gap-3">
            <div className="min-w-0">
              <div
                className="d-inline-flex align-items-center mb-1"
                style={{ fontSize: 18 }}
              >
                <MdAssignment className="me-2 fs-5 text-secondary" aria-hidden />
                <Link
                  href={href}
                  className="fw-semibold text-decoration-none text-dark d-inline-block"
                  style={{ fontSize: 18 }}
                >
                  {title}
                </Link>
              </div>

              <div className="small text-wrap">
                <span className="text-danger fw-semibold">{subTop}</span>
                <span className="text-muted"> | </span>
                <span className="text-muted">
                  <strong>{subMidStrong}</strong>
                  {subMidTail}
                </span>
              </div>
              <div className="small text-muted">{subBot}</div>
            </div>

            <div className="d-flex align-items-center gap-3 ms-sm-3">
              <FaCheckCircle className="text-success" title="Published" />
              {canManage ? (
                <>
                  <button
                    type="button"
                    className="btn btn-light btn-sm border"
                    onClick={onEdit}
                    aria-label="Edit assignment"
                    title="Edit"
                  >
                    <FaPencilAlt className="text-primary" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-light btn-sm border"
                    onClick={onDelete}
                    aria-label="Delete assignment"
                    title="Delete"
                  >
                    <FaTrash className="text-danger" />
                  </button>
                </>
              ) : (
                <FaEllipsisV
                  className="text-secondary"
                  role="img"
                  aria-label="More options"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </ListGroup.Item>
  );
}
