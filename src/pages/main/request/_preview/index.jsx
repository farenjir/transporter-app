import { useTranslation } from "react-i18next";
import { theme } from "antd";

import GetDetails from "./components/GetDetails";

const RequestDetails = () => {
	const { mode, id, fromCountryName, toCountryName, toLocationName, fromLocationName, ...params } =
		history?.state?.usr || {};
	// hooks
	const { t } = useTranslation();
	const { token } = theme.useToken();
	// init
	const title = t("home.cards.sendTo", {
		fromCountryName,
		toCountryName,
		fromLocationName,
		toLocationName,
	});
	// returnJSX
	return (
		<section
			className={`responsive-layout sticky mx-auto p-8 rounded-3xl shadow-2xl border min-h-[70vh]`}
			style={{ background: token?.colorBgBase }}
		>
			<GetDetails
				title={title}
				params={{ fromCountryName, toCountryName, toLocationName, fromLocationName, ...params }}
			/>
		</section>
	);
};
export default RequestDetails;
