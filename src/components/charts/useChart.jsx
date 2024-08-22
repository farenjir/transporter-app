import { useEffect, useState } from "react";

import { echartsInstance } from "./chartInstance";

export default function useChart({ chartId }) {
	const [chart, setChart] = useState(undefined);

	useEffect(() => {
		const dom = document.getElementById(chartId);
		if (!dom) {
			return;
		}
		if (!chart) {
			const existDom = echartsInstance.getInstanceByDom(dom);
			const newChart =
				existDom ||
				echartsInstance.init(dom, undefined, {
					renderer: "canvas",
				});
			setChart(newChart);
		}
	}, [chart, chartId]);

	return { chart, chartId };
}
