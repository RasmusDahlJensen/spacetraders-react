import React, { useEffect, useState } from "react";
import {
	fetchPlayerData,
	PlayerDataModel,
} from "../api/playerData/fetchPlayerData";
import {
	fetchLocationData,
	LocationDataModel,
} from "../api/locationData/viewLocation";
import PlayerData from "./PlayerData";
import LocationData from "./LocationData";

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
			{playerData ? (
				<PlayerData playerData={playerData} />
			) : (
				<p>Loading player data...</p>
			)}

			{locationData ? (
				<LocationData locationData={locationData} />
			) : (
				<p>Loading location data...</p>
			)}
		</div>
	);
}

export default App;
