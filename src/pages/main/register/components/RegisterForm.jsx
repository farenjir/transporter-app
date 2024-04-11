import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Form, Typography, Row, Col } from "antd";

import { useAppContext } from "hooks";
import { Buttons, Inputs, Selects } from "components";

const { Paragraph, Title } = Typography;

export default function AuthForm() {
	const { callApi, direction } = useAppContext();
	const { t } = useTranslation();
	const [form] = Form.useForm();
	// const { loading, userName } = useAppSelector(authSelector);
	// handles
	const onSubmit = async (values) => {};
	return (
		<Form onFinish={onSubmit} dir={direction} layout="vertical" form={form}>
			<div className="mb-7">
				<Title level={3} className="text-2xl font-extrabold">
					{t("ثبت نام")}
				</Title>
				<Paragraph className="text-xs mt-4">
					{t("اگر حساب کاربری دارید ")}
					<strong className="text-blue-500 cursor-pointer">
						<Link to={"/"}>{t("وارد سامانه شود.")}</Link>
					</strong>
				</Paragraph>
			</div>
			<Row gutter={[8, 8]} align={"middle"}>
				<Col xs={24} md={12}>
					<Inputs name="username" type="text" label={t("نام")} required={true} />
				</Col>
				<Col xs={24} md={12}>
					<Inputs name="password" type="password" label={t("نام خانوادگی")} required={true} />
				</Col>
				<Col xs={24} md={12}>
					<Inputs name="email" type="email" label={t("auth.email")} required={true} />
				</Col>
				<Col xs={24} md={24}>
					<Row gutter={[8, 8]} align={"middle"}>
					<Col xs={24} md={12}>
							<Inputs name="password" type="password" label={t("شماره همراه")} required={true} />
						</Col>
						<Col xs={24} md={4}>
							<Selects name="weight" placeholder={"+98"} label={"پیش شماره"} />
						</Col>
					
					</Row>
				</Col>
				<Col xs={24} md={8}>
					<Selects name="weight" label={"ملیت"} required={true} />
				</Col>
				<Col xs={24} md={8}>
					<Selects name="weight" label={"جنسیت"} required={true} />
				</Col>
				<Col xs={{ span: 24 }} md={8} lg={80}>
					<Buttons htmlType="submit" block={true} content={t("ثبت نام")} classes="mt-8" />
				</Col>
			</Row>
		</Form>
	);
}
