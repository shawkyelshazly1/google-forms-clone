import "./App.css";
import { AppProvider } from "./AppContext";
import { CurrentUserProvider } from "./CurrentUserContext";
import RoutesProvider from "./RoutesProvider";

function App() {
	return (
		<CurrentUserProvider>
			<AppProvider>
				<RoutesProvider />
			</AppProvider>
		</CurrentUserProvider>
	);
}

export default App;
