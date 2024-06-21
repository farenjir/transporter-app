import { theme } from "antd";
import { Details } from "components";
import { useEffect } from "react";

const RequestDetails = () => {
	const {
		record = {
			title: "",
			items: [],
		},
	} = history?.state?.usr || {};
	// hooks
	const { token } = theme.useToken();
	// init
	useEffect(() => {}, []);
	// returnJSX
	return (
		<section
			className={`responsive-layout sticky mx-auto p-8 rounded-3xl shadow-2xl border min-h-[70vh]`}
			style={{ background: token?.colorBgBase }}
		>
			<Details {...record} />
		</section>
	);
};
export default RequestDetails;
