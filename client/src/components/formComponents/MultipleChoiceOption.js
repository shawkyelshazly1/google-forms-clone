import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";

export default function MultipleChoiceOption({ option }) {
	const { removeOption, updateOption } = useContext(AppContext);

	const [optionDetails, setOptionDetails] = useState(option);

	useEffect(() => {
		setOptionDetails(option);
	}, [option]);

	const handleChange = (e) => {
		setOptionDetails({ ...optionDetails, [e.target.name]: e.target.value });
	};

	return (
		<div className="flex flex-row gap-2 w-full items-center ">
			<input
				className="w-5 h-5"
				type="radio"
				id={optionDetails._id}
				name={option.questionId}
				value={optionDetails.title}
			/>
			<input
				value={optionDetails.title}
				type="text"
				placeholder={optionDetails.placeholder}
				name="title"
				id={optionDetails._id}
				onChange={handleChange}
				onBlur={() => {
					updateOption(option.questionId, optionDetails);
				}}
				className="bg-[#F3F4F6] focus:py-0 focus:my-0 focus:outline-none focus:border-b-2 px-2 text-lg"
			/>
			<button
				onClick={() => {
					removeOption(option.questionId, option._id);
				}}
				className=" font-bold text-white rounded-full px-2 bg-red-500"
			>
				X
			</button>
		</div>
	);
}
