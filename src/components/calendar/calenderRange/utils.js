import { dateToPersian } from "utils/globals";

const faMonths = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
]

export const langConfigs = {
    fa: {
        monthsShort: faMonths,
        months: faMonths,
    },
};

export const defaultValues = {
    fa: dateToPersian(new Date())
};