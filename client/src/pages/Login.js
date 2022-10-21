import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import api from "../api";
import { CurrentUserContext } from "../CurrentUserContext";
import { setAccessToken } from "../utils";
import axios from "../api";
import toast from "react-hot-toast";

export default function Login() {
	const navigate = useNavigate();
	const { setCurrentUser } = useContext(CurrentUserContext);
	const [formData, setFormData] = useState({ email: "", password: "" });

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleLoginFormSubmission = (e) => {
		e.preventDefault();

		api
			.post("/user/login", formData)
			.then((res) => {
				if (res.status === 200) {
					setCurrentUser(res.data.user);
					setAccessToken(res.data.token);
					axios.defaults.headers.authorization = `Bearer ${res.data.token}`;
					toast.success("Logged In!");
					navigate("/");
				}
			})
			.catch((error) => {
				toast.error(`${error.response.data.error}`, {
					position: "bottom-center",
				});
			});
	};

	return (
		<div className="w-full flex flex-col gap-8 items-center justify-center">
			<h1 className="text-[#90CAF9] font-semibold text-7xl ">Docs 4 U</h1>
			<form
				className="flex flex-col gap-2 w-2/4 items-center justify-center"
				onSubmit={handleLoginFormSubmission}
			>
				<input
					onChange={handleInputChange}
					required
					type="email"
					name="email"
					className="focus:outline-none border-b-2 focus:border-b-gray-400 py-2 px-2 w-1/3"
					placeholder="Email"
				/>
				<input
					onChange={handleInputChange}
					required
					type="password"
					name="password"
					className="focus:outline-none border-b-2 focus:border-b-gray-400 py-2 px-2 w-1/3"
					placeholder="Password"
				/>
				<button
					type="submit"
					className="rounded-full bg-[#90CAF9] text-white font-semibold py-2 px-8 text-xl mt-4"
				>
					Login
				</button>
				<p>
					Don't Have An Account,{" "}
					<Link to={"/register"} className="text-[#90CAF9] font-semibold ">
						Register Now
					</Link>
				</p>
			</form>
		</div>
	);
}
