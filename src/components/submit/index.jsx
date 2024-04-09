import { Modal } from "antd";
const { confirm } = Modal;

const submitModals = (customOptions = {}, onOk = () => { }, onCancel = () => { }) => {
	const options = Object.assign({}, {
		title: "",
		content: "",
		okType: "primary", // or "danger","ghost","link","dashed"
		okText: "",
		cancelText: "",
		direction: "rtl",
		okButtonProps: { disabled: false },
	}, customOptions)
	// return
	return confirm({
		...options,
		// icon: <ExclamationCircleFilled />,
		onOk: async () => {
			return await new Promise((resolve, reject) => {
				onOk(); // resolve handler
				resolve()
			}).catch((error) => error);
		},
		onCancel,
	});
};

export default submitModals