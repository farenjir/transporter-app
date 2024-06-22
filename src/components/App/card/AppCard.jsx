import { useTranslation } from "react-i18next";
import { Card } from "antd";

import { Buttons } from "components";
import { Link } from "react-router-dom";

const { Meta } = Card;

const AppCard = ({ id, imgUrl, title = "", description = "", link = { to: "", state: {} } }) => {
	const { t } = useTranslation();
	return (
		<Card
			hoverable
			cover={<img alt={`cover-${id || "card"}`} src={imgUrl} className="object-cover max-h-[100px]" />}
		>
			<Meta title={title} description={description} />
			<Buttons
				content={<Link {...link}>{t("commons.contentView")}</Link>}
				type="dashed"
				htmlType="button"
				block={true}
				size="middle"
				classes="mt-5"
			/>
		</Card>
	);
};

export default AppCard;
