import { useState, useEffect, useRef } from "react";
import Card from "./components/Card";
function App() {
	const [deck, setDeck] = useState([]);
	const color = useRef("red");
	const symbol = useRef(["fab", "steam"]);

	useEffect(() => {
		generateDeck();

		// eslint-disable-next-line
	}, []);

	function generateDeck() {
		for (let i = 1; i <= 52; i++) {
			if (i == 13) {
				color.current = "black";
				symbol.current = ["fab", "discord"];
			} else if (i == 37) {
				color.current = "black";
				symbol.current = ["fab", "battle-net"];
			} else if (i == 25) {
				color.current = "red";
				symbol.current = ["fab", "windows"];
			}

			console.log(color.current);
			setDeck((prevState) => [
				...prevState,
				{ value: i, cardColor: color.current, symbol: symbol.current },
			]);
		}
	}
	//<Card value={"A"} symbol={["fab", "steam"]}></Card>
	//<Card value={2} symbol={["fab", "discord"]} color={"#111"}></Card>
	//<Card value={3} symbol={["fab", "battle-net"]} color={"#111"}></Card>
	//<Card value={4} symbol={["fab", "windows"]}></Card>
	return (
		<div className="App">
			<h1
				style={{
					width: "100%",
					textAlign: "center",
					margin: "10px 15px",
				}}
			>
				Blackjack
			</h1>
			{deck.map((card) => (
				<Card
					value={card.value}
					color={card.cardColor}
					symbol={card.symbol}
				></Card>
			))}
		</div>
	);
}

export default App;
