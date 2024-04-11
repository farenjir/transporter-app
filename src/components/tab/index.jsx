import { Tabs } from "antd";

const AppTabs = ({
	defaultActiveKey,
	items = [], // key, label, children, icon, forceRender, className, active, ...
	classes = "",
	onChange = () => {},
	type = "line",
	centered = false,
}) => {
	return (
		<Tabs
			defaultActiveKey={defaultActiveKey}
			items={items}
			className={classes}
			type={type}
			onChange={onChange}
			centered={centered}
		/>
	);
};
export default AppTabs;
