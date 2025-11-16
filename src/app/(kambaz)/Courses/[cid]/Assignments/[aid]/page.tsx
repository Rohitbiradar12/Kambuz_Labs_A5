"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import {
  type Assignment,
  setAssignments,
} from "../../Assignments/reducer";
import * as client from "../../Assignments/client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((s: RootState) => s.assignmentsReducer);

  const isNew = aid === "new";
  const existing = useMemo(
    () => assignments.find((a) => a._id === aid),
    [assignments, aid]
  );

  const [form, setForm] = useState<Assignment>({
    _id: existing?._id ?? "new",
    course: String(cid),
    title: existing?.title ?? "",
    description: existing?.description ?? "",
    points: existing?.points ?? 100,
    due: existing?.due ?? new Date().toISOString().slice(0, 16),
    available: existing?.available ?? new Date().toISOString().slice(0, 16),
    until:
      existing?.until ??
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 16),
  });

  const [errors, setErrors] = useState<{ title?: string }>({});

  useEffect(() => {
    if (!isNew && !existing) {
      router.replace(`/Courses/${cid}/Assignments`);
    }
  }, [existing, isNew, cid, router]);

  const save = async () => {
    if (!form.title.trim()) {
      setErrors({ title: "Assignment name is mandatory." });

      const el = document.getElementById("wd-name") as HTMLInputElement | null;
      el?.focus();
      return;
    }

    const payload: Assignment = { ...form, course: String(cid) };

    if (isNew) {
      const { _id, ...noId } = payload;
      const created = await client.createAssignmentForCourse(
        String(cid),
        noId
      );
      dispatch(setAssignments([...assignments, created]));
    } else {
      await client.updateAssignment(payload);
      dispatch(
        setAssignments(
          assignments.map((a) => (a._id === payload._id ? payload : a))
        )
      );
    }

    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div
      id="wd-assignments-editor"
      style={{ padding: "16px 24px", maxWidth: 960, margin: "0 auto" }}
    >
      <style>{`
        :root { --label-col: 220px; --field-col: 560px; }
        .form-row { display: grid; grid-template-columns: var(--label-col) var(--field-col); align-items: start; column-gap: 12px; row-gap: 12px; }
        .row-span > .span-full { grid-column: 1 / -1; width: 100%; }
        .row-label { text-align: right; font-weight: 400; margin: 0; line-height: 1.2; color:#111; }
        .row-label.left { text-align: left; }
        .field-col { display: flex; align-items: center; }
        .panel { width: 100%; border: 1px solid rgba(0,0,0,0.1); border-radius: 6px; background: #fff; padding: 12px; box-sizing: border-box; }
        .panel-muted { background: #f6f7f8; }
        .stacked { display: flex; flex-direction: column; gap: 6px; }
        .two-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 100%; }
        .actions { display: flex; justify-content: flex-end; gap: 8px; }
        .plain-field { width: 100%; }
        .panel .form-control, .panel .form-select, .panel input[type="text"], .panel input[type="number"], .panel input[type="datetime-local"], .panel select { width: 100%; }

        .invalid-feedback { display:block; color:#dc3545; font-size:.875rem; margin-top:6px; }
        .is-invalid { border-color:#dc3545 !important; }

        @media (max-width: 992px) {
          #wd-assignments-editor { padding-left: 16px; padding-right: 16px; }
          :root{ --label-col: clamp(140px, 22vw, 200px); --field-col: minmax(0, 1fr); }
          .form-row { grid-template-columns: var(--label-col) 1fr; }
        }
        @media (max-width: 768px) {
          .form-row { grid-template-columns: 1fr; }
          .row-label { text-align: left; }
          .two-cols { grid-template-columns: 1fr; }
          .actions { justify-content: stretch; gap: 10px; }
          .actions .btn { flex: 1; }
        }
      `}</style>

      <div className="form-row row-span mb-3">
        <div className="span-full">
          <div className="stacked">
            <label htmlFor="wd-name" className="row-label left">
              Assignment Name
            </label>
            <input
              id="wd-name"
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              value={form.title}
              onChange={(e) => {
                setForm({ ...form, title: e.target.value });

                if (errors.title)
                  setErrors((prev) => ({ ...prev, title: undefined }));
              }}
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? "wd-name-error" : undefined}
            />
            {errors.title && (
              <div id="wd-name-error" className="invalid-feedback">
                {errors.title}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="form-row row-span mb-3">
        <div className="span-full">
          <div className="panel panel-muted">
            <p style={{ marginBottom: 8 }}>
              The assignment is <span className="text-danger">available online</span>.
            </p>
            <textarea
              className="form-control"
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      <div className="form-row mb-3">
        <label htmlFor="wd-points" className="row-label">Points</label>
        <div className="field-col">
          <input
            id="wd-points"
            type="number"
            className="form-control"
            value={form.points}
            onChange={(e) =>
              setForm({ ...form, points: Number(e.target.value) || 0 })
            }
          />
        </div>
      </div>

      <div className="form-row mb-3">
        <label htmlFor="wd-group" className="row-label">Assignment Group</label>
        <div className="field-col">
          <select id="wd-group" defaultValue="ASSIGNMENTS" className="form-select">
            <option>ASSIGNMENTS</option>
            <option>QUIZZES</option>
            <option>EXAMS</option>
            <option>PROJECT</option>
          </select>
        </div>
      </div>

      <div className="form-row mb-3">
        <label className="row-label">Submission Type</label>
        <div className="field-col">
          <div className="panel">
            <select id="wd-submission-type" defaultValue="Online" className="form-select mb-2">
              <option>Online</option>
              <option>On Paper</option>
              <option>External Tool</option>
            </select>

            <div className="stacked">
              <div className="fw-semibold">Online Entry Options</div>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="wd-text-entry" />
                <label className="form-check-label" htmlFor="wd-text-entry">
                  Text Entry
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="wd-website-url" defaultChecked />
                <label className="form-check-label" htmlFor="wd-website-url">
                  Website URL
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="form-row mb-3">
        <label className="row-label">Assign</label>
        <div className="field-col">
          <div className="panel">
            <div className="stacked mb-3">
              <label htmlFor="wd-assign-to" className="fw-semibold">Assign to</label>
              <input id="wd-assign-to" defaultValue="Everyone" className="form-control" />
            </div>

            <div className="stacked mb-3">
              <label htmlFor="wd-due-date" className="fw-semibold">Due</label>
              <input
                type="datetime-local"
                id="wd-due-date"
                className="form-control"
                value={form.due}
                onChange={(e) => setForm({ ...form, due: e.target.value })}
              />
            </div>

            <div className="two-cols">
              <div className="stacked">
                <label htmlFor="wd-available-from" className="fw-semibold">Available from</label>
                <input
                  type="datetime-local"
                  id="wd-available-from"
                  className="form-control"
                  value={form.available}
                  onChange={(e) => setForm({ ...form, available: e.target.value })}
                />
              </div>
              <div className="stacked">
                <label htmlFor="wd-available-until" className="fw-semibold">Until</label>
                <input
                  type="datetime-local"
                  id="wd-available-until"
                  className="form-control"
                  value={form.until}
                  onChange={(e) => setForm({ ...form, until: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div className="actions mt-3">
        <Link href={`/Courses/${cid}/Assignments`} className="btn btn-light">
          Cancel
        </Link>
        <button className="btn btn-danger" onClick={save}>
          Save
        </button>
      </div>
    </div>
  );
}
