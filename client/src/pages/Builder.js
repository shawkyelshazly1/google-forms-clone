import React, { useContext } from "react";
import { AppContext } from "../AppContext";

import Nav from "../components/Nav";
import QuestionContainer from "../components/QuestionContainer";

export default function Builder() {
	const { questions, addQuestion } = useContext(AppContext);

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
						{questions.map((question) => (
							<QuestionContainer key={question.id} question={question} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
