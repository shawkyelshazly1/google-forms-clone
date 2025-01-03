import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import { useParams } from "react-router";
import api from "../api";

export default function ShareLinkModal({ setShowModal, showModal }) {
	const { id } = useParams();
	const [shortenURL, setShortenURL] = useState("");

	useEffect(() => {
		api
			.post("/url/create", {
				originalURL: `${process.env.REACT_APP_APP_URL}/${id}/view`,
			})
			.then((res) => {
				setShortenURL(res.data.shortenedURL);
			})
			.catch((_) => {
				toast.error("Oops...!, Something went wrong!");
			});
	}, [id]);

	// copy to clipboard
	const copyToClipboard = (text) => {
		navigator.clipboard.writeText(text);
		toast("Copied to clipbpard.", {
			icon: "👍",
			position: "bottom-right",
		});
	};

	return (
		<div
			className={` w-full h-full absolute top-0 left-0 z-40  items-center justify-center ${
				showModal ? "flex" : "hidden"
			}`}
		>
			<div className="w-full h-full absolute bg-black opacity-25"></div>
			<div className="z-50 w-1/4 bg-white rounded-lg py-4 px-6 flex flex-col gap-4 relative">
				<IoMdClose
					onClick={() => {
						setShowModal(false);
					}}
					size={"1.5em"}
					className="hover:bg-gray-200 cursor-pointer rounded-full absolute top-4 right-4"
				/>

				<div className="flex flex-col gap-2">
					<h1 className="text-2xl font-semibold">Share Form</h1>
					<hr className="border-[1px]" />
				</div>

				<div className="flex flex-col gap-2">
					<h3 className="text-lg font-semibold">Original URL</h3>
					<p className="text-[16px] border-b-2 flex flex-row justify-between items-center py-2">
						{`${process.env.REACT_APP_APP_URL}/${id}/view`}
						<MdContentCopy
							size={"1.5em"}
							className="cursor-pointer"
							onClick={() => {
								copyToClipboard(`${process.env.REACT_APP_APP_URL}/${id}/view`);
							}}
						/>
					</p>
				</div>
				<div className="flex flex-col gap-2">
					<h3 className="text-lg font-semibold">Shorten URL</h3>
					<p className="text-[16px] border-b-2 flex flex-row justify-between items-center py-2">
						{`${process.env.REACT_APP_APP_URL}/url/${shortenURL}`}
						<MdContentCopy
							size={"1.5em"}
							className="cursor-pointer"
							onClick={() => {
								copyToClipboard(
									`${process.env.REACT_APP_API_URL}/url/${shortenURL}`
								);
							}}
						/>
					</p>
				</div>
			</div>
		</div>
	);
}

// 748e29b7-8774-4c8c-a6a1-003d7b813dfa
// 748e29b7-8774-4c8c-a6a1-003d7b813dfa
