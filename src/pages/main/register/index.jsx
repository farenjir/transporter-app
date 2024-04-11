import { Suspense } from "react";
import { Skeleton } from "antd";

import RegisterForm from "./components/RegisterForm";

const RegisterPage = () => (
		<div className="mt-10 py-8 px-4 border-2 rounded-lg max-w-2xl">
			<Suspense
				fallback={
					<div className="flex flex-col justify-around gap-10">
						<Skeleton.Input active block size="large" />
						<Skeleton.Input active block size="large" />
						<Skeleton.Button active block size="large" />
					</div>
				}
			>
				<RegisterForm />
			</Suspense>
		</div>
);

export default RegisterPage;
