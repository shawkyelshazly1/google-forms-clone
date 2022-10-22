import React, { useContext } from "react";
import { FcDocument } from "react-icons/fc";
import { CurrentUserContext } from "../CurrentUserContext";

export default function HomeNav() {
	const { handleLogout } = useContext(CurrentUserContext);

	return (
		<div className="flex w-full  flex-row px-4 py-4 bg-gray-300 items-center justify-between  fixed z-30 top-0 overflow-hidden min-h-[50px]">
			<div className="flex flex-row items-center gap-2">
				<FcDocument size={"3em"} />
				<h2 className="font-medium text-2xl">Forms</h2>
			</div>

			<button
				onClick={() => {
					handleLogout();
				}}
				className=" font-semibold text-xl text-red-500"
			>
				Logout
			</button>
		</div>
	);
}
