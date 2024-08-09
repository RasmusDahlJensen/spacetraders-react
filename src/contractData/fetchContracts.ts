import axiosInstance from "../axiosInstance/axiosInstance";
import { formatDate } from "../hooks/formatDate"; // Import the formatDate utility

export interface DeliveryTerm {
	destinationSymbol: string;
	tradeSymbol: string;
	unitsFulfilled: number;
	unitsRequired: number;
}

export interface Payment {
	onAccepted: number;
	onFulfilled: number;
}

export interface Terms {
	deadline: string;
	deliver: DeliveryTerm[];
	payment: Payment;
}

export interface ContractModel {
	accepted: boolean;
	deadlineToAccept: string;
	expiration: string;
	factionSymbol: string;
	fulfilled: boolean;
	id: string;
	terms: Terms;
	type: string;
}

export async function fetchContracts(): Promise<ContractModel[]> {
	try {
		const response = await axiosInstance.get<{ data: ContractModel[] }>(
			"/my/contracts"
		);

		// Map through the contracts and format the dates
		const formattedContracts = response.data.data.map((contract) => ({
			...contract,
			deadlineToAccept: formatDate(contract.deadlineToAccept),
			expiration: formatDate(contract.expiration),
			terms: {
				...contract.terms,
				deadline: formatDate(contract.terms.deadline),
			},
		}));

		console.log("Contracts:", formattedContracts);
		return formattedContracts;
	} catch (error) {
		console.error("Error fetching contracts:", error);
		throw error;
	}
}
