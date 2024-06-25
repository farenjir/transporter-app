import { Drawer } from "antd";

const PublicDrawer = ({
	title = "",
	placement = "left",
	width = 300,
	open = false,
	onClose = () => {},
	closable = false,
	maskClosable = true,
	destroyOnClose = false,
	content,
	size, // 'default' | 'large'
	zIndex = 1000,
	autoFocus = true,
}) => {
	return (
		<Drawer
			id={title}
			key={title}
			title={title}
			width={size ? undefined : width}
			placement={placement}
			maskClosable={maskClosable}
			closable={closable}
			onClose={onClose}
			destroyOnClose={destroyOnClose}
			open={open}
			size={size}
			zIndex={zIndex}
			autoFocus={autoFocus}
		>
			{content}
		</Drawer>
	);
};
export default PublicDrawer;
