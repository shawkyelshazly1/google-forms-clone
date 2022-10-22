import React from "react";
import { Tooltip, Legend, PieChart, Pie } from "recharts";
import numeral from "numeral";

export default function PieChartComponent({ question }) {
	return (
		<PieChart width={730} height={250}>
			<Pie
				data={question.answers}
				dataKey="responses"
				nameKey="answer"
				outerRadius={80}
				fill="#8884d8"
			/>
			<Tooltip
				content={({ active, payload, label }) => {
					let total = 0;
					let responses = question.answers.map((answer) => answer.responses);

					total = responses.reduce((prevSum, a) => prevSum + a, 0);

					if (active) {
						return (
							<div
								className="custom-tooltip"
								style={{
									backgroundColor: "#ffff",
									padding: "5px",
									border: "1px solid #cccc",
								}}
							>
								<label>{`${payload[0].name} : ${numeral(
									payload[0].value / total
								).format("0%")}`}</label>
							</div>
						);
					}
					return null;
				}}
			/>
			<Legend verticalAlign="bottom" align="center" height={36} />
		</PieChart>
	);
}
