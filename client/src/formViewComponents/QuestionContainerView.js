import React from "react";
import { selectViewQuestion } from "../utils";

export default function QuestionContainerView({ question }) {
	return (
		<div className="w-full bg-white p-6 flex-col flex gap-6 rounded-lg border-[1px] border-[#dadce0]">
			<h1 className="text-xl font-normal">{question["question-title"]}</h1>
			{selectViewQuestion(question, question["question-type"])}
		</div>
	);
}
