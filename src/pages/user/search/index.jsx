import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Form, theme } from "antd";
import { AppCard } from "components/App";
import { RadioGroup, ListModule, AppTabs } from "components";
import { FlightIcon, FlightIntIcon } from "components/icon/custom";

import InternationalSearch from "./components/forms/InternationalSearch";
import DomesticSearch from "./components/forms/DomesticSearch";
import InternationalGetSearch from "./components/forms/InternationalGetSearch";
import DomesticGetSearch from "./components/forms/DomesticGetSearch";

const title = "میلان به تهران";
const description =
	"توضیحات بیشتر توضیحات بیشتر توضیحات بیشتر توضیحات بیشتر توضیحات توضیحات بیشتر توضیحات بیشتر توضیحات بیشتر ";

const SearchPage = () => {
	const { defaultType = "send" } = history?.state?.usr || {};
	// state
	const [items, setItems] = useState(Array.from({ length: 50 }).map((_, idx) => `${idx + 1}`));
	const [activeType, setActiveType] = useState(defaultType);
	// hooks
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const { token } = theme.useToken();
	// handles
	const onSubmit = (formValues) => {};
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
	// options
	const tabItems = {
		send: [
			{
				key: "International",
				label: t("search.International"),
				children: <InternationalSearch />,
				icon: <FlightIntIcon />,
				className: "mt-5",
			},
			{
				key: "Domestic",
				label: t("search.Domestic"),
				children: <DomesticSearch />,
				icon: <FlightIcon />,
				className: "mt-5",
			},
		],
		get: [
			{
				key: "International",
				label: t("search.International"),
				children: <InternationalGetSearch />,
				icon: <FlightIntIcon />,
				className: "mt-5",
			},
			{
				key: "Domestic",
				label: t("search.Domestic"),
				children: <DomesticGetSearch />,
				icon: <FlightIcon />,
				className: "mt-5",
			},
		],
	};
	// return
	return (
		<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
			<div className="producer-title text-center mt-5">
				<h2 className="text-xl md:text-3xl">{t("search.search")}</h2>
				<p className="my-1 text-slate-400 text-xs p-2 md:text-base">
					شما دراین بخش می توانید درخواست خود را پیدا کنید
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
				<Form name={"name"} form={form} className="search-form" layout="vertical" onFinish={onSubmit}>
					<AppTabs items={tabItems[activeType]} centered />
				</Form>
			</section>
			{/* SearchItems */}
			<section className="producer-sections mx-auto p-5 mt-8">
				<ListModule
					dataSource={items.map((key) => ({
						key,
						content: (
							<AppCard
								key={key}
								id={key}
								imgUrl={"/assets/images/international-banner.webp"}
								{...{
									title: (
										<div className="flex flex-col">
											<span className="text-sm">{"محمد علی زاده"}</span>
											<span className="text-xl">{title}</span>
										</div>
									),
									description,
								}}
							/>
						),
					}))}
				/>
			</section>
		</div>
	);
};

export default SearchPage;
