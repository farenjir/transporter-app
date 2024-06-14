import { useEffect, useState } from "react";
import i18next from "i18next";

import localeFa from "antd/lib/locale/fa_IR";
import localeEn from "antd/lib/locale/en_US";
import localeAr from "antd/lib/locale/ar_EG";
import localeIt from "antd/lib/locale/it_IT";

import { setToStorage } from "utils/storage";
import { initDayjs } from "./configs/dayjs";

const rtlLangs = ["fa", "ar"];
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
	// configs
	let configs = rtlLangs.includes(language)
		? {
			direction: "rtl",
			placement: "left",
			jalali: true,
		}
		: {
			direction: "ltr",
			placement: "right",
			jalali: false,
		};
	let locals = {
		fa: localeFa,
		en: localeEn,
		ar: localeAr,
		it: localeIt,
	};
	// return
	return { language, changeLanguage, locale: locals[language], ...configs };
};

export default useLanguage;
