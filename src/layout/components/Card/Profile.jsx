import { Avatar, Card } from "antd";

const ProfileCard = ({ id, imgUrl = "", fullName = "", email = "" }) => (
	<Card
		hoverable
		cover={
			<img
				alt={`cover-profile-${id}`}
				src={"/assets/images/tour-banner.webp"}
				className="h-20 object-cover"
			/>
		}
	>
		<div className="flex flex-col justify-center items-center">
			<Avatar src={imgUrl} className="-mt-14 mb-5 md:h-24 h-12 md:size-24 size-8 shadow-xl" />
			<strong className="uppercase">{fullName}</strong>
			<small className="text-xs mt-1 text-slate-400 text-justify">{email}</small>
		</div>
	</Card>
);

export default ProfileCard;
