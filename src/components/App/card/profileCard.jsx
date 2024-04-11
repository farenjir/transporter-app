import { Avatar, Card } from "antd";
import myPic from "/assets/icon/avatar1.png";

const ProfileCard = ({
	id,
	imgUrl = "/assets/icon/pic2.svg",
	userName = "سامان حشمتی",
	description = "متن زیر اسم",
}) => (
	<Card hoverable cover={<img alt={`cover-profile-${id}`} src={imgUrl} className="h-20 object-cover" />}>
		<div className="flex flex-col justify-center items-center">
			<Avatar src={myPic} className="-mt-14 mb-5 md:h-24 h-12 md:size-24 size-8 shadow-xl" />
			<strong>{userName}</strong>
			<small className="text-xs mt-1 text-slate-400 text-justify">{description}</small>
		</div>
	</Card>
);

export default ProfileCard;
