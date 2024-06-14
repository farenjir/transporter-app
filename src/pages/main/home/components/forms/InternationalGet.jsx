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
						label={"مبدا"}
						treeLine
						required
						dropdownStyle={{ direction: "ltr" }}
						treeData={treeData}
						onLoadData={onLoadData}
						placeholder={
							<div className="flex gap-2 align-middle items-center">
								<Icons type="EnvironmentOutlined" classes="pb-1" />
								<span> مبدا ( کشور , شهر , فرودگاه )</span>
							</div>
						}
					/>
				</Col>
				<Col xs={24} md={12} lg={8}>
					<TreeSelects
						name="toLocationId"
						label={"مقصد"}
						treeLine
						required
						dropdownStyle={{ direction: "ltr" }}
						treeData={treeData}
						onLoadData={onLoadData}
						placeholder={
							<div className="flex gap-2 align-middle items-center">
								<Icons type="EnvironmentOutlined" classes="pb-1" />
								<span> مقصد ( کشور , شهر , فرودگاه )</span>
							</div>
						}
					/>
				</Col>
				<Col xs={24} md={12} lg={8}>
					<Calendars label={"تاریخ"} required={true} jalali={jalali} />
				</Col>
			</Row>
			<Row gutter={[8, 8]} align={"middle"}>
				<Col xs={24} md={12} lg={8}>
					<InputType
						name="fromLocationDesc"
						placeholder={t("توضیحات مبدا")}
						label={t("توضیحات مبدا")}
						required={true}
						type={"textarea"}
					/>
				</Col>
				<Col xs={24} md={12} lg={8}>
					<InputType
						name="toLocationDesc"
						placeholder={t("توضیحات مقصد")}
						label={t("توضیحات مقصد")}
						required={true}
						type={"textarea"}
					/>
				</Col>
			</Row>
			<Row gutter={[8, 8]} align={"middle"}>
				<Col xs={24} md={12} lg={2}>
					<Selects
						name="cargoWeightUnitIssueId"
						placeholder={"مقیاس"}
						label={"مقیاس"}
						options={enums["104"] || []}
						initialValue={enums["104"]?.[1]?.id}
					/>
				</Col>
				<Col xs={24} md={12} lg={6}>
					<InputType
						type={"number"}
						name="cargoWeight"
						placeholder={t("وزن بسته")}
						label="وزن"
						required={true}
					/>
				</Col>
				<Col xs={24} md={12} lg={8}>
					<InputType
						type={"number"}
						name="cargoItemNo"
						placeholder={t("تعداد")}
						label="تعداد"
						initialValue={1}
						required={true}
					/>
				</Col>
				<Col xs={24} md={12} lg={8}>
					<Selects
						name="cargoSize"
						label={t("سایز بسته")}
						placeholder={t("سایز بسته")}
						options={enums["107"] || []}
						initialValue={enums["107"]?.[2]?.id}
					/>
				</Col>
			</Row>
			<Row gutter={[8, 8]} align={"middle"}>
				<Col xs={24} md={12} lg={8}>
					<Selects
						name="priceIsNegotiable"
						label={"قیمت"}
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
								placeholder={"واحد"}
								label={"واحد"}
								options={enums["105"] || []}
								initialValue={enums["105"]?.[2]?.id}
							/>
						</Col>
						<Col xs={24} md={12} lg={8}>
							<InputType
								type={"number"}
								name="proposedPrice"
								placeholder={t("قیمت پیشنهادی")}
								label={t("قیمت پیشنهادی")}
								required={true}
							/>
						</Col>
					</>
				)}
			</Row>
			<Row gutter={[8, 8]} align={"middle"}>
				<Col xs={24} md={12} lg={8}>
					<InputType
						name="cargoDesc"
						placeholder={t("توضیحات بسته")}
						label="توضیحات بسته"
						required={true}
						type={"textarea"}
					/>
				</Col>
				<Col xs={24} md={12} lg={8}>
					<InputType
						name="description"
						type={"textarea"}
						placeholder={t("توضیحات")}
						label="توضیحات ( اختیاری )"
					/>
				</Col>
				<Col xs={24} md={12} lg={8}>
					<Buttons
						content={t("ثبت درخواست دریافت")}
						htmlType="submit"
						classes="float-end mt-8"
						loading={loading}
					/>
				</Col>
			</Row>
		</>
	);
};

export default InternationalGet;
