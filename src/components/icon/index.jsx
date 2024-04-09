import { Tooltip } from "antd";
import * as AntIcons from "@ant-design/icons";

const Icons = ({ title = "", type = "EllipsisOutlined", classes = "", onClick, ...props }) => {
	// component
	const Icon = AntIcons?.[type];
	// return
	return (
		<span className="app-icon">
			<Tooltip title={title} color="grey" >
				<Icon className={`${classes} ${onClick ? "cursor-pointer" : ""}`} onClick={onClick} {...props} />
			</Tooltip>
		</span>
	);
};

export default Icons;
