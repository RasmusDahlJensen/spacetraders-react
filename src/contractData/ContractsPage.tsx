import React, { useEffect, useState } from "react";
import { ContractModel, fetchContracts } from "./fetchContracts";

const ContractsPage: React.FC = () => {
	const [contracts, setContracts] = useState<ContractModel[]>([]);

	useEffect(() => {
		const getContracts = async () => {
			try {
				const data = await fetchContracts();
				setContracts(data);
			} catch (error) {
				console.error("Failed to fetch contracts:", error);
			}
		};

		getContracts();
	}, []);

	return (
		<div>
			<h1>Contracts</h1>
			{contracts.length > 0 ? (
				<ul>
					{contracts.map((contract, key) => (
						<li key={contract.id}>
							<h2>Contract: {key + 1}</h2>
							<p>Type: {contract.type}</p>
							<p>Accepted: {contract.accepted ? "Yes" : "No"}</p>
							{/* Only show 'Fulfilled' if 'Accepted' is true */}
							{contract.accepted && (
								<p>Fulfilled: {contract.fulfilled ? "Yes" : "No"}</p>
							)}
							<p>Deadline to accept: {contract.deadlineToAccept}</p>
							<p>Expiration date: {contract.expiration}</p>
							<p>Faction: {contract.factionSymbol}</p>
							<div>
								<h2>Terms:</h2>
								<p>Delivery deadline: {contract.terms.deadline}</p>
								<div>
									<h3>Payment</h3>
									<p>
										Payment on accept: {contract.terms.payment.onAccepted}{" "}
										credits
									</p>
									<p>
										Payment on completion: {contract.terms.payment.onFulfilled}{" "}
										credits
									</p>
									<p>
										Payment in total:{" "}
										{contract.terms.payment.onAccepted +
											contract.terms.payment.onFulfilled}{" "}
										credits
									</p>
								</div>
								<div>
									<h3>Delivery</h3>
									<ul>
										{contract.terms.deliver.map((term, key) => (
											<li key={key}>
												<div>
													Destination: {term.destinationSymbol}
													<br />
													Items: {term.unitsRequired}x {term.tradeSymbol}
												</div>
												<div>units fulfilled: {term.unitsFulfilled}</div>
											</li>
										))}
									</ul>
								</div>
							</div>
						</li>
					))}
				</ul>
			) : (
				<p>No contracts available</p>
			)}
		</div>
	);
};

export default ContractsPage;
