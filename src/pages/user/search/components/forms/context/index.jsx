import { createContext } from "react";
import { Form } from "antd";

import { useSelector } from "react-redux";
import { baseSelector } from "store/selector";

export const SearchContext = createContext({});

function SearchContextApi({ children, loading, onFinish = () => {}, onReset = () => {} }) {
	// hooks
	const [form] = Form.useForm();
	const { countries } = useSelector(baseSelector);
	// return
	return (
		<SearchContext.Provider value={{ loading, countries }}>
			<Form
				form={form}
				name="request-form"
				className="request-form"
				layout="vertical"
				onFinish={onFinish}
				onReset={onReset}
			>
				{children}
			</Form>
		</SearchContext.Provider>
	);
}

export default SearchContextApi;
