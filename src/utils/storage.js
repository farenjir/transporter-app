import Cookie from "universal-cookie";

const cookie = new Cookie();

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

export const setToCookie = (key = "", value = {}, { httpOnly = true, maxAge = 24 * 24 * 3600, path = "/" }) => {
	try {
		cookie.set(key, JSON.stringify(value), {
			httpOnly,
			maxAge,
			path,
		});
	} catch {
		return null;
	}
};

export const getFromCookie = (key = "") => {
	try {
		const value = cookie.get(key);
		if (value) {
			return JSON.parse(value);
		}
	} catch {
		return null;
	}
};

export const removeFromCookie = (key = "") => {
	try {
		const cookie = new Cookie();
		cookie.remove(key);
	} catch {
		return null;
	}
};
