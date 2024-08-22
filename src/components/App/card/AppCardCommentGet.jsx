import { useTranslation } from "react-i18next";
import { Card, theme } from "antd";

import { uIdMaker } from "utils/globals";

import { Buttons } from "components";

const { Meta } = Card;

const AppCardCommentGet = ({ id, imgUrl, title = "", hoverable = true, description = "", onClick = () => {} }) => {
	const { t } = useTranslation();
	const { token } = theme.useToken();
	return (
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
				onClick={() => onClick("comment")}
				classes="mt-5 opacity-80"
			/>
		</Card>
	);
};

export default AppCardCommentGet;
