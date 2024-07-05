import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GoogleOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Form, Typography, theme } from "antd";

import { TOKEN_NAME } from "utils/constance";
import { setToCookie } from "utils/storage";
import { notificationMaker } from "utils/notification";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "store/auth/action";

import { useAppContext } from "hooks";
import { userAuthentication } from "service/main";

import "../style.css";
import { Buttons, Inputs } from "components";

const { Paragraph, Title } = Typography;

export default function AuthForm() {
	const [loading, setLoading] = useState(false);
	// hooks
	let navigate = useNavigate();
	const dispatch = useDispatch();
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
			navigate("/main", { replace: true });
			notificationMaker(t("commons.success"), "success", t("auth.successLogin"));
			dispatch(getCurrentUser({ callApi }));
		} else {
			setLoading(false);
			notificationMaker(t("commons.error"), "error", t("auth.failed"));
		}
	};
	return (
		<Form onFinish={onSubmit} dir={direction} layout="vertical" form={form}>
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
				label={t("auth.email")}
				required={true}
				addonAfter={<MailOutlined />}
			/>
			<Inputs
				name="pNumber"
				type="password"
				label={t("auth.uPassword")}
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
			<div className="relative flex mb-2 items-center">
				<div className="flex-grow border-t border-gray-400"></div>
				<span className="flex-shrink mx-4 text-gray-400">{t("auth.otherLogin")}</span>
				<div className="flex-grow border-t border-gray-400"></div>
			</div>
			<div className="flex gap-2 justify-between align-middle items-center">
				<Buttons
					type="dashed"
					htmlType="button"
					block={true}
					disabled
					content={
						<span
							className={`pt-2 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-200 text-transparent bg-clip-text animate-gradient`}
						>
							{t("FACEBOOK")}
						</span>
					}
					formClasses="basis-1/2"
				/>
				<Buttons
					type="dashed"
					htmlType="button"
					block={true}
					disabled
					content={
						<span
							className={`pt-2 bg-gradient-to-r from-orange-700 via-yellow-500 to-green-400 text-transparent bg-clip-text animate-gradient`}
						>
							{t("GOOGLE")}
						</span>
					}
					formClasses="basis-1/2"
				/>
			</div>
		</Form>
	);
}
