import React from "react";
import { FcDocument } from "react-icons/fc";
import { Link } from "react-router-dom";
export default function FormCard({ form }) {
	return (
		<Link to={`/id/edit`}>
			<div className="flex flex-col items-center rounded-lg bg-gray-200 border-2 border-gray-300 hover:border-blue-400 cursor-pointer">
				<div className="flex items-center justify-center py-2">
					<FcDocument size={"4em"} />
				</div>
				<div className="bg-white w-full py-4 px-4">
					{" "}
					<h1 className="font-semibold text-sm">Invitation Form</h1>
				</div>
			</div>
		</Link>
	);
}
