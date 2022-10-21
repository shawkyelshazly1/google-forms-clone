import React from "react";
import { FcDocument } from "react-icons/fc";
import { Link } from "react-router-dom";
export default function FormCard({ form }) {
	return (
		<div className=" col-span-1 row-span-1">
			<Link
				to={`/${form._id}/edit`}
				className="flex flex-col items-center h-fit rounded-lg bg-gray-200 border-2 border-gray-300 hover:border-blue-400 cursor-pointer"
			>
				<div className="flex items-center justify-center py-2">
					<FcDocument size={"4em"} />
				</div>
				<div className="bg-white w-full py-4 px-4">
					{" "}
					<h1 className="font-semibold text-sm">
						{form["form-title"] === "" ? "Untitled Form" : form["form-title"]}
					</h1>
				</div>
			</Link>
		</div>
	);
}
//2c0f651f-1019-4277-9a73-1e83a9a088da
//2c0f651f-1019-4277-9a73-1e83a9a088da