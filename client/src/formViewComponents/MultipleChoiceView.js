import React, { useContext } from "react";
import { AppContext } from "../AppContext";

export default function MultipleChoiceView({ question }) {
	const { addFormResponseAnswer } = useContext(AppContext);

	return (
		<div className="flex flex-col gap-4">
			{question.options.map((option) => (
				<div className="flex flex-row gap-2" key={option._id}>
					<input
						type="radio"
						name={question._id}
						id={option._id}
						className="w-4"
						value={option.title}
						onChange={(e) => {
							addFormResponseAnswer(
								{
									questionId: question._id,
									answer: e.target.value,
								},
								question["question-type"]
							);
						}}
					/>
					<label htmlFor={option._id}>{option.title}</label>
				</div>
			))}
		</div>
	);
}
