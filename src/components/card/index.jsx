import { Card } from "antd";

function Cards({ title = "", children, className, bodyStyle, headStyle = {} }) {
	//   return
	return (
		<Card
			title={title}
			className={className}
			bodyStyle={bodyStyle}
			headStyle={{ background: "#edeef167", ...headStyle }}
		>
			{children}
		</Card>
	);
}

export default Cards;
