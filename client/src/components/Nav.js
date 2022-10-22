import React, { useContext, useEffect, useState } from "react";
import { FcDocument } from "react-icons/fc";
import { BsFillTrashFill } from "react-icons/bs";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";
import toast from "react-hot-toast";
import FormColorChanger from "./FormColorChanger";
import { colorPallete } from "../constants";
export default function Nav({ setShowModal }) {
	// Access the client
	const queryClient = useQueryClient();

	const navigate = useNavigate();

	const { form, updateFormTitle } = useContext(AppContext);
	// title state
	const [questionTitle, setQuestionTitle] = useState(form["form-title"]);

	useEffect(() => {
		setQuestionTitle(form["form-title"]);
	}, [form]);

	// handle change form title
	const handleChange = (e) => {
		setQuestionTitle(e.target.value);
	};

	// update form and save on changes
	const deleteForm = useMutation(
		() => {
			return api.delete(`/form/${form._id}`).then((res) => {
				return res.data;
			});
		},
		{
			onSuccess: (data) => {
				if (data) {
					queryClient.setQueryData(["forms"], (forms) => {
						if (forms) {
							const updatedForms = forms.filter(
								(form) => form._id !== data._id
							);
							return [...updatedForms];
						}
					});
					navigate("/");
				}
			},
			onError: (error) => {
				if (error) {
					console.error(error);
				}
			},
		}
	);

	return (
		<div className="flex w-full  flex-col px-4 bg-white pt-2 fixed z-30 top-0 overflow-hidden min-h-[50px]">
			<div className="flex flex-row w-full items-center justify-between">
				<div className="flex flex-row items-center gap-2">
					<Link to={"/"}>
						<FcDocument size={"3em"} />
					</Link>
					<input
						type="text"
						value={questionTitle}
						onChange={handleChange}
						onBlur={() => {
							updateFormTitle(questionTitle);
						}}
						id="form-title"
						placeholder="Untitled Form"
						className="h-full w-auto py-2 px-2 bg-white border-b-[1px] border-b-gray-300 focus:outline-none focus:border-b-2 focus:border-b-black text-xl"
					/>
				</div>
				<div className="flex flex-row gap-3 items-center">
					<FormColorChanger />
					<Link
						to={`/${form._id}/view`}
						target="_blank"
						rel="noopener noreferrer"
					>
						<MdOutlineRemoveRedEye
							size={"2em"}
							color={"#5F6368"}
							className="cursor-pointer"
						/>
					</Link>
					<BsFillTrashFill
						size={"2em"}
						color={"#F44336"}
						className="cursor-pointer"
						onClick={() => {
							toast.promise(
								deleteForm.mutateAsync(),
								{
									loading: "Deleting...",
									success: <b>Form Deleted!</b>,
									error: <b>Could not delete.</b>,
								},
								{ position: "bottom-right" }
							);
						}}
					/>
					<button
						className="text-lg font-semibold bg-[#90CAF9] text-white py-1 px-4 rounded-lg"
						onClick={() => {
							setShowModal(true);
						}}
					>
						Send
					</button>
				</div>
			</div>
			<div className="flex flex-row  w-full gap-4 items-center justify-center font-semibold">
				<button
					onClick={() => {
						console.log(form);
					}}
					style={{
						borderBottomColor: `${colorPallete[form["form-color"]].main}`,
					}}
					className="border-b-4 px-2    pt-2"
				>
					Questions
				</button>
				<button
					style={{
						borderBottomColor: `${colorPallete[form["form-color"]].main}`,
					}}
					className="border-b-4 px-2     pt-2"
				>
					Responses
				</button>
				<button
					style={{
						borderBottomColor: `${colorPallete[form["form-color"]].main}`,
					}}
					className="border-b-4 px-2     pt-2"
				>
					Settings
				</button>
			</div>
		</div>
	);
}
