import GetDetails from "./components/GetDetails";
import SendDetails from "./components/SendDetails";

const RequestDetails = ({ mode, selectRequest = {} }) => {
	// innerJSX
	const InnerJSX = (props) => (mode === "send" ? <SendDetails {...props} /> : <GetDetails {...props} />);
	// returnJSX
	return (
		<>
			<InnerJSX params={selectRequest} />
		</>
	);
};
export default RequestDetails;
