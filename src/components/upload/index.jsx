import { useTranslation } from "react-i18next";

import { Form, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const Uploads = ({
	name = "attachments",
	maxCount = 1,
	uploadText = "",
	uploadHint = "",
	className = "",
	required = false,
}) => {
	// hooks
	const { t } = useTranslation();
	// constants
	const rules = [
		{
			required: required,
			message: t("schemas.required"),
		},
	];
	// handles
	const normFile = (e) => {
		if (Array.isArray(e)) {
			return e;
		}
		return e?.fileList;
	};
	// return
	return (
		<Form.Item
			className={className}
			rules={rules}
			name={name}
			valuePropName="fileList"
			getValueFromEvent={normFile}
			noStyle
		>
			<Upload.Dragger name="files" action="/upload.do" maxCount={maxCount}>
				<div className="flex justify-around">
					<p className="ant-upload-drag-icon">
						<InboxOutlined />
					</p>
					<div>
						<p className="ant-upload-text">{uploadText}</p>
						{uploadHint && <p className="ant-upload-hint">{uploadHint}</p>}
					</div>
				</div>
			</Upload.Dragger>
		</Form.Item>
	);
};

export default Uploads;
