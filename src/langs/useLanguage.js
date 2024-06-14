import { useEffect, useState } from "react";
import i18next from "i18next";

import localeFa from "antd/lib/locale/fa_IR";
import localeEn from "antd/lib/locale/en_US";

import { setToStorage } from "utils/storage";
import { initDayjs } from "./configs/dayjs";

const useLanguage = () => {
	const [language, setLanguage] = useState();
	// handles
	const changeLanguage = (lang = i18next.language) => {
		i18next.changeLanguage(lang);
		initDayjs(lang);
		// setToStorage
		setToStorage("language", lang);
		setLanguage(lang);
	};
	// init langs
	useEffect(() => {
		changeLanguage();
	}, []);
	let direction = language !== "fa" ? "ltr" : "rtl";
	let placement = language !== "fa" ? "right" : "left";
	let locale = language !== "fa" ? localeEn : localeFa;
	let jalali = language !== "fa" ? true : false;
	// return
	return { language, direction, locale, jalali, placement, changeLanguage };
};

export default useLanguage;
