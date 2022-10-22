import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../api";
import { AppContext } from "../AppContext";

import Nav from "../components/Nav";

import ShareLinkModal from "../components/ShareLinkModal";
import { colorPallete } from "../constants";
import QuestionsBuilder from "./QuestionsBuilder";
import Responses from "./Responses";

export default function Builder() {
	const navigate = useNavigate();

	const { id } = useParams();
	const { setForm, form } = useContext(AppContext);
	const [showModal, setShowModal] = useState(false);
	const [selectedPage, setSelectedPage] = useState("builder");

	// Queries form
	const { data } = useQuery(
		["edit-form"],
		() => {
			return api.get(`/form/${id}/edit`, {}).then((res) => {
				return res.data;
			});
		},
		{
			onSuccess: (data) => {
				setForm(data);
			},
			onError: (error) => {
				navigate("/404");
			},
			retry: false,
			refetchOnWindowFocus: false,
		}
	);

	return (
		<div
			className="w-full min-h-screen flex flex-col items-center  pb-4 "
			style={{ backgroundColor: `${colorPallete[form["form-color"]].bg}` }}
		>
			<Nav setShowModal={setShowModal} setSelectedPage={setSelectedPage} />
			<ShareLinkModal showModal={showModal} setShowModal={setShowModal} />
			<div className="pt-24 w-full ">
				{selectedPage === "builder" ? <QuestionsBuilder /> : <Responses />}
			</div>
		</div>
	);
}
