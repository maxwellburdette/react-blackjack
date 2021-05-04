import React, { useState, useEffect, useRef } from "react";
import Card from "./components/Card";
import { v4 as uuidv4 } from "uuid";
function App() {
	const [deck, setDeck] = useState([]);
	const color = useRef("red");
	const symbol = useRef(["fab", "steam"]);
	const random = useRef(0);
	const [card, setCard] = useState({
		color: "",
		symbol: [],
		value: "",
		cardID: "",
	});

	useEffect(() => {
		generateDeck();

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		// eslint-disable-next-line
		getCard();
	}, []);

	async function generateDeck() {
		// for (let i = 1; i <= 52; i++) {
		// 	setDeck((prevState) => [
		// 		...prevState,
		// 		{ value: i, cardColor: color.current, symbol: symbol.current },
		// 	]);
		// }

		//Generate first suit
		generateSuit(color.current, symbol.current);

		//Change references
		color.current = "#111";
		symbol.current = ["fab", "discord"];
		//Generate second suit
		generateSuit(color.current, symbol.current);

		//Change references
		color.current = "red";
		symbol.current = ["fab", "battle-net"];
		//Generate thrid suit
		generateSuit(color.current, symbol.current);

		//Change references
		color.current = "#111";
		symbol.current = ["fab", "windows"];
		generateSuit(color.current, symbol.current);

		//random.current = randomNumber(0, 51);
	}

	function randomNumber(start, end) {
		return Math.floor(Math.random() * end) + start;
	}

	function generateSuit(color, symbol) {
		for (let i = 1; i <= 13; i++) {
			let value = i;
			if (i === 1) {
				value = "A";
			}

			if (i === 11) {
				value = "J";
			}
			if (i === 12) {
				value = "Q";
			}
			if (i === 13) {
				value = "K";
			}
			setDeck((prevState) => [
				...prevState,
				{
					value: value,
					cardColor: color,
					symbol: symbol,
					number: i,
					cardID: uuidv4(),
				},
			]);
		}
	}

	function getCard(e) {
		random.current = randomNumber(0, deck.length);
		let thisCard = deck[random.current];
		if (thisCard === undefined) return;
		setCard({
			color: thisCard.cardColor,
			value: thisCard.value,
			symbol: thisCard.symbol,
			cardID: thisCard.cardID,
		});
		console.log(card);
		setDeck(deck.filter((removeCard) => removeCard.cardID !== thisCard.cardID));
	}
	//<Card value={"A"} symbol={["fab", "steam"]}></Card>
	//<Card value={2} symbol={["fab", "discord"]} color={"#111"}></Card>
	//<Card value={3} symbol={["fab", "battle-net"]} color={"#111"}></Card>
	//<Card value={4} symbol={["fab", "windows"]}></Card>
	// {deck.map((card) => (
	// 	<Card
	// 		value={card.value}
	// 		color={card.cardColor}
	// 		symbol={card.symbol}
	// 	></Card>
	// ))}
	//<>{deck.length > 0 && getCard()}</>
	return (
		<div className="App">
			<h1
				style={{
					width: "100%",
					textAlign: "center",
					margin: "10px 15px",
				}}
			>
				Blackjack Game
			</h1>
			<div onClick={getCard}>
				<Card value={card.value} color={card.color} symbol={card.symbol}></Card>
			</div>
		</div>
	);
}

export default App;
