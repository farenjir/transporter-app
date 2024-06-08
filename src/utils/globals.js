import i18n from "i18next";
import dayjs from "dayjs";

// *** export handles
export { dateToGeo, dateToPersian, dateToInitializeOnForm, dateToGregorian, uIdMaker, transformerAppData };

// ***
const dateToGeo = (year, month, day, language = i18n.language || "fa") => {
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
const dateToPersian = (
	date,
	options = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	},
) => {
	if (date) {
		return new Date(date).toLocaleString("fa-IR-u-nu-latn", {
			// 'fa-IR'
			timeZone: "Asia/Tehran",
			...options,
		});
	} else {
		return null;
	}
};

// ***
const dateToInitializeOnForm = (date, language = i18n.language || "fa", format = "YYYY-MM-DD",) => {
	if (date) {
		return dayjs(date, "YYYY-MM-DD").locale(language).format(format)
	} else {
		return null;
	}
};

// ***
const dateToGregorian = (date, format = "YYYY-MM-DD", language = i18n.language || "fa") => {
	return dayjs.from(date, language, "YYYY-MM-DD").format(format);
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
