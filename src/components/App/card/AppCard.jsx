import { Avatar, Card, Col, Row } from "antd";
import { BookOutlined } from "@ant-design/icons";

import { Buttons } from "components";
import img from "/assets/icons/avatar.svg";

const { Meta } = Card;

const AppCard = ({ id, imgUrl, title = "", description = "" }) => (
	<Card hoverable cover={<img alt={`cover-${id}`} src={imgUrl} className="object-cover" />}>
		<Meta
			avatar={<Avatar src={img} className="-mt-14 h-24 w-24 shadow-xl" />}
			title={title}
			description={description}
		/>
		<Row gutter={[8, 8]} justify={"space-between"} align={"middle"} className="w-full pt-5">
			<Col span={22}>
				<Buttons content="مشاهده اطلاعات" type="dashed" htmlType="button" block={true} size="middle" />
			</Col>
			<Col span={2}>
				<BookOutlined className="text-xl pb-6" />
			</Col>
		</Row>
	</Card>
);

export default AppCard;
