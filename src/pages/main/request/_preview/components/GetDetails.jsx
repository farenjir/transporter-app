import { theme } from "antd";
import { Buttons, Details } from "components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { baseSelector } from "store/selector";
import { dateToLocale } from "utils/globals";

const GetDetails = ({ title = "", params = {} }) => {
	// hooks
	const { t } = useTranslation();
	const { token } = theme.useToken();
	const { enums } = useSelector(baseSelector);
	// items
	const items = [
		{ valueParam: "fromLocationName", label: "موقعیت مبدا", type: "text", span: 3 },
		{ valueParam: "fromCountryName", label: "کشور مبدا", type: "text", span: 2 },
		{ valueParam: "toLocationName", label: "موقعیت مقصد", type: "text", span: 3 },
		{ valueParam: "toCountryName", label: "کشور مقصد", type: "text", span: 2 },

		{ valueParam: "fromDateValidOfDeliver", label: "تاریخ مبدا", type: "date", span: 5 },
		{ valueParam: "toDateValidOfDeliver", label: "تاریخ مقصد", type: "date", span: 5 },

		{ valueParam: "cargoItemNo", label: "تعداد بسته", type: "text", span: 1 },
		{ valueParam: "cargoWeight", label: "وزن بسته", type: "text", span: 1 },
		{ valueParam: "cargoWeightUnitIssueTitle", label: "مقیاس بار", type: "text", span: 1 },
		{ valueParam: "cargoSize", label: "سایز بسته", type: "enum", enumType: "107", span: 2 },

		{
			span: 2,
			valueParam: "priceIsNegotiable",
			label: "قیمت",
			type: "boolean",
			result: (condition) =>
				condition ? t("commonPages.priceNegotiable") : t("commonPages.priceNotNegotiable"),
		},
		{ valueParam: "proposedPrice", label: "قیمت پیشنهادی", type: "money", span: 2 },
		{ valueParam: "priceCurrencyTypeId", label: "واحد", type: "enum", enumType: "105", span: 1 },

		{ valueParam: "cargoDesc", label: "توضیحات بسته", type: "text", span: 5 },
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
	// handles
	const getEnumLabel = (valueAsId, type) => {
		return enums?.[type]?.find(({ id }) => id === valueAsId)?.label ?? "";
	};
	const generateValue = (value, type, enumType, result) => {
		switch (type) {
			case "enum":
				return getEnumLabel(value, enumType);
			case "date":
				return dateToLocale(value);
			case "money":
				return value ? value.toLocaleString() : "-";
			case "boolean":
				return result(value);
			default:
				return value;
		}
	};
	return (
		<>
			<Details
				title={
					<div className="flex justify-between align-middle items-center">
						<p className="text-base lg:text-xl" style={{ color: token?.colorPrimary }}>
							{title}
						</p>
						<Buttons
							content={<span>درخواست رزرو</span>}
							htmlType="button"
							size="default"
							classes="text-sm float-end mt-5"
						/>
					</div>
				}
				layout="vertical"
				size="small"
				classes="text-xl"
				column={5}
				items={items.map(({ valueParam, label, span, type, enumType, result }) => ({
					label,
					span,
					key: valueParam,
					children: generateValue(params[valueParam], type, enumType, result),
				}))}
			/>
		</>
	);
};

export default GetDetails;
