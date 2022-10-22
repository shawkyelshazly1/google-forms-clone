import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { colorPallete } from "../constants";

export default function FormResponseSuccess() {
	const { id } = useParams();
	const navigate = useNavigate();

	// Queries form
	const { data: form, isLoading } = useQuery(
		["view-form"],
		() => {
			return api.get(`/form/${id}/view`, {}).then((res) => {
				return res.data;
			});
		},
		{
			onSuccess: (_) => {},
			onError: (_) => {
				navigate("/404");
			},
			retry: false,
			refetchOnWindowFocus: false,
		}
	);
	if (isLoading) return <>Loading...</>;
	return (
		<div
			className="flex w-full min-h-screen justify-center py-4 pb-20"
			style={{ backgroundColor: `${colorPallete[form["form-color"]].bg}` }}
		>
			<div className="flex flex-col gap-4 min-w-[700px]">
				<div className="flex flex-col bg-white rounded-lg">
					<div
						className={`w-full h-3 rounded-t-lg`}
						style={{
							backgroundColor: `${colorPallete[form["form-color"]].main}`,
						}}
					>
						&nbsp;
					</div>
					<div className="flex flex-col gap-4 py-4 px-6">
						<h1 className="font-semibold text-black text-4xl">
							{form["form-secondary-title"]}
						</h1>

						<p className="text-base font-normal">
							Your response has been recorded.
						</p>
					</div>
					<hr />
					<Link
						className="py-4 px-6 underline text-blue-500"
						to={`/${form._id}/view`}
					>
						Submit another response
					</Link>
				</div>
			</div>
		</div>
	);
}
