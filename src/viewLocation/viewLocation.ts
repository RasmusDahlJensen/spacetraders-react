import axiosInstance from "../axiosInstance/axiosInstance";

export interface Orbital {
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

export interface Faction {
	symbol: string;
}

export interface LocationDataModel {
	systemSymbol: string;
	symbol: string;
	type: string;
	x: number;
	y: number;
	orbitals: Orbital[];
	traits: Trait[];
	modifiers: string[];
	chart: Chart;
	faction: Faction;
	isUnderConstruction: boolean;
}

interface ApiResponse {
	data: LocationDataModel;
}

export async function fetchLocationData(
	system: string,
	waypoint: string
): Promise<LocationDataModel> {
	try {
		const response = await axiosInstance.get<ApiResponse>(
			`/systems/${system}/waypoints/${waypoint}`
		);
		return response.data.data;
	} catch (error) {
		console.error("Error fetching location data:", error);
		throw error;
	}
}
