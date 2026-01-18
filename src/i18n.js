import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation JSONs
import enTranslation from "./locale/en/translation.json";
import arTranslation from "./locale/ar/translation.json";
import bnTranslation from "./locale/bn/translation.json"; // Bengali
import zhTranslation from "./locale/zh/translation.json"; // Chinese Simplified
import frTranslation from "./locale/fr/translation.json"; // French
import deTranslation from "./locale/de/translation.json"; // German
import hiTranslation from "./locale/hi/translation.json"; // Hindi
import itTranslation from "./locale/it/translation.json"; // Italian
import idTranslation from "./locale/id/translation.json"; // Indonesian
import koTranslation from "./locale/ko/translation.json"; // Korean
import ptTranslation from "./locale/pt/translation.json"; // Portuguese
import ruTranslation from "./locale/ru/translation.json"; // Russian
import esTranslation from "./locale/es/translation.json"; // Spanish
import swTranslation from "./locale/sw/translation.json"; // Swahili
import trTranslation from "./locale/tr/translation.json"; // Turkish
import teTranslation from "./locale/te/translation.json"; // Telugu
import taTranslation from "./locale/ta/translation.json"; // Tamil
import urTranslation from "./locale/ur/translation.json"; // Urdu

// Resources object
const resources = {
  en: { translation: enTranslation },
  ar: { translation: arTranslation },
  bn: { translation: bnTranslation },
  zh: { translation: zhTranslation },
  fr: { translation: frTranslation },
  de: { translation: deTranslation },
  hi: { translation: hiTranslation },
  it: { translation: itTranslation },
  id: { translation: idTranslation },
  ko: { translation: koTranslation },
  pt: { translation: ptTranslation },
  ru: { translation: ruTranslation },
  es: { translation: esTranslation },
  sw: { translation: swTranslation },
  tr: { translation: trTranslation },
  te: { translation: teTranslation },
  ta: { translation: taTranslation },
  ur: { translation: urTranslation },
};

export const initializeI18n = (language = "en") => {
  i18n.use(initReactI18next).init({
    resources,
    lng: language,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });
};

// Initialize with stored language or default
initializeI18n(localStorage.getItem("language") || "en");

export default i18n;
