import axios from "axios";

export default axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json; charset=UTF-8",
		authorization: `Bearer ${localStorage.getItem("accessToken")}`,
	},
});
