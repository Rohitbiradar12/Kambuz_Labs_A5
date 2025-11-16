"use client";
import React, { useState, useEffect } from "react";
import * as client from "./client";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaTrash } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { FaPencil } from "react-icons/fa6";

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<any[]>([]);

  const editTodo = (todo: any) => {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...t, editing: true } : { ...t, editing: false }
    );
    setTodos(updatedTodos);
  };

  const [errorMessage, setErrorMessage] = useState(null);
  const updateTodo = async (todo: any) => {
    try {
      await client.updateTodo(todo);
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? { ...todo } : t)));
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  const createNewTodo = async () => {
    const todos = await client.createNewTodo();
    setTodos(todos);
  };

  const fetchTodos = async () => {
    const todos = await client.fetchTodos();
    setTodos(todos);
  };

  const removeTodo = async (todo: any) => {
    const updatedTodos = await client.removeTodo(todo);
    setTodos(updatedTodos);
  };

  const deleteTodo = async (todo: any) => {
    try {
      await client.deleteTodo(todo);
      const newTodos = todos.filter((t) => t.id !== todo.id);
      setTodos(newTodos);
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };

  const postNewTodo = async () => {
    const newTodo = await client.postNewTodo({
      title: "New Posted Todo",
      completed: false,
    });
    setTodos((prev) => [...prev, newTodo]);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>
      {errorMessage && (
        <div
          id="wd-todo-error-message"
          className="alert alert-danger mb-2 mt-2"
        >
          {errorMessage}
        </div>
      )}
      <h4>
        Todos
        <FaPlusCircle
          onClick={createNewTodo}
          className="text-success float-end fs-3"
        />
        <FaPlusCircle
          onClick={postNewTodo}
          className="text-primary float-end fs-3 me-3"
          id="wd-post-todo"
        />
      </h4>

      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id} className="d-flex align-items-center">

            <div className="d-flex align-items-center flex-grow-1">
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={!!todo.completed}
                onChange={(e) =>
                  updateTodo({ ...todo, completed: e.target.checked })
                }
              />

              {!todo.editing ? (
                <span
                  className={
                    todo.completed
                      ? "text-decoration-line-through text-muted"
                      : ""
                  }
                >
                  {todo.title}
                </span>
              ) : (
                <FormControl
                  className="w-50"
                  value={todo.title}
                  autoFocus
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    setTodos((prev) =>
                      prev.map((t) =>
                        t.id === todo.id ? { ...t, title: newTitle } : t
                      )
                    );
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateTodo({
                        ...todo,
                        title: (e.target as HTMLInputElement).value,
                        editing: false,
                      });
                    }
                  }}
                />
              )}
            </div>

            <div className="ms-2">
              <FaTrash
                onClick={() => removeTodo(todo)}
                className="text-danger mt-1 me-2"
                id="wd-remove-todo"
                style={{ cursor: "pointer" }}
              />
              <TiDelete
                onClick={() => deleteTodo(todo)}
                className="text-danger fs-3 me-2"
                id="wd-delete-todo"
                style={{ cursor: "pointer" }}
              />
              <FaPencil
                onClick={() => editTodo(todo)}
                className="text-primary mt-1"
                style={{ cursor: "pointer" }}
              />
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
