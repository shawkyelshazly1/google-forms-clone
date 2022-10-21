import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className="w-full min-h-screen items-center justify-center flex flex-col gap-8">
			<div className="flex flex-col items-center justify-center gap-4">
				<h1 className="text-7xl font-semibold ">Oops..!</h1>
				<h1 className="text-2xl"> Something went wrong...</h1>
			</div>
			<Link
				to={"/"}
				className="bg-[#76c1fe] text-white py-2 px-4 rounded-lg font-bold text-xl"
			>
				Go Home
			</Link>
		</div>
	);
}
