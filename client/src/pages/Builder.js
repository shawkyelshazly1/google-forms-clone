import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import api from "../api";
import { AppContext } from "../AppContext";

import Nav from "../components/Nav";
import QuestionContainer from "../components/QuestionContainer";
import NotFound from "./NotFound";

export default function Builder() {
	const navigate = useNavigate();

	const { id } = useParams();
	const { addQuestion, setForm, form } = useContext(AppContext);

	// Queries form
	const { data, isLoading, error } = useQuery(
		["edit-form"],
		() => {
			return api.get(`/form/${id}/edit`, {}).then((res) => {
				return res.data;
			});
		},
		{
			onSuccess: (data) => {
				setForm(data);
			},
			onError: (error) => {
				navigate("/404");
			},
			retry: false,
			refetchOnWindowFocus: false,
		}
	);

	return (
		<div className="w-full min-h-screen flex flex-col items-center bg-red-300 pb-4 ">
			<Nav />
			<div className="pt-24 w-full ">
				<div className="flex flex-col-reverse  items-center w-full h-full">
					<button
						onClick={addQuestion}
						className="rounded-lg bg-slate-500 w-fit py-2 px-4 text-white font-semibold"
					>
						Add Question
					</button>
					<div className="flex  flex-col gap-4 form-container items-center py-4 w-fit">
						{form.questions.map((question) => (
							<QuestionContainer
								key={question._id || question._id}
								question={question}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
