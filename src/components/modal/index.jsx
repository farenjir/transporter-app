import { useState, useImperativeHandle } from "react";

import { Modal } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

const Modals = ({
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
	content = null,
	closeIcon = <CloseCircleOutlined className="text-2xl"/>,
}) => {
	const [open, setOpen] = useState(false);
	// hooks
	useImperativeHandle(reference, () => ({
		showModal: () => {
			setOpen(true);
		},
		hideModal: () => {
			setOpen(false);
		},
	}));
	//   return
	return (
		<Modal
			title={title}
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
			{content}
		</Modal>
	);
};

export default Modals;
