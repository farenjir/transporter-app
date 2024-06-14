import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getFromStorage } from "utils/storage";

// languages
import english from "./resources/english.json";
import persian from "./resources/persian.json";

i18n.use(initReactI18next).init({
	resources: {
		fa: { translation: persian },
		en: { translation: english },
	},
	lng: getFromStorage("language") || "fa",
	fallbackLng: getFromStorage("language") || "fa",
	interpolation: {
		escapeValue: false, // react already safes from xss
	},
});

export default i18n;
