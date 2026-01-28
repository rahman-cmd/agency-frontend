import React, { useEffect, useState } from "react";

// js
import "../assets/js/main.min.js";

// router
import { useNavigate } from "react-router-dom";

// css
import "../assets/css/main.min.css";
import "../assets/css/custom.css";
import "react-datepicker/dist/react-datepicker.css";
import { IoCallOutline, IoCardOutline } from "react-icons/io5";

//image-card
import cardBlue from "../assets/images/cardBlue.png";
import cardPink from "../assets/images/cardPink.png";
import cardPurple from "../assets/images/cardPurple.png";
import cardGreen from "../assets/images/cardGreen.png";
import cardYellow from "../assets/images/cardYellow.png";
import cardSky from "../assets/images/cardSky.png";

// redux & assets
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../store/admin/action.js";
import male from "../assets/images/male.png";
import { disableHost, getUser } from "../store/user/action.js";
import { getAgencyTypeCommission } from "../store/agencyCommission/action.js";
import CoinSeller from "../component/dialog/CoinSeller.js";
import { OPEN_COIN_SELLER_DIALOGUE } from "../store/seller/seller.type.js";
import AgencyRedeemCreate from "../component/dialog/AgencyRedeemCreate.js";
import { permissionError } from "../util/Alert.js";
import rCoin from "../assets/images/r coin 2.png";
import leftArrow from "../assets/images/leftArrow.png";
import { getSetting } from "../store/redeem/action.js";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { baseURL, key } from "../util/Config";


 

/* ---------------- THEME (Dark / Neon) ---------------- */
const T = {
  pageBg: "#33083e",
  text: "#EAF0FF",
  sub: "#9AA3B2",
  border: "rgba(255,255,255,0.08)",
  card: "#3c134e",
  cardSolid: "rgba(18,23,52,0.7)",
  radius: 16,
  shadow: "0 16px 36px rgba(0,0,0,0.35)",
  // accents
  indigo: "#6366F1",
  purple: "#8B5CF6",
  green: "#22C55E",
  rose: "#F43F5E",
  // gradients
  gradIndigo: "linear-gradient(135deg,#7366FF 0%,#3B82F6 100%)",
  gradPink: "linear-gradient(180deg, #F861B1 0%, #E91384 100%)",
  gradBlue: " linear-gradient(180deg, #02BDDF 0%, #0680DD 100%)",
  gradPurple: " linear-gradient(180deg, #9456FB 0%, #7F15E2 100%)",
  gradPink2: "#f2205f",
  gradepurple2: "#2E103C",
};

const softShadow = T.shadow;
const cardRadius = T.radius;



/* ---------------- Bottom Tab Bar ---------------- */
const BottomTabs = ({
  onDashboard,
  onHosts,
  onApplication,
  onPayouts,
  onHistory,
  activeTab = "Dashboard", // pass active route name if you want highlight
}) => {
  const item = (label, icon, onClick) => {
    
    const isActive = activeTab === label;
    return (
      <button
        onClick={onClick}
        style={{
          border: "none",
          background: "transparent",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          padding: "10px 8px",
          color: isActive ? "#fff" : "rgba(234,240,255,0.7)",
          fontWeight: 700,
          fontSize: 12,
          cursor: "pointer",
        }}
        aria-label={label}
      >
        {icon}
        <span>{label}</span>
      </button>
    );
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 62,
        backdropFilter: "saturate(200%) blur(14px)",
        background: "rgba(10,14,30,0.72)",
        borderTop: `1px solid ${T.border}`,
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        alignItems: "center",
        zIndex: 1000,

        /* Desktop override: sidebar */
        width: "220px",
        top: 0,
        flexDirection: "column",
        gridTemplateColumns: "1fr",
        height: "100vh",
      }}
      className="nav-container"
    >
      {item("Dashboard", "📊", onDashboard)}
      {item("Hosts", "👥", onHosts)}
      {item("Applications", "📑", onApplication)}
      {item("Payouts", "💰", onPayouts)}
      {item("History", "🕒", onHistory)}
    </div>
  );
};

