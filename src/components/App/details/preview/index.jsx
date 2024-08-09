import { useTranslation } from "react-i18next";
import { theme } from "antd";
import { InfoCircleOutlined, MessageOutlined } from "@ant-design/icons";

import { useWindowDimensions } from "hooks";
import { requestCommentType } from "utils/constance";

import { AppTabs } from "components";
import CommentForm from "components/App/comment";
import GetDetails from "./components/GetDetails";
import SendDetails from "./components/SendDetails";

const RequestDetails = ({ mode, selectRequest = {}, drawerMode = "details" }) => {
	const { token } = theme.useToken();
	const { t } = useTranslation();
	const { width } = useWindowDimensions();
	// tabs
	const appTabOptions = [
		{
			key: "details",
			label: (
				<div className="flex flex-col gap-1 justify-center align-middle items-center">
					<InfoCircleOutlined className="text-lg" />
					<span>{t("request.details")}</span>
				</div>
			),
			children: <>{mode === "send" ? <SendDetails params={selectRequest} /> : <GetDetails params={selectRequest} />}</>,
		},
		{
			key: "comment",
			label: (
				<div className="flex flex-col gap-1 justify-center align-middle items-center">
					<MessageOutlined className="text-lg" />
					<span>{t("request.sendMessage")}</span>
				</div>
			),
			children: <CommentForm record={selectRequest} requestType={requestCommentType[mode]} />,
		},
	];
	// returnJSX
	const title = t("home.cards.sendTo", {
		fromCountryName: selectRequest.fromCountryName,
		toCountryName: selectRequest.toCountryName,
		fromLocationName: selectRequest.fromLocationName,
		toLocationName: selectRequest.toLocationName,
	});
	return (
		<>
			<div className="flex flex-col md:flex-row justify-between align-middle items-center md:hidden">
				<p className="text-base lg:text-xl pb-4" style={{ color: token?.colorPrimary }}>
					{title}
				</p>
			</div>
			<AppTabs
				defaultActiveKey={drawerMode}
				items={appTabOptions}
				centered={width < 750}
				tabBarExtraContent={
					<p className="text-base lg:text-xl hidden md:block" style={{ color: token?.colorPrimary }}>
						{title}
					</p>
				}
			/>
		</>
	);
};
export default RequestDetails;
