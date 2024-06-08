import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ConfigProvider, theme } from "antd";

import useLanguage from "langs/useLanguage";
import useTheme from "theme/useTheme";

import { getCurrentUser } from "store/auth/action";
import { getCountries, getEnums } from "store/base/action";

import callApi from "service";
import AppContext from "./index";

function ContextApi({ children }) {
	// hooks
	const dispatch = useDispatch();
	// language
	const { language, changeLanguage, direction, locale, placement } = useLanguage();
	// theme
	const { themeAntMode, fontAntMode, fontMode, selectedToken, tokens, ...handles } = useTheme(theme);
	// user
	useEffect(() => {
		const auth = dispatch(getCurrentUser({ callApi }));
		const countries = dispatch(getCountries({ callApi }));
		const bases = dispatch(getEnums({ callApi }));
		return () => {
			auth.abort();
			countries.abort();
			bases.abort();
		};
	}, [dispatch]);
	// return
	const themColorObject = tokens[selectedToken];
	return (
		<AppContext.Provider
			value={{
				language,
				placement,
				direction,
				// themeHandlers
				...handles,
				changeLanguage,
				fontMode,
				tokens,
				selectedToken,
				// callApi
				callApi,
			}}
		>
			<ConfigProvider
				locale={locale}
				direction={direction}
				theme={{
					algorithm: [themeAntMode, ...fontAntMode],
					token: themColorObject,
					components: {
						Carousel: {
							colorBgContainer: themColorObject?.colorPrimary,
							dotWidth: 8,
							dotHeight: 8,
						},
					},
				}}
			>
				{children}
			</ConfigProvider>
		</AppContext.Provider>
	);
}

export default ContextApi;
