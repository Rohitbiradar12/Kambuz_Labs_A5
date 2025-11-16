"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

export default function Signin() {
  const [credentials, setCredentials] = useState<{ username?: string; password?: string }>({});
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const signin = async () => {
    try {
      setError(null); 
      const user = await client.signin(credentials);
      if (!user) {
        return;
      }
      dispatch(setCurrentUser(user));
      router.push("/Dashboard");
    } catch (e: any) {
      console.error("Signin failed", e);
      const message =
        e?.response?.data?.message ||
        "Unable to login. Please check your username and password and try again.";
      setError(message);
    }
  };

  const useCreds = (username: string, password: string) =>
    setCredentials({ username, password });

  return (
    <div className="container-fluid p-0" style={{ paddingLeft: 0 }}>
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{ background: "linear-gradient(180deg, #f6f8fa 0%, #eef3ff 100%)" }}
      >
        <div className="w-100" style={{ maxWidth: 420 }}>
          <div className="text-center mb-4">
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-4 mb-2 shadow-sm"
              style={{ width: 64, height: 64, background: "#e9f2ff", color: "#1a73e8", fontWeight: 800 }}
            >
              KZ
            </div>
            <h1 className="h3 mb-1">Sign in to Kambaz</h1>
            <p className="text-secondary mb-0">Welcome back! Please enter your details.</p>
          </div>

          <div className="card border-0 shadow rounded-4">
            <div className="card-body p-4 p-md-5">
              <label htmlFor="wd-username" className="form-label fw-semibold">
                Username
              </label>
              <div className="input-group mb-3">
                <FormControl
                  id="wd-username"
                  placeholder="username"
                  className="border-start-0"
                  value={credentials.username ?? ""}
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                />
              </div>

              <label htmlFor="wd-password" className="form-label fw-semibold">
                Password
              </label>
              <div className="input-group mb-3">
                <FormControl
                  id="wd-password"
                  placeholder="password"
                  type="password"
                  className="border-start-0"
                  value={credentials.password ?? ""}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                />
              </div>

              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="remember" />
                  <label className="form-check-label text-secondary" htmlFor="remember">
                    Remember me
                  </label>
                </div>
                <span className="small text-secondary">Forgot password?</span>
              </div>

              <Button
                id="wd-signin-btn"
                className="w-100 py-2 fw-semibold"
                onClick={signin}
                style={{ background: "#1a73e8" }}
              >
                Sign in
              </Button>

             
              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}

              <div className="mt-4">
                <div className="small text-secondary fw-semibold mb-2">Sample accounts</div>

                <div className="border rounded-3 p-3 mb-2 bg-light">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="small">
                      <div><strong>Student</strong></div>
                      <div><code>"username": "thor_odinson"</code></div>
                      <div><code>"password": "mjolnir123"</code></div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => useCreds("thor_odinson", "mjolnir123")}
                    >
                      Use
                    </button>
                  </div>
                </div>

                <div className="border rounded-3 p-3 bg-light">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="small">
                      <div><strong>Faculty</strong></div>
                      <div><code>"username": "iron_man"</code></div>
                      <div><code>"password": "stark123"</code></div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => useCreds("iron_man", "stark123")}
                    >
                      Use
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-3">
            <span className="text-secondary me-1">New to Kambaz?</span>
            <Link id="wd-signup-link" href="/Account/Signup" className="fw-semibold text-decoration-none">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
