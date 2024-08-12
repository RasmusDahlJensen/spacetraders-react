import React from "react";
import { LocationDataModel } from "../locationData/viewLocation";

interface LocationDataProps {
	locationData: LocationDataModel;
}

const LocationData: React.FC<LocationDataProps> = ({ locationData }) => (
	<div className="location-data">
		<h2>Location Data</h2>
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
				Coordinates: X: ({locationData.x}, Y: {locationData.y})
			</p>
		</div>
		<div>
			<p>
				Under Construction: {locationData.isUnderConstruction ? "Yes" : "No"}
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
	</div>
);

export default LocationData;
