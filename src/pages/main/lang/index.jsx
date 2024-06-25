import { Result } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useAppContext } from "hooks";
import { langList } from "langs/configs";
import { setToStorage } from "utils/storage";
import { INIT_APP } from "utils/constance";

import { Buttons } from "components";

const SelectLang = () => {
	// hooks
	let navigate = useNavigate();
	const { t } = useTranslation();
	const { changeLanguage } = useAppContext();
	// handles
	const onClickLang = (lang) => {
		changeLanguage(lang);
		setToStorage(INIT_APP, "true");
		navigate("/login", { replace: true });
	};
	return (
		<Result
			status="info"
			title={t("lang.title")}
			subTitle={t("lang.subTitle")}
			extra={Object.entries(langList).map(([key, value]) => (
				<Buttons key={key} content={key} onClick={() => onClickLang(value)} block={true} />
			))}
		/>
	);
};

export default SelectLang;
