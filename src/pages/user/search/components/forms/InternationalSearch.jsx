import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Col, Row, Spin } from "antd";

import { SearchContext } from "./context";
import { Buttons, CalenderDateRange, Icons, Selects } from "components";

const International = () => {
	// hooks
	const { t } = useTranslation();
	const { loading, countries } = useContext(SearchContext);
	// return
	return (
		<Spin spinning={loading}>
			<Row gutter={[8, 8]} align={"middle"} className="international-form">
				<Col xs={24} md={12} lg={6}>
					<Selects
						placement="topRight"
						name="fromCountry"
						label={"مبدا"}
						options={countries}
						placeholder={
							<div className="flex gap-2 align-middle items-center">
								<Icons type="EnvironmentOutlined" classes="pb-1" />
								<span> مبدا ( کشور , شهر , فرودگاه )</span>
							</div>
						}
					/>
				</Col>
				<Col xs={24} md={12} lg={6}>
					<Selects
						placement="topRight"
						name="toCountry"
						label={"مقصد"}
						options={countries}
						placeholder={
							<div className="flex gap-2 align-middle items-center">
								<Icons type="EnvironmentOutlined" classes="pb-1" />
								<span> مقصد ( کشور , شهر , فرودگاه )</span>
							</div>
						}
					/>
				</Col>
				<Col xs={24} md={12} lg={6}>
					<CalenderDateRange label={"تاریخ"} />
				</Col>
				<Col xs={24} md={12} lg={6} className="flex gap-2">
					<Buttons
						content={t("جستجو")}
						htmlType="submit"
						classes="float-end mt-8 px-10"
						disabled={loading}
					/>
					<Buttons
						content={t("بازنشانی")}
						htmlType="reset"
						type="default"
						classes="float-end mt-8 px-10"
						disabled={loading}
					/>
				</Col>
			</Row>
		</Spin>
	);
};

export default International;
