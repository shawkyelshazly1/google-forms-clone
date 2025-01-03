import { useQueryClient } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import api from "./api";
// current user context
export const CurrentUserContext = createContext(null);

// current yser provider as wrapper
export const CurrentUserProvider = ({ children }) => {
	// Access the client
	const queryClient = useQueryClient();

	// initial states
	const [currentUser, setCurrentUser] = useState();
	const [authLoading, setAuthLoading] = useState(true);

	// use effect to validate the auth status
	useEffect(() => {
		checkAuthStatus();
	}, []);

	// check auth status
	const checkAuthStatus = () => {
		const token = localStorage.getItem("accessToken");

		setAuthLoading(true);

		if (token && token !== "") {
			api
				.get("/user/auth", {})
				.then((res) => {
					const user = res.data;
					setAuthLoading(false);
					if (user) {
						setCurrentUser(user);
					}
				})
				.catch((error) => {
					setAuthLoading(false);
					setCurrentUser(null);
				});
		} else {
			setAuthLoading(false);
			setCurrentUser(null);
		}
	};

	// handle Logout

	const handleLogout = () => {
		//remove token and user
		localStorage.setItem("accessToken", "");
		setCurrentUser(null);
		queryClient.removeQueries();
	};

	const stateValues = {
		currentUser,
		setCurrentUser,
		authLoading,
		setAuthLoading,
		handleLogout,
		checkAuthStatus,
	};

	return (
		<CurrentUserContext.Provider value={stateValues}>
			{children}
		</CurrentUserContext.Provider>
	);
};
