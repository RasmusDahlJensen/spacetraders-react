// ShipPage.tsx

import React, { useEffect, useState } from "react";
import { fetchShipyard, ShipyardModel } from "./shipData";

const ShipPage: React.FC = () => {
	const [shipyards, setShipyards] = useState<ShipyardModel[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	useEffect(() => {
		const fetchShipData = async () => {
			try {
				const shipyardData = await fetchShipyard("X1-ZV55");
				setShipyards(shipyardData);
			} catch (err) {
				console.error("Error fetching ship data:", err);
				setError("Failed to load shipyard data.");
			} finally {
				setLoading(false);
			}
		};

		fetchShipData();
	}, []);

	if (loading) return <div>Loading shipyard data...</div>;
	if (error) return <div>{error}</div>;

	return (
		<div>
			<h1>Shipyard Information</h1>
			{shipyards.length > 0 ? (
				<div>
					{shipyards.map((shipyard, index) => (
						<div key={index}>
							<h2>Shipyard {index + 1}</h2>
							<p>Type: {shipyard.type}</p>
						</div>
					))}
				</div>
			) : (
				<div>No shipyard data available</div>
			)}
		</div>
	);
};

export default ShipPage;
