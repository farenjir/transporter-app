import { useTranslation } from "react-i18next";
import { Card, theme } from "antd";

import { uIdMaker } from "utils/globals";

import { Icons } from "components";

const { Meta } = Card;

const MyAppCard = ({ id, imgUrl, title = "", hoverable = true, description = "", onClick = () => {} }) => {
	const { t } = useTranslation();
	const { token } = theme.useToken();
	return (
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
					onClick={() => onClick("comment")}
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
	);
};

export default MyAppCard;
