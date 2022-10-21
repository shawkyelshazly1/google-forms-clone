import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import { useNavigate } from "react-router";
import api from "../api";
import FormCard from "../components/FormCard";
import HomeNav from "../components/HomeNav";

export default function Home() {
	const navigate = useNavigate();

	const defaultForm = {
		_id: uuidv4(),
		"form-title": "",
		"form-color": "purple",
		"form-description": "",
		"form-secondary-title": "",
		questions: [],
	};

	// Access the client
	const queryClient = useQueryClient();

	// Queries forms
	const { data: forms, isLoading } = useQuery(
		["forms"],
		() => {
			return api.get("/form/all", {}).then((res) => {
				return res.data;
			});
		},
		{ staleTime: 120000 }
	);

	// add form mutation
	const addForm = useMutation(
		({ formData }) => {
			return api.post("/form/create", { formData }).then((res) => {
				return res.data;
			});
		},
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries(["forms"]);
				navigate(`/${data._id}/edit`);
			},
		}
	);

	return (
		<div className="flex w-full h-fit flex-col items-center pb-4">
			<HomeNav />
			<div className="pt-24 px-4 grid grid-cols-4  gap-8 w-2/4 h-fit  gap-y-4">
				{isLoading ? (
					<>Loading....</>
				) : (
					forms.map((form) => <FormCard form={form} key={form._id} />)
				)}

				<button
					onClick={() => {
						addForm.mutate({ formData: defaultForm });
					}}
					className="flex py-5 px-4 flex-col items-center justify-center rounded-lg bg-gray-200 border-2 border-gray-300 hover:border-blue-400 cursor-pointer"
				>
					<span className="text-4xl font-semibold">+</span>
					<h1 className="text-xl font-semibold">Create New Form</h1>
				</button>
			</div>
		</div>
	);
}
