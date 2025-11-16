"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);

  const addElement = () => {
    setArray((prev) => [...prev, Math.floor(Math.random() * 100)]);
  };

  const deleteElement = (index: number) => {
    setArray((prev) => prev.filter((_, i) => i !== index));
  };

  const { todos } = useSelector((state: any) => state.todosReducer);

  return (
    <div id="wd-array-state-variables">
      <h2 className="mb-2">Array State Variable</h2>

      <button className="btn btn-success mb-3" onClick={addElement}>
        Add Element
      </button>

      <ul className="list-group mb-4">
        {array.map((item, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span className="fs-3 me-3">{item}</span>
            <button
              className="btn btn-danger px-3"
              onClick={() => deleteElement(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <h3 className="mb-2">Todos from Redux</h3>
      <ListGroup>
        {todos.map((todo: any) => (
          <ListGroupItem key={todo.id}>{todo.title}</ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
