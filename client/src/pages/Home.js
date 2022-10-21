import {
	QueryClient,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import React from "react";
import { Navigate, useNavigate } from "react-router";
import api from "../api";
import FormCard from "../components/FormCard";
import HomeNav from "../components/HomeNav";
import { defaultForm } from "../constants";

export default function Home() {
	const navigate = useNavigate();

	// Access the client
	const queryClient = useQueryClient();

	// Queries forms
	const {
		data: forms,
		isLoading,
		error,
	} = useQuery(
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
		<div className="flex w-full h-full flex-col items-center pb-4">
			<HomeNav />
			<div className="pt-24 px-4 grid grid-cols-4 gap-8 w-2/4">
				{isLoading ? (
					<>Loading....</>
				) : (
					forms.map((form) => <FormCard form={form} key={form._id} />)
				)}

				<button
					onClick={() => {
						addForm.mutate(defaultForm);
					}}
					className="flex flex-col items-center justify-center rounded-lg bg-gray-200 border-2 border-gray-300 hover:border-blue-400 cursor-pointer"
				>
					<span className="text-4xl font-semibold">+</span>
					<h1 className="text-xl font-semibold">Create New Form</h1>
				</button>
			</div>
		</div>
	);
}
