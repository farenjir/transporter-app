const ChartMainContainer = ({ id = "chart", children }) => {
	return (
		<div style={{ width: "100%", height: "100%" }} id={id}>
			{children}
		</div>
	);
};

export default ChartMainContainer;
