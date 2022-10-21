import axios from "axios";

export default axios.create({
	baseURL:
		process.env.REACT_APP_NODE_ENV === "development"
			? "http://localhost:5000"
			: "http://localhost:5000",
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json; charset=UTF-8",
		authorization: `Bearer ${localStorage.getItem("accessToken")}`,
	},
});
