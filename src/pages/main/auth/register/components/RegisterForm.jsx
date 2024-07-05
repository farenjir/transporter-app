import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Form, Typography, Row, Col, theme } from "antd";

import { useSelector } from "react-redux";
import { baseSelector } from "store/selector";

import { useAppContext } from "hooks";
import { notificationMaker } from "utils/notification";

import { userRegister } from "service/main";
import { Buttons, Inputs, Selects } from "components";

const { Paragraph, Title } = Typography;

export default function AuthForm() {
	const [loading, setLoading] = useState(false);
	// options
	const { countries = [], enums = [] } = useSelector(baseSelector);
	const telecomPrefix = countries.map(({ telecomPrefix: value, nameAndTelPrefix: label }) => ({
		value,
		label,
	}));
	// hooks
	let navigate = useNavigate();
	const { token } = theme.useToken();
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const { callApi, direction } = useAppContext();
	// handles
	const onSubmit = async ({ uPass, ...values }) => {
		if (values.uPassword !== uPass) {
			return notificationMaker(t("commons.error"), "error", t("notification.password"));
		}
		setLoading(true);
		const response = await userRegister(callApi, values);
		if (response?.result) {
			navigate("/auth", { replace: true });
			notificationMaker(t("commons.success"), "success", t("auth.successRegister"));
		} else {
			notificationMaker(t("commons.error"), "error", t("notification.error"));
			setLoading(false);
		}
	};
	return (
		<Form onFinish={onSubmit} dir={direction} layout="vertical" form={form}>
			<div className="mb-7">
				<Title level={3} className="text-2xl font-extrabold" style={{ color: token?.colorPrimary }}>
					{t("auth.registered")}
				</Title>
				<Paragraph className="text-xs mt-4">
					{t("auth.ifRegistered")}
					<strong className="text-blue-500 cursor-pointer text-base">
						<Link to={"/login"} style={{ color: token?.colorPrimary }}>
							{t("auth.ifLogin")}
						</Link>
					</strong>
				</Paragraph>
			</div>
			<Row gutter={[8, 8]} align={"middle"}>
				<Col xs={24} md={12}>
					<Inputs name="firstName" type="text" label={t("auth.firstName")} />
				</Col>
				<Col xs={24} md={12}>
					<Inputs name="lastName" type="text" label={t("auth.lastName")} />
				</Col>
				<Col xs={24} md={12}>
					<Inputs name="email" type="email" label={t("auth.email")} required={true} />
				</Col>
				<Col xs={24} md={4}>
					<Selects
						showSearch
						name="phoneCoutryPrefixId"
						label={t("auth.phonePrefix")}
						options={telecomPrefix}
					/>
				</Col>
				<Col xs={24} md={8}>
					<Inputs name="phoneNumber" type="text" label={t("auth.phoneNumber")} />
				</Col>

				<Col xs={24} md={12}>
					<Inputs name="uPassword" type="password" label={t("auth.uPassword")} required={true} />
				</Col>
				<Col xs={24} md={12}>
					<Inputs name="uPass" type="password" label={t("auth.uPass")} required={true} />
				</Col>
				{/* <Col xs={24} md={8}>
					<Selects
						showSearch
						name="originCountryId"
						options={countries}
						label={t("auth.region")}
						required={true}
					/>
				</Col>
				<Col xs={24} md={8}>
					<Selects
						name="genderTypeId"
						label={t("auth.gender")}
						required={true}
						options={enums?.["101"] || []}
					/>
				</Col> */}
				<Col xs={24} md={{ offset: 12, span: 12 }}>
					<Buttons
						htmlType="submit"
						block={true}
						content={t("auth.registered")}
						classes="mt-3"
						loading={loading}
					/>
				</Col>
			</Row>
		</Form>
	);
}
