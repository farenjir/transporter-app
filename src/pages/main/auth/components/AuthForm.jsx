import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Form } from "antd";

import { useAppContext } from "hooks";
import { Buttons, Inputs } from "components";

export default function AuthForm() {
	const { callApi, direction } = useAppContext();
	const { t } = useTranslation();
	const [form] = Form.useForm();
	// const { loading, userName } = useAppSelector(authSelector);
	// handles
	const onSubmit = async (values) => {};
	return (
		<>
			<Form onFinish={onSubmit} dir={direction} layout="vertical" form={form}>
				<div className="mb-7">
					<h3 className="text-2xl font-extrabold">{t("auth.title")}</h3>
					<p className="text-xs mt-4">
						{t("auth.description")}
						<strong className="text-blue-500 cursor-pointer">{t("auth.register")}</strong>
					</p>
				</div>
				<Inputs
					name="username"
					type="text"
					label={t("auth.username")}
					required={true}
					addonAfter={<UserOutlined />}
				/>
				<Inputs
					name="password"
					type="password"
					label={t("auth.password")}
					required={true}
					addonAfter={<LockOutlined />}
				/>
				<Buttons htmlType="submit" block={true} content={t("auth.login")} classes="mt-3" />
			</Form>
		</>
	);
}
