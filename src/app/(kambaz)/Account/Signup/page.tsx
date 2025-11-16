"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { FormControl } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const dispatch = useDispatch();

  const signup = async () => {
    const currentUser = await client.signup(user);
    if (!currentUser) return;

    dispatch(setCurrentUser(currentUser));
    redirect("/Account/Profile");
  };

  return (
    <div
      className="container-fluid p-0 wd-signup-screen"
      style={{ paddingLeft: 0 }}
    >
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{ background: "linear-gradient(180deg, #f6f8fa 0%, #eef3ff 100%)" }}
      >
        <div className="w-100" style={{ maxWidth: 460 }}>
         
          <div className="text-center mb-4">
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-4 mb-2 shadow-sm"
              style={{
                width: 64,
                height: 64,
                background: "#e9f2ff",
                color: "#1a73e8",
                fontWeight: 800,
              }}
            >
              KZ
            </div>
            <h1 className="h3 mb-1">Create your Kambaz account</h1>
            <p className="text-secondary mb-0">It only takes a minute.</p>
          </div>

         
          <div className="card border-0 shadow rounded-4">
            <div className="card-body p-4 p-md-5">
            
              <label
                htmlFor="signup-username"
                className="form-label fw-semibold"
              >
                Username
              </label>
              <div className="input-group mb-3">
                <FormControl
                  id="signup-username"
                  placeholder="username"
                  className="border-start-0 wd-username"
                  value={user.username ?? ""}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                />
              </div>

             
              <label
                htmlFor="signup-password"
                className="form-label fw-semibold"
              >
                Password
              </label>
              <div className="input-group mb-3">
                <FormControl
                  id="signup-password"
                  type="password"
                  placeholder="password"
                  className="border-start-0 wd-password"
                  value={user.password ?? ""}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>

      
              <label
                htmlFor="signup-password-verify"
                className="form-label fw-semibold"
              >
                Verify password
              </label>
              <div className="input-group mb-4">
                <FormControl
                  id="signup-password-verify"
                  type="password"
                  placeholder="verify password"
                  className="border-start-0 wd-password-verify"
                  value={user.verifyPassword ?? ""}
                  onChange={(e) =>
                    setUser({ ...user, verifyPassword: e.target.value })
                  }
                />
              </div>

      
              <div className="row">
                <div className="col-md-6">
                  <label
                    htmlFor="signup-firstname"
                    className="form-label fw-semibold"
                  >
                    First name
                  </label>
                  <FormControl
                    id="signup-firstname"
                    placeholder="First name"
                    className="mb-3"
                    value={user.firstName ?? ""}
                    onChange={(e) =>
                      setUser({ ...user, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="signup-lastname"
                    className="form-label fw-semibold"
                  >
                    Last name
                  </label>
                  <FormControl
                    id="signup-lastname"
                    placeholder="Last name"
                    className="mb-3"
                    value={user.lastName ?? ""}
                    onChange={(e) =>
                      setUser({ ...user, lastName: e.target.value })
                    }
                  />
                </div>
              </div>

         
              <div className="row">
                <div className="col-md-6">
                  <label
                    htmlFor="signup-dob"
                    className="form-label fw-semibold"
                  >
                    Date of birth
                  </label>
                  <FormControl
                    id="signup-dob"
                    type="date"
                    className="mb-3"
                    value={user.dob ?? ""}
                    onChange={(e) =>
                      setUser({ ...user, dob: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="signup-email"
                    className="form-label fw-semibold"
                  >
                    Email
                  </label>
                  <FormControl
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    className="mb-3"
                    value={user.email ?? ""}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>
              </div>

{/*            
              <label
                htmlFor="signup-role"
                className="form-label fw-semibold"
              >
                Role
              </label>
              <select
                id="signup-role"
                className="form-select mb-4"
                value={user.role ?? "STUDENT"}
                onChange={(e) =>
                  setUser({ ...user, role: e.target.value })
                }
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
              </select> */}

            
              <button
                type="button"
                id="wd-signup-btn"
                onClick={signup}
                className="wd-signup-btn btn btn-primary w-100 py-2 fw-semibold"
                style={{ background: "#1a73e8" }}
              >
                Sign up
              </button>
            </div>
          </div>

    
          <div className="text-center mt-3">
            <span className="text-secondary me-1">
              Already have an account?
            </span>
            <Link
              href="/Account/Signin"
              className="fw-semibold text-decoration-none wd-signin-link"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
