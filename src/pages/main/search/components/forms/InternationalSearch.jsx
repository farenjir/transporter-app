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
						options={countries}
						label={t("commonPages.source")}
						placeholder={
							<div className="flex gap-2 align-middle items-center">
								<Icons type="EnvironmentOutlined" classes="pb-1" />
								<span>{t("commonPages.sourceLabel")}</span>
							</div>
						}
					/>
				</Col>
				<Col xs={24} md={12} lg={6}>
					<Selects
						placement="topRight"
						name="toCountry"
						options={countries}
						label={t("commonPages.destination")}
						placeholder={
							<div className="flex gap-2 align-middle items-center">
								<Icons type="EnvironmentOutlined" classes="pb-1" />
								<span>{t("commonPages.destinationLabel")}</span>
							</div>
						}
					/>
				</Col>
				<Col xs={24} md={12} lg={6}>
					<CalenderDateRange label={t("commons.date")} />
				</Col>
				<Col xs={24} md={12} lg={6} className="flex gap-2">
					<Buttons
						content={t("commons.search")}
						htmlType="submit"
						classes="float-end mt-8 px-10"
						disabled={loading}
					/>
					<Buttons
						content={t("commons.reset")}
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
