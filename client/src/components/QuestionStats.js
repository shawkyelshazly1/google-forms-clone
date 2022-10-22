import React, { useContext } from "react";
import { AppContext } from "../AppContext";

import BarChartComponent from "./BarChartComponent";
import PieChartComponent from "./PieChartComponent";

export default function QuestionStats({ question }) {
	const { getQuestionDetails } = useContext(AppContext);
	return (
		<div className="flex flex-col bg-white w-full h-full rounded-lg min-w-[700px] gap-2  border-[1px] border-gray-300">
			<div className="flex flex-col w-full gap-2 py-4 px-6 items-start">
				<h1 className="text-lg">
					{getQuestionDetails(question._id)["question-title"]}
				</h1>
				<p className="text-sm">{question.responses} responses</p>
			</div>
			<div className="flex flex-1 flex-row py-4 px-6 items-center justify-center">
				{getQuestionDetails(question._id)["question-type"] === "short-input" ||
				getQuestionDetails(question._id)["question-type"] === "paragraph" ? (
					<BarChartComponent question={question} />
				) : (
					<PieChartComponent question={question} />
				)}
			</div>
		</div>
	);
}
