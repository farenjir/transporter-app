import { CloseCircleOutlined } from "@ant-design/icons";
import { Drawer } from "antd";

const Drawers = ({
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
			title={
				<div className="flex justify-between align-middle items-center">
					<p className="text-base lg:text-lg">{title}</p>
					<CloseCircleOutlined onClick={onClose} className="text-lg"/>
				</div>
			}
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
export default Drawers;
