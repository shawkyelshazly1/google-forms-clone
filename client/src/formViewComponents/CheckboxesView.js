import React, { useContext } from "react";
import { AppContext } from "../AppContext";

export default function CheckboxesView({ question }) {
	const { addFormResponseAnswer, removeFormResponseAnswer } =
		useContext(AppContext);

	return (
		<div className="flex flex-col gap-4">
			{question.options.map((option) => (
				<div className="flex flex-row gap-2" key={option._id}>
					<input
						type="checkbox"
						name={option._id}
						id={option._id}
						value={option.title}
						className="w-4"
						onChange={(e) => {
							switch (e.target.checked) {
								case true:
									addFormResponseAnswer(
										{
											questionId: question._id,
											answer: e.target.value,
										},
										question["question-type"]
									);
									break;
								case false:
									removeFormResponseAnswer({
										questionId: question._id,
										answer: e.target.value,
									});
									break;
								default:
									break;
							}
						}}
					/>
					<label htmlFor={option.id}>{option.title}</label>
				</div>
			))}
		</div>
	);
}
