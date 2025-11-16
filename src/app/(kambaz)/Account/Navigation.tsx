"use client";

import Link from "next/link";
import { ListGroup } from "react-bootstrap";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
  const pathname = usePathname();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const links = currentUser
    ? [{ href: "/Account/Profile", label: "Profile" }]
    : [
        { href: "/Account/Signin", label: "Signin" },
        { href: "/Account/Signup", label: "Signup" },
      ];

  return (
    <ListGroup id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`list-group-item border-0 ${
            isActive(href) ? "active" : "text-danger"
          }`}
        >
          {label}
        </Link>
      ))}
    </ListGroup>
  );
}
