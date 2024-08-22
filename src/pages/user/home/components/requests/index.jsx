import { theme } from "antd";

import RequestContextApi from "./components/forms/context";
import International from "./components/forms/International";
import InternationalGet from "./components/forms/InternationalGet";

const RequestSection = ({ appMode }) => {
	// hooks
	const { token } = theme.useToken();
	// tabs
	const requestOptions = {
		send: <International />,
		get: <InternationalGet />,
	};
	// returnJSX
	return (
		<section
			className={`responsive-layout sticky mx-auto p-8 rounded-3xl shadow-2xl border`}
			style={{ background: token?.colorBgBase }}
		>
			<RequestContextApi>{requestOptions[appMode]}</RequestContextApi>
		</section>
	);
};

export default RequestSection;
