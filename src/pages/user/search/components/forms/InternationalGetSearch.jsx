import { useTranslation } from "react-i18next";
import { Col, Row } from "antd";

import { Buttons, CalenderDateRange, Icons, Selects } from "components";

const InternationalGetSearch = () => {
	// hooks
	const { t } = useTranslation();
	// return
	return (
		<>
			<Row gutter={[8, 8]} align={"middle"}>
				<Col xs={24} md={12} lg={7}>
					<Selects
						name="source"
						label={"مبدا"}
						placeholder={
							<div className="flex gap-2 align-middle items-center">
								<Icons type="EnvironmentOutlined" classes="pb-1" />
								<span> مبدا ( کشور , شهر , فرودگاه )</span>
							</div>
						}
					/>
				</Col>
				<Col xs={24} md={12} lg={7}>
					<Selects
						name="destination"
						label={"مقصد"}
						placeholder={
							<div className="flex gap-2 align-middle items-center">
								<Icons type="EnvironmentOutlined" classes="pb-1" />
								<span> مقصد ( کشور , شهر , فرودگاه )</span>
							</div>
						}
					/>
				</Col>
				<Col xs={24} md={12} lg={7}>
					<CalenderDateRange label={"تاریخ"} />
				</Col>
				<Col xs={24} md={12} lg={3}>
					<Buttons content={t("جستجو")} htmlType="submit" classes="float-end mt-8" block={true} />
				</Col>
			</Row>
		</>
	);
};

export default InternationalGetSearch;
