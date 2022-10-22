import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import { SiMicrosoftexcel } from "react-icons/si";
import QuestionStats from "../components/QuestionStats";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import api from "../api";

export default function Responses() {
	const navigate = useNavigate();
	const { id } = useParams();
	const { formResponsesData, setFormResponsesData } = useContext(AppContext);
	// queries form responses
	const { data, isLoading } = useQuery(
		["form-responses"],
		() => {
			return api.get(`/form/${id}/responses`, {}).then((res) => {
				return res.data;
			});
		},
		{
			onSuccess: (data) => {
				setFormResponsesData(data);
			},
			onError: (error) => {
				navigate("/404");
			},
			retry: false,
			refetchOnWindowFocus: false,
		}
	);
	if (isLoading) return <>Loading...</>;
	return (
		<div className="flex items-center w-full h-full flex-col">
			<div className="flex  flex-col gap-4  items-center py-4 w-fit">
				<div className="flex flex-col bg-white w-full h-full rounded-lg min-w-[700px] gap-8  border-[1px] border-gray-300">
					<div className="flex flex-row w-full flex-1 gap-2 py-4 px-6 items-center justify-between">
						<h1 className="text-3xl">
							{formResponsesData.responses.length} responses
						</h1>
						<SiMicrosoftexcel
							size={"1.5em"}
							color={"#0F9D58"}
							className="cursor-pointer"
							title="Export Data to CSV File."
							onClick={() => {
								// #TODO: add exporting to csv function here
								console.log("export data");
							}}
						/>
					</div>
					{/* #TODO: handle changing between pages here */}
					<div className="flex flex-row justify-between items-center px-20">
						<button className="pb-2 border-b-black border-b-2 font-medium text-sm">
							Summary
						</button>
						<button className="pb-2 border-b-black border-b-2 font-medium text-sm">
							Question
						</button>
						<button className="pb-2 border-b-black border-b-2 font-medium text-sm">
							Individual
						</button>
					</div>
				</div>
				{formResponsesData.responses.length === 0 ? (
					<div className="flex flex-col bg-white w-full h-full rounded-lg min-w-[700px] gap-8  border-[1px] border-gray-300">
						<div className="flex flex-col w-full flex-1 gap-2 py-4 px-6 items-center justify-center">
							<p className="text-sm">Waiting for responses</p>
						</div>
					</div>
				) : (
					formResponsesData.formResponsesStats.map((question) => (
						<QuestionStats question={question} />
					))
				)}
			</div>
		</div>
	);
}
