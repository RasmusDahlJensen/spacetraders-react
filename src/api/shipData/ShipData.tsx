import React, { useEffect, useState } from "react";
import {
	fetchShipyard,
	fetchAvailableShips,
	purchaseShip,
	ShipyardModel,
	ShipModel,
} from "./shipDataModel";

const ShipPage: React.FC = () => {
	const [shipyards, setShipyards] = useState<ShipyardModel[]>([]);
	const [availableShips, setAvailableShips] = useState<{
		[key: string]: ShipModel[];
	}>({});
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchShipData = async () => {
			try {
				const shipyardData = await fetchShipyard("X1-TU74");
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

	const handleFetchShips = async (
		systemSymbol: string,
		waypointSymbol: string
	) => {
		try {
			const ships = await fetchAvailableShips(systemSymbol, waypointSymbol);
			console.log("Fetched ships:", ships);
			setAvailableShips((prev) => ({
				...prev,
				[waypointSymbol]: ships,
			}));
		} catch (err) {
			console.error("Error fetching available ships:", err);
		}
	};

	const handlePurchaseShip = async (
		shipType: string,
		waypointSymbol: string
	) => {
		try {
			const purchaseResponse = await purchaseShip(shipType, waypointSymbol);
			console.log("Ship purchased successfully:", purchaseResponse);
			alert(`Successfully purchased ${shipType}`);
		} catch (error) {
			console.error("Error purchasing ship:", error);
			alert("Failed to purchase ship. Check console for details.");
		}
	};

	if (loading) return <div>Loading shipyard data...</div>;
	if (error) return <div>{error}</div>;

	return (
		<div>
			<h1>Shipyard Information</h1>
			{shipyards.length > 0 ? (
				<div>
					{shipyards.map((shipyard, index) => (
						<div key={index}>
							<h2>Shipyard {shipyard.symbol}</h2>
							<p>Type: {shipyard.type}</p>
							<p>System Symbol: {shipyard.systemSymbol}</p>
							<p>Orbits: {shipyard.orbits}</p>
							<p>
								Coordinates: ({shipyard.x}, {shipyard.y})
							</p>
							<p>
								Under Construction:{" "}
								{shipyard.isUnderConstruction ? "Yes" : "No"}
							</p>
							<p>Faction: {shipyard.faction.symbol}</p>
							<h3>Traits:</h3>
							<ul>
								{shipyard.traits.map((trait) => (
									<li key={trait.symbol}>
										<strong>{trait.name}</strong>: {trait.description}
									</li>
								))}
							</ul>
							<p>Chart submitted by: {shipyard.chart.submittedBy}</p>
							<p>
								Submitted on:{" "}
								{new Date(shipyard.chart.submittedOn).toLocaleString()}
							</p>
							<button
								onClick={() =>
									handleFetchShips(shipyard.systemSymbol, shipyard.symbol)
								}
							>
								Show Available Ships
							</button>
							{availableShips[shipyard.symbol] && (
								<div>
									<h3>Available Ships:</h3>
									<ul>
										{availableShips[shipyard.symbol].map((ship) => (
											<li key={ship.type}>
												<strong>{ship.type}</strong>
												<button
													onClick={() =>
														handlePurchaseShip(ship.type, shipyard.symbol)
													}
												>
													Purchase
												</button>
											</li>
										))}
									</ul>
								</div>
							)}
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
