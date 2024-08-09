import { createRoot } from "react-dom/client";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./components/App.tsx";
import "./index.css";
import Navigation from "./components/Navigation.tsx";

// Navigation pages
import ContractsPage from "./contractData/ContractsPage.tsx";
import ShipPage from "./shipData/ShipData.tsx";

createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Router>
			<Navigation />
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/contracts" element={<ContractsPage />} />
				<Route path="/ships" element={<ShipPage />} />
			</Routes>
		</Router>
	</React.StrictMode>
);
