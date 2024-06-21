import { Descriptions } from "antd";
// items [] of { key, label, children, span }
const Details = ({ title = "", classes = "", bordered = true, items = [], layout }) => {
	return (
		<>
			<Descriptions
				title={title}
				bordered={bordered}
				items={items}
				className={classes}
				layout={layout}
			/>
		</>
	);
};
export default Details;
