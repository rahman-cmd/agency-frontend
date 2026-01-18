import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const T = {
  border: "rgba(255,255,255,0.08)",
  pageBg: "#33083e",
  text: "#EAF0FF",
};

/* --- SVG Icons --- */
const DashboardIcon = (
  <svg
    stroke="currentColor"
    fill="none"
    stroke-width="2"
    viewBox="0 0 24 24"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="w-10 h-10 md:w-10 md:h-10"
    height="1.5em"
    width="1.5em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);
const HostsIcon = (
  <svg
    stroke="currentColor"
    fill="none"
    stroke-width="2"
    viewBox="0 0 24 24"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="w-5 h-5 md:w-6 md:h-6"
    height="1.5em"
    width="1.5em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);
const ApplicationIcon = (
  <svg
    stroke="currentColor"
    fill="none"
    stroke-width="2"
    viewBox="0 0 24 24"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="w-5 h-5 md:w-6 md:h-6"
    height="1.5em"
    width="1.5em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
  </svg>
);
const PayoutsIcon = (
  <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 md:w-6 md:h-6" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
);
const HistoryIcon = (
  <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 md:w-6 md:h-6" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
);

/* --- Navigation Items --- */
const navItems = [
  { label: "Dashboard", path: "/agencypanel/homePage", icon: DashboardIcon },
  { label: "Hosts", path: "/agencypanel/creators", icon: HostsIcon },
  {
    label: "Applications",
    path: "/agencypanel/creatorRequest",
    icon: ApplicationIcon,
  },
  { label: "Payouts", path: "/agencypanel/agencyredeem", icon: PayoutsIcon },
  { label: "History", path: "/agencypanel/hosthistory", icon: HistoryIcon },
];

export default function AgencyLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const item = ({ label, path, icon }, isSidebar = false) => {
    const isActive = location.pathname === path;
    return (
      <button
        key={label}
        onClick={() => navigate(path)}
        style={{
          border: "none",
          background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
          display: "flex",
          flexDirection: isSidebar ? "row" : "column", // 👈 row for sidebar
          alignItems: "center",
          justifyContent: isSidebar ? "start" : "center",
          gap: 9,
          padding: isSidebar ? "8px 14px" : "10px 8px",

          color: isActive ? "#fff" : "rgba(234,240,255,0.7)",
          fontWeight: 500,
          fontSize: isSidebar ? 17 : 12,
          cursor: "pointer",
          width: isSidebar ? "90%" : "100%",
          margin: isSidebar ? "5px auto" : "0px 1px",
          borderRadius: isSidebar ? "8px" : "0",
          textAlign: "left",
        }}
      >
        {icon}
        <span style={{fontSize:"14px"}}>{label}</span>
      </button>
    );
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: T.pageBg }}>
      {/* Sidebar (desktop) */}
      <div className="sidebar-nav">
        {/* Sidebar Heading - ONLY DESKTOP */}
        <h2
          style={{
            color: "#E8538F",
            fontSize: 20,
            fontWeight: 700,
            marginBottom: 20,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px 0",
          }}
        >
          Agency
        </h2>
        {navItems.map((nav) => item(nav, true))}
      </div>

      {/* Page content */}
      <div
        style={{
          flex: 1,
          paddingBottom: 62,
          color: T.text,
         
          overflowX: "hidden",
          overflowY: "auto",
          height: "100vh",
        }}
      >
        <Outlet />
      </div>

      {/* Bottom Tabs (mobile) */}
      <div className="bottom-nav">
        {navItems.map((nav) => item(nav, false))}
      </div>
    </div>
  );
}
