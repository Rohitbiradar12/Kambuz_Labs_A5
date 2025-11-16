"use client";

import React, { useState } from "react";
import { FormControl, FormCheck } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER as string;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [moduleState, setModuleState] = useState({
    id: "M101",
    name: "Intro to React",
    description: "Getting started with components and props",
    course: "RS101",
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;
  const enc = (s: string) => encodeURIComponent(s ?? "");

  return (
    <div id="wd-working-with-objects" className="container-fluid p-0">
      
      <style>{`
        #wd-working-with-objects .page-title {
          font-size: 28px; font-weight: 800; letter-spacing: .2px; color:#111827;
        }
        #wd-working-with-objects .section-card {
          background: #fff; border: 1px solid rgba(2,6,23,.08);
          border-radius: 16px; box-shadow: 0 10px 30px rgba(2,6,23,.06);
        }
        #wd-working-with-objects .section-head {
          display:flex; align-items:center; justify-content:space-between;
          padding: 16px 18px; border-bottom: 1px solid rgba(2,6,23,.06);
          background: linear-gradient(180deg,#fafbff 0%, #fff 100%);
          border-top-left-radius: 16px; border-top-right-radius: 16px;
        }
        #wd-working-with-objects .section-title {
          margin:0; font-weight: 700; color:#0f172a; letter-spacing:.2px;
        }
        #wd-working-with-objects .section-body { padding: 16px 18px 18px; }
        #wd-working-with-objects .row-grid {
          display:grid; grid-template-columns: 1fr auto; gap: 12px; align-items:center;
        }
        #wd-working-with-objects .field-wide { max-width: 720px; }
        #wd-working-with-objects .btn-soft {
          background:#f8fafc; border:1px solid rgba(2,6,23,.08); color:#0f172a;
        }
        #wd-working-with-objects .btn-cta {
          background:#dc3545; border-color:#dc3545;
        }
        #wd-working-with-objects .toolbar {
          display:flex; gap:10px; flex-wrap:wrap; align-items:center;
        }
        #wd-working-with-objects .subtle {
          color:#6b7280; font-weight:600; text-transform:uppercase; letter-spacing:.08em; font-size:12px;
        }
        @media (max-width: 768px){
          #wd-working-with-objects .row-grid { grid-template-columns: 1fr; }
          #wd-working-with-objects .field-wide { max-width: 100%; }
        }
      `}</style>

      <div className="mb-3">
        <h3>Working With Objects</h3>
      </div>

      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary"
        href={`${HTTP_SERVER}/lab5/assignment`}
      >
        Get Assignment
      </a>
      <hr />
      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary"
        href={`${HTTP_SERVER}/lab5/assignment/title`}
      >
        Get Title
      </a>
      <hr />

      
      <div className="section-card mb-4">
        <div className="section-head">
          <h4 className="section-title m-0">
            Assignment – Modifying Properties
          </h4>
          <div className="toolbar">
            <a
              id="wd-update-assignment-title"
              className="btn btn-primary"
              href={`${ASSIGNMENT_API_URL}/title/${enc(assignment.title)}`}
            >
              Update Title
            </a>
          </div>
        </div>

        <div className="section-body">
          <div className="subtle mb-2">Title</div>
          <div className="row-grid field-wide mb-3">
            <FormControl
              id="wd-assignment-title"
              placeholder="assignment title"
              value={assignment.title}
              onChange={(e) =>
                setAssignment({ ...assignment, title: e.target.value })
              }
            />
          </div>

          <div className="subtle mb-2">Score & Completion</div>
          <div className="d-flex flex-wrap align-items-center gap-2">
            <a
              id="wd-update-assignment-score"
              className="btn btn-soft"
              href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
            >
              Update Score
            </a>
            <FormControl
              id="wd-assignment-score"
              className="mb-0"
              style={{ maxWidth: 140 }}
              type="number"
              value={assignment.score}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  score: Number(e.target.value) || 0,
                })
              }
            />

            <a
              id="wd-update-assignment-completed"
              className="btn btn-soft ms-2"
              href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
            >
              Update Completed
            </a>
            <FormCheck
              id="wd-assignment-completed"
              className="ms-1"
              type="checkbox"
              label="Completed?"
              checked={assignment.completed}
              onChange={(e) =>
                setAssignment({ ...assignment, completed: e.target.checked })
              }
            />
          </div>
        </div>
      </div>

      
      <div className="section-card">
        <div className="section-head">
          <h4 className="section-title m-0">Module – Get & Modify</h4>
          <div className="toolbar">
            <a
              id="wd-get-module"
              className="btn btn-soft"
              href={`${MODULE_API_URL}`}
            >
              Get Module
            </a>
            <a
              id="wd-get-module-name"
              className="btn btn-soft"
              href={`${MODULE_API_URL}/name`}
            >
              Get Module Name
            </a>
          </div>
        </div>

        <div className="section-body">
          <div className="subtle mb-2">Name</div>
          <div className="row-grid field-wide mb-3">
            <FormControl
              id="wd-module-name"
              placeholder="module name"
              value={moduleState.name}
              onChange={(e) =>
                setModuleState({ ...moduleState, name: e.target.value })
              }
            />
            <a
              id="wd-update-module-name"
              className="btn btn-primary"
              href={`${MODULE_API_URL}/name/${enc(moduleState.name)}`}
            >
              Update Name
            </a>
          </div>

          <div className="subtle mb-2">Description</div>
          <div className="row-grid field-wide">
            <FormControl
              as="textarea"
              rows={3}
              id="wd-module-description"
              placeholder="module description"
              value={moduleState.description}
              onChange={(e) =>
                setModuleState({ ...moduleState, description: e.target.value })
              }
            />
            <a
              id="wd-update-module-description"
              className="btn btn-outline-primary"
              href={`${MODULE_API_URL}/description/${enc(
                moduleState.description
              )}`}
            >
              Update Description
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
