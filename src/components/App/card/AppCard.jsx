import { useTranslation } from "react-i18next";
import { Card, Col, Row } from "antd";

import { Buttons } from "components";

const { Meta } = Card;

const AppCard = ({ id, imgUrl, title = "", description = "", onClickBtn = () => {} }) => {
	const { t } = useTranslation();
	return (
		<Card hoverable cover={<img alt={`cover-${id || "card"}`} src={imgUrl} className="object-cover max-h-[100px]" />}>
			<Meta title={title} description={description} />
			<Row gutter={[8, 2]} className="pt-5 opacity-80">
				<Col md={12}>
					<Buttons
						onClick={() => onClickBtn("details")}
						content={t("commons.contentView")}
						htmlType="button"
						size="middle"
						block={true}
					/>
				</Col>
				<Col md={12}>
					<Buttons
						onClick={() => onClickBtn("comment")}
						content={t("request.sendMessage")}
						htmlType="button"
						size="middle"
						block={true}
					/>
				</Col>
			</Row>
		</Card>
	);
};

export default AppCard;
