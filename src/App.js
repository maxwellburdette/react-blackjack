import React, { useState, useEffect, useRef } from "react";
import Card from "./components/Card";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function App() {
	const [deck, setDeck] = useState([]);
	const color = useRef("#dc2430");
	const symbol = useRef(["fab", "steam"]);
	const random = useRef(0);
	const [cards, setCard] = useState([]);
	const [hand, setHand] = useState(0);
	const [broke, setBroke] = useState(false);
	const [perfect, setPerfect] = useState(false);
	const [blackjack, setBlackjack] = useState(false);

	useEffect(() => {
		generateDeck();

		// eslint-disable-next-line
	}, []);
	useEffect(() => {
		if (cards.length === 0 || cards[0] === undefined) return;
		let card = cards[cards.length - 1];

		if (card.value === "A") {
			if (hand + 11 <= 21) {
				setHand((prevState) => prevState + 11);
			} else {
				setHand((prevState) => prevState + card.number);
			}
		} else {
			setHand((prevState) => prevState + card.number);
		}
	}, [cards]);

	useEffect(() => {
		if (hand > 21) {
			setBroke(!broke);
		}
		if (hand === 21) {
			if (cards.length === 2) {
				setBlackjack(true);
				setPerfect(true);
			} else {
				setPerfect(true);
			}
		}
	}, [hand]);

	function generateDeck() {
		//Generate first suit
		generateSuit(color.current, symbol.current);

		//Change references
		color.current = "#7b4397";
		symbol.current = ["fab", "discord"];
		//Generate second suit
		generateSuit(color.current, symbol.current);

		//Change references
		color.current = "#dc2430";
		symbol.current = ["fab", "battle-net"];
		//Generate thrid suit
		generateSuit(color.current, symbol.current);

		//Change references
		color.current = "#7b4397";
		symbol.current = ["fab", "windows"];
		generateSuit(color.current, symbol.current);
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

	function addCard() {
		random.current = randomNumber(0, deck.length);
		let thisCard = deck[random.current];
		if (thisCard === undefined) return;

		if (hand === 21 || broke === true) {
			return;
		}

		setCard((currentCard) => [
			...currentCard,
			{
				color: thisCard.cardColor,
				value: thisCard.value,
				symbol: thisCard.symbol,
				cardID: thisCard.cardID,
				number: thisCard.number,
			},
		]);

		setDeck(deck.filter((removeCard) => removeCard.cardID !== thisCard.cardID));
	}

	function reset() {
		setCard([]);
		setDeck([]);
		color.current = "#dc2430";
		setHand(0);
		setBroke(false);
		setPerfect(0);
		setBlackjack(false);
		symbol.current = ["fab", "steam"];
		generateDeck();
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

				{cards
					? cards.map((card) => (
							<Card
								value={card.value}
								color={card.color}
								symbol={card.symbol}
								key={card.cardID}
							></Card>
					  ))
					: ""}

				{broke ? (
					<h1
						style={{
							textAlign: "center",
							position: "fixed",
							bottom: "40px",
							color: "white",
							background: "linear-gradient(to right, #7b4397, #dc2430)",
							width: "200px",
							borderRadius: "10px",
						}}
					>
						{hand} Bust
					</h1>
				) : (
					<h1
						style={{
							textAlign: "center",
							position: "fixed",
							bottom: "40px",
							color: "white",
							background: "linear-gradient(to right, #7b4397, #dc2430)",
							width: "100px",
							borderRadius: "10px",
						}}
					>
						{hand}

						{perfect ? (
							<FontAwesomeIcon
								style={{ color: "white", fontSize: "1em" }}
								icon={("fas", "check")}
							></FontAwesomeIcon>
						) : (
							""
						)}
					</h1>
				)}
				{blackjack ? (
					<h1
						style={{
							textAlign: "center",
							position: "fixed",
							top: "50px",
							left: "50px",
							color: "white",
							background: "linear-gradient(to right, #7b4397, #dc2430)",
							width: "200px",
							borderRadius: "10px",
						}}
					>
						Blackjack!
					</h1>
				) : (
					""
				)}

				<a href="#" className="hit" onClick={addCard}>
					Hit
				</a>

				<a href="#" className="stay" onClick={reset}>
					Stay
				</a>
			</div>
		</div>
	);
}

export default App;
