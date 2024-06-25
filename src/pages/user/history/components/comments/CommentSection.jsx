import { useTranslation } from "react-i18next";

import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input } from "antd";
import { Comment } from "@ant-design/compatible";

const { TextArea } = Input;

const CommentSection = ({ handleSubmit = () => {}, user = {}, submitting, handleChange, value }) => {
	const { t } = useTranslation();
	// returnJSX
	return (
		<Comment
			avatar={<Avatar src={user.avatarUrl || ""} icon={<UserOutlined />} alt={user.fullName} />}
			content={
				<>
					<Form.Item>
						<TextArea rows={4} onChange={handleChange} value={value} />
					</Form.Item>
					<Form.Item>
						<Button htmlType="submit" loading={submitting} onClick={handleSubmit} type="primary">
							{t("commons.send")}
						</Button>
					</Form.Item>
				</>
			}
		/>
	);
};

export default CommentSection;
