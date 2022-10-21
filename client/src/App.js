import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { AppProvider } from "./AppContext";
import { CurrentUserProvider } from "./CurrentUserContext";
import RoutesProvider from "./RoutesProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
	// Create a client
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<CurrentUserProvider>
				<AppProvider>
					<RoutesProvider />
				</AppProvider>
			</CurrentUserProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
