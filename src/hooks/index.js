import { useCallback, useContext, useEffect, useRef, useState } from "react";
import AppContext from "../context";

// *** APP HOOKS ***
export const useAppContext = () => useContext(AppContext);

// *** custom useful HOOKS *** // https://dev.to/arafat4693/15-useful-react-custom-hooks-that-you-can-use-in-any-project-2ll8

export function useToggle(defaultValue) {
	const [value, setValue] = useState(defaultValue);
	function toggleValue(value) {
		setValue((currentValue) => (typeof value === "boolean" ? value : !currentValue));
	}
	// return
	return [value, toggleValue];
}

export function useTimeout(callback, delay) {
	const callbackRef = useRef(callback);
	const timeoutRef = useRef();
	// init
	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);
	// set
	const set = useCallback(() => {
		timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
	}, [delay]);
	const clear = useCallback(() => {
		timeoutRef.current && clearTimeout(timeoutRef.current);
	}, []);
	// init
	useEffect(() => {
		set();
		return clear;
	}, [delay, set, clear]);
	// reset
	const reset = useCallback(() => {
		clear();
		set();
	}, [clear, set]);
	// return
	return { reset, clear };
}

export function useDebounce(callback, delay, dependencies = []) {
	const { reset, clear } = useTimeout(callback, delay);
	useEffect(reset, [...dependencies, reset]);
	useEffect(clear, [clear]);
}

export function useUpdateEffect(callback, dependencies = []) {
	const firstRenderRef = useRef(true);
	// init
	useEffect(() => {
		if (firstRenderRef.current) {
			firstRenderRef.current = false;
			return;
		}
		return callback();
	}, [...dependencies]);
}

export function useArray(defaultValue = []) {
	const [array, setArray] = useState(defaultValue);
	// push
	function push(element) {
		setArray((a) => [...a, element]);
	}
	// filter
	function filter(callback) {
		setArray((a) => a.filter(callback));
	}
	// update
	function update(index, newElement) {
		setArray((a) => [...a.slice(0, index), newElement, ...a.slice(index + 1, a.length)]);
	}
	// remove
	function remove(index) {
		setArray((a) => [...a.slice(0, index), ...a.slice(index + 1, a.length)]);
	}
	// clear
	function clear() {
		setArray([]);
	}
	// return
	return { array, set: setArray, push, filter, update, remove, clear };
}

export function usePrevious(value) {
	const currentRef = useRef(value);
	const previousRef = useRef();
	// action
	if (currentRef.current !== value) {
		previousRef.current = currentRef.current;
		currentRef.current = value;
	}
	// return
	return previousRef.current;
}

export function useStateWithHistory(defaultValue, { capacity = 10 } = {}) {
	const [value, setValue] = useState(defaultValue);
	const historyRef = useRef([value]);
	const pointerRef = useRef(0);
	// set
	const set = useCallback(
		(v) => {
			const resolvedValue = typeof v === "function" ? v(value) : v;
			if (historyRef.current[pointerRef.current] !== resolvedValue) {
				if (pointerRef.current < historyRef.current.length - 1) {
					historyRef.current.splice(pointerRef.current + 1);
				}
				historyRef.current.push(resolvedValue);
				while (historyRef.current.length > capacity) {
					historyRef.current.shift();
				}
				pointerRef.current = historyRef.current.length - 1;
			}
			setValue(resolvedValue);
		},
		[capacity, value],
	);
	// back
	const back = useCallback(() => {
		if (pointerRef.current <= 0) return;
		pointerRef.current--;
		setValue(historyRef.current[pointerRef.current]);
	}, []);
	// forward
	const forward = useCallback(() => {
		if (pointerRef.current >= historyRef.current.length - 1) return;
		pointerRef.current++;
		setValue(historyRef.current[pointerRef.current]);
	}, []);
	// go
	const go = useCallback((index) => {
		if (index < 0 || index > historyRef.current.length - 1) return;
		pointerRef.current = index;
		setValue(historyRef.current[pointerRef.current]);
	}, []);
	// return
	return [
		value,
		set,
		{
			history: historyRef.current,
			pointer: pointerRef.current,
			back,
			forward,
			go,
		},
	];
}

export function useLocalStorage(key, defaultValue) {
	return useStorage(key, defaultValue, window.localStorage);
}
export function useSessionStorage(key, defaultValue) {
	return useStorage(key, defaultValue, window.sessionStorage);
}
export function useStorage(key, defaultValue, storageObject) {
	const [value, setValue] = useState(() => {
		const jsonValue = storageObject.getItem(key);
		if (jsonValue != null) return JSON.parse(jsonValue);
		// defaultValue
		if (typeof defaultValue === "function") {
			return defaultValue();
		} else {
			return defaultValue;
		}
	});
	// init
	useEffect(() => {
		if (value === undefined) return storageObject.removeItem(key);
		storageObject.setItem(key, JSON.stringify(value));
	}, [key, value, storageObject]);
	// remove
	const remove = useCallback(() => {
		setValue(undefined);
	}, []);
	// return
	return [value, setValue, remove];
}

export function useAsync(callback, dependencies = []) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();
	const [value, setValue] = useState();
	// callback
	const callbackMemoized = useCallback(() => {
		setLoading(true);
		setError(undefined);
		setValue(undefined);
		callback()
			.then(setValue)
			.catch(setError)
			.finally(() => setLoading(false));
	}, [...dependencies]);
	// init
	useEffect(() => {
		callbackMemoized();
	}, [callbackMemoized]);
	// return
	return { loading, error, value };
}

export function useFetch(url, options = {}, dependencies = []) {
	const DEFAULT_OPTIONS = {
		headers: { "Content-Type": "application/json" },
	};
	// return
	return useAsync(async () => {
		const res = await fetch(url, { ...DEFAULT_OPTIONS, ...options });
		if (res.ok) return res.json();
		const json = await res.json();
		return await Promise.reject(json);
	}, dependencies);
}

export function useScript(url) {
	return useAsync(() => {
		const script = document.createElement("script");
		script.src = url;
		script.async = true;
		// return
		return new Promise((resolve, reject) => {
			script.addEventListener("load", resolve);
			script.addEventListener("error", reject);
			document.body.appendChild(script);
		});
	}, [url]);
}

export function useEventListener(eventType, callback, element = window) {
	const callbackRef = useRef(callback);
	// init
	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);
	// init
	useEffect(() => {
		if (element == null) return;
		const handler = (e) => callbackRef.current(e);
		element.addEventListener(eventType, handler);
		// cleanUp
		return () => element.removeEventListener(eventType, handler);
	}, [eventType, element]);
}

export function useOnScreen(ref, rootMargin = "0px") {
	const [isVisible, setIsVisible] = useState(false);
	// init
	useEffect(() => {
		if (ref.current == null) return;
		const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { rootMargin });
		observer.observe(ref.current);
		return () => {
			if (ref?.current == null) return;
			observer.unobserve(ref.current);
		};
	}, [ref.current, rootMargin]);
	// return
	return isVisible;
}

export function useWindowSize() {
	const windowSize = useRef({
		// default useState
		width: window.innerWidth,
		height: window.innerHeight,
	});
	// useEventListener
	useEventListener("resize", () => {
		windowSize.current = { width: window.innerWidth, height: window.innerHeight };
	});
	// return
	return windowSize;
}