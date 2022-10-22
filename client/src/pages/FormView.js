import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../api";
import { AppContext } from "../AppContext";
import { colorPallete } from "../constants";
import QuestionContainerView from "../formViewComponents/QuestionContainerView";

export default function FormView() {
	const { setformResponseId, formResponse, setformResponse } =
		useContext(AppContext);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		setformResponse({ ...formResponse, answers: [] });
	}, []);

	// Queries form
	const {
		data: form,
		isLoading,
		
	} = useQuery(
		["view-form"],
		() => {
			return api.get(`/form/${id}/view`, {}).then((res) => {
				return res.data;
			});
		},
		{
			onSuccess: (data) => {
				setformResponseId(data._id);
			},
			onError: (error) => {
				navigate("/404");
			},
			retry: false,
			refetchOnWindowFocus: false,
		}
	);

	// handle submitting form response
	const handleFormSubmittion = (e) => {
		e.preventDefault();
		console.log(formResponse);
		navigate(`/${id}/formResponse`);
	};

	if (isLoading) return <>Loading...</>;
	return (
		<div
			className="flex w-full min-h-screen justify-center py-4 pb-20"
			style={{ backgroundColor: `${colorPallete[form["form-color"]].bg}` }}
		>
			<div className="flex flex-col gap-4 min-w-[700px]">
				<div className="flex flex-col bg-white rounded-lg">
					<div
						className={`w-full h-3 rounded-t-lg`}
						style={{
							backgroundColor: `${colorPallete[form["form-color"]].main}`,
						}}
					>
						&nbsp;
					</div>
					<div className="flex flex-col gap-4 py-4 px-6">
						<h1 className="font-semibold text-black text-4xl">
							{!form["form-secondary-title"] === "" ? (
								form["form-secondary-title"]
							) : (
								<>
									{!form["form-title"] === ""
										? form["form-title"]
										: "Untitled Form"}
								</>
							)}
						</h1>
						<hr />
						<p className="text-base font-medium">{form["form-description"]}</p>
					</div>
				</div>
				<form
					onSubmit={handleFormSubmittion}
					className="flex flex-col gap-4 w-full "
				>
					{form.questions.map((question) => (
						<QuestionContainerView question={question} key={question._id} />
					))}

					<div className="flex flex-row w-full justify-between">
						<button
							className="text-white py-[6px] px-6 rounded-md font-normal"
							style={{
								backgroundColor: `${colorPallete[form["form-color"]].main}`,
							}}
						>
							Submit
						</button>
						<span
							onClick={() => {
								window.location.reload();
							}}
							className="font-medium text-base mr-1 cursor-pointer"
							style={{
								color: `${colorPallete[form["form-color"]].main}`,
							}}
						>
							Clear Form
						</span>
					</div>
				</form>
			</div>
		</div>
	);
}
