// import Swiper core and required modules
import { Carousel, Spin } from "antd";

const CarouselModule = ({
	swiperSliders = [],
	delay = 8000,
	autoplay = true,
	showDots = true,
	arrows = true,
	waitForAnimate = false,
	loading = false,
	classes = "",
	className = "",
	dotPosition = "bottom",
	easing = "linear", // css easing !
	effect = "scrollx", // "fade"
	name,
}) => {
	return (
		<Spin spinning={loading} size="large">
			<Carousel
				lazyLoad="anticipated"
				id={name}
				key={name}
				autoplay={autoplay}
				autoplaySpeed={delay}
				dotPosition={dotPosition}
				dots={showDots}
				arrows={arrows}
				className={className}
				easing={easing}
				effect={effect}
				waitForAnimate={waitForAnimate}
			>
				{swiperSliders.map((swiperSlider, index) => (
					<div key={`slide-${index}`} className={classes}>
						{swiperSlider}
					</div>
				))}
			</Carousel>
		</Spin>
	);
};

export default CarouselModule;
