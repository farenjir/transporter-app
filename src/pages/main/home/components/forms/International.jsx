import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Col, Row, Spin } from "antd";

import { RequestContext } from "./context";
import { Buttons, Icons, InputType, Selects } from "components";
import { AutocompletePublic, CalenderDateRange } from "components";

const International = () => {
	const [priceType, setPriceType] = useState(true);
	// hooks
	const { t } = useTranslation();
	const { onChangeAutocomplete, autocompleteLoading, autoData, loading, jalali, enums, priceTypes } =
		useContext(RequestContext);
	// handles
	const onChangePriceType = (value) => {
		setPriceType(value);
	};
	// return
	return (
		<>
			<Row gutter={[8, 8]} align={"middle"} className="international-form">
				<Col xs={24} md={12} lg={8}>
					<AutocompletePublic
						name="fromLocationId"
						label={
							<div className="flex gap-2">
								<span>{t("commonPages.source")}</span>
								<Spin spinning={autocompleteLoading} size="small" className="pt-1" />
							</div>
						}
						required={true}
						options={autoData}
						onChange={onChangeAutocomplete}
						placeholder={
							<div className="flex gap-2 align-middle items-center">
								<Icons type="EnvironmentOutlined" classes="pb-1" />
								<span>{t("commonPages.sourceLabel")}</span>
							</div>
						}
					/>
				</Col>
				<Col xs={24} md={12} lg={8}>
					<AutocompletePublic
						name="toLocationId"
						label={
							<div className="flex gap-2">
								<span>{t("commonPages.destination")}</span>
								<Spin spinning={autocompleteLoading} size="small" className="pt-1" />
							</div>
						}
						required={true}
						options={autoData}
						onChange={onChangeAutocomplete}
						placeholder={
							<div className="flex gap-2 align-middle items-center">
								<Icons type="EnvironmentOutlined" classes="pb-1" />
								<span>{t("commonPages.sourceLabel")}</span>
							</div>
						}
					/>
				</Col>
				<Col xs={24} md={12} lg={8}>
					<CalenderDateRange label={t("commons.date")} required={true} jalali={jalali} />
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
						name="cargoWeight"
						placeholder={t("home.cargoWeight")}
						label={t("home.cargoWeight")}
						required={true}
						initialValue={1}
					/>
				</Col>
				<Col xs={24} md={12} lg={8}>
					<InputType
						type={"number"}
						name="cargoItemNo"
						placeholder={t("home.ItemNo")}
						label={t("home.ItemNo")}
						initialValue={1}
						required={true}
					/>
				</Col>
				<Col xs={24} md={12} lg={8}>
					<Selects
						name="cargoSize"
						placeholder={t("home.cargoSize")}
						label={t("home.cargoSize")}
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
						name="cargoDesc"
						placeholder={t("home.cargoDesc")}
						label={t("home.cargoDesc")}
						type={"textarea"}
					/>
				</Col>
				<Col xs={24} md={12} lg={8}>
					<Buttons
						content={t("home.sendRequest")}
						htmlType="submit"
						classes="float-end mt-8"
						loading={loading}
					/>
				</Col>
			</Row>
		</>
	);
};

export default International;
