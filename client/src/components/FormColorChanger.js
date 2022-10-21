import React, { useContext, useState } from "react";
import { RiPaletteLine } from "react-icons/ri";
import { HiCheck } from "react-icons/hi";
import { AppContext } from "../AppContext";
import { colorPallete, COLORS } from "../constants";

export default function FormColorChanger() {
	const { form, updateFormColors } = useContext(AppContext);
	const [showColors, setshowColors] = useState(false);

	return (
		<div className="flex flex-row gap-2 items-center">
			<div className="flex flex-row gap-1 items-center">
				{COLORS.map((color) => (
					<div
						onClick={() => {
							setshowColors(!showColors);
							updateFormColors(color);
						}}
						key={color}
						style={{ backgroundColor: `${colorPallete[color].main}` }}
						className={` ${
							showColors ? "" : "hidden"
						} flex items-center text-white justify-center w-6 h-6 rounded-full cursor-pointer`}
					>
						{form["form-color"] === color ? <HiCheck size={"1.3em"} /> : ""}
					</div>
				))}
			</div>
			<RiPaletteLine
				size={"2em"}
				color={"#5F6368"}
				className="cursor-pointer"
				onClick={() => {
					setshowColors(!showColors);
				}}
			/>
		</div>
	);
}
