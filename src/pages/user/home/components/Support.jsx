const SupportSection = ({ background }) => {
	return (
		<div className="responsive-layout mt-10 mb-5 p-5 rounded-3xl border" style={{ background }}>
			<div className="flex md:gap-4 flex-wrap items-start border-light rounded">
				<span className="btn is-md is-raw flex-1 wrapper-sub-product">
					<div className="a-card badge-wrapper border-0">
						<div className="a-card__body flex md:flex-row flex-col items-center justify-center md:px-3 md:py-2 p-0 w-full">
							<div className="product-image">
								<img
									src="https://cdn.alibaba.ir/h2/desktop/assets/images/safarcard-3dc2c4c4.svg"
									alt="Alibaba https://cdn.alibaba.ir/h2/desktop/assets/images/safarcard-3dc2c4c4.svg"
									className="is-responsive is-animated"
									width="46"
									height="46"
								/>
							</div>
							<span className="text-body-md md:mr-2 text-grays-500">احراز هویت کاربران</span>
						</div>
					</div>
				</span>
				<span className="btn is-md is-raw flex-1 wrapper-sub-product">
					<div className="a-card badge-wrapper border-0">
						<div className="a-card__body flex md:flex-row flex-col items-center justify-center md:px-3 md:py-2 p-0 w-full">
							<div className="product-image">
								<img
									src="https://cdn.alibaba.ir/h2/desktop/assets/images/insurance-icon-bb51c425.svg"
									alt="Alibaba https://cdn.alibaba.ir/h2/desktop/assets/images/insurance-icon-bb51c425.svg"
									className="is-responsive is-animated"
									width="46"
									height="46"
								/>
							</div>
							<span className="text-body-md md:mr-2 text-grays-500">بیمه بسته ارسالی</span>
						</div>
					</div>
				</span>
				<span className="btn is-md is-raw flex-1 wrapper-sub-product">
					<div className="a-card badge-wrapper border-0">
						<div className="a-card__body flex md:flex-row flex-col items-center justify-center md:px-3 md:py-2 p-0 w-full">
							<div className="product-image">
								<img
									src="https://cdn.alibaba.ir/h2/desktop/assets/images/visa-icon-d8507c8e.svg"
									alt="Alibaba https://cdn.alibaba.ir/h2/desktop/assets/images/visa-icon-d8507c8e.svg"
									className="is-responsive is-animated"
									width="46"
									height="46"
								/>
							</div>
							<span className="text-body-md md:mr-2 text-grays-500">ارسال ایمن</span>
						</div>
					</div>
				</span>
				<span className="btn is-md is-raw flex-1 wrapper-sub-product">
					<div className="a-card badge-wrapper border-0">
						<div className="a-card__body flex md:flex-row flex-col items-center justify-center md:px-3 md:py-2 p-0 w-full">
							<div className="product-image">
								<img
									src="https://cdn.alibaba.ir/h2/desktop/assets/images/gtour-icon-5e641f1b.svg"
									alt="Alibaba https://cdn.alibaba.ir/h2/desktop/assets/images/gtour-icon-5e641f1b.svg"
									className="is-responsive is-animated"
									width="46"
									height="46"
								/>
							</div>
							<span className="text-body-md md:mr-2 text-grays-500">ارسال سریع بسته</span>
						</div>
					</div>
				</span>
			</div>
		</div>
	);
};

export default SupportSection;
