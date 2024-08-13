import axiosInstance from "../axiosInstance/axiosInstance";

export interface PlayerDataModel {
	accountId: string;
	symbol: string;
	headquarters: string;
	credits: number;
	startingFaction: string;
	shipCount: number;

	sector: string;
	system: string;
	waypoint: string;
}

interface ApiResponse {
	data: Omit<PlayerDataModel, "sector" | "system" | "waypoint">;
}

export async function fetchPlayerData(): Promise<PlayerDataModel> {
	try {
		const response = await axiosInstance.get<ApiResponse>("/my/agent");

		const { data } = response.data;

		const [sector, systemPart, waypointPart] = data.headquarters.split("-");
		const system = `${sector}-${systemPart}`;
		const waypoint = `${system}-${waypointPart}`;

		return {
			...data,
			sector,
			system,
			waypoint,
		};
	} catch (error) {
		console.error("Error fetching player data:", error);
		throw error;
	}
}
