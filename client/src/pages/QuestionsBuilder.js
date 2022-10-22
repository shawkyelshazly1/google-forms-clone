import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import QuestionContainer from "../components/QuestionContainer";
import HeaderComponent from "../components/formComponents/HeaderComponent";
export default function QuestionsBuilder() {
	const { addQuestion, form } = useContext(AppContext);

	return (
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
	);
}
