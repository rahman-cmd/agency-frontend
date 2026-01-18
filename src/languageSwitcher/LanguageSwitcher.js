import React, { useState, useEffect, useRef } from "react";
import i18n from "../../src/i18n";
import "./LanguageSwitcher.css";

const LanguageSwitcher = () => {
  const [showPip, setShowPip] = useState(false);
  const [showEdgePanel, setShowEdgePanel] = useState(true);
  const [selectedLang, setSelectedLang] = useState(i18n.language || "en");
  const [showLanguageList, setShowLanguageList] = useState(false);
  const pipRef = useRef(null);
  const timeoutRef = useRef(null);

  const languages = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "ar", name: "Arabic", nativeName: "العربية" },
    { code: "bn", name: "Bengali", nativeName: "বাংলা" },
    { code: "zh", name: "Chinese Simplified", nativeName: "简体中文" },
    { code: "fr", name: "French", nativeName: "Français" },
    { code: "de", name: "German", nativeName: "Deutsch" },
    { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
    { code: "it", name: "Italian", nativeName: "Italiano" },
    { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia" },
    { code: "ko", name: "Korean", nativeName: "한국어" },
    { code: "pt", name: "Portuguese", nativeName: "Português" },
    { code: "ru", name: "Russian", nativeName: "Русский" },
    { code: "es", name: "Spanish", nativeName: "Español" },
    { code: "sw", name: "Swahili", nativeName: "Kiswahili" },
    { code: "tr", name: "Turkish", nativeName: "Türkçe" },
    { code: "te", name: "Telugu", nativeName: "తెలుగు" },
    { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
    { code: "ur", name: "Urdu", nativeName: "اردو" },
  ];

  // Inline styles for responsive design
  const styles = {
    pipContainer: {
      position: "fixed",
      bottom: "70px",
      right: "20px",
      zIndex: 1000,
      maxWidth: "200px",
      width: "90vw",
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
      border: "1px solid #e1e5e9",
      overflow: "hidden",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      transition: "all 0.3s ease",
    },
    languageContent: {
      display: "flex",
      flexDirection: "column",
    },
    languageHeader: {
      display: "flex",
      alignItems: "center",
      padding: "16px",
      backgroundColor: "#f8fafc",
      borderBottom: "1px solid #e2e8f0",
      gap: "12px",
    },
    languageIcon: {
      fontSize: "20px",
      flexShrink: 0,
    },
    currentLanguage: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
      padding: "8px 12px",
      borderRadius: "8px",
      flex: 1,
      transition: "background-color 0.2s ease",
    },
    languageCode: {
      fontSize: "12px",
      fontWeight: "700",
      color: "#1976d2",
      backgroundColor: "#e3f2fd",
      padding: "4px 8px",
      borderRadius: "4px",
      minWidth: "32px",
      textAlign: "center",
    },
    languageName: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#1e293b",
      flex: 1,
    },
    dropdownArrow: {
      fontSize: "10px",
      color: "#64748b",
      transition: "transform 0.2s ease",
    },
    dropdownArrowOpen: {
      transform: "rotate(180deg)",
    },
    languageList: {
      maxHeight: "300px",
      overflowY: "auto",
      padding: "8px",
    },
    languageOption: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      padding: "12px",
      border: "none",
      backgroundColor: "transparent",
      borderRadius: "8px",
      cursor: "pointer",
      textAlign: "left",
      transition: "all 0.2s ease",
      marginBottom: "4px",
    },
    languageOptionSelected: {
      backgroundColor: "#e3f2fd",
      border: "1px solid #1976d2",
    },
    languageNative: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "2px",
    },
    languageEnglish: {
      fontSize: "12px",
      color: "#64748b",
    },
    quickSwitch: {
      padding: "16px",
      backgroundColor: "#f8fafc",
    },
    quickSwitchLabel: {
      fontSize: "12px",
      fontWeight: "600",
      color: "#64748b",
      marginBottom: "12px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    languageButtons: {
      display: "flex",
      position: "relative",
      backgroundColor: "#f1f5f9",
      borderRadius: "12px",
      padding: "4px",
      gap: "4px",
    },
    langButton: {
      flex: 1,
      padding: "10px 16px",
      border: "none",
      borderRadius: "8px",
      backgroundColor: "transparent",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
      color: "#64748b",
      position: "relative",
      zIndex: 1,
      transition: "all 0.3s ease",
    },
    langButtonActive: {
      color: "#1976d2",
    },
    sliderHighlight: {
      position: "absolute",
      top: "4px",
      bottom: "4px",
      width: "calc(50% - 2px)",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease",
      zIndex: 0,
    },
    sliderRight: {
      transform: "translateX(100%)",
    },
    edgePanel: {
      position: "fixed",
      bottom: "70px",
      right: "20px",
      zIndex: 1000,
      width: "46px",
      height: "46px",
      borderRadius: "50%",
      backgroundColor: "#ffffff23",
      color: "white",
      border: "none",
      cursor: "pointer",
      fontSize: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      // boxShadow: '0 6px 20px rgba(25, 118, 210, 0.3)',
      transition: "all 0.3s ease",
    },
  };

  // Sync with i18n on mount
  useEffect(() => {
    const currentLang = i18n.language;
    if (currentLang !== selectedLang) {
      setSelectedLang(currentLang);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pipRef.current && !pipRef.current.contains(event.target)) {
        setShowPip(false);
        setShowEdgePanel(true);
        setShowLanguageList(false);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Update selectedLang when i18n.language changes
  useEffect(() => {
    setSelectedLang(i18n.language);
  }, [i18n.language]);

  const handleEdgePanelClick = (e) => {
    e.stopPropagation();
    setShowPip(true);
    setShowEdgePanel(false);
  };

  const toggleLanguageList = (e) => {
    e.stopPropagation();
    setShowLanguageList(!showLanguageList);
  };

  const changeLanguage = async (langCode) => {
    try {
      await i18n.changeLanguage(langCode);
      setSelectedLang(langCode);
      localStorage.setItem("language", langCode);
      setShowLanguageList(false);
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  const getCurrentLanguage = () => {
    return languages.find((lang) => lang.code === selectedLang) || languages[0];
  };

  return (
    <>
      {showPip && (
        <div ref={pipRef} style={styles.pipContainer}>
          <div style={styles.languageContent}>
            <div style={styles.languageHeader}>
              <div style={styles.languageIcon}>🌐</div>
              <div
                style={styles.currentLanguage}
                onClick={toggleLanguageList}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f1f5f9")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <span style={styles.languageCode}>
                  {getCurrentLanguage().code.toUpperCase()}
                </span>
                <span style={styles.languageName}>
                  {getCurrentLanguage().name}
                </span>
                {/* <span style={{
                  ...styles.dropdownArrow,
                  ...(showLanguageList ? styles.dropdownArrowOpen : {})
                }}>▼</span> */}
              </div>
            </div>

            {showLanguageList && (
              <div style={styles.languageList}>
                {languages.map((language) => (
                  <button
                    key={language.code}
                    style={{
                      ...styles.languageOption,
                      ...(selectedLang === language.code
                        ? styles.languageOptionSelected
                        : {}),
                    }}
                    onClick={() => changeLanguage(language.code)}
                    onMouseEnter={(e) => {
                      if (selectedLang !== language.code) {
                        e.currentTarget.style.backgroundColor = "#f8fafc";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedLang !== language.code) {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    <span style={styles.languageNative}>
                      {language.nativeName}
                    </span>
                    <span style={styles.languageEnglish}>{language.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {showEdgePanel && (
        <button
          style={styles.edgePanel}
          onClick={handleEdgePanelClick}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.boxShadow =
              "0 8px 25px rgba(25, 118, 210, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow =
              "0 6px 20px rgba(25, 118, 210, 0.3)";
          }}
        >
          🌐
        </button>
      )}
    </>
  );
};

export default LanguageSwitcher;
