"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./Account/reducer";
import type { RootState } from "./store";

const KEY = "kz_current_user";

export default function AuthHydrator({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((s: RootState) => s.accountReducer.currentUser);
  const didHydrate = useRef(false);
  const [ready, setReady] = useState(false);

 
  useEffect(() => {
    if (didHydrate.current) return;
    didHydrate.current = true;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          dispatch(setCurrentUser(parsed));
        }
      }
    } catch {}
    
    setReady(true);
  }, [dispatch]);

  
  useEffect(() => {
    try {
      if (currentUser) localStorage.setItem(KEY, JSON.stringify(currentUser));
      else localStorage.removeItem(KEY);
    } catch {}
  }, [currentUser]);

  
  if (!ready) return null;
  return <>{children}</>;
}
