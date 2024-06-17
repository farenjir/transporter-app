import { useState, useImperativeHandle } from "react";

import { Modal } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

const Modals = ({
	children = null,
	title = "",
	width = "60%",
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
			width={width}
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
