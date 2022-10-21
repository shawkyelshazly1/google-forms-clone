import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router";
import api from "../api";

export default function FormView() {
	const { id } = useParams();
	const navigate = useNavigate();

	// Queries form
	const { data, isLoading, error } = useQuery(
		["view-form"],
		() => {
			return api.get(`/form/${id}/view`, {}).then((res) => {
				return res.data;
			});
		},
		{
			onSuccess: (data) => {
				// setForm(data);
			},
			onError: (error) => {
				navigate("/404");
			},
			retry: false,
			refetchOnWindowFocus: false,
		}
	);

	return <div className="flex items-center justify-center">view form</div>;
}
