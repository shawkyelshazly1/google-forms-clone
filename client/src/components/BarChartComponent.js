import React from "react";
import {
	BarChart,
	CartesianGrid,
	XAxis,
	Tooltip,
	Legend,
	YAxis,
	Bar,
} from "recharts";
export default function BarChartComponent({ question }) {
	return (
		<BarChart width={730} height={250} data={question.answers}>
			<CartesianGrid strokeDasharray="" />
			<XAxis dataKey="answer" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Bar dataKey="responses" fill="#8884d8" />
		</BarChart>
	);
}
