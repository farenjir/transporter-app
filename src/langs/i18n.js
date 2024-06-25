import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { getFromStorage } from "utils/storage";
import { DEFAULT_LANG, LANG_NAME } from "utils/constance";
// languages
import english from "./resources/english.json";
import persian from "./resources/persian.json";
import italian from "./resources/italian.json";
import arabic from "./resources/arabic.json";

i18n.use(initReactI18next).init({
	resources: {
		fa: { translation: persian },
		en: { translation: english },
		it: { translation: italian },
		ar: { translation: arabic },
	},
	lng: getFromStorage(LANG_NAME) || DEFAULT_LANG,
	fallbackLng: getFromStorage(LANG_NAME) || DEFAULT_LANG,
	interpolation: {
		escapeValue: false, // react already safes from xss
	},
});

export default i18n;
