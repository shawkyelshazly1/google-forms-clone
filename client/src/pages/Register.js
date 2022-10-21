import React, { useContext, useState } from "react";
import { CurrentUserContext } from "../CurrentUserContext";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import toast from "react-hot-toast";

export default function Register() {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});
	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleRegisterFormSubmission = (e) => {
		e.preventDefault();

		api
			.post("/user/register", formData)
			.then((res) => {
				if (res.status === 200) {
					toast.success("Registered Successfully!, Redirecting to Login.");
					navigate("/login");
				} else {
					console.log(res);
				}
			})
			.catch((error) => {
				toast.error(`${error.response.data.error}`, {
					position: "bottom-center",
				});
			});
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
					onChange={handleInputChange}
					className="focus:outline-none border-b-2 focus:border-b-gray-400 py-2 px-2 w-1/3"
					placeholder="Email"
				/>
				<input
					required
					type="password"
					name="password"
					onChange={handleInputChange}
					className="focus:outline-none border-b-2 focus:border-b-gray-400 py-2 px-2 w-1/3"
					placeholder="Password"
				/>
				<input
					required
					type="password"
					name="confirmPassword"
					onChange={handleInputChange}
					className="focus:outline-none border-b-2 focus:border-b-gray-400 py-2 px-2 w-1/3"
					placeholder="Confirm Password"
				/>
				<button
					type="submit"
					className="rounded-full bg-[#90CAF9] text-white font-semibold py-2 px-8 text-xl mt-4"
				>
					Register
				</button>

				<p>
					Already Have An Account,{"  "}
					<Link to={"/login"} className="text-[#90CAF9] font-semibold ">
						Login
					</Link>
				</p>
			</form>
		</div>
	);
}
