import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { baseSelector } from "store/base";

import { dateToLocale } from "utils/globals";

import { Details } from "components";

const SendDetails = ({ params = {} }) => {
	// hooks
	const { t } = useTranslation();
	const { enums } = useSelector(baseSelector);
	// items
	const items = [
		{ valueParam: "carrierFullName", label: t("request.user"), type: "text", span: { xs: 5, md: 5 }, classes: "uppercase" },
		{ valueParam: "fromLocationName", label: t("request.source"), type: "text", span: { xs: 5, md: 3 } },
		{ valueParam: "fromCountryName", label: t("request.cSource"), type: "text", span: { xs: 5, md: 2 } },
		{ valueParam: "toLocationName", label: t("request.destination"), type: "text", span: { xs: 5, md: 3 } },
		{ valueParam: "toCountryName", label: t("request.cDestination"), type: "text", span: { xs: 5, md: 2 } },
		// date
		{ valueParam: "dateOfDeliver", label: t("request.date"), type: "date", span: { xs: 5, md: 5 } },
		// size
		{ valueParam: "cargoItemNo", label: t("request.count"), type: "text", span: { xs: 5, md: 1 } },
		{ valueParam: "cargoMaxWeightCapacity", label: t("request.weight"), type: "text", span: { xs: 5, md: 1 } },
		{
			valueParam: "cargoWeightUnitIssueTitle",
			label: t("request.scale"),
			type: "text",
			span: { xs: 5, md: 1 },
		},
		{
			valueParam: "cargoMaxSizeCapacity",
			label: t("request.size"),
			type: "enum",
			enumType: "107",
			span: { xs: 5, md: 2 },
		},
		// price
		{
			valueParam: "priceIsNegotiable",
			label: t("request.price"),
			type: "boolean",
			condition: (condition) => (condition ? t("commonPages.priceNegotiable") : t("commonPages.priceNotNegotiable")),
			span: { xs: 5, md: 2 },
		},
		{ valueParam: "proposedPrice", label: t("request.sugPrice"), type: "money", span: { xs: 5, md: 2 } },
		{
			valueParam: "priceCurrencyTypeId",
			label: t("request.unit"),
			type: "enum",
			enumType: "105",
			span: { xs: 5, md: 1 },
		},
		// description
		{ valueParam: "cargoDesc", label: t("request.description"), type: "text", span: { xs: 5, md: 5 } },
	];
	// handles
	const getEnumLabel = (valueAsId, type) => {
		return enums?.[type]?.find(({ id }) => id === valueAsId)?.label ?? "";
	};
	const generateValue = (value, type, enumType, condition) => {
		switch (type) {
			case "enum":
				return getEnumLabel(value, enumType);
			case "date":
				return dateToLocale(value);
			case "money":
				return value ? value.toLocaleString() : "-";
			case "boolean":
				return condition(value);
			default:
				return value;
		}
	};
	return (
		<>
			<Details
				layout="vertical"
				size="small"
				classes="text-xl"
				column={5}
				items={items.map(({ valueParam, label, classes = "", span, type, enumType, condition }) => ({
					label,
					span,
					key: valueParam,
					children: (
						<span className={`text-lg ${classes}`}>
							{generateValue(params[valueParam], type, enumType, condition) || "-"}
						</span>
					),
				}))}
			/>
		</>
	);
};

export default SendDetails;
