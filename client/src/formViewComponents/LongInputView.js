import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext";

export default function LongInputView({ question }) {
	const { addFormResponseAnswer } = useContext(AppContext);
	const [data, setData] = useState("");
	return (
		<textarea
			value={data}
			onChange={(e) => {
				setData(e.target.value);
			}}
			onBlur={() => {
				addFormResponseAnswer(
					{
						questionId: question._id,
						answer: data,
					},
					question["question-type"]
				);
			}}
			placeholder="Your answer"
			className="focus:outline-none border-b-[1px] focus:border-b-2 focus:border-b-black w-auto resize-y "
		/>
	);
}
