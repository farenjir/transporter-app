import { useEffect } from "react";
import { Card, theme, Typography } from "antd";
import { useTranslation } from "react-i18next";

import { ChartMainContainer, useChart } from "components";

const { Title } = Typography;

const UserDashboard = () => {
	const { t } = useTranslation();
	const { token } = theme.useToken();

	const { chart, chartId } = useChart({ chartId: "dashboard" });

	useEffect(() => {
		chart?.setOption({
			tooltip: {
				textStyle: {
					fontSize: 14,
					fontWeight: "bolder",
					fontFamily: "YekanBakh-Regular, sans-serif",
				},
				trigger: "item",
				formatter: "{b} : {c} ({d}%)",
			},
			legend: {
				top: "bottom",
				textStyle: {
					fontSize: 12,
					fontFamily: "YekanBakh-Regular, sans-serif",
				},
			},
			series: [
				{
					name: "Nightingale Chart",
					type: "pie",
					radius: [50, 120],
					center: ["50%", "50%"],
					roseType: "area",
					itemStyle: {
						borderRadius: 8,
            textStyle: {
              fontSize: 12,
              fontFamily: "YekanBakh-Regular, sans-serif",
            },
					},
					data: [
						{ value: 5, name: t("user.myHistorySend") },
						{ value: 2, name: t("user.myHistoryGet") },
						{ value: 10, name: t("user.myHistorySendComment") },
						{ value: 2, name: t("user.myHistoryGetComment") },
					],
				},
			],
		});
	}, [chart, t]);

	return (
		<Card
			title={
				<Title level={4} className="pt-3" style={{ color: token?.colorPrimary }}>
					{t("user.dashboard")}
				</Title>
			}
		>
			<div className="h-[58vh]">
				<div className="flex justify-center align-middle items-center h-[55vh]">
					<ChartMainContainer id={chartId} chart={chart} />
				</div>
			</div>
		</Card>
	);
};

export default UserDashboard;
