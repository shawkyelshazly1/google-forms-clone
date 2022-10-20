import React, { useContext } from "react";
import { AppContext } from "../../AppContext";
import CheckboxOption from "./CheckboxOption";
import { v4 as uuidv4 } from "uuid";

export default function Checkboxes({ question }) {
	const { addOption } = useContext(AppContext);

	const defaultOption = {
		questionId: question.id,
		id: uuidv4(),
		title: "",
		placeholder: `Option ${question.options.length + 1}`,
	};

	return (
		<div className="flex flex-col gap-2 p-3 w-full ">
			{question.options.map((option) => (
				<CheckboxOption option={option} key={option.id} />
			))}
			<button
				onClick={() => {
					addOption(question.id, defaultOption);
				}}
				className="mt-2 text-white font-bold flex flex-row items-center justify-center gap-2 text-sm bg-[#64748B] w-fit  rounded-lg  px-2 py-1"
			>
				{" "}
				<span className="text-2xl ">+</span> Add Option
			</button>
		</div>
	);
}
