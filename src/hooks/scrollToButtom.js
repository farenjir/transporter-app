import { useEffect, useRef } from "react";

const useScrollToBottom = ({ chats }) => {
	const listRef = useRef(null);

	useEffect(() => {
		listRef.current?.scrollIntoView?.({ behavior: "smooth" });
	}, [chats]);

	return { listRef };
};

export default useScrollToBottom;
