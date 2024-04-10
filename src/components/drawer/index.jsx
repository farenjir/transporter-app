import { Drawer } from "antd";

const PublicDrawer = ({
	title = "",
	placement = "left",
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
