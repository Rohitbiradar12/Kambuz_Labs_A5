"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function Breadcrumb({
  course,
}: {
  course: { name: string } | undefined;
}) {
  const pathname = usePathname();

  const assignment = pathname.includes("Assignments/");
  return (
    <span>
      {course?.name} &gt;{assignment ? `Assignments >` : ""}{" "}
      {pathname.split("/").pop()}
    </span>
  );
}