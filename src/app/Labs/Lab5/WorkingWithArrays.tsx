"use client";
import React, { useState } from "react";
import { FormCheck, FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function WorkingWithArrays() {
  const API = `${HTTP_SERVER}/lab5/todos`;
  const [todo, setTodo] = useState({
    id: "1",
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });
  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>
      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
        Get Todos{" "}
      </a>
      <hr />
      <h4>Retrieving an Item from an Array by ID</h4>
      <a
        id="wd-retrieve-todo-by-id"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}`}
      >
        Get Todo by ID
      </a>
      <FormControl
        id="wd-todo-id"
        defaultValue={todo.id}
        className="w-50"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />
      <h3>Filtering Array Items</h3>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary"
        href={`${API}?completed=true`}
      >
        Get Completed Todos
      </a>
      <hr />
      <h3>Creating new Items in an Array</h3>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary"
        href={`${API}/create`}
      >
        Create Todo
      </a>
      <hr />
      <h3>Removing from an Array</h3>
      <a
        id="wd-remove-todo"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}/delete`}
      >
        Remove Todo with ID = {todo.id}{" "}
      </a>
      <FormControl
        defaultValue={todo.id}
        className="w-50"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />
      <h3>Updating an Item in an Array</h3>
      <a
        href={`${API}/${todo.id}/title/${todo.title}`}
        className="btn btn-primary float-end"
      >
        Update Todo
      </a>
      <FormControl
        defaultValue={todo.id}
        className="w-25 float-start me-2"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <FormControl
        defaultValue={todo.title}
        className="w-50 float-start"
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <br />
      <br />
      <hr />
      
      <style>{`
        .card-elevated {
          border: 1px solid rgba(2, 6, 23, 0.08);
          background: #ffffff;
          border-radius: 14px;
          box-shadow: 0 6px 24px rgba(2, 6, 23, 0.08);
        }
        .card-header-lite {
          background: linear-gradient(180deg,#f7f9fc 0%,#f4f6fb 100%);
          border-bottom: 1px solid rgba(2, 6, 23, 0.06);
          padding: 14px 16px;
          border-top-left-radius: 14px;
          border-top-right-radius: 14px;
        }
        .card-body {
          padding: 16px;
        }
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px;
          align-items: center;
        }
        .stack-sm { display: grid; gap: 8px; }
        .btn-ghost {
          background: #f8fafc;
          border: 1px solid rgba(2,6,23,.08);
          color: #0f172a;
        }
        .btn-ghost:hover { background: #f1f5f9; }
        @media (max-width: 768px) {
          .grid-2 { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="card-elevated mb-4">
        <div className="card-header-lite">
          <h4 className="m-0">Edit Description &amp; Completed</h4>
        </div>
        <div className="card-body stack-sm">
          
          <div className="grid-2">
            <FormControl
              id="wd-todo-description"
              placeholder="Description"
              value={todo.description}
              onChange={(e) =>
                setTodo({ ...todo, description: e.target.value })
              }
            />
            <a
              id="wd-update-todo-description"
              className="btn btn-secondary"
              href={`${API}/${todo.id}/description/${encodeURIComponent(
                todo.description
              )}`}
            >
              Describe Todo ID = {todo.id}
            </a>
          </div>

          
          <div className="grid-2">
            <div>
              <FormCheck
                id="wd-todo-completed"
                type="checkbox"
                label="Completed?"
                checked={todo.completed}
                onChange={(e) =>
                  setTodo({ ...todo, completed: e.target.checked })
                }
              />
            </div>
            <a
              id="wd-update-todo-completed"
              className="btn btn-outline-success"
              href={`${API}/${todo.id}/completed/${todo.completed}`}
            >
              Complete Todo ID = {todo.id}
            </a>
          </div>
        </div>
      </div>
      <hr/>
    </div>
  );
}
