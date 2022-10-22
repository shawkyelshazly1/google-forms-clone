
import React, { useContext, useState } from "react";

import Select from "react-select";

import { AppContext } from "../AppContext";
import { colorPallete, questionsMap, questionTypes } from "../constants";
import { selectQuestion } from "../utils";

export default function QuestionContainer({ question }) {
	// setting remove function from main app context
	const { removeQuestion, updateQuestionTitle, updateQuestionType, form } =
		useContext(AppContext);



	// title state
	const [questionTitle, setQuestionTitle] = useState(
		question["question-title"]
	);

	// setting dropdown state
	const [questionType, setquestionType] = useState(
		questionsMap[question["question-type"]]
	);

	// question type change handler
	const handleDropDownMenuChange = (selectedOption) => {
		setquestionType(selectedOption);
		updateQuestionType(question._id, selectedOption.value);
	};

	// handle change title on input
	const handleTitleChange = (e) => {
		setQuestionTitle(e.target.textContent);
	};

	return (
		<div className="h-fit w-full flex flex-row bg-gray-100 rounded-lg p-4 py-6 gap-4 min-w-[700px] shadow-md">
			<div className="flex-1 flex flex-col">
				<div
					data-ph={questionTitle === "" ? "Question" : questionTitle}
					contentEditable
					type="text"
					onInput={handleTitleChange}
					onBlur={() => {
						updateQuestionTitle(question._id, questionTitle);
					}}
					onFocus={(e) => {
						e.target.textContent = questionTitle;
					}}
					className="focus:outline-none rounded-lg text-lg font-semibold py-2 min-h-[20px] px-4 w-[500px] overflow-auto bg-white focus:content"
				/>

				<div className="mt-4 w-full">
					{selectQuestion(question, questionType.value)}
				</div>
			</div>
			<div className="flex flex-col justify-between items-center gap-4 ">
				<Select
					value={questionType}
					options={questionTypes}
					onChange={handleDropDownMenuChange}
				/>
				<button
					onClick={() => {
						removeQuestion(question._id);
					}}
					style={{
						backgroundColor: `${colorPallete[form["form-color"]].main}`,
					}}
					className=" w-fit py-2 px-4 rounded-lg text-sm text-white font-semibold"
				>
					Delete
				</button>
			</div>
		</div>
	);
}
