// src/App.tsx
import React, { useEffect, useState } from "react";
import { fetchPlayerData, PlayerDataModel } from "./playerData/fetchPlayerData";
import {
	fetchLocationData,
	LocationDataModel,
} from "./viewLocation/viewLocation";

function App() {
	const [playerData, setPlayerData] = useState<PlayerDataModel | null>(null);
	const [locationData, setLocationData] = useState<LocationDataModel | null>(
		null
	);

	useEffect(() => {
		const getPlayerData = async () => {
			try {
				const data = await fetchPlayerData();
				setPlayerData(data);

				// Fetch location data based on player headquarters
				const location = await fetchLocationData(data.system, data.waypoint);
				setLocationData(location);
			} catch (error) {
				console.error("Failed to fetch data:", error);
			}
		};

		getPlayerData();
	}, []);

	return (
		<div className="App">
			<div className="player-data">
				{playerData ? (
					<>
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
							<p>Ship count: {playerData.shipCount}</p>
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
					</>
				) : (
					<p>Loading player data...</p>
				)}
			</div>

			<div className="location-data">
				{locationData ? (
					<>
						<h2>Headquarter Data</h2>
						<div>
							<p>System Symbol: {locationData.systemSymbol}</p>
						</div>
						<div>
							<p>Symbol: {locationData.symbol}</p>
						</div>
						<div>
							<p>Type: {locationData.type}</p>
						</div>
						<div>
							<p>
								Coordinates: ({locationData.x}, {locationData.y})
							</p>
						</div>
						<div>
							<p>
								Under Construction:{" "}
								{locationData.isUnderConstruction ? "Yes" : "No"}
							</p>
						</div>
						<div>
							<h3>Orbitals:</h3>
							<ul>
								{locationData.orbitals.map((orbital, index) => (
									<li key={index}>{orbital.symbol}</li>
								))}
							</ul>
						</div>
						<div>
							<h3>Traits:</h3>
							<ul>
								{locationData.traits.map((trait, index) => (
									<li key={index}>
										<strong>{trait.name}:</strong> {trait.description}
									</li>
								))}
							</ul>
						</div>
						<div>
							<h3>Modifiers:</h3>
							<ul>
								{locationData.modifiers.map((modifier, index) => (
									<li key={index}>{modifier}</li>
								))}
							</ul>
						</div>
						<div>
							<h3>Faction:</h3>
							<p>Symbol: {locationData.faction.symbol}</p>
						</div>
						<div>
							<h3>Chart:</h3>
							<p>Submitted by: {locationData.chart.submittedBy}</p>
							<p>
								Submitted on:{" "}
								{new Date(locationData.chart.submittedOn).toLocaleString()}
							</p>
						</div>
					</>
				) : (
					<p>Loading location data...</p>
				)}
			</div>
		</div>
	);
}

export default App;
