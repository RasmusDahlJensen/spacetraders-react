// shipData.ts

import axiosInstance from "../axiosInstance/axiosInstance";

export interface Faction {
	symbol: string;
}

export interface Trait {
	symbol: string;
	name: string;
	description: string;
}

export interface ShipyardModel {
	symbol: string;
	type: string;
	systemSymbol: string;
	orbits: string;
	x: number;
	y: number;
	isUnderConstruction: boolean;
	faction: Faction;
	traits: Trait[];
	chart: {
		submittedBy: string;
		submittedOn: string;
	};
}
interface ShipyardApiResponse {
	data: ShipyardModel | ShipyardModel[];
}

export async function fetchShipyard(system: string): Promise<ShipyardModel[]> {
	try {
		const response = await axiosInstance.get<ShipyardApiResponse>(
			`/systems/${system}/waypoints?traits=SHIPYARD`
		);
		console.log("shipyard response:", response.data.data);

		const shipyards = Array.isArray(response.data.data)
			? response.data.data
			: [response.data.data];

		return shipyards;
	} catch (error) {
		console.error("Error fetching shipyard:", error);
		throw error;
	}
}