const CoinIcon = () => (
  <svg fill="white" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const WalletIcon = () => (
  <svg fill="white" viewBox="0 0 24 24">
    <rect x="4" y="7" width="16" height="10" rx="2" />
  </svg>
);

const PeopleIcon = () => (
  <svg fill="white" viewBox="0 0 24 24">
    <circle cx="9" cy="10" r="3" />
    <circle cx="17" cy="10" r="3" />
  </svg>
);

const Admin = () => {
   const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const admin = useSelector((state) => state.admin.seller);
  console.log("admin: ", admin);

  const { user } = useSelector((state) => state.user);
  const { setting } = useSelector((state) => state.redeem);
  const agencyId = localStorage.getItem("agencyId");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 720);
  const [agencyTargets, setAgencyTargets] = useState([]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 720);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(getProfile(agencyId));
    dispatch(getAgencyTypeCommission());
    dispatch(getUser(agencyId));
    dispatch(getSetting());
    fetchAgencyTargets();
  }, [dispatch, agencyId]);

  const fetchAgencyTargets = async () => {
    try {
      const response = await axios.get(`${baseURL}coinTarget?type=agency`, {
        headers: { key },
      });
      if (response.data.status) {
        setAgencyTargets(response.data.coinTargets || []);
      }
    } catch (error) {
      console.error("Error fetching agency targets:", error);
    }
  };

  // actions
  const handleOpenCreator = () => {
    if (admin?.isActive === false) return permissionError();
    dispatch({ type: OPEN_COIN_SELLER_DIALOGUE });
  };
  const handleRequestCreator = () => navigate("/agencypanel/creatorRequest");
  const handleBack = () => window.showAndroidToast?.();
  const handleOpenAgencyIncome = (id) =>
    navigate("/agencypanel/Income", { state: id });
  const handleOpenAgencyRedeemDetails = (adminDoc) =>
    navigate("/agencypanel/agencyredeem", { state: adminDoc?._id });
  const handleOpenCreatorDetails = (adminId) =>
    navigate("/agencypanel/creators", { state: adminId });
  const handleOpenHostHistory = (id) =>
    navigate("/agencypanel/hosthistory", { state: id });
  const handleClick = (u) => dispatch(disableHost(u));

  // helpers
  const fmt = (v) => (v ?? 0).toString();
  const currency = (v) => `₹ ${Number(v ?? 0).toLocaleString("en-IN")}`;
  const createdAt = admin?.createdAt ? new Date(admin.createdAt) : null;

  // bottom tabs routing
  const goDashboard = () => navigate("/agencypanel/homePage");
  const goHosts = () => handleOpenCreatorDetails(admin?._id);
  const goRequest = () => handleRequestCreator(); // Applications tab
  const goPayouts = () => handleOpenAgencyRedeemDetails(admin);
  const goHistory = () =>
    navigate("/agencypanel/hosthistory", { state: admin?._id });

  return (
    <>
      <div
        className="page-container"
        style={{
          background: T.pageBg,
          minHeight: "100vh",
          color: T.text,
          paddingBottom: 92,
        }}
      >
        <div className="page">
          <div
            className="main-wrapper"
            style={{
              maxWidth: 2000,
              margin: "auto",
              padding: "0 0",
            }}
          >
            {/* Top Bar */}
            <div
              style={{
                position: "sticky",
                top: 0,
                zIndex: 9,
                background: "#33083e",
                padding: "14px 12px",
                borderBottom: `1px solid ${T.border}`,
                backdropFilter: "blur(10px)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {/* <button
                  style={{
                    border: `1px solid ${T.border}`,
                    background: T.card,
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    display: "grid",
                    placeItems: "center",
                    color: T.text,
                  }}
                  // onClick={handleBack}
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path
                      d="M1.185 11.648L7.602 18.065a.96.96 0 0 0 1.554-.651.96.96 0 0 0-.258-.999L4.046 11.917H20.167a.916.916 0 1 0 0-1.833H4.046l4.852-4.852a.916.916 0 1 0-1.293-1.296L1.185 10.352A.916.916 0 0 0 1.185 11.648Z"
                      fill={T.text}
                    />
                  </svg>
                </button> */}
                <div>
                  <div style={{ fontWeight: 800, fontSize: 18, color: T.text }}>
                    {t("dashboard")}
                  </div>
                  <div style={{ fontSize: 12, color: T.sub, marginTop: 2 }}>
                    {t("welcome_dashboard")}
                  </div>
                </div>
              </div>
            </div>

            {/* Agency Card */}
            <div
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                borderRadius: cardRadius,
                boxShadow: softShadow,
                padding: 14,
                margin: " 12px 12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  marginTop: 16,
                  padding: "16px 12px",
                }}
              >
                <div
                  style={{
                    width: 84,
                    height: 84,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(90deg, #E72392 0%, #9029FF 100%)",
                    padding: 2, // This acts like the border thickness
                    marginBottom: 12,
                    boxShadow: T.shadow,
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      background: `url(${
                        admin?.image || male
                      }) center/cover no-repeat`,
                    }}
                  />
                </div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 18,
                    color: T.text,
                    marginBottom: 8,
                  }}
                >
                  {admin?.name || "Agency"}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 12,
                    fontWeight: 600,
                    fontSize: "14px",
                    color: T.sub,
                    justifyContent: "center",
                  }}
                >
                  {admin?.agencyCode && (
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.5 2.25H4.5C2.8425 2.25 1.5 3.585 1.5 5.2275V12.7725C1.5 14.415 2.8425 15.75 4.5 15.75H13.5C15.1575 15.75 16.5 14.415 16.5 12.7725V5.2275C16.5 3.585 15.1575 2.25 13.5 2.25ZM6.375 5.3775C7.3275 5.3775 8.1075 6.1575 8.1075 7.11C8.1075 8.0625 7.3275 8.8425 6.375 8.8425C5.4225 8.8425 4.6425 8.0625 4.6425 7.11C4.6425 6.1575 5.4225 5.3775 6.375 5.3775ZM9.2775 12.495C9.21 12.57 9.105 12.615 9 12.615H3.75C3.645 12.615 3.54 12.57 3.4725 12.495C3.405 12.42 3.3675 12.315 3.375 12.21C3.43769 11.5983 3.71029 11.0272 4.14645 10.5938C4.58261 10.1603 5.15542 9.89134 5.7675 9.8325C6.16913 9.795 6.57337 9.795 6.975 9.8325C8.235 9.9525 9.2475 10.95 9.3675 12.21C9.3825 12.315 9.345 12.42 9.2775 12.495ZM14.25 12.5625H12.75C12.4425 12.5625 12.1875 12.3075 12.1875 12C12.1875 11.6925 12.4425 11.4375 12.75 11.4375H14.25C14.5575 11.4375 14.8125 11.6925 14.8125 12C14.8125 12.3075 14.5575 12.5625 14.25 12.5625ZM14.25 9.5625H11.25C10.9425 9.5625 10.6875 9.3075 10.6875 9C10.6875 8.6925 10.9425 8.4375 11.25 8.4375H14.25C14.5575 8.4375 14.8125 8.6925 14.8125 9C14.8125 9.3075 14.5575 9.5625 14.25 9.5625ZM14.25 6.5625H10.5C10.1925 6.5625 9.9375 6.3075 9.9375 6C9.9375 5.6925 10.1925 5.4375 10.5 5.4375H14.25C14.5575 5.4375 14.8125 5.6925 14.8125 6C14.8125 6.3075 14.5575 6.5625 14.25 6.5625Z"
                          fill="#8E889E"
                        />
                      </svg>
                      AG-{admin.agencyCode}
                    </div>
                  )}
                  {admin?.mobile && (
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4176 11.1795L11.0764 11.5192C11.0764 11.5192 10.2641 12.327 8.04789 10.1227C5.83164 7.91924 6.64389 7.11224 6.64389 7.11224L6.85839 6.89774C7.38864 6.37124 7.43889 5.52524 6.97614 4.90724L6.03114 3.64498C5.45814 2.87998 4.35189 2.77873 3.69564 3.43123L2.51814 4.60124C2.19339 4.92524 1.97589 5.34374 2.00214 5.80874C2.06964 6.99899 2.60814 9.55874 5.61114 12.5452C8.79639 15.7117 11.7851 15.8377 13.0069 15.7237C13.3939 15.6877 13.7299 15.4912 14.0006 15.2212L15.0656 14.1622C15.7856 13.4467 15.5831 12.2212 14.6621 11.721L13.2296 10.9417C12.6251 10.6132 11.8901 10.71 11.4176 11.1795Z"
                          fill="#8E889E"
                        />
                      </svg>
                      {admin.mobile}
                    </div>
                  )}
                </div>
              </div>
              <hr
                style={{
                  border: "none",
                  height: "1px",
                  background:
                    "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
                  margin: "10px 0",
                }}
              />

              {/* Stat tiles responsive grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                  gap: 12,
                  marginTop: 14,
                }}
                className="stat-grid"
              >
                <StatTile
                  label={t("current_commission")}
                  value={`${admin?.currentPercent || 0}%`} // append %
                  gradient="linear-gradient(135deg, #3B82F6, #60A5FA)"
                  backgroundImage={cardBlue}
                />
                <StatTile
                  label={t("withdrawn_coins")}
                  value={admin?.withdrawableCoin || 0}
                  gradient="linear-gradient(135deg, #10B981, #34D399)"
                  backgroundImage={cardGreen}
                />
                <StatTile
                  label={t("current_host_coins")}
                  value={admin?.currentHostCoin || 0}
                  gradient="linear-gradient(135deg, #F59E0B, #FBBF24)"
                  backgroundImage={cardYellow}
                />
                <StatTile
                  label={t("total_hosts")}
                  value={admin?.totalAgencyWiseHost || 0}
                  gradient="linear-gradient(135deg, #EC4899, #F472B6)"
                  backgroundImage={cardPink}
                  onMore={() => navigate("/agencypanel/creators")}
                />
                <StatTile
                  label={t("current_coins")}
                  value={admin?.currentCoin || 0}
                  gradient="linear-gradient(135deg, #3B82F6, #6366F1)"
                  backgroundImage={cardPurple}
                />
                <StatTile
                  label={t("total_coins")}
                  value={admin?.totalCoin || 0}
                  gradient="linear-gradient(135deg, #8B5CF6, #D946EF)"
                  backgroundImage={cardSky}
                />
              </div>

              <div
                style={{
                  marginTop: 12,
                  lineHeight: 1.5,
                  color: T.sub,
                  fontWeight: 600,
                  fontSize: 14,
                  textAlign: "start",
                }}
              >
                {admin?.about ||
                  "We help creators grow with data-driven insights and creative direction."}
              </div>

              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {/* First row: Status and Created side by side */}
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "5px 0",
                    flexWrap: isMobile ? "wrap" : "nowrap", // wrap on mobile
                  }}
                >
                  <div
                    style={{ display: "flex", gap: 10, alignItems: "center" }}
                  >
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: 14,
                        color: "#fff",
                        background:
                          admin?.isActive === false
                            ? "rgba(250, 30, 67, 1)"
                            : "#0AAD0F",
                        border: `1px solid ${T.border}`,
                        padding: "2px 8px",
                        borderRadius: 999,
                        fontWeight: 500,
                        backdropFilter: "blur(6px)",
                        textAlign: "center",
                      }}
                    >
                      {t("status")} :{" "}
                      {admin?.isActive === false ? "Inactive" : "Active"}
                    </span>
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: 14,
                        color: T.sub,
                        textAlign: "center",
                      }}
                    >
                      {t("created")}:{" "}
                      {createdAt ? createdAt.toLocaleDateString("en-GB") : "-"}
                    </span>
                  </div>

                  {/* Add Host button (position dynamically for mobile/desktop) */}
                  <button
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      background: "#6969ff",
                      color: "#fff",
                      border: "none",
                      padding: "14px 12px",
                      borderRadius: 13,
                      cursor: "pointer",
                      boxShadow: softShadow,
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      marginTop: isMobile ? 10 : 0, // push to next row on mobile
                      width: isMobile ? "100%" : "auto", // full width on mobile
                      justifyContent: isMobile ? "center" : "flex-start",
                    }}
                    onClick={handleOpenCreator}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#fff"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17 6C17 7.32608 16.4732 8.59785 15.5355 9.53553C14.5979 10.4732 13.3261 11 12 11C10.6739 11 9.40215 10.4732 8.46447 9.53553C7.52678 8.59785 7 7.32608 7 6C7 4.67392 7.52678 3.40215 8.46447 2.46447C9.40215 1.52678 10.6739 1 12 1C13.3261 1 14.5979 1.52678 15.5355 2.46447C16.4732 3.40215 17 4.67392 17 6ZM10 13C8.14348 13 6.36301 13.7375 5.05025 15.0503C3.7375 16.363 3 18.1435 3 20C3 20.7957 3.31607 21.5587 3.87868 22.1213C4.44129 22.6839 5.20435 23 6 23H13.41C13.841 23 14.087 22.472 13.863 22.102C13.2968 21.1665 12.9982 20.0935 13 19C12.9992 18.0348 13.2316 17.0838 13.6773 16.2277C14.123 15.3716 14.7689 14.6359 15.56 14.083C15.924 13.828 15.893 13.244 15.459 13.153C14.989 13.053 14.5 13 14 13H10ZM19 15C19.2652 15 19.5196 15.1054 19.7071 15.2929C19.8946 15.4804 20 15.7348 20 16V18H22C22.2652 18 22.5196 18.1054 22.7071 18.2929C22.8946 18.4804 23 18.7348 23 19C23 19.2652 22.8946 19.5196 22.7071 19.7071C22.5196 19.8946 22.2652 20 22 20H20V22C20 22.2652 19.8946 22.5196 19.7071 22.7071C19.5196 22.8946 19.2652 23 19 23C18.7348 23 18.4804 22.8946 18.2929 22.7071C18.1054 22.5196 18 22.2652 18 22V20H16C15.7348 20 15.4804 19.8946 15.2929 19.7071C15.1054 19.5196 15 19.2652 15 19C15 18.7348 15.1054 18.4804 15.2929 18.2929C15.4804 18.1054 15.7348 18 16 18H18V16C18 15.7348 18.1054 15.4804 18.2929 15.2929C18.4804 15.1054 18.7348 15 19 15Z"
                        fill="#fff"
                      />
                    </svg>
                    <span className="add-host">{t("add_host")}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Agency Target Progress Bar */}
            {agencyTargets.length > 0 && (
              <AgencyTargetProgress 
                currentProgress={admin?.currentHostCoin || 0}
                targets={agencyTargets}
              />
            )}

            {/* Summary cards */}
            <SummaryCard
              iconBg={T.gradPurple2}
              icon={<HostGlyph />}
              title= {t("total_hosts")}
              value={fmt(user?.length)}
              color="#FFFFFF"
              bg={T.gradPurple2}
              light
              onMore={() => navigate("/agencypanel/creators")}
            />

            <SummaryCard
              iconBg={T.gradPurple2}
              icon={<MoneyGlyph />}
              title={t("total_coins")}
              value={admin?.totalCoin || 0}
              color="#FFFFFF"
              bg={T.gradPurple2}
              light
              onMore={() => navigate("/agencypanel/hosthistory")}
            />

            <SummaryCard
              iconBg={T.gradPurple2}
              icon={<CoinGlyph />}
              title={t("host_coin")}
              value={fmt(admin?.rCoin)}
              color="#FFFFFF"
              bg={T.gradPurple2}
              light
              onMore={() => navigate("/agencypanel/creators")}
            />

            
            <SummaryCard
              iconBg={T.gradPurple2}
              icon={<TargetGlyph />}
              title="Agency Target"
              value="View"
              color="#FFFFFF"
              bg={T.gradPurple2}
              light
              onMore={() => navigate("/agencypanel/agencytarget")}
            />

            {/* Host list */}
            <div style={{ margin: "12px" }}>
              <SectionHeader title="Host Details" />
              {(user || []).slice(0, 2).map((u) => (
                <HostItem
                  key={u?._id}
                  u={u}
                  onToggle={() => handleClick(u)}
                  onHistory={() => handleOpenHostHistory(u?._id)}
                />
              ))}
              {(user || []).length > 2 && (
                <div
                  style={{
                    marginTop: 8,
                    textAlign: "center",
                    cursor: "pointer",
                    color: "#C7D2FE",
                    fontWeight: 600,
                    fontSize: 14,
                    textDecoration: "underline",
                  }}
                  onClick={() => navigate("/agencypanel/creators")}
                >
                   {t("see_more")}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <CoinSeller />
      <AgencyRedeemCreate />
    </>
  );
};

