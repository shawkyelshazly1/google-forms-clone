import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import { colorPallete } from "../../constants";

export default function HeaderComponent() {
	const { form, updateFormDescription, updateFormSecondaryTitle } =
		useContext(AppContext);

	useEffect(() => {
		setHeaderData({
			"form-secondary-title": form["form-secondary-title"],
			"form-description": form["form-description"],
		});
	}, [form]);

	// header data
	const [headerData, setHeaderData] = useState({
		"form-secondary-title": form["form-secondary-title"],
		"form-description": form["form-description"],
	});

	// handle  change
	const handleChange = (e) => {
		setHeaderData({ ...headerData, [e.target.name]: e.target.value });
	};

	return (
		<div className="flex flex-col bg-gray-100 w-full h-full rounded-lg min-w-[700px] ">
			<div
				className={`w-full h-3 rounded-t-lg`}
				style={{ backgroundColor: `${colorPallete[form["form-color"]].main}` }}
			>
				&nbsp;
			</div>
			<div className="flex flex-col w-full flex-1 gap-2 py-4 px-4 ">
				<input
					value={
						headerData["form-secondary-title"] === ""
							? form["form-title"]
							: headerData["form-secondary-title"]
					}
					onBlur={() => {
						updateFormSecondaryTitle(headerData["form-secondary-title"]);
					}}
					onChange={handleChange}
					type="text"
					name="form-secondary-title"
					placeholder="Form Title"
					className="bg-[#F3F4F6] text-3xl border-b-[1px] border-b-gray-200 text-black focus:outline-none focus:border-b-2 focus:border-b-gray-400 py-2"
				/>
				<input
					value={headerData["form-description"]}
					onBlur={() => {
						updateFormDescription(headerData["form-description"]);
					}}
					onChange={handleChange}
					type="text"
					name="form-description"
					placeholder="Form description"
					className="bg-[#F3F4F6] text-xl border-b-[1px] border-b-gray-200 text-black focus:outline-none focus:border-b-2 focus:border-b-gray-400 py-2"
				/>
			</div>
		</div>
	);
}
