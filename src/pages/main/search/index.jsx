import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { theme } from "antd";

import { useSelector } from "react-redux";
import { baseSelector } from "store/selector";
import { dateToLocale } from "utils/globals";

import { AppCard } from "components/App";
import { RadioGroup, ListModule, AppTabs } from "components";
import { FlightIcon, FlightIntIcon } from "components/icon/custom";

import { useAppContext } from "hooks";
import { getCarrierAnnonce, getRequestForCarrier } from "service/main";

import SearchContextApi from "./components/forms/context";
import InternationalSearch from "./components/forms/InternationalSearch";
import DomesticSearch from "./components/forms/DomesticSearch";
import InternationalGetSearch from "./components/forms/InternationalGetSearch";
import DomesticGetSearch from "./components/forms/DomesticGetSearch";

const SearchPage = () => {
	const defaultType = history?.state?.usr || "send";
	// state
	const [activeType, setActiveType] = useState(defaultType);
	const [loading, setLoading] = useState(false);
	const [requested, setRequested] = useState([]);
	const [pgn, setPgn] = useState(1);
	// hooks
	const { t } = useTranslation();
	const { callApi } = useAppContext();
	const { token } = theme.useToken();
	const { enums } = useSelector(baseSelector);
	// handles
	const getPriceType = (priceCurrencyTypeId) => {
		const priceTypes = enums?.["105"] || [];
		return priceTypes?.find(({ id }) => id === priceCurrencyTypeId)?.label || "";
	};
	const onFinish = useCallback(
		async (formValues) => {
			setLoading(true);
			const { requestType, dateRange, ...value } = formValues;
			const queries = {
				fromDate: dateRange?.[0]?.toISOString(),
				toDate: dateRange?.[1]?.toISOString(),
				pgn: pgn,
				pgs: 9,
				...value,
			};
			switch (requestType) {
				case "send": {
					let { content: carrierList } = await getRequestForCarrier(callApi, queries);
					setRequested(carrierList || []);
					break;
				}
				case "get": {
					let { content: annonceList } = await getCarrierAnnonce(callApi, queries);
					setRequested(annonceList || []);
					break;
				}
				default:
					setRequested([]);
					break;
			}
			setLoading(false);
		},
		[callApi, pgn],
	);
	const onChangeType = (type) => {
		onFinish({ requestType: type, pgn: 1 });
		setActiveType(type);
	};
	const onChangeList = (pageNumber) => {
		setPgn(pageNumber);
	};
	const onReset = useCallback(() => {
		onFinish({ requestType: activeType, pgn: 1 });
	}, [activeType]);
	// options
	const requestType = [
		{
			label: t("search.send"),
			value: "send",
		},
		{
			label: t("search.get"),
			value: "get",
		},
	];
	// options
	const tabItems = {
		send: [
			{
				key: "International",
				label: t("search.International"),
				children: <InternationalSearch />,
				icon: <FlightIntIcon />,
				className: "mt-5",
			},
			{
				key: "Domestic",
				label: t("search.Domestic"),
				children: <DomesticSearch />,
				icon: <FlightIcon />,
				className: "mt-5",
				disabled: true,
			},
		],
		get: [
			{
				key: "International",
				label: t("search.International"),
				children: <InternationalGetSearch />,
				icon: <FlightIntIcon />,
				className: "mt-5",
			},
			{
				key: "Domestic",
				label: t("search.Domestic"),
				children: <DomesticGetSearch />,
				icon: <FlightIcon />,
				className: "mt-5",
				disabled: true,
			},
		],
	};
	// init
	useEffect(() => {
		onFinish({ requestType: defaultType });
	}, [defaultType, onFinish]);
	// return
	return (
		<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
			<div className="producer-title text-center mt-5">
				<h2 className="text-xl md:text-3xl">{t("search.search")}</h2>
				<p className="my-1 text-slate-400 text-xs p-2 md:text-base">{t("search.topTitle")}</p>
			</div>
			<section
				className={`responsive-layout sticky mx-auto p-8 rounded-3xl shadow-2xl border`}
				style={{ background: token?.colorBgBase }}
			>
				<SearchContextApi loading={loading} onFinish={onFinish} onReset={onReset}>
					<RadioGroup
						plainOptions={requestType}
						name="requestType"
						initialValue={activeType}
						required={true}
						onChange={onChangeType}
					/>
					<AppTabs items={tabItems[activeType]} centered />
				</SearchContextApi>
			</section>
			{/* SearchItems */}
			<section className="producer-sections mx-auto p-5 mt-8">
				<ListModule
					gutter={[16, 16]}
					onChange={onChangeList}
					dataSource={requested.map(
						({
							id,
							fromCountryName,
							toCountryName,
							toLocationName,
							fromLocationName,
							priceCurrencyTypeId,
							priceIsNegotiable,
							proposedPrice,
							cargoWeightUnitIssueTitle,
							cargoSize,
							cargoWeight,
							cargoItemNo,
							cargoDesc,
							fromDateValidOfDeliver,
							toDateValidOfDeliver,
							requestLangaheTypeID,
							requesterUserId,
							requestType,
							registerDate,
							cargoWeightUnitIssueId,
							fromCountryId,
							toCountryId,
							fromLocationId,
							toLocationId,
							fromLocationDesc,
							toLocationDesc,
							imageId,
							timeZoneId,
							matchStatusId,
							chats,
						}) => ({
							key: id.toString(),
							content: (
								<AppCard
									key={id.toString()}
									id={id.toString()}
									imgUrl={"/assets/images/international-banner.webp"}
									title={
										<div className="flex flex-col gap-2">
											<span className="text-xl">
												{t("home.cards.sendTo", {
													fromCountryName,
													toCountryName,
													fromLocationName,
													toLocationName,
												})}
											</span>
											<span className="text-base">
												{t("home.cards.price", {
													price: priceIsNegotiable
														? t("home.cards.priceIsNegotiable")
														: proposedPrice.toLocaleString(),
													label: getPriceType(priceCurrencyTypeId),
												})}
											</span>
											<span className="text-sm">
												{t("home.cards.dateFrom", {
													from: dateToLocale(fromDateValidOfDeliver),
												})}
											</span>
											<span className="text-sm">
												{t("home.cards.dateTo", {
													to: dateToLocale(toDateValidOfDeliver),
												})}
											</span>
											<span className="text-base">{t("home.cards.weight")}</span>
											<span className="text-sm">
												{t("home.cards.weightDes", {
													cargoWeight,
													cargoSize,
													cargoWeightUnitIssueTitle,
													cargoItemNo,
													cargoDesc,
												})}
											</span>
										</div>
									}
								/>
							),
						}),
					)}
				/>
			</section>
		</div>
	);
};

export default SearchPage;
