import { useTranslation } from "react-i18next";
import { Badge, Card, theme } from "antd";

import { uIdMaker } from "utils/globals";
import { requestCommentType } from "utils/constance";
import { useAppContext, useNewMessageCount } from "hooks";

import { postMessageAsRead } from "service/user";

import { Buttons } from "components";

const { Meta } = Card;

const MyAppCard = ({ type, id, imgUrl, title = "", hoverable = true, description = "", onClick = () => {} }) => {
	const { t } = useTranslation();
	const { token } = theme.useToken();
	const { callApi } = useAppContext();
	const { count } = useNewMessageCount(callApi, { recordId: id, requestType: type });
	return (
		<Badge.Ribbon text={t("notification.newMessage", { count })} color="red" className={count ? "" : "hidden"}>
			<Card
				hoverable={hoverable}
				cover={<img alt={`card-edit-${id || uIdMaker()}`} src={imgUrl} className="object-cover" />}
				style={{ background: token?.colorPrimaryLighter }}
			>
				<Meta title={title} description={description} />
				<Buttons
					htmlType="button"
					block={true}
					content={t("user.showComment")}
					classes="mt-5 opacity-80"
					onClick={() => {
						onClick("comment");
						postMessageAsRead(callApi, { recordId: id, requestType: requestCommentType[type] });
					}}
				/>
			</Card>
		</Badge.Ribbon>
	);
};

export default MyAppCard;
