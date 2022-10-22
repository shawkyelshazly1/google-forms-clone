import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../api";
import { AppContext } from "../AppContext";
import HeaderComponent from "../components/formComponents/HeaderComponent";
import Nav from "../components/Nav";
import QuestionContainer from "../components/QuestionContainer";
import ShareLinkModal from "../components/ShareLinkModal";
import { colorPallete } from "../constants";

export default function Builder() {
	const navigate = useNavigate();

	const { id } = useParams();
	const { addQuestion, setForm, form } = useContext(AppContext);
	const [showModal, setShowModal] = useState(false);

	// Queries form
	const { data } = useQuery(
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
		<div
			className="w-full min-h-screen flex flex-col items-center  pb-4 "
			style={{ backgroundColor: `${colorPallete[form["form-color"]].bg}` }}
		>
			<Nav setShowModal={setShowModal} />
			<ShareLinkModal showModal={showModal} setShowModal={setShowModal} />
			<div className="pt-24 w-full ">
				<div className="flex flex-col-reverse  items-center w-full h-full">
					<button
						onClick={addQuestion}
						className="rounded-lg bg-slate-500 w-fit py-2 px-4 text-white font-semibold"
					>
						Add Question
					</button>
					<div className="flex  flex-col gap-4 form-container items-center py-4 w-fit">
						<HeaderComponent />
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
