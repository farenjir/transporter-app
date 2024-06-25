import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { baseSelector } from "store/selector";

import { dateToLocale } from "utils/globals";
import { theme } from "antd";
import { Buttons, Details } from "components";

const SendDetails = ({ params = {} }) => {
	// hooks
	const { t } = useTranslation();
	const { token } = theme.useToken();
	const { enums } = useSelector(baseSelector);
	// items
	const items = [
		{ valueParam: "fromLocationName", label: "موقعیت مبدا", type: "text", span: { xs: 5, md: 3 } },
		{ valueParam: "fromCountryName", label: "کشور مبدا", type: "text", span: { xs: 5, md: 2 } },
		{ valueParam: "toLocationName", label: "موقعیت مقصد", type: "text", span: { xs: 5, md: 3 } },
		{ valueParam: "toCountryName", label: "کشور مقصد", type: "text", span: { xs: 5, md: 2 } },
		// date
		{ valueParam: "fromDateValidOfDeliver", label: "تاریخ مبدا", type: "date", span: { xs: 5, md: 3 } },
		{ valueParam: "toDateValidOfDeliver", label: "تاریخ مقصد", type: "date", span: { xs: 5, md: 3 } },
		// size
		{ valueParam: "cargoItemNo", label: "تعداد بسته", type: "text", span: { xs: 5, md: 1 } },
		{ valueParam: "cargoWeight", label: "وزن بسته", type: "text", span: { xs: 5, md: 1 } },
		{
			valueParam: "cargoWeightUnitIssueTitle",
			label: "مقیاس بار",
			type: "text",
			span: { xs: 5, md: 1 },
		},
		{
			valueParam: "cargoSize",
			label: "سایز بسته",
			type: "enum",
			enumType: "107",
			span: { xs: 5, md: 2 },
		},
		// price
		{
			valueParam: "priceIsNegotiable",
			label: "قیمت",
			type: "boolean",
			condition: (condition) =>
				condition ? t("commonPages.priceNegotiable") : t("commonPages.priceNotNegotiable"),
			span: { xs: 5, md: 2 },
		},
		{ valueParam: "proposedPrice", label: "قیمت پیشنهادی", type: "money", span: { xs: 5, md: 2 } },
		{
			valueParam: "priceCurrencyTypeId",
			label: "واحد",
			type: "enum",
			enumType: "105",
			span: { xs: 5, md: 1 },
		},
		// description
		{ valueParam: "cargoDesc", label: "توضیحات بسته", type: "text", span: { xs: 5, md: 5 } },
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
	const title = t("home.cards.sendTo", {
		fromCountryName: params.fromCountryName,
		toCountryName: params.toCountryName,
		fromLocationName: params.fromLocationName,
		toLocationName: params.toLocationName,
	});
	return (
		<>
			<Details
				title={
					<div className="flex justify-between align-middle items-center">
						<p className="text-base lg:text-xl pb-4" style={{ color: token?.colorPrimary }}>
							{title}
						</p>
						<Buttons
							content={<span>درخواست رزرو</span>}
							htmlType="button"
							size="default"
							classes="text-sm float-end"
						/>
					</div>
				}
				layout="vertical"
				size="small"
				classes="text-xl"
				column={5}
				items={items.map(({ valueParam, label, span, type, enumType, condition }) => ({
					label,
					span,
					key: valueParam,
					children: (
						<span className="text-lg">
							{generateValue(params[valueParam], type, enumType, condition)}
						</span>
					),
				}))}
			/>
		</>
	);
};

export default SendDetails;
