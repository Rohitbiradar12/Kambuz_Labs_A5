"use client"
import React, { useEffect, useState } from "react";
import * as client from "./client";
import { FormControl } from "react-bootstrap";

type Assignment = {
  title: string;
  description: string;
  due: string;         
  completed: boolean;
};

export default function WorkingWithObjectsAsynchronously() {
  const [assignment, setAssignment] = useState<Assignment>({
    title: "",
    description: "",
    due: "",
    completed: false,
  });

  useEffect(() => {
    (async () => {
      const data = await client.fetchAssignment();
      setAssignment(assignment);
    })();
  }, []);

  const updateTitle = async (title: string) => {
    const updated = await client.updateTitle(title);
    setAssignment(updated);
  };

  return (
    <div id="wd-asynchronous-objects">
      <h3>Working with Objects Asynchronously</h3>
      <h4>Assignment</h4>

      <FormControl
        className="mb-2"
        value={assignment.title}
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
      />

      
      <FormControl
        as="textarea"
        rows={3}
        className="mb-2"
        value={assignment.description}
        onChange={(e) =>
          setAssignment({ ...assignment, description: e.target.value })
        }
      />

      <FormControl
        type="date"
        className="mb-2"
        value={assignment.due ? assignment.due.slice(0, 10) : ""}
        onChange={(e) => setAssignment({ ...assignment, due: e.target.value })}
      />

      <div className="form-check form-switch">
        <input
          id="wd-completed"
          className="form-check-input"
          type="checkbox"
          checked={assignment.completed}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        <label className="form-check-label" htmlFor="wd-completed">
          Completed
        </label>
      </div>

      <button
        className="btn btn-primary me-2"
        onClick={() => updateTitle(assignment.title)}
        disabled={!assignment.title.trim()}
      >
        Update Title
      </button>

      <pre>{JSON.stringify(assignment, null, 2)}</pre>
      <hr />
    </div>
  );
}
