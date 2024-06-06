import { Form, TreeSelect } from "antd";
import { useTranslation } from "react-i18next";

const TreeSelects = ({
	label,
	name,
	placeholder = "",
	required,
	treeData = [], // [{id,pId,value,title,isLeaf:true}]
	onChange = () => {},
	onLoadData = () => {},
	onSearch = () => {},
	onSelect = () => {},
	initialValue = undefined,
	value = undefined,
	dropdownStyle = undefined,
	formItemClassName,
	showSearch = false,
	allowClear = false,
	treeDataSimpleMode = true,
	treeLine = false,
	size = "large",
	classes = "",
}) => {
	// hooks
	const { t } = useTranslation();
	// return JSX
	return (
		<Form.Item
			labelCol={{ xs: 24 }}
			wrapperCol={{ xs: 24 }}
			name={name}
			label={label}
			rules={[
				{
					required: required,
					message: t("schemas.required"),
				},
			]}
			className={formItemClassName}
			initialValue={initialValue}
		>
			<TreeSelect
				id={name}
				size={size}
				treeLine={treeLine}
				treeDataSimpleMode={treeDataSimpleMode}
				onChange={onChange}
				loadData={onLoadData}
				treeData={treeData}
				className={classes}
				value={value}
				onSelect={onSelect}
				dropdownStyle={dropdownStyle}
				placeholder={placeholder}
				showSearch={showSearch}
				onSearch={onSearch}
				allowClear={allowClear}
			/>
		</Form.Item>
	);
};

export default TreeSelects;
