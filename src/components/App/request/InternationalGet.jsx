import { useTranslation } from "react-i18next";
import { Col, Row } from "antd";

import { Buttons, Calendars, Icons, Inputs, Selects } from "components";

const InternationalGetSearch = () => {
	// hooks
	const { t } = useTranslation();
	// return
	return (
		<>
			<Row gutter={[8, 8]} align={"middle"}>
				<Col xs={24} md={12} lg={8}>
					<Selects
						name="source"
						label={"مبدا"}
						required={true}
						placeholder={
							<div className="flex gap-2 align-middle items-center">
								<Icons type="EnvironmentOutlined" classes="pb-1" />
								<span> مبدا ( شهر , فرودگاه )</span>
							</div>
						}
					/>
				</Col>
				<Col xs={24} md={12} lg={8}>
					<Selects
						name="destination"
						label={"مقصد"}
						required={true}
						placeholder={
							<div className="flex gap-2 align-middle items-center">
								<Icons type="EnvironmentOutlined" classes="pb-1" />
								<span> مقصد ( شهر , فرودگاه )</span>
							</div>
						}
					/>
				</Col>
				<Col xs={24} md={12} lg={8}>
					<Calendars label={"تاریخ"} required={true} />
				</Col>
			</Row>
			<Row gutter={[8, 8]} align={"middle"}>
				<Col xs={24} md={12} lg={2}>
					<Selects name="weight" placeholder={"مقیاس"} label={"مقیاس"} />
				</Col>
				<Col xs={24} md={12} lg={6}>
					<Inputs type={"number"} name="names" placeholder={t("وزن بسته")} label="وزن" required={true} />
				</Col>
				{/* <Col xs={24} md={12} lg={8}>
					<Inputs type={"number"} name="names" placeholder={t("تعداد")} label="تعداد" required={true} />
				</Col> */}
			</Row>
			<Row gutter={[8, 8]} align={"middle"}>
				<Col xs={24} md={12} lg={8}>
					<Inputs name="description" placeholder={t("توضیحات بسته")} label="توضیحات بسته" required={true} />
				</Col>
				<Col xs={24} md={12} lg={8}>
					<Inputs name="description" placeholder={t("توضیحات")} label="توضیحات ( اختیاری )" />
				</Col>
				<Col xs={24} md={12} lg={8}>
					<Buttons content={t("ثبت درخواست")} htmlType="submit" classes="float-end mt-8" />
				</Col>
			</Row>
		</>
	);
};

export default InternationalGetSearch;
