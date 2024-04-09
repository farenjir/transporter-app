import { LoadingOutlined } from "@ant-design/icons";

const Loadings = () => {
	// return
	return (
		<div className="grid place-content-center h-screen text-8xl bg-slate-200">
			<LoadingOutlined spin={true} />
		</div>
	);
};

export default Loadings;
