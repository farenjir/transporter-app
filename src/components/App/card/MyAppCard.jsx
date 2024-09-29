import { useTranslation } from "react-i18next";
import { Badge, Card, theme } from "antd";

import { uIdMaker } from "utils/globals";
import { requestCommentType } from "utils/constance";
import { useAppContext, useNewMessageCount } from "hooks";

import { postMessageAsRead } from "service/user";

import { Icons } from "components";

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
				<div className="flex justify-end align-middle items-center pt-5 text-xl">
					<Icons
						type="CommentOutlined"
						classes="text-green-500 mx-5"
						title={t("commons.comment")}
						onClick={() => {
							onClick("comment");
							postMessageAsRead(callApi, { recordId: id, requestType: requestCommentType[type] });
						}}
					/>
					<Icons
						type="InfoCircleOutlined"
						classes="text-blue-500"
						title={t("commons.info")}
						onClick={() => onClick("info")}
					/>
					<Icons
						type="EditOutlined"
						classes="text-orange-500 mx-5"
						title={t("commons.edit")}
						onClick={() => onClick("edit")}
					/>
					<Icons
						type="DeleteOutlined"
						classes="text-red-500"
						title={t("commons.delete")}
						onClick={() => onClick("delete")}
					/>
				</div>
			</Card>
		</Badge.Ribbon>
	);
};

export default MyAppCard;
