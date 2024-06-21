import { Card, theme, Typography } from "antd";
import { useTranslation } from "react-i18next";

import InfoForm from "./components/InfoForm";

const { Title } = Typography;

const RegisterPage = () => {
	const { t } = useTranslation();
	const { token } = theme.useToken();
	return (
		<>
			<Card
				title={
					<Title level={4} className="pt-3" style={{ color: token?.colorPrimary }}>
						{t("user.profile")}
					</Title>
				}
			>
				<InfoForm />
			</Card>
		</>
	);
};
export default RegisterPage;
