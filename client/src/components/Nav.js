import React, { useContext, useEffect, useState } from "react";
import { FcDocument } from "react-icons/fc";
import { BsFillTrashFill } from "react-icons/bs";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";
import toast from "react-hot-toast";
export default function Nav() {
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
						const updatedForms = forms.filter((form) => form._id !== data._id);
						return [...updatedForms];
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
		<div className="flex w-full  flex-col px-4 bg-gray-300 pt-2 fixed z-50 top-0 overflow-hidden min-h-[50px]">
			<div className="flex flex-row w-full items-center justify-between">
				<div className="flex flex-row items-center">
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
						className="h-full w-auto py-2 px-3 bg-[#D1D5DB] focus:outline-none focus:border-b-2 focus:border-b-black text-xl"
					/>
				</div>
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
			</div>
			<div className="flex flex-row  w-full gap-4 items-center justify-center font-semibold">
				<button
					onClick={() => {
						console.log(form);
					}}
					className="border-b-4 px-2 border-b-[#fa8a8a] active:bg-[#FCA5A5] active:text-white pt-2"
				>
					Questions
				</button>
				<button className="border-b-4 px-2 border-b-[#fa8a8a] active:bg-[#FCA5A5] active:text-white  pt-2">
					Responses
				</button>
				<button className="border-b-4 px-2 border-b-[#fa8a8a] active:bg-[#FCA5A5] active:text-white  pt-2">
					Settings
				</button>
			</div>
		</div>
	);
}
