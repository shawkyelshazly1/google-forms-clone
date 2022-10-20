import React from "react";
import FormCard from "../components/FormCard";
import HomeNav from "../components/HomeNav";

export default function Home() {
	return (
		<div className="flex w-full h-full flex-col items-center pb-4">
			<HomeNav />
			<div className="pt-24 px-4 grid grid-cols-4 gap-8 w-2/4">
				<FormCard form={""} />
			</div>
		</div>
	);
}
