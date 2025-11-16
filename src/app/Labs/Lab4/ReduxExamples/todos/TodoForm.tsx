"use client";
import { Button, FormControl, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

type Todo = { id?: string; title: string };
type Root = { todosReducer: { todo: Todo; todos: Todo[] } };

export default function TodoForm() {
  const { todo } = useSelector((state: Root) => state.todosReducer);
  const dispatch = useDispatch();

  return (
    <ListGroupItem className="d-flex align-items-center justify-content-between">
      <FormControl
        className="me-3"
        style={{ flex: "1 1 auto", maxWidth: 360 }}
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
      />
      <div className="d-flex gap-2">
        <Button
          variant="warning"
          size="sm"
          onClick={() => dispatch(updateTodo(todo))}
          id="wd-update-todo-click"
        >
          Update
        </Button>
        <Button
          variant="success"
          size="sm"
          onClick={() => dispatch(addTodo(todo))}
          id="wd-add-todo-click"
        >
          Add
        </Button>
      </div>
    </ListGroupItem>
  );
}
