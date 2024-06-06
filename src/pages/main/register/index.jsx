import { Suspense } from "react";
import { Skeleton } from "antd";

import RegisterForm from "./components/RegisterForm";

const Loading = () => (
	<div className="flex flex-col justify-around gap-10">
		<Skeleton.Input active block size="large" />
		<Skeleton.Input active block size="large" />
		<Skeleton.Input active block size="large" />
		<Skeleton.Input active block size="large" />
		<Skeleton.Button active block size="large" />
	</div>
);

const RegisterPage = () => (
	<section className="grid md:grid-cols-3 items-center justify-center gap-6 max-w-7xl w-full">
		<div className="md:col-span-2 flex min-h-full flex-1 flex-col justify-center md:p-8 md:px-0 md:mt-2">
			<div className="mt-10 sm:mx-auto py-8 px-4 border-2 rounded-lg min-h-[300px] shadow-lg">
				<Suspense fallback={<Loading />}>
					<RegisterForm />
				</Suspense>
			</div>
		</div>
		<div className="md:col-span-1 lg:h-[400px] md:h-[300px] max-md:mt-10 hidden md:block">
			<img
				src={"/assets/images/login-image.webp"}
				width={600}
				height={600}
				alt="login-banner"
				loading="lazy"
				className="w-full h-full object-cover"
			/>
		</div>
	</section>
);

export default RegisterPage;
