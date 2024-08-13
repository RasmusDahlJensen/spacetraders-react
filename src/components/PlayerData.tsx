// PlayerAndShipsPage.tsx

import React, { useEffect, useState } from "react";
import {
	fetchPlayerData,
	fetchShips,
	PlayerDataModel,
	ShipDataModel,
} from "../api/playerData/fetchPlayerData";

const PlayerData: React.FC = () => {
	const [playerData, setPlayerData] = useState<PlayerDataModel | null>(null);
	const [ships, setShips] = useState<ShipDataModel[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const player = await fetchPlayerData();
				const allShips = await fetchShips();
				setPlayerData(player);
				setShips(allShips);
			} catch (err) {
				console.error("Error fetching data:", err);
				setError("Failed to load player or ships data.");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) return <div>Loading player and ships data...</div>;
	if (error) return <div>{error}</div>;

	return (
		<div>
			<h1>Player and Ships Information</h1>
			{playerData && (
				<div className="player-data">
					<h2>Player Data</h2>
					<div>
						<p>Symbol: {playerData.symbol}</p>
					</div>
					<div>
						<p>Headquarters: {playerData.headquarters}</p>
					</div>
					<div>
						<p>Credits: {playerData.credits}</p>
					</div>
					<div>
						<p>Starting Faction: {playerData.startingFaction}</p>
					</div>
					<div>
						<p>Ship Count: {playerData.shipCount}</p>
					</div>
					<h3>Starting sector, system, and waypoint</h3>
					<div>
						<p>Sector: {playerData.sector}</p>
					</div>
					<div>
						<p>System: {playerData.system}</p>
					</div>
					<div>
						<p>Waypoint: {playerData.waypoint}</p>
					</div>
				</div>
			)}

			<div className="ships-data">
				<h2>My Ships</h2>
				{ships.length > 0 ? (
					<ul>
						{ships.map((ship) => (
							<li key={ship.symbol}>
								<p>
									<strong>Ship Symbol:</strong> {ship.symbol}
								</p>
								<p>
									<strong>Role:</strong> {ship.registration.role}
								</p>
								<p>
									<strong>Status:</strong> {ship.nav.status}
								</p>
								<p>
									<strong>Location:</strong> {ship.nav.systemSymbol} /{" "}
									{ship.nav.waypointSymbol}
								</p>
								<p>
									<strong>Condition:</strong> {ship.frame.condition}
								</p>
								<p>
									<strong>Fuel:</strong> {ship.fuel.current} /{" "}
									{ship.fuel.capacity}
								</p>
							</li>
						))}
					</ul>
				) : (
					<p>No ships available</p>
				)}
			</div>
		</div>
	);
};

export default PlayerData;
