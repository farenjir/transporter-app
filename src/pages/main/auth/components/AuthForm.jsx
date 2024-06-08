import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Typography, theme } from "antd";

import { TOKEN_NAME } from "utils/constance";
import { setToCookie } from "utils/storage";

import { useAppContext } from "hooks";
import { userAuthentication } from "service/main";

import { Buttons, Inputs } from "components";
import { notificationMaker } from "utils/notification";

const { Paragraph, Title } = Typography;

export default function AuthForm() {
	const [loading, setLoading] = useState(false);
	// hooks
	let navigate = useNavigate();
	const { token } = theme.useToken();
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const { callApi, direction } = useAppContext();
	// handles
	const onSubmit = async ({ cpid, pNumber }) => {
		setLoading(true);
		const response = await userAuthentication(callApi, cpid, pNumber);
		if (response?.result) {
			setToCookie(TOKEN_NAME, response.result);
			navigate("/user", { replace: true });
			notificationMaker(t("commons.success"), "success", t("auth.successLogin"));
		} else {
			setLoading(false);
			notificationMaker(t("commons.error"), "error", t("auth.failed"));
		}
	};
	return (
		<Form onFinish={onSubmit} dir={direction} layout="vertical" form={form} initialValues={{ cpid: "1" }}>
			<div className="mb-7">
				<Title level={3} className="text-2xl font-extrabold" style={{ color: token?.colorPrimary }}>
					{t("auth.title")}
				</Title>
				<Paragraph className="text-xs mt-4">
					{t("auth.description")}
					<strong className="text-blue-500 cursor-pointer text-base">
						<Link to={"/register"} style={{ color: token?.colorPrimary }}>
							{t("auth.register")}
						</Link>
					</strong>
				</Paragraph>
			</div>
			<Inputs
				name="cpid"
				type="text"
				label={t("auth.cpId")}
				required={true}
				addonAfter={<UserOutlined />}
			/>
			<Inputs
				name="pNumber"
				type="password"
				label={t("auth.pNumber")}
				autoComplete={"true"}
				required={true}
				addonAfter={<LockOutlined />}
			/>
			<Buttons
				htmlType="submit"
				block={true}
				content={t("auth.login")}
				classes="mt-3"
				loading={loading}
			/>
		</Form>
	);
}
