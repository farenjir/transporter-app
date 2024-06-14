import { useTranslation } from "react-i18next";

import { theme } from "antd";

const SearchPage = () => {
	// hooks
	const { t } = useTranslation();
	const { token } = theme.useToken();
	// handles
	// return
	return (
		<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
			<center></center>
		</div>
	);
};

export default SearchPage;
