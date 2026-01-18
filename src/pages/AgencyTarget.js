import React from "react";
import { useTranslation } from "react-i18next";

// css
import "../assets/css/main.min.css";
import "../assets/css/custom.css";

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
};

const softShadow = T.shadow;
const cardRadius = T.radius;

// Salary structure data based on the screenshot
const salaryStructureData = [
  { slNo: 1, coinTarget: 26000, hostSalary: 1.5, agencySalary: 0.5, totalSalary: 2 },
  { slNo: 2, coinTarget: 125000, hostSalary: 6, agencySalary: 1, totalSalary: 7 },
  { slNo: 3, coinTarget: 300000, hostSalary: 14, agencySalary: 2, totalSalary: 16 },
  { slNo: 4, coinTarget: 700000, hostSalary: 34, agencySalary: 3, totalSalary: 37 },
  { slNo: 5, coinTarget: 1200000, hostSalary: 56, agencySalary: 4, totalSalary: 60 },
  { slNo: 6, coinTarget: 1800000, hostSalary: 84, agencySalary: 7, totalSalary: 91 },
  { slNo: 7, coinTarget: 3500000, hostSalary: 164, agencySalary: 14, totalSalary: 178 },
  { slNo: 8, coinTarget: 6000000, hostSalary: 280, agencySalary: 34, totalSalary: 314 },
  { slNo: 9, coinTarget: 12000000, hostSalary: 560, agencySalary: 140, totalSalary: 700 },
  { slNo: 10, coinTarget: 25000000, hostSalary: 1200, agencySalary: 300, totalSalary: 1500 },
  { slNo: 11, coinTarget: 31000000, hostSalary: 136, agencySalary: 34, totalSalary: 170 },
  { slNo: 12, coinTarget: 50000000, hostSalary: 2400, agencySalary: 600, totalSalary: 3000 },
  { slNo: 13, coinTarget: 75000000, hostSalary: 3600, agencySalary: 900, totalSalary: 4500 },
  { slNo: 14, coinTarget: 100000000, hostSalary: 4800, agencySalary: 1200, totalSalary: 6000 },
  { slNo: 15, coinTarget: 130000000, hostSalary: 136, agencySalary: 34, totalSalary: 170 },
  { slNo: 16, coinTarget: 160000000, hostSalary: 7600, agencySalary: 1900, totalSalary: 9500 },
  { slNo: 17, coinTarget: 200000000, hostSalary: 9500, agencySalary: 2375, totalSalary: 11875 },
  { slNo: 18, coinTarget: 250000000, hostSalary: 11800, agencySalary: 2950, totalSalary: 14750 },
  { slNo: 19, coinTarget: 310000000, hostSalary: 14600, agencySalary: 3650, totalSalary: 18250 },
  { slNo: 20, coinTarget: 380000000, hostSalary: 17900, agencySalary: 4475, totalSalary: 22375 },
  { slNo: 21, coinTarget: 460000000, hostSalary: 21600, agencySalary: 5400, totalSalary: 27000 },
  { slNo: 22, coinTarget: 550000000, hostSalary: 25800, agencySalary: 6450, totalSalary: 32250 },
  { slNo: 23, coinTarget: 650000000, hostSalary: 30500, agencySalary: 7625, totalSalary: 38125 },
  { slNo: 24, coinTarget: 750000000, hostSalary: 3200, agencySalary: 800, totalSalary: 4000 },
];

const AgencyTarget = () => {
  const { t } = useTranslation();

  const formatNumber = (num) => {
    return num.toLocaleString("en-US");
  };

  const formatCurrency = (amount) => {
    return `$${amount.toLocaleString("en-US", { minimumFractionDigits: amount % 1 !== 0 ? 1 : 0, maximumFractionDigits: 1 })}`;
  };

  return (
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
              <div>
                <div style={{ fontWeight: 800, fontSize: 18, color: T.text }}>
                  Agency Target & Salary Structure
                </div>
                <div style={{ fontSize: 12, color: T.sub, marginTop: 2 }}>
                  Coin Target Based Salary Information
                </div>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div
            style={{
              background: T.card,
              border: `1px solid ${T.border}`,
              borderRadius: cardRadius,
              boxShadow: softShadow,
              margin: "12px",
              overflowX: "auto",
            }}
          >
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "600px",
                }}
              >
                {/* Table Header */}
                <thead>
                  <tr
                    style={{
                      background: "linear-gradient(135deg, #8B5CF6 0%, #7F15E2 100%)",
                      color: "#fff",
                    }}
                  >
                    <th
                      style={{
                        padding: "14px 12px",
                        textAlign: "center",
                        fontWeight: 700,
                        fontSize: 14,
                        border: `1px solid ${T.border}`,
                      }}
                    >
                      SL No
                    </th>
                    <th
                      style={{
                        padding: "14px 12px",
                        textAlign: "center",
                        fontWeight: 700,
                        fontSize: 14,
                        border: `1px solid ${T.border}`,
                      }}
                    >
                      Coin Target
                    </th>
                    <th
                      style={{
                        padding: "14px 12px",
                        textAlign: "center",
                        fontWeight: 700,
                        fontSize: 14,
                        border: `1px solid ${T.border}`,
                      }}
                    >
                      Host Salary (USDT)
                    </th>
                    <th
                      style={{
                        padding: "14px 12px",
                        textAlign: "center",
                        fontWeight: 700,
                        fontSize: 14,
                        border: `1px solid ${T.border}`,
                      }}
                    >
                      Agency Salary (USDT)
                    </th>
                    <th
                      style={{
                        padding: "14px 12px",
                        textAlign: "center",
                        fontWeight: 700,
                        fontSize: 14,
                        border: `1px solid ${T.border}`,
                      }}
                    >
                      Total Salary (USDT)
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {salaryStructureData.map((row, index) => {
                    const isEven = index % 2 === 0;
                    return (
                      <tr
                        key={row.slNo}
                        style={{
                          background: isEven
                            ? "rgba(139, 92, 246, 0.15)"
                            : "rgba(255, 165, 0, 0.15)",
                          color: T.text,
                        }}
                      >
                        <td
                          style={{
                            padding: "12px",
                            textAlign: "center",
                            fontWeight: 600,
                            fontSize: 14,
                            border: `1px solid ${T.border}`,
                          }}
                        >
                          {row.slNo}
                        </td>
                        <td
                          style={{
                            padding: "12px",
                            textAlign: "center",
                            fontWeight: 600,
                            fontSize: 14,
                            border: `1px solid ${T.border}`,
                          }}
                        >
                          {formatNumber(row.coinTarget)}
                        </td>
                        <td
                          style={{
                            padding: "12px",
                            textAlign: "center",
                            fontWeight: 600,
                            fontSize: 14,
                            border: `1px solid ${T.border}`,
                          }}
                        >
                          {formatCurrency(row.hostSalary)}
                        </td>
                        <td
                          style={{
                            padding: "12px",
                            textAlign: "center",
                            fontWeight: 600,
                            fontSize: 14,
                            border: `1px solid ${T.border}`,
                          }}
                        >
                          {formatCurrency(row.agencySalary)}
                        </td>
                        <td
                          style={{
                            padding: "12px",
                            textAlign: "center",
                            fontWeight: 600,
                            fontSize: 14,
                            border: `1px solid ${T.border}`,
                          }}
                        >
                          {formatCurrency(row.totalSalary)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyTarget;
