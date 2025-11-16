"use client";

import { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";

export default function DateStateVariable() {
  const [startDate, setStartDate] = useState<Date | null>(null);

  useEffect(() => {
    setStartDate(new Date());
  }, []);

  const toHtmlDate = (d: Date) => d.toISOString().slice(0, 10);

  return (
    <div id="wd-date-state-variables">
      <h2>Date State Variables</h2>

      {startDate && (
        <>
          <h3>{toHtmlDate(startDate)}</h3>

          <FormControl
            type="date"
            value={toHtmlDate(startDate)}
            onChange={(e) => setStartDate(new Date(e.target.value))}
          />
        </>
      )}

      <hr />
    </div>
  );
}