/* ---------- Small UI bits (dark) ---------- */
// StatTile Component
const StatTile = ({ label, value, backgroundImage, Icon, onMore }) => (
  <div
    onClick={onMore}
    style={{
      borderRadius: 20,
      padding: 2,
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      display: "flex",
      width: "100%",
      height: "100%",
    }}
  >
    <div
      style={{
        borderRadius: 10,
        padding: "12px 16px",
        background: "rgba(0,0,0,0.1)",
        color: "#fff",
        position: "relative",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // spaces out top & bottom
        fontFamily: "sans-serif",
        overflow: "hidden",
        minHeight: "70px", // ✅ ensures enough space
      }}
    >
      <div style={{ fontWeight: 600, fontSize: 14, opacity: 0.8 }}>{label}</div>
      <div style={{ fontSize: "20px", fontWeight: 600 }}>{value}</div>
    </div>
  </div>
);

const SectionHeader = ({ title }) => (
  <div
    style={{
      padding: "10px 12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8,
      color: T.text,
    }}
  >
    <div style={{ fontWeight: 600, fontSize: 16 }}>{title}</div>
  </div>
);

const HostItem = ({ u, onToggle, onHistory }) => {
   const { t } = useTranslation();
  return(
  
  <div
    style={{
      background: T.card,
      border: `1px solid ${T.border}`,
      borderRadius: 12,
      padding: 12,
      marginBottom: 10,
      boxShadow: T.shadow,
      color: T.text,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <img
        src={u?.image || male}
        alt=""
        style={{
          width: 42,
          height: 42,
          borderRadius: "50%",
          objectFit: "cover",
          border: `1px solid ${T.border}`,
        }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{u?.name || "-"}</div>
          <span
            style={{
              background: "#7B11E3",
              color: "#fff",
              fontSize: 12,
              borderRadius: 4,
              padding: "2px 5px",
              fontWeight: 400,
            }}
          >
             {t("host")}
          </span>
        </div>
        <div
          style={{ color: T.sub, fontWeight: 600, fontSize: 14, marginTop: 2 }}
        >
           {t("ID")}: {u?.uniqueId || "-"}
        </div>
      </div>

      <label className="switch s-icons s-outline s-outline-secondary mr-2 mb-0 margin-left">
        <input type="checkbox" checked={!!u?.isHost} onChange={onToggle} />
        <span className="slider round"></span>
      </label>
    </div>

    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 12,
      }}
    >
      <div
        style={{
          background: T.gradPink2,
          color: "#fff",
          padding: "3px 8px",
          borderRadius: 8,
          fontWeight: 600,
          fontSize: 14,
          display: "flex",
          alignItems: "center",
          gap: 6,
          boxShadow: T.shadow,
        }}
      >
         {t("host_income")}:
        <img src={rCoin} alt="" height={20} width={20} />
        {u?.currentCoin ?? 0}
      </div>

      <button
        onClick={onHistory}
        style={{
          border: "none",
          background: "transparent",
          color: "#E2CAD9",
          fontWeight: 600,
          fontSize: 14,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
         {t("history")}
        <img
          src={leftArrow}
          alt=""
          height={20}
          width={20}
          style={{ transform: "rotate(0deg)" }}
        />
      </button>
    </div>
  </div>
)};

const SummaryCard = ({
  iconBg,
  icon,
  title,
  value,
  color,
  bg,
  light = false,
  onMore,
}) => (
  <div
    onClick={onMore}
    style={{
      margin: "12px",
      background: bg,
      color,
      borderRadius: 12,
      padding: 9,
      boxShadow: T.shadow,
      border: `1px solid ${T.border}`,
      cursor: "pointer",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div
        style={{
          width: 45,
          height: 45,
          borderRadius: 10,
          background: "#FFFFFF0F",
          display: "grid",
          placeItems: "center",
          boxShadow: light ? "inset 0 0 0 2px rgba(255,255,255,0.25)" : "none",
        }}
      >
        {icon}
      </div>
      <div style={{ fontWeight: 500, fontSize: 16 }}>{title}</div>
      <div
        style={{
          marginLeft: "auto",
          padding: "0px 12px",
          fontWeight: 500,
          fontSize: 18,
          color: "#85F535",
        }}
      >
        {value}
      </div>
    </div>
  </div>
);

const HostGlyph = () => (
  <svg
    stroke="currentColor"
    fill="none"
    stroke-width="2"
    viewBox="0 0 24 24"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="h-6 w-6"
    height="2em"
    width="2em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const MoneyGlyph = () => (
  <svg
    stroke="currentColor"
    fill="none"
    stroke-width="2"
    viewBox="0 0 24 24"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="h-6 w-6"
    height="2em"
    width="2em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9 14c0 1.657 2.686 3 6 3s6 -1.343 6 -3s-2.686 -3 -6 -3s-6 1.343 -6 3z"></path>
    <path d="M9 14v4c0 1.656 2.686 3 6 3s6 -1.344 6 -3v-4"></path>
    <path d="M3 6c0 1.072 1.144 2.062 3 2.598s4.144 .536 6 0c1.856 -.536 3 -1.526 3 -2.598c0 -1.072 -1.144 -2.062 -3 -2.598s-4.144 -.536 -6 0c-1.856 .536 -3 1.526 -3 2.598z"></path>
    <path d="M3 6v10c0 .888 .772 1.45 2 2"></path>
    <path d="M3 11c0 .888 .772 1.45 2 2"></path>
  </svg>
);

const CoinGlyph = () => (
  <svg
    stroke="currentColor"
    fill="none"
    stroke-width="2"
    viewBox="0 0 24 24"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="h-6 w-6"
    height="2em"
    width="2em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const TargetGlyph = () => (
  <svg
    stroke="currentColor"
    fill="none"
    stroke-width="2"
    viewBox="0 0 24 24"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="h-6 w-6"
    height="2em"
    width="2em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

// Agency Target Progress Component
const AgencyTargetProgress = ({ currentProgress, targets }) => {
  // Sort targets by coinTarget (ascending)
  const sortedTargets = [...targets].sort((a, b) => (a.coinTarget || 0) - (b.coinTarget || 0));
  
  // Find current target (first target that is not completed)
  const currentTargetIndex = sortedTargets.findIndex(
    (target) => currentProgress < (target.coinTarget || 0)
  );
  
  // If all targets completed, show the last one
  const currentTarget = currentTargetIndex >= 0 
    ? sortedTargets[currentTargetIndex]
    : sortedTargets[sortedTargets.length - 1];
  
  // Calculate progress percentage
  const progressPercent = currentTarget
    ? Math.min((currentProgress / (currentTarget.coinTarget || 1)) * 100, 100)
    : 100;
  
  // Calculate remaining coins needed
  const remainingCoins = currentTarget
    ? Math.max((currentTarget.coinTarget || 0) - currentProgress, 0)
    : 0;
  
  // Check if current target is completed
  const isCompleted = currentProgress >= (currentTarget?.coinTarget || 0);
  
  // Get next target if current is completed
  const nextTarget = isCompleted && currentTargetIndex < sortedTargets.length - 1
    ? sortedTargets[currentTargetIndex + 1]
    : null;

  const displayTarget = isCompleted && nextTarget ? nextTarget : currentTarget;
  const displayProgress = isCompleted && nextTarget 
    ? currentProgress - (currentTarget?.coinTarget || 0)
    : currentProgress;
  const displayProgressPercent = nextTarget && isCompleted
    ? Math.min((displayProgress / (nextTarget.coinTarget || 1)) * 100, 100)
    : progressPercent;
  const displayRemaining = nextTarget && isCompleted
    ? Math.max((nextTarget.coinTarget || 0) - displayProgress, 0)
    : remainingCoins;

  if (!displayTarget) return null;

  return (
    <div
      style={{
        background: T.card,
        border: `1px solid ${T.border}`,
        borderRadius: cardRadius,
        boxShadow: softShadow,
        padding: 16,
        margin: "12px 12px",
      }}
    >
      <div
        style={{
          fontWeight: 600,
          fontSize: 16,
          color: T.text,
          marginBottom: 12,
        }}
      >
        Agency Target Progress
      </div>
      
      <div
        style={{
          marginBottom: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <span style={{ fontSize: 14, color: T.sub, fontWeight: 600 }}>
            Current Target: {displayTarget.coinTarget?.toLocaleString("en-US") || 0} Coins
          </span>
          <span style={{ fontSize: 14, color: T.text, fontWeight: 600 }}>
            {displayProgressPercent.toFixed(1)}%
          </span>
        </div>
        
        {/* Progress Bar */}
        <div
          style={{
            width: "100%",
            height: 24,
            background: "rgba(255,255,255,0.1)",
            borderRadius: 12,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              width: `${displayProgressPercent}%`,
              height: "100%",
              background: isCompleted && nextTarget
                ? "linear-gradient(90deg, #10B981, #34D399)"
                : "linear-gradient(90deg, #6366F1, #8B5CF6)",
              borderRadius: 12,
              transition: "width 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingRight: 8,
            }}
          >
            {displayProgressPercent > 15 && (
              <span
                style={{
                  fontSize: 11,
                  color: "#fff",
                  fontWeight: 600,
                }}
              >
                {displayProgress.toLocaleString("en-US")}
              </span>
            )}
          </div>
        </div>
        
        {/* Remaining coins */}
        {displayRemaining > 0 && (
          <div
            style={{
              marginTop: 8,
              fontSize: 12,
              color: T.sub,
              fontWeight: 600,
            }}
          >
            {isCompleted && nextTarget ? "Next Target: " : "Remaining: "}
            <span style={{ color: T.text }}>
              {displayRemaining.toLocaleString("en-US")} coins needed
            </span>
          </div>
        )}
        
        {/* Completed message */}
        {isCompleted && !nextTarget && (
          <div
            style={{
              marginTop: 8,
              fontSize: 12,
              color: "#10B981",
              fontWeight: 600,
            }}
          >
            ✅ All targets completed!
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
