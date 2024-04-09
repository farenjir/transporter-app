import { useState } from "react";

import { getFromStorage, setToStorage } from "@/utils/storage";
import tokens from "@/theme";

let defaultTheme = getFromStorage("theme") || "default";
let defaultFontSize = getFromStorage("fontSize") || "none";
let defaultToken = getFromStorage("tokenColor") || "default";

const useTheme = (theme) => {
	const [themeMode, setThemeMode] = useState(defaultTheme);
	const [fontMode, setFontSize] = useState(defaultFontSize);
	const [selectedToken, setToken] = useState(defaultToken);
	// themeAntMode
	const changeTheme = (mode) => {
		setThemeMode(mode);
		setToStorage("theme", mode);
	};
	let themeAntMode = theme[`${themeMode}Algorithm`] || [];
	// fontAntMode
	const changeFontMode = (mode) => {
		setFontSize(mode);
		setToStorage("fontSize", mode);
	};
	let fontAntMode = [theme[`${fontMode}Algorithm`]].filter(Boolean);
	// tokenMode
	const changeTokenMode = (mode) => {
		setToken(mode);
		setToStorage("tokenColor", mode);
	};
	// return
	return {
		changeTheme,
		themeAntMode,
		themeMode,
		changeFontMode,
		fontAntMode,
		fontMode,
		changeTokenMode,
		tokens,
		selectedToken,
	};
};

export default useTheme;
