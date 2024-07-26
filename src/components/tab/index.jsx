import { Tabs } from "antd";

const AppTabs = ({
	defaultActiveKey,
	items = [], // key, label, children, icon, forceRender, className, active, ...
	classes = "",
	onChange = () => {},
	type = "line",
	tabPosition = "top",
	centered = false,
	tabBarExtraContent,
}) => {
	return (
		<Tabs
			defaultActiveKey={defaultActiveKey}
			items={items}
			className={classes}
			type={type}
			onChange={onChange}
			centered={centered}
			tabPosition={tabPosition}
			tabBarExtraContent={tabBarExtraContent}
		/>
	);
};
export default AppTabs;
