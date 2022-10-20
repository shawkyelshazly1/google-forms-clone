import React from "react";

export default function Login() {
	const handleLoginFormSubmission = (e) => {
		e.preventDefault();
	};

	return (
		<div className="w-full flex flex-col gap-8 items-center justify-center">
			<h1 className="text-[#90CAF9] font-semibold text-7xl ">Docs 4 U</h1>
			<form
				className="flex flex-col gap-2 w-2/4 items-center justify-center"
				onSubmit={handleLoginFormSubmission}
			>
				<input
					required
					type="email"
					className="focus:outline-none border-b-2 focus:border-b-gray-400 py-2 px-2 w-1/3"
					placeholder="Email"
				/>
				<input
					required
					type="password"
					className="focus:outline-none border-b-2 focus:border-b-gray-400 py-2 px-2 w-1/3"
					placeholder="Password"
				/>
				<button
					type="submit"
					className="rounded-full bg-[#90CAF9] text-white font-semibold py-2 px-8 text-xl mt-4"
				>
					Login
				</button>
			</form>
		</div>
	);
}
