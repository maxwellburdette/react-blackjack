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
		number: 0,
	});
	const [card2, setCard2] = useState({
		color: "",
		symbol: [],
		value: "",
		cardID: "",
		number: 0,
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
			let number = i;
			if (i > 10) {
				number = 10;
			}
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
					number: number,
					cardID: uuidv4(),
				},
			]);
		}
	}

	function getCard() {
		random.current = randomNumber(0, deck.length);
		let thisCard = deck[random.current];
		if (thisCard === undefined) return;
		setCard({
			color: thisCard.cardColor,
			value: thisCard.value,
			symbol: thisCard.symbol,
			cardID: thisCard.cardID,
			number: thisCard.number,
		});
		console.log(card);
		setDeck(deck.filter((removeCard) => removeCard.cardID !== thisCard.cardID));
	}

	function getCard2() {
		random.current = randomNumber(0, deck.length);
		let thisCard = deck[random.current];
		if (thisCard === undefined) return;
		setCard2({
			color: thisCard.cardColor,
			value: thisCard.value,
			symbol: thisCard.symbol,
			cardID: thisCard.cardID,
			number: thisCard.number,
		});
		console.log(card);
		setDeck(deck.filter((removeCard) => removeCard.cardID !== thisCard.cardID));
	}
	function calcValue() {
		if (card.value === "A") {
			let checkVal = card2.number + 11;
			if (checkVal <= 21) {
				return checkVal;
			}
		}
		if (card2.value === "A") {
			let checkVal = card.number + 11;
			if (checkVal <= 21) {
				return checkVal;
			}
		}
		return card.number + card2.number;
	}

	return (
		<div className="App">
			<div className="container">
				<h1
					style={{
						width: "100%",
						textAlign: "center",
						top: "0",
					}}
				>
					Blackjack Game
				</h1>
				<div onClick={getCard}>
					<Card
						value={card.value}
						color={card.color}
						symbol={card.symbol}
					></Card>
				</div>

				<div onClick={getCard2}>
					<Card
						value={card2.value}
						color={card2.color}
						symbol={card2.symbol}
					></Card>
				</div>

				{card && card2 ? <h1>{calcValue()}</h1> : ""}

				<a href="#" className="hit">
					Hit
				</a>

				<a href="#" className="stay">
					Stay
				</a>
			</div>
		</div>
	);
}

export default App;
