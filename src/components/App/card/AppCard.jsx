import { useTranslation } from "react-i18next";
import { Card, Col, Row } from "antd";

import { Buttons } from "components";

const { Meta } = Card;

const AppCard = ({ id, imgUrl, title = "", description = "" }) => {
	const { t } = useTranslation();
	return (
		<Card hoverable cover={<img alt={`cover-${id || "card"}`} src={imgUrl} className="object-cover" />}>
			<Meta
				// avatar={<Avatar src={img} className="-mt-14 h-24 w-24 shadow-xl" />}
				title={title}
				description={description}
			/>
			<Row gutter={[8, 8]} justify={"space-between"} align={"middle"} className="w-full pt-5">
				<Col span={24}>
					<Buttons
						content={t("commons.contentView")}
						type="dashed"
						htmlType="button"
						block={true}
						size="middle"
					/>
				</Col>
			</Row>
		</Card>
	);
};

export default AppCard;
