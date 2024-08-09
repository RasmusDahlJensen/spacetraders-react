import React from "react";
import { PlayerDataModel } from "../playerData/fetchPlayerData";

interface PlayerDataProps {
	playerData: PlayerDataModel;
}

const PlayerData: React.FC<PlayerDataProps> = ({ playerData }) => (
	<div className="player-data">
		<h1>Player Data</h1>
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
		<h2>Starting sector, system, and waypoint</h2>
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
);

export default PlayerData;
