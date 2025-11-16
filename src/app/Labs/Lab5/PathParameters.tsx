"use client";

import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "";

export default function PathParameters() {
  const [a, setA] = useState<string>("34");
  const [b, setB] = useState<string>("23");

  const base = HTTP_SERVER || "#";
  const A = encodeURIComponent(a);
  const B = encodeURIComponent(b);

  return (
    <div id="wd-path-parameters">
      <h3>Path Parameters</h3>

      <FormControl
        className="mb-2"
        id="wd-path-parameter-a"
        type="number"
        value={a}
        onChange={(e) => setA(e.target.value)}
      />
      <FormControl
        className="mb-2"
        id="wd-path-parameter-b"
        type="number"
        value={b}
        onChange={(e) => setB(e.target.value)}
      />

      <a
        className="btn btn-primary me-2"
        id="wd-path-parameter-add"
        href={`${base}/lab5/add/${A}/${B}`}
      >
        Add {a} + {b}
      </a>

      <a
        className="btn btn-danger me-2"
        id="wd-path-parameter-subtract"
        href={`${base}/lab5/subtract/${A}/${B}`}
      >
        Subtract {a} - {b}
      </a>

      <a
        className="btn btn-success me-2"
        id="wd-path-parameter-multiply"
        href={`${base}/lab5/multiply/${A}/${B}`}
      >
        Multiply {a} × {b}
      </a>

      <a
        className="btn btn-warning"
        id="wd-path-parameter-divide"
        href={`${base}/lab5/divide/${A}/${B}`}
      >
        Divide {a} ÷ {b}
      </a>

      <hr />
    </div>
  );
}
