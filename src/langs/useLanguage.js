import { useEffect, useState } from "react";
import i18next from "i18next";

import localeFa from "antd/es/locale/fa_IR";
import localeEn from "antd/es/locale/en_US";
import localeAr from "antd/es/locale/ar_EG";
import localeIt from "antd/es/locale/it_IT";
import localeTr from "antd/es/locale/tr_TR";
import localeDe from "antd/es/locale/de_DE";

import dateFa from "antd/es/date-picker/locale/fa_IR";
import dateEn from "antd/es/date-picker/locale/en_US";
import dateAr from "antd/es/date-picker/locale/ar_EG";
import dateIt from "antd/es/date-picker/locale/it_IT";
import dateTr from "antd/es/date-picker/locale/tr_TR";
import dateDe from "antd/es/date-picker/locale/de_DE";

import { setToStorage } from "utils/storage";
import { LANG_NAME } from "utils/constance";

import { initDayjs } from "./configs/dayjs";
import { languageTypes, rtlLangs } from "./configs";

const useLanguage = () => {
	const [language, setLanguage] = useState();
	// handles
	const changeLanguage = (lang = i18next.language) => {
		i18next.changeLanguage(lang);
		initDayjs(lang);
		// setToStorage
		setToStorage(LANG_NAME, lang);
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
				deDirection: "ltr",
				placement: "left",
				dePlacement: "right",
				jalali: true,
			}
		: {
				direction: "ltr",
				deDirection: "rtl",
				placement: "right",
				dePlacement: "left",
				jalali: false,
			};
	let locals = {
		fa: localeFa,
		en: localeEn,
		ar: localeAr,
		it: localeIt,
		tr: localeTr,
		de: localeDe,
	};
	let datePicker = {
		fa: dateFa,
		en: dateEn,
		ar: dateAr,
		it: dateIt,
		tr: dateTr,
		de: dateDe,
	};
	const buddhistLocale = {
		...(datePicker[language]?.lang || {}),
		// fieldDateFormat: 'BBBB-MM-DD',
		// fieldDateTimeFormat: 'BBBB-MM-DD HH:mm:ss',
		// yearFormat: 'BBBB',
		// cellYearFormat: 'BBBB',
	};
	// return
	return {
		lngTypeId: languageTypes[language],
		language,
		changeLanguage,
		locale: locals[language],
		dateConfigs: Object.assign({}, datePicker[language], { lang: buddhistLocale }),
		...configs,
	};
};

export default useLanguage;
