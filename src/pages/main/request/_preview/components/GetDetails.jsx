import { Details } from "components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { baseSelector } from "store/selector";
import { dateToLocale } from "utils/globals";

const GetDetails = ({ title = "", params = {} }) => {
	// hooks
	const { t } = useTranslation();
	const { enums } = useSelector(baseSelector);
	// handles
	const getPriceType = (priceCurrencyTypeId) => {
		return enums?.["105"]?.find(({ id }) => id === priceCurrencyTypeId)?.label ?? "";
	};
	const items = [
		{ value: "fromLocationName", label: "موقعیت مبدا", type: "text", span: 2 },
		{ value: "fromCountryName", label: "کشور مبدا", type: "text", span: 1 },
		{ value: "toLocationName", label: "موقعیت مقصد", type: "text", span: 2 },
		{ value: "toCountryName", label: "کشور مقصد", type: "text", span: 1 },

		{ value: "fromDateValidOfDeliver", label: "تاریخ مبدا", type: "date", span: 3 },
		{ value: "toDateValidOfDeliver", label: "تاریخ مقصد", type: "date", span: 3 },

		{ value: "cargoItemNo", label: "تعداد بسته", type: "text", span: 3 },
		{ value: "cargoWeight", label: "وزن بسته", type: "text", span: 1 },
		{ value: "cargoWeightUnitIssueTitle", label: "مقیاس بار", type: "enum", span: 1 },
		{ value: "cargoSize", label: "سایز بسته", type: "enum", span: 1 },
		// { value: "cargoWeightUnitIssueId", label: "Issue بسته", type: "enum" },

		{ value: "proposedPrice", label: "قیمت", type: "money", span: 1 },
		{ value: "priceCurrencyTypeId", label: "واحد", type: "enum", span: 1 },
		{
			span: 1,
			value: "priceIsNegotiable",
			label: "واحد",
			type: "boolean",
			result: (condition, value) =>
				condition ? t("home.cards.priceIsNegotiable") : value.toLocaleString(),
		},

		{ value: "cargoDesc", label: "توضیحات بسته", type: "text", span: 3 },
		// priceCurrencyTypeId: t("commonPages.source"),
		// priceIsNegotiable: t("commonPages.source"),
		// cargoWeightUnitIssueTitle: t("commonPages.source"),
		// cargoSize: t("commonPages.source"),
		// cargoWeight: t("commonPages.source"),
		// cargoItemNo: t("commonPages.source"),
		// cargoDesc: t("commonPages.source"),
		// requestLangaheTypeID: t("commonPages.source"),
		// requesterUserId: t("commonPages.source"),
		// requestType: t("commonPages.source"),
		// registerDate: t("commonPages.source"),
		// cargoWeightUnitIssueId: t("commonPages.source"),
		// fromCountryId: t("commonPages.source"),
		// toCountryId: t("commonPages.source"),
		// fromLocationId: t("commonPages.source"),
		// toLocationId: t("commonPages.source"),
		// fromLocationDesc: t("commonPages.source"),
		// toLocationDesc: t("commonPages.source"),
		// imageId: t("commonPages.source"),
		// timeZoneId: t("commonPages.source"),
		// matchStatusId: t("commonPages.source"),
		// chats: t("commonPages.source"),
	];
	return (
		<>
			<Details
				title={title}
				layout="vertical"
				items={items.map(({ value, label, span, type, result }) => ({
					label,
					span,
					key: value,
					children: params[value],
				}))}
			/>
		</>
	);
};

export default GetDetails;
