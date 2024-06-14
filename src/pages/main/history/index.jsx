import { useState } from "react";
import { useTranslation } from "react-i18next";

import { theme } from "antd";
import { RadioGroup } from "components";
import AppTable from "./components/Table";

const SearchPage = () => {
	const { defaultType = "send" } = history?.state?.usr || {};
	// state
	const [activeType, setActiveType] = useState(defaultType);
	// hooks
	const { t } = useTranslation();
	const { token } = theme.useToken();
	// handles
	const onChangeType = (type) => {
		setActiveType(type);
	};
	// options
	const requestType = [
		{
			label: t("search.send"),
			value: "send",
		},
		{
			label: t("search.get"),
			value: "get",
		},
	];
	// table options
	const dataSource = [
		{
			key: "1",
			name: "Mike",
			age: 32,
			address: "10 Downing Street",
		},
		{
			key: "2",
			name: "John",
			age: 42,
			address: "10 Downing Street",
		},
	];

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Age",
			dataIndex: "age",
			key: "age",
		},
		{
			title: "Address",
			dataIndex: "address",
			key: "address",
		},
	];
	// return
	return (
		<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
			<div className="producer-title text-center mt-5">
				<h2 className="text-xl md:text-3xl">{t("سوابق درخواست ها")}</h2>
				<p className="my-1 text-slate-400 text-xs p-2 md:text-base">
					شما دراین بخش می توانید درخواست خود را اصلاح کنید
				</p>
			</div>
			<section
				className={`responsive-layout sticky mx-auto p-8 rounded-3xl shadow-2xl border`}
				style={{ background: token?.colorBgBase }}
			>
				<RadioGroup
					plainOptions={requestType}
					name="requestType"
					initialValue={activeType}
					required={true}
					onChange={onChangeType}
				/>
				<AppTable columns={columns} dataSource={dataSource} />
			</section>
		</div>
	);
};

export default SearchPage;
