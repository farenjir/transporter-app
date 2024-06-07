import { useState } from "react";
import i18next from "i18next";

import localeFa from "antd/lib/locale/fa_IR";
import localeEn from "antd/lib/locale/en_US";

import { getFromStorage, setToStorage } from "utils/storage";

let defaultLanguage = getFromStorage("language");

if (!defaultLanguage) {
	defaultLanguage = "fa";
	setToStorage("language", defaultLanguage);
}

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
	let direction = language !== "fa" ? "ltr" : "rtl";
	let placement = language !== "fa" ? "right" : "left";
	let locale = language !== "fa" ? localeEn : localeFa;
	// return
	return { language, direction, locale, placement, changeLanguage };
};

export default useLanguage;
