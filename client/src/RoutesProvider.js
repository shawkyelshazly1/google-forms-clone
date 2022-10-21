import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Builder from "./pages/Builder";
import FormView from "./pages/FormView";
import PrivateRouter from "./pages/PrivateRouter";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";

export default function RoutesProvider() {
	return (
		<Router>
			<div className="w-full min-h-screen flex">
				<Toaster />
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
					<Route path="/404" element={<NotFound />} />
				</Routes>
			</div>
		</Router>
	);
}
