import { useTranslation } from "react-i18next";
import { Avatar, Badge, Card, Rate, theme, Timeline } from "antd";

import { SafetyCertificateOutlined, StarFilled, UserOutlined } from "@ant-design/icons";
import { IconPlaneDeparture, IconPlaneArrival, IconClockHour7 } from "@tabler/icons-react";

import { dateToLocale } from "utils/globals";
import { useAppContext, useNewMessageCount } from "hooks";

import { Buttons } from "components";

const { Meta } = Card;

const AppCardGet = ({
	mode,
	id,
	imgUrl,
	onClickBtn = () => {},
	yourselfOrder = false,
	// content
	fromDateValidOfDeliver,
	toDateValidOfDeliver,
	priceIsNegotiable,
	proposedPrice,
	priceLabel,
	cargoWeight,
	cargoSize: cargoWeightUnitIssueId,
	cargoWeightUnitIssueTitle,
	cargoItemNo,
	cargoDesc,
	fromCountryName,
	toCountryName,
	fromLocationName,
	toLocationName,
	carrierUserId,
}) => {
	const { t } = useTranslation();
	const { token } = theme.useToken();
	const { deDirection, callApi } = useAppContext();
	const { count } = useNewMessageCount(callApi, { recordId: id, requestType: mode });
	return (
		<Badge.Ribbon text={t("notification.newMessage", { count })} color="red" className={count ? "" : "hidden"}>
			<div className="flex flex-col md:flex-row rounded-lg border" style={{ background: token?.colorBgBase }}>
				<div className="flex-none w-full md:w-96 relative">
					<img
						src={imgUrl}
						alt=""
						className="absolute inset-0 md:w-full md:h-full object-cover rounded-lg"
						loading="lazy"
					/>
				</div>
				<div className="flex flex-col p-8 mt-16 md:mt-1">
					<div className="flex flex-col md:flex-row gap-8">
						<Meta
							avatar={<Avatar src={undefined} icon={<UserOutlined />} className="mb-3" />}
							title={
								<div className="flex gap-2 items-center">
									<SafetyCertificateOutlined style={{ fontSize: 14, color: token?.colorPrimary }} />
									<span className="pt-1"> {`carrierUserName-${carrierUserId}`}</span>
								</div>
							}
							description={
								<>
									<Rate
										disabled
										defaultValue={4}
										className="mt-2"
										character={<StarFilled style={{ fontSize: 14 }} />}
									/>
								</>
							}
						/>
						<Timeline
							mode={deDirection}
							items={[
								{
									dot: <IconPlaneDeparture />,
									children: `${fromCountryName} ( ${fromLocationName} )`,
								},
								{
									dot: <IconClockHour7 />,
									color: "green",
									children: (
										<div className="flex gap-2">
											<span className="text-sm">
												{t("home.cards.dateFrom", {
													from: dateToLocale(fromDateValidOfDeliver),
												})}
											</span>
											<span>-</span>
											<span className="text-sm">
												{t("home.cards.dateTo", {
													to: dateToLocale(toDateValidOfDeliver),
												})}
											</span>
										</div>
									),
								},
								{
									dot: <IconPlaneArrival />,
									children: `${toCountryName} ( ${toLocationName} )`,
								},
							]}
						/>
					</div>
					<span className="text-base opacity-80 hidden md:block">
						{t("home.cards.price", {
							price: priceIsNegotiable ? t("home.cards.priceIsNegotiable") : proposedPrice.toLocaleString(),
							label: priceLabel,
						})}
					</span>
					{/* <Descriptions
				className="w-[400px]"
					layout="vertical"
					items={[
						{
							key: "1",
							label: <span className="text-base">{t("home.cards.weight")}</span>,
							children: (
								<span className="text-sm">
									{t("home.cards.weightDes", {
										cargoWeight,
										cargoSize,
										cargoWeightUnitIssueTitle,
										cargoItemNo,
										cargoDesc,
									})}
								</span>
							),
						},
						{
							key: "2",
							label: "قیمت",
							children: (
								<span className="text-base">
									{t("home.cards.price", {
										price: priceIsNegotiable
											? t("home.cards.priceIsNegotiable")
											: proposedPrice.toLocaleString(),
										label: priceLabel,
									})}
								</span>
							),
						},
					]}
				/> */}
				</div>
				<div className="flex-auto flex items-end justify-end gap-2 px-8">
					{yourselfOrder && (
						<Buttons
							onClick={() => onClickBtn("comment", yourselfOrder)}
							content={t("commons.edit")}
							htmlType="button"
							size="small"
						/>
					)}
					<Buttons
						onClick={() => onClickBtn("details")}
						content={t("commons.contentView")}
						htmlType="button"
						size="small"
					/>
					<Buttons
						onClick={() => onClickBtn("comment", yourselfOrder)}
						content={t("request.sendMessage")}
						htmlType="button"
						size="small"
						disabled={yourselfOrder && count === 0}
					/>
				</div>
			</div>
		</Badge.Ribbon>
	);
};

export default AppCardGet;
