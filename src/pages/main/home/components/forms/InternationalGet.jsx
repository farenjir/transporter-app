import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Col, Row } from "antd";

import { RequestContext } from "./context";
import { Buttons, Calendars, Icons, InputType, Selects, TreeSelects } from "components";

const InternationalGet = () => {
	const [priceType, setPriceType] = useState(true);
	// hooks
	const { t } = useTranslation();
	const { onLoadData, loading, jalali, treeData, enums, priceTypes } = useContext(RequestContext);
	// handles
	const onChangePriceType = (value) => {
		setPriceType(value);
	};
	// return
	return (
		<>
			<Row gutter={[8, 8]} align={"middle"} className="international-form">
				<Col xs={24} md={12} lg={8}>
					<TreeSelects
						name="fromLocationId"
						treeLine
						required
						dropdownStyle={{ direction: "ltr" }}
						treeData={treeData}
						onLoadData={onLoadData}
						label={t("commonPages.source")}
						placeholder={
							<div className="flex gap-2 align-middle items-center">
								<Icons type="EnvironmentOutlined" classes="pb-1" />
								<span>{t("commonPages.sourceLabel")}</span>
							</div>
						}
					/>
				</Col>
				<Col xs={24} md={12} lg={8}>
					<TreeSelects
						name="toLocationId"
						treeLine
						required
						dropdownStyle={{ direction: "ltr" }}
						treeData={treeData}
						onLoadData={onLoadData}
						label={t("commonPages.destination")}
						placeholder={
							<div className="flex gap-2 align-middle items-center">
								<span>{t("commonPages.destinationLabel")}</span>
							</div>
						}
					/>
				</Col>
				<Col xs={24} md={12} lg={8}>
					<Calendars label={t("commonPages.date")} required={true} jalali={jalali} />
				</Col>
			</Row>
			<Row gutter={[8, 8]} align={"middle"}>
				<Col xs={24} md={12} lg={2}>
					<Selects
						name="cargoWeightUnitIssueId"
						placeholder={t("home.unitIssue")}
						label={t("home.unitIssue")}
						options={enums?.["104"] || []}
						initialValue={enums?.["104"]?.[1]?.id}
					/>
				</Col>
				<Col xs={24} md={12} lg={6}>
					<InputType
						type={"number"}
						name="cargoMaxWeightCapacity"
						placeholder={t("home.cargoMax")}
						label={t("home.cargoMax")}
						required={true}
						initialValue={1}
					/>
				</Col>
				<Col xs={24} md={12} lg={8}>
					<Selects
						name="cargoMaxSizeCapacity"
						placeholder={t("home.cargoMaxSize")}
						label={t("home.cargoMaxSize")}
						options={enums?.["107"] || []}
						initialValue={enums?.["107"]?.[2]?.id}
					/>
				</Col>
			</Row>
			<Row gutter={[8, 8]} align={"middle"}>
				<Col xs={24} md={12} lg={8}>
					<Selects
						name="priceIsNegotiable"
						label={t("home.priceIs")}
						onChange={onChangePriceType}
						options={priceTypes}
						initialValue={true}
					/>
				</Col>
				{!priceType && (
					<>
						<Col xs={24} md={12} lg={8}>
							<Selects
								name="priceCurrencyTypeId"
								placeholder={t("home.currencyType")}
								label={t("home.currencyType")}
								options={enums?.["105"] || []}
								initialValue={enums?.["105"]?.[2]?.id}
							/>
						</Col>
						<Col xs={24} md={12} lg={8}>
							<InputType
								type={"number"}
								name="proposedPrice"
								placeholder={t("home.proposedPrice")}
								label={t("home.proposedPrice")}
								required={true}
							/>
						</Col>
					</>
				)}
			</Row>
			<Row gutter={[8, 8]} align={"middle"}>
				<Col xs={24} md={12} lg={16}>
					<InputType
						name="carrierDesc"
						placeholder={t("home.cargoDesc")}
						label={t("home.cargoDesc")}
						type={"textarea"}
					/>
				</Col>
				<Col xs={24} md={12} lg={8}>
					<Buttons
						content={t("home.getRequest")}
						htmlType="submit"
						classes="float-end mt-5"
						loading={loading}
					/>
				</Col>
			</Row>
		</>
	);
};

export default InternationalGet;
