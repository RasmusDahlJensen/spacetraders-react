// playerDataModel.ts

import axiosInstance from "../axiosInstance/axiosInstance";

// Define interfaces for your data models
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

export interface ShipRegistration {
	name: string;
	factionSymbol: string;
	role: string;
}

export interface ShipNav {
	systemSymbol: string;
	waypointSymbol: string;
	route: {
		destination: {
			symbol: string;
			type: string;
			systemSymbol: string;
			x: number;
			y: number;
		};
		origin: {
			symbol: string;
			type: string;
			systemSymbol: string;
			x: number;
			y: number;
		};
		departureTime: string;
		arrival: string;
	};
	status: string;
	flightMode: string;
}

export interface ShipCrew {
	current: number;
	required: number;
	capacity: number;
	rotation: string;
	morale: number;
	wages: number;
}

export interface ShipFrame {
	symbol: string;
	name: string;
	description: string;
	condition: number;
	integrity: number;
	moduleSlots: number;
	mountingPoints: number;
	fuelCapacity: number;
	requirements: {
		power: number;
		crew: number;
		slots: number;
	};
}

export interface ShipReactor {
	symbol: string;
	name: string;
	description: string;
	condition: number;
	integrity: number;
	powerOutput: number;
	requirements: {
		power: number;
		crew: number;
		slots: number;
	};
}

export interface ShipEngine {
	symbol: string;
	name: string;
	description: string;
	condition: number;
	integrity: number;
	speed: number;
	requirements: {
		power: number;
		crew: number;
		slots: number;
	};
}

export interface ShipModule {
	symbol: string;
	capacity: number;
	range: number;
	name: string;
	description: string;
	requirements: {
		power: number;
		crew: number;
		slots: number;
	};
}

export interface ShipMount {
	symbol: string;
	name: string;
	description: string;
	strength: number;
	deposits: string[];
	requirements: {
		power: number;
		crew: number;
		slots: number;
	};
}

export interface ShipCargo {
	capacity: number;
	units: number;
	inventory: {
		symbol: string;
		name: string;
		description: string;
		units: number;
	}[];
}

export interface ShipFuel {
	current: number;
	capacity: number;
	consumed: {
		amount: number;
		timestamp: string;
	};
}

export interface ShipDataModel {
	symbol: string;
	registration: ShipRegistration;
	nav: ShipNav;
	crew: ShipCrew;
	frame: ShipFrame;
	reactor: ShipReactor;
	engine: ShipEngine;
	cooldown: {
		shipSymbol: string;
		totalSeconds: number;
		remainingSeconds: number;
		expiration: string;
	};
	modules: ShipModule[];
	mounts: ShipMount[];
	cargo: ShipCargo;
	fuel: ShipFuel;
}

interface ShipsApiResponse {
	data: ShipDataModel[];
}

interface PlayerApiResponse {
	data: Omit<PlayerDataModel, "sector" | "system" | "waypoint">;
}

// Fetch player data
export async function fetchPlayerData(): Promise<PlayerDataModel> {
	try {
		const response = await axiosInstance.get<PlayerApiResponse>("/my/agent");

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

// Fetch all ships
export async function fetchShips(): Promise<ShipDataModel[]> {
	try {
		const response = await axiosInstance.get<ShipsApiResponse>("/my/ships");
		return response.data.data;
	} catch (error) {
		console.error("Error fetching ships:", error);
		throw error;
	}
}
