"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { setCurrentUser } from "../reducer";
import * as client from "../client";
import { FaSave, FaSignOutAlt } from "react-icons/fa";

export default function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: any) => state.accountReducer.currentUser
  );

  const [profile, setProfile] = useState<any>({});
  const [pending, setPending] = useState(true);

 
  useEffect(() => {
    const load = async () => {
      try {
        const u = await client.profile();
        dispatch(setCurrentUser(u));
        setProfile(u);
      } catch {
        dispatch(setCurrentUser(null));
      } finally {
        setPending(false);
      }
    };

    if (currentUser) {
      
      setProfile(currentUser);
      setPending(false);
    } else {
      load();
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (!pending && currentUser === null) {
      redirect("/Account/Signin");
    }
  }, [pending, currentUser]);

  const updateProfile = async () => {
    if (!profile?._id) return;
    const updated = await client.updateUser(profile);
    dispatch(setCurrentUser(updated));
    setProfile(updated);
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    redirect("/Account/Signin");
  };

  const field: CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    marginBottom: 12,
    border: "1px solid #e5e9f2",
    borderRadius: 10,
    background: "#f5f7fb",
  };

  if (pending || !currentUser) return null;

  return (
    <div className="container-fluid p-0">
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{
          background:
            "radial-gradient(circle at top, #f2f6ff 0%, #eef2f7 40%, #e9edf5 100%)",
        }}
      >
        <div className="w-100" style={{ maxWidth: 520 }}>
          <div className="text-center mb-4">
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-4 mb-3 shadow-sm"
              style={{
                width: 72,
                height: 72,
                background:
                  "linear-gradient(135deg, #e3f2ff 0%, #d0e4ff 50%, #f1f5ff 100%)",
                color: "#1a73e8",
                fontWeight: 800,
                fontSize: 20,
              }}
            >
              KZ
            </div>
            <h1 className="h3 mb-1">Profile</h1>
            <p className="text-secondary mb-0">Manage your account details</p>
          </div>

          <div
            id="wd-profile-screen"
            className="card border-0 shadow rounded-4"
          >
            <div className="card-body p-4 p-md-5">
              
              <label className="form-label fw-semibold">Username</label>
              <input
                style={field}
                value={profile.username ?? ""}
                onChange={(e) =>
                  setProfile({ ...profile, username: e.target.value })
                }
              />

              
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                style={field}
                value={profile.password ?? ""}
                onChange={(e) =>
                  setProfile({ ...profile, password: e.target.value })
                }
              />

              
              <div className="row">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">First name</label>
                  <input
                    style={field}
                    value={profile.firstName ?? ""}
                    onChange={(e) =>
                      setProfile({ ...profile, firstName: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Last name</label>
                  <input
                    style={field}
                    value={profile.lastName ?? ""}
                    onChange={(e) =>
                      setProfile({ ...profile, lastName: e.target.value })
                    }
                  />
                </div>
              </div>

              
              <div className="row">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Date of birth
                  </label>
                  <input
                    type="date"
                    style={field}
                    value={profile.dob ?? ""}
                    onChange={(e) =>
                      setProfile({ ...profile, dob: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    style={field}
                    value={profile.email ?? ""}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                  />
                </div>
              </div>

              
              <label className="form-label fw-semibold">Role</label>
              <select
                style={field}
                disabled
                value={profile.role ?? "STUDENT"}
                onChange={(e) =>
                  setProfile({ ...profile, role: e.target.value })
                }
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
              </select>

              
              <div className="d-flex gap-3 mt-2">
                <button
                  onClick={updateProfile}
                  className="btn btn-primary flex-grow-1"
                >
                  <FaSave className="me-2" /> Update
                </button>

                <button
                  id="wd-signout-btn"
                  onClick={signout}
                  className="btn flex-grow-1"
                  style={{ background: "#dc3545", color: "#fff" }}
                >
                  <FaSignOutAlt className="me-2" /> Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
