import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography } from "antd";
import { DoubleLeftOutlined } from "@ant-design/icons";

import { useAppContext } from "hooks";
import { Buttons, CarouselModule } from "components";
import { AppCard } from "components/App";

const { Title } = Typography;

const title = "میلان به تهران";
const description =
	"توضیحات بیشتر توضیحات بیشتر توضیحات بیشتر توضیحات بیشتر توضیحات توضیحات بیشتر توضیحات بیشتر توضیحات بیشتر ";

export default function Requeued() {
	const [producers, setProducers] = useState([{ key: "1" }, { key: "2" }, { key: "3" }]);
	// hooks
	const { callApi } = useAppContext();
	// init
	useEffect(() => {
		const getAllProducers = async () => {
			// const data = await allArtist(callApi);
			// setProducers(data)
		};
		getAllProducers();
	}, []);
	return (
		<section className="producer-sections mx-auto p-5 mt-8 md:mx-12">
			<div className="producer-title md:text-center">
				<Title level={2}>درخواست های دریافت</Title>
				<p className="my-1 text-slate-400 text-xs md:text-base">
					شما دراین بخش می توانید درخواست خود را پیدا کنید
				</p>
			</div>
			<Link to={"/user/search"} className="text-white">
				<Buttons
					content={
						<div className="flex gap-2 align-middle items-center">
							<span className="p-1"> مشاهده همه </span>
							<DoubleLeftOutlined />
						</div>
					}
					type="dashed"
					htmlType="button"
					size="default"
					classes="text-sm float-left mt-3"
				/>
			</Link>
			<CarouselModule
				name="producers"
				swiperSliders={producers.map(({ key }) => (
					<div className="pb-10 pt-5" key={key}>
						<section
							id={key}
							className="producer-sections flex flex-col md:flex-row justify-between align-middle items-center gap-8"
						>
							{Array(3)
								.fill(null)
								.map((_, i) => (
									<AppCard
										key={i + 1}
										id={i + 1}
										imgUrl={"/assets/images/domestic-banner.webp"}
										{...{
											title: (
												<div className="flex flex-col">
													<span className="text-sm">{"محمد علی زاده"}</span>
													<span className="text-xl">{title}</span>
												</div>
											),
											description,
										}}
									/>
								))}
						</section>
					</div>
				))}
			/>
		</section>
	);
}
