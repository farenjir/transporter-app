import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Col, Row, Spin } from "antd";

import { SearchContext } from "./context";
import { AutocompletePublic, Buttons, CalenderDateRange, Icons } from "components";

const International = () => {
	// hooks
	const { t } = useTranslation();
	const { loading, jalali, autocompleteLoading, autoData, onChangeAutocomplete } = useContext(SearchContext);
	// return
	return (
		<Spin spinning={loading}>
			<Row gutter={[8, 8]} align={"middle"} className="international-form">
				<Col xs={24} md={12} lg={6}>
					<AutocompletePublic
						name="fromCountry"
						label={
							<div className="flex gap-2">
								<span>{t("commonPages.source")}</span>
								<Spin spinning={autocompleteLoading} size="small" className="pt-1" />
							</div>
						}
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
				<Col xs={24} md={12} lg={6}>
					<AutocompletePublic
						name="toCountry"
						label={
							<div className="flex gap-2">
								<span>{t("commonPages.destination")}</span>
								<Spin spinning={autocompleteLoading} size="small" className="pt-1" />
							</div>
						}
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
				<Col xs={24} md={12} lg={6}>
					<CalenderDateRange label={t("commons.date")} jalali={jalali} />
				</Col>
				<Col xs={24} md={12} lg={6} className="flex gap-2">
					<Buttons content={t("commons.search")} htmlType="submit" classes="float-end mt-8 px-10" disabled={loading} />
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
