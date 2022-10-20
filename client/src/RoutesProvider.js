import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Builder from "./pages/Builder";
import FormView from "./pages/FormView";
import PrivateRouter from "./pages/PrivateRouter";

export default function RoutesProvider() {
	return (
		<Router>
			<div className="w-full min-h-screen flex">
				<Routes>
					<Route
						path="*"
						element={
							<>
								<PrivateRouter>
									<Routes>
										<Route path="/" element={<Home />} />
										<Route path="/:id/edit" element={<Builder />} />
										<Route path="/:id/view" element={<FormView />} />
									</Routes>
								</PrivateRouter>
							</>
						}
					/>
					<Route path="/register" element={<Register />} />
				</Routes>
			</div>
		</Router>
	);
}
