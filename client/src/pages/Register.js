import React, { useContext } from "react";
import { CurrentUserContext } from "../CurrentUserContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
	const navigate = useNavigate();

	const handleRegisterFormSubmission = (e) => {
		e.preventDefault();
	};

	const { currentUser, authLoading } = useContext(CurrentUserContext);
	if (authLoading) return null;
	if (currentUser) navigate("/");

	return (
		<div className="w-full flex flex-col gap-8 items-center justify-center">
			<h1 className="text-[#90CAF9] font-semibold text-7xl ">Docs 4 U</h1>
			<form
				className="flex flex-col gap-2 w-2/4 items-center justify-center"
				onSubmit={handleRegisterFormSubmission}
			>
				<input
					required
					type="email"
					name="email"
					className="focus:outline-none border-b-2 focus:border-b-gray-400 py-2 px-2 w-1/3"
					placeholder="Email"
				/>
				<input
					required
					type="password"
					name="password"
					className="focus:outline-none border-b-2 focus:border-b-gray-400 py-2 px-2 w-1/3"
					placeholder="Password"
				/>
				<input
					required
					type="password"
					name="confirmPassword"
					className="focus:outline-none border-b-2 focus:border-b-gray-400 py-2 px-2 w-1/3"
					placeholder="Confirm Password"
				/>
				<button
					type="submit"
					className="rounded-full bg-[#90CAF9] text-white font-semibold py-2 px-8 text-xl mt-4"
				>
					Register
				</button>
			</form>
		</div>
	);
}
