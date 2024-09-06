import i18next from "i18next";
import dayjs from "dayjs";
import { localeList, timeZones } from "langs/configs";

// *** export handles
export { dateToGeo, dateToApi, dateTransformer, dateToLocale, dateToInitializeOnForm, uIdMaker, transformerAppData };

// ***
const dateToGeo = (year, month, day, language = i18next.language) => {
	let converted = "";
	let selected = `${year}-${month}-${day}`;
	try {
		converted = dayjs.from(selected, language, "YYYY-MM-DD").format("YYYY-MM-DD");
	} catch (error) {
		converted = "";
	}
	// return
	return { converted, selected };
};

// ***
const dateToLocale = (
	date,
	locale = i18next.language,
	options = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	},
) => {
	if (date) {
		return new Date(date).toLocaleString(localeList[locale], {
			timeZone: timeZones[locale],
			...options,
		});
	} else {
		return null;
	}
};

const dateTransformer = (date, jalali = true, locale = i18next.language, format = "YYYY/MM/DD") => {
	if (date) {
		return dayjs(date, { jalali }).locale(locale).format(format);
	} else {
		return null;
	}
};
const dateToApi = (date, jalali = true, format = "YYYY-MM-DDTHH:mm:ss", locale = i18next.language) => {
	if (date) {
		const toLocaleData = dayjs(date).locale(locale).format(format);
		return dayjs(toLocaleData, { jalali }).tz(timeZones[locale]).locale("en").format(format);
	} else {
		return null;
	}
};

// ***
const dateToInitializeOnForm = (date, format = "YYYY-MM-DD", language = i18next.language) => {
	if (date) {
		return dayjs(date, "YYYY-MM-DD").locale(language).format(format);
	} else {
		return null;
	}
};

// ***
const uIdMaker = (uIdLength = 20) => {
	let codePattern = "1qaz2wsx3edc4rfv5tgb6yhn7ujm8ik9ol0p1qaz2wsx3edc4rfv5tgb6yhn7ujm8ik9ol0p";
	let pl = codePattern.length;
	let uId = "";
	for (let idx = 0; idx < uIdLength; idx++) {
		let randomNumber = Math.floor(Math.random() * pl);
		uId += codePattern[randomNumber];
	}
	return uId;
};

const transformerAppData = (object, [codeParam, titleParam], afterObjAdded, useNameAsId = false) => {
	const code = object[codeParam];
	const title = object[titleParam];
	return {
		...object,
		code,
		title,
		id: useNameAsId ? title : code,
		pId: useNameAsId ? title : code,
		value: useNameAsId ? title : code,
		label: title,
		name: title,
		text: title,
		...afterObjAdded,
	};
};
