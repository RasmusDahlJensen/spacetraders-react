import axiosInstance from "../axiosInstance/axiosInstance";

export interface Faction {
	symbol: string;
}

export interface Trait {
	symbol: string;
	name: string;
	description: string;
}

export interface Chart {
	submittedBy: string;
	submittedOn: string;
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
	chart: Chart;
}

export interface ShipModel {
	type: string;
}

interface ShipyardApiResponse {
	data: ShipyardModel | ShipyardModel[];
}

interface AvailableShipsApiResponse {
	data: {
		modificationsFee: number;
		shipTypes: ShipModel[];
		symbol: string;
	};
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

export async function fetchAvailableShips(
	systemSymbol: string,
	waypointSymbol: string
): Promise<ShipModel[]> {
	try {
		const response = await axiosInstance.get<AvailableShipsApiResponse>(
			`/systems/${systemSymbol}/waypoints/${waypointSymbol}/shipyard`
		);
		console.log("Available ships response:", response.data.data);
		return response.data.data.shipTypes;
	} catch (error) {
		console.error("Error fetching available ships:", error);
		throw error;
	}
}

export async function purchaseShip(
	shipType: string,
	waypointSymbol: string
): Promise<unknown> {
	try {
		const response = await axiosInstance.post("/my/ships", {
			shipType: shipType,
			waypointSymbol: waypointSymbol,
		});
		console.log("Purchase response:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error purchasing ship:", error);
		throw error;
	}
}
