import Cookie from "universal-cookie";

export const setToStorage = (key = "", value = {}, sessionStorage = false) => {
	if (typeof window !== "undefined") {
		try {
			window[sessionStorage ? "sessionStorage" : "localStorage"].setItem(key, JSON.stringify(value));
		} catch {
			return null;
		}
	}
};

export const getFromStorage = (key = "", sessionStorage = false) => {
	if (typeof window !== "undefined") {
		try {
			const value = window[sessionStorage ? "sessionStorage" : "localStorage"].getItem(key);
			if (value) {
				return JSON.parse(value);
			}
		} catch {
			return null;
		}
	}
};

export const removeFromStorage = (key = "", sessionStorage = false) => {
	if (typeof window !== "undefined") {
		try {
			window[sessionStorage ? "sessionStorage" : "localStorage"].removeItem(key);
		} catch {
			return null;
		}
	}
};

export const setToCookie = (key = "", value = {}, potions = {}) => {
	const cookie = new Cookie();
	try {
		cookie.set(key, value, {
			httpOnly: false,
			maxAge: 24 * 24 * 3600,
			path: "/",
			...potions,
		});
	} catch {
		return null;
	}
};

export const getFromCookie = (key = "") => {
	const cookie = new Cookie();
	try {
		const value = cookie.get(key);
		if (value) {
			return value;
		}
	} catch {
		return null;
	}
};

export const removeFromCookie = (key = "", options = {}) => {
	const cookie = new Cookie();
	try {
		cookie.remove(key, options);
	} catch {
		return null;
	}
};
