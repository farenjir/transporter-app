import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Row, Col } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { authSelector, baseSelector } from "store/selector";

import { useAppContext } from "hooks";
import { notificationMaker } from "utils/notification";

import { userUpdate } from "service/main";
import { Buttons, Inputs, Selects } from "components";
import { getCurrentUser } from "store/auth/action";

export default function InfoForm() {
	const [loading, setLoading] = useState(false);
	const [activePass, setActivePass] = useState(false);
	const [activeBtn, setActiveBtn] = useState(false);
	// options
	const { user } = useSelector(authSelector);
	const { countries = [], enums = [] } = useSelector(baseSelector);
	const telecomPrefix = countries.map(({ telecomPrefix: value, nameAndTelPrefix: label }) => ({
		value,
		label,
	}));
	// hooks
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const { callApi, direction } = useAppContext();
	// handles
	const onSubmit = async ({ uPass = null, ...values }, userId) => {
		if (values.uPassword !== uPass) {
			return notificationMaker(t("commons.error"), "error", t("notification.password"));
		}
		setLoading(true);
		const response = await userUpdate(callApi, { ...values, id: userId });
		if (response?.result) {
			notificationMaker(t("commons.success"), "success", t("user.successRegister"));
			dispatch(getCurrentUser({ callApi, updateUser: true }));
		} else {
			notificationMaker(t("commons.error"), "error", t("notification.error"));
			setLoading(false);
		}
	};
	const onChangeOldPass = (event) => {
		if (event.target.value?.length >= 8) {
			setActivePass(true);
		} else {
			setActivePass(false);
		}
	};
	const onValuesChange = () => {
		setActiveBtn(true);
	};
	const onReset = () => {
		setActiveBtn(false);
		setActivePass(false);
	};
	return (
		<Form
			onFinish={(V) => onSubmit(V, user?.id)}
			dir={direction}
			layout="vertical"
			form={form}
			initialValues={user}
			onValuesChange={onValuesChange}
			onReset={onReset}
		>
			<Row gutter={[8, 8]} align={"middle"}>
				<Col xs={24} md={8}>
					<Inputs name="firstName" type="text" label={t("auth.firstName")} required={true} />
				</Col>
				<Col xs={24} md={8}>
					<Inputs name="lastName" type="text" label={t("auth.lastName")} required={true} />
				</Col>
				<Col xs={24} md={8}>
					<Inputs name="email" type="email" label={t("auth.email")} required={true} />
				</Col>
				<Col xs={24} md={8}>
					<Inputs
						name="oldPass"
						type="password"
						label={t("user.oldPass")}
						onChange={onChangeOldPass}
					/>
				</Col>
				<Col xs={24} md={8}>
					<Inputs
						name="uPassword"
						type="password"
						label={t("user.newPass")}
						required={activePass}
						disabled={!activePass}
					/>
				</Col>
				<Col xs={24} md={8}>
					<Inputs
						name="uPass"
						type="password"
						label={t("auth.uPass")}
						required={activePass}
						disabled={!activePass}
					/>
				</Col>
				<Col xs={24} md={24}>
					<Row gutter={[8, 8]} align={"middle"}>
						<Col xs={24} md={8}>
							<Selects
								showSearch
								name="originCountryId"
								options={countries}
								label={t("auth.region")}
								required={true}
							/>
						</Col>
						<Col xs={24} md={8}>
							<Inputs
								name="phoneNumber"
								type="text"
								label={t("auth.phoneNumber")}
								required={true}
							/>
						</Col>
						<Col xs={24} md={8}>
							<Selects
								showSearch
								name="phoneCoutryPrefixId"
								label={t("auth.phonePrefix")}
								options={telecomPrefix}
								required={true}
							/>
						</Col>
					</Row>
				</Col>
				<Col xs={24} md={8}>
					<Selects
						name="genderTypeId"
						label={t("auth.gender")}
						required={true}
						options={enums?.["101"] || []}
					/>
				</Col>
				<Col xs={24} md={8}>
					<Buttons
						type="dashed"
						htmlType="reset"
						block={true}
						content={t("commons.reset")}
						classes="md:mt-8"
						loading={loading}
					/>
				</Col>
				<Col xs={24} md={8}>
					<Buttons
						htmlType="submit"
						block={true}
						content={t("commons.update")}
						classes="md:mt-8"
						loading={loading}
						disabled={!activeBtn}
					/>
				</Col>
			</Row>
		</Form>
	);
}
