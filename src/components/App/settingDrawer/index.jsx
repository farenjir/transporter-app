import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Col, Radio, Row, Typography } from "antd";

const { Title } = Typography;

const DrawerContent = ({
	language = "fa",
	tokens = {},
	themeMode = "default",
	fontMode = "default",
	selectedToken = "default",
	// handles
	changeLanguage,
	changeTheme,
	changeFontMode,
	changeTokenMode,
}) => {
	const { t } = useTranslation();
	const colors = useMemo(
		() =>
			Object.entries(tokens).map(([key, { colorPrimary }]) => ({
				style: { backgroundColor: colorPrimary },
				value: key,
			})),
		[tokens],
	);
	return (
		<Row gutter={[16, 16]}>
			<Title level={5}>{t("layouts.mode")}</Title>
			<Col span={24}>
				<Radio.Group
					buttonStyle="solid"
					defaultValue={themeMode}
					onChange={(e) => changeTheme(e.target.value)}
					optionType="button"
					options={[
						{
							label: t("layouts.light"),
							value: "default",
						},
						{
							label: t("layouts.dark"),
							value: "dark",
						},
					]}
				/>
			</Col>
			<Title level={5}>{t("layouts.theme")}</Title>
			<Col span={24}>
				<Radio.Group
					value={selectedToken}
					buttonStyle="solid"
					onChange={(e) => changeTokenMode(e.target.value)}
					optionType="button"
					options={colors}
				/>
			</Col>
			<Title level={5}>{t("layouts.fontSize")}</Title>
			<Col span={24}>
				<Radio.Group
					buttonStyle="solid"
					defaultValue={fontMode}
					onChange={(e) => changeFontMode(e.target.value)}
					optionType="button"
					options={[
						{
							label: t("layouts.fontDefault"),
							value: "none",
						},
						{
							label: t("layouts.fontSmall"),
							value: "compact",
						},
					]}
				/>
			</Col>
			<Title level={5}>{t("layouts.language")}</Title>
			<Col span={24}>
				<Radio.Group
					buttonStyle="solid"
					defaultValue={language}
					onChange={(e) => changeLanguage(e.target.value)}
					optionType="button"
					options={[
						{
							label: "English",
							value: "en",
						},
						{
							label: "Italy",
							value: "it",
						},
						{
							label: "فارسی",
							value: "fa",
						},
						{
							label: "عربی",
							value: "ar",
						},
					]}
				/>
			</Col>
			<Title level={5}>{t("layouts.version")}</Title>
			<Col span={24}>
				<Radio.Group
					buttonStyle="solid"
					defaultValue={"version"}
					optionType="button"
					options={[
						{
							label: t("layouts.versionNumber"),
							value: "version",
						},
					]}
				/>
			</Col>
		</Row>
	);
};

export default DrawerContent;
