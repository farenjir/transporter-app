import { useState } from "react";
import i18next from "i18next";

import localeFa from "antd/lib/locale/fa_IR";
import localeEn from "antd/lib/locale/en_US";

import { getFromStorage, setToStorage } from "@/utils/storage";

let defaultLanguage = getFromStorage("language") || "fa";

const useLanguage = () => {
	const [language, setLanguage] = useState(defaultLanguage);
	// handles
	const changeLanguage = (lang = "fa") => {
		i18next.changeLanguage(lang);
		setLanguage(lang);
		// setToStorage
		setToStorage("language", lang);
	};
	// init langs
	let direction = language === "en" ? "ltr" : "rtl";
	let placement = language === "en" ? "right" : "left";
	let locale = language === "en" ? localeEn : localeFa;
	// return
	return { language, direction, locale, placement, changeLanguage };
};

export default useLanguage;
