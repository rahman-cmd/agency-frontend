import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { baseURL, key } from "../util/Config";

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

const AgencyTarget = () => {
  const { t } = useTranslation();
  const [salaryStructureData, setSalaryStructureData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoinTargets();
  }, []);

  const fetchCoinTargets = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}coinTarget?type=agency`, {
        headers: { key },
      });
      if (response.data.status) {
        setSalaryStructureData(response.data.coinTargets || []);
      }
    } catch (error) {
      console.error("Error fetching coin targets:", error);
      setSalaryStructureData([]);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    return num?.toLocaleString("en-US") || "0";
  };

  const formatCurrency = (amount) => {
    return `$${amount?.toLocaleString("en-US", { minimumFractionDigits: amount % 1 !== 0 ? 1 : 0, maximumFractionDigits: 1 }) || "0.0"}`;
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
                  {loading ? (
                    <tr>
                      <td colSpan={5} align="center" style={{ padding: "20px", color: T.text }}>
                        Loading...
                      </td>
                    </tr>
                  ) : salaryStructureData.length > 0 ? (
                    salaryStructureData.map((row, index) => {
                      const isEven = index % 2 === 0;
                      return (
                        <tr
                          key={row._id || index}
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
                            {index + 1}
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
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} align="center" style={{ padding: "20px", color: T.text }}>
                        No data available
                      </td>
                    </tr>
                  )}
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
