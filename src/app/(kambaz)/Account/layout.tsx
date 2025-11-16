import type { ReactNode } from "react"
import AccountNavigation from "./Navigation"

export default function AccountLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div id="wd-account">
      <style>{`
        #wd-account {
          padding: 10px 24px 24px 0 !important; /* mobile: no left offset */
        }
        @media (min-width: 768px) {
          #wd-account {
            padding-left: 120px !important; /* align with fixed sidebar */
          }
        }
        
        /* Override Bootstrap's default list-group padding */
        #wd-account-navigation.list-group {
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        
        #wd-account-navigation .list-group-item {
          padding: 0.75rem 1.25rem !important;
          margin: 0 !important;
        }
      `}</style>

      <div className="d-flex gap-4">
        <div style={{ width: 220 }} className="d-none d-md-block">
          <AccountNavigation />
        </div>

<div className="d-flex justify-content-center align-items-center min-vh-100 w-100 ">
  {children}
</div>
      </div>
    </div>
  )
}
