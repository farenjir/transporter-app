import { useState, useImperativeHandle } from "react";

import { Modal } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

import { useWindowDimensions } from "hooks";

const Modals = ({
	children = null,
	title = "",
	className = "",
	removeCloseButton = false,
	maskClosable = true,
	destroyOnClose = true,
	keyboard = false,
	centered = true,
	footer = null,
	reference,
	closeIcon = <CloseCircleOutlined className="text-2xl" />,
}) => {
	const [open, setOpen] = useState(false);
	// hooks
	const { width } = useWindowDimensions();
	useImperativeHandle(reference, () => ({
		open: () => {
			setOpen(true);
		},
		close: () => {
			setOpen(false);
		},
	}));
	//   return
	return (
		<Modal
			title={<p className="text-lg pb-3">{title}</p>}
			style={{ width: (80 * width) / 100, minWidth: (70 * width) / 100 }}
			className={className}
			keyboard={keyboard}
			destroyOnClose={destroyOnClose}
			maskClosable={maskClosable}
			closable={!removeCloseButton}
			onCancel={() => setOpen(false)}
			centered={centered}
			footer={footer}
			closeIcon={closeIcon}
			open={open}
		>
			{children}
		</Modal>
	);
};

export default Modals;
