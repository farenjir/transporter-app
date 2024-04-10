import { Drawer } from "antd";

const PublicDrawer = ({
	title = "",
	placement = "left",
	width = "300px",
	open = false,
	onClose = () => {},
	closable = false,
	destroyOnClose = false,
	content,
}) => {
	return (
		<Drawer
			id={title}
			key={title}
			title={title}
			width={width}
			placement={placement}
			closable={closable}
			onClose={onClose}
			destroyOnClose={destroyOnClose}
			open={open}
		>
			{content}
		</Drawer>
	);
};
export default PublicDrawer;
