"use client";
import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import "./styles.css";
import store from "./store";
import { Provider } from "react-redux";
import AuthHydrator from "./AuthHydrator";
import Session from "./Account/Session";

export default function KambazLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Provider store={store}>
      <Session>
      <div id="wd-kambaz">
        <style>{`
        /* default: no left padding (mobile hides the sidebar) */
        #wd-kambaz .wd-content {
          padding-left: 0;
        }
        /* desktop/tablet: offset by the sidebar width (~110px) + a small gutter */
        @media (min-width: 768px) {
          #wd-kambaz .wd-content {
            padding-left: 120px; /* 110 sidebar + ~10px breathing room */
          }
        }
      `}</style>

        <div className="d-flex">
          <div>
            <KambazNavigation />
          </div>
  
          <div className="wd-content p-3 flex-fill"><AuthHydrator>{children}</AuthHydrator></div>
        </div>
      </div>
      </Session>
    </Provider>
  );
}
