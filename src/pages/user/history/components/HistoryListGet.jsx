import { useTranslation } from "react-i18next";

import { useSelector } from "react-redux";
import { baseSelector } from "store/base";

import { Skeleton } from "antd";
import { dateToLocale } from "utils/globals";

import { ListModule } from "components";
import { MyAppCard } from "components/App";

const imagesList = {
	get: "domestic-banner.webp",
	send: "international-banner.webp",
};

const LoadingSkelton = () => (
	<div className="grid grid-cols-2 gap-5 p-5">
		{Array(4)
			.fill(null)
			.map((_, idx) => (
				<Skeleton key={`skelton-${idx}`} active className="col-span-1" paragraph={{ rows: 7 }}></Skeleton>
			))}
	</div>
);

const HistoryTable = ({ content, activeType, loading, handleModals }) => {
	// hooks
	const { t } = useTranslation();
	const { enums } = useSelector(baseSelector);
	// handles
	const getPriceType = (priceCurrencyTypeId) => {
		return enums?.["105"]?.find(({ id }) => id === priceCurrencyTypeId)?.label ?? "";
	};
	return (
		<section className="my-request-sections min-h-screen">
			{loading ? (
				<LoadingSkelton />
			) : (
				<ListModule
					column={2}
					gutter={[16, 16]}
					dataSource={content.map((item) => {
						const {
							id,
							priceIsNegotiable,
							proposedPrice,
							priceCurrencyTypeId,
							fromCountryName,
							toCountryName,
							toLocationName,
							fromLocationName,
							cargoWeightUnitIssueTitle,
							dateOfDeliver,
							requestLangaheTypeID,
							carrierUserId,
							requestType,
							registerDate,
							carrierDesc,
							cargoMaxSizeCapacity,
							cargoMaxWeightCapacity,
							cargoWeightUnitIssueId,
							fromCountryId,
							toCountryId,
							fromLocationId,
							toLocationId,
							fromLocationDesc,
							toLocationDesc,
							timeZoneId,
							matchStatusId,
							chats,
							isArchived,
							fromFullGeoLocationTitle,
							toFullGeoLocationTitle,
							fromLocationTypeId,
							toLocationTypeId,
							fromCityName,
							toCityNam,
						} = item;
						return {
							key: id.toString(),
							content: (
								<MyAppCard
									key={id.toString()}
									id={id.toString()}
									hoverable={false}
									type={activeType}
									onClick={(type) =>
										handleModals(type, {
											id,
											priceIsNegotiable,
											proposedPrice,
											priceCurrencyTypeId,
											fromCountryName,
											toCountryName,
											toLocationName,
											fromLocationName,
											cargoWeightUnitIssueTitle,
											dateOfDeliver,
											requestLangaheTypeID,
											carrierUserId,
											requestType,
											registerDate,
											carrierDesc,
											cargoMaxSizeCapacity,
											cargoMaxWeightCapacity,
											cargoWeightUnitIssueId,
											fromCountryId,
											toCountryId,
											fromLocationId,
											toLocationId,
											fromLocationDesc,
											toLocationDesc,
											timeZoneId,
											matchStatusId,
											chats,
											isArchived,
											fromFullGeoLocationTitle,
											toFullGeoLocationTitle,
											fromLocationTypeId,
											toLocationTypeId,
											fromCityName,
											toCityNam,
										})
									}
									imgUrl={`/assets/images/${imagesList[activeType]}`}
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
											<span className="text-sm">
												{t("home.cards.dateTo", {
													to: dateToLocale(dateOfDeliver),
												})}
											</span>
											<span className="text-base">{t("home.cards.weight")}</span>
											<span className="text-sm">
												{t("home.cards.weightDes", {
													cargoWeight: cargoMaxWeightCapacity,
													cargoSize: cargoWeightUnitIssueId,
													cargoWeightUnitIssueTitle,
													cargoItemNo: cargoMaxWeightCapacity,
													cargoDesc: carrierDesc,
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
										</div>
									}
								/>
							),
						};
					})}
				/>
			)}
		</section>
	);
};
export default HistoryTable;
