
"use client";

import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";

export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {

    if (
      pathname?.startsWith("/Account/Signin") ||
      pathname?.startsWith("/Account/Signup")
    ) {
      dispatch(setCurrentUser(null));
      setPending(false);
      return;
    }

    const load = async () => {
      try {
        const user = await client.profile();
        dispatch(setCurrentUser(user));
      } catch (err) {

        dispatch(setCurrentUser(null));
      } finally {
        setPending(false);
      }
    };

    load();
  }, [dispatch, pathname]);

  if (pending) return null;
  return children;
}
