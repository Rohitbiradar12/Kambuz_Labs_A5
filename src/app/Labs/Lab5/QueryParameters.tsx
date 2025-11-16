"use client";

import { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "";

export default function QueryParameters() {
  const [a, setA] = useState<string>("34");
  const [b, setB] = useState<string>("23");

  const base = HTTP_SERVER || "#";

  return (
    <div id="wd-query-parameters">
      <h3>Query Parameters</h3>

      <FormControl
        id="wd-query-parameter-a"
        className="mb-2"
        type="number"
        value={a}
        onChange={(e) => setA(e.target.value)}
      />
      <FormControl
        id="wd-query-parameter-b"
        className="mb-2"
        type="number"
        value={b}
        onChange={(e) => setB(e.target.value)}
      />

      <a
        id="wd-query-parameter-add"
        className="btn btn-primary me-2"
        href={`${base}/lab5/calculator?operation=add&a=${encodeURIComponent(
          a
        )}&b=${encodeURIComponent(b)}`}
      >
        Add {a} + {b}
      </a>

      <a
        id="wd-query-parameter-subtract"
        className="btn btn-danger me-2"
        href={`${base}/lab5/calculator?operation=subtract&a=${encodeURIComponent(
          a
        )}&b=${encodeURIComponent(b)}`}
      >
        Subtract {a} - {b}
      </a>

      <a
        id="wd-query-parameter-multiply"
        className="btn btn-success me-2"
        href={`${base}/lab5/calculator?operation=multiply&a=${encodeURIComponent(
          a
        )}&b=${encodeURIComponent(b)}`}
      >
        Multiply {a} × {b}
      </a>

      <a
        id="wd-query-parameter-divide"
        className="btn btn-warning"
        href={`${base}/lab5/calculator?operation=divide&a=${encodeURIComponent(
          a
        )}&b=${encodeURIComponent(b)}`}
      >
        Divide {a} ÷ {b}
      </a>

      <hr />
    </div>
  );
}
