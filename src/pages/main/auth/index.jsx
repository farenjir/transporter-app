import { Suspense } from "react";
import { Skeleton } from "antd";

import AuthForm from "./components/AuthForm";

const AuthenticationPage = () => (
	<section className="grid md:grid-cols-2 items-center justify-center gap-4 max-w-7xl w-full">
		<div className="flex min-h-full flex-1 flex-col justify-center md:p-8 md:px-0 mt-20 md:mt-2">
			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm py-8 px-4 border-2 rounded-lg min-h-[300px]">
				<Suspense
					fallback={
						<div className="flex flex-col justify-around gap-10">
							<Skeleton.Input active block size="large" />
							<Skeleton.Input active block size="large" />
							<Skeleton.Button active block size="large" />
						</div>
					}
				>
					<AuthForm />
				</Suspense>
			</div>
		</div>
		<div className="lg:h-[400px] md:h-[300px] max-md:mt-10 hidden md:block">
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

export default AuthenticationPage;
