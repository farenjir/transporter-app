import { Card, Col, Row } from "antd";
import { LeftOutlined } from "@ant-design/icons";

import { Buttons } from "@/components";

const BlogCard = ({ id, imgUrl = "", title = "", description = "", flexRow = false }) => (
	<>
		{flexRow ? (
			<Row className="h-[250px]" key={`blog-${id}`} gutter={[8, 8]}>
				<Col
					md={12}
					className="rounded-2xl"
					style={{
						backgroundImage: `url(${imgUrl})`,
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center",
						backgroundSize: "cover",
					}}
				></Col>
				<Col md={12} className="flex flex-col justify-between">
					<Card.Meta title={title} description={description} className="px-5" />
					<Buttons
						content={
							<div className="flex gap-1 align-middle items-center">
								<span className="p-1">ادامه مطلب</span>
								<LeftOutlined />
							</div>
						}
						type="dashed"
						htmlType="button"
						size="default"
						classes="text-sm float-end mt-5"
					/>
				</Col>
			</Row>
		) : (
			<Card key={`blog-${id}`} hoverable cover={<img alt={`cover-${id}`} src={imgUrl} className="h-40" />}>
				<Card.Meta title={title} description={description} />
				<Buttons
					content={
						<div className="flex gap-1 align-middle items-center">
							<span className="p-1">ادامه مطلب</span>
							<LeftOutlined />
						</div>
					}
					type="dashed"
					htmlType="button"
					size="default"
					classes="text-sm float-end mt-5"
				/>
			</Card>
		)}
	</>
);

export default BlogCard;
