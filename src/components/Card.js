import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Card(props) {
	return (
		<div className="cardContainer" style={{ color: props.color }}>
			<div className="number top">{props.value}</div>
			<div className="smallSuit left">
				<FontAwesomeIcon icon={props.symbol} size="lg"></FontAwesomeIcon>
			</div>
			<div className="smallSuit bottom-right">
				<FontAwesomeIcon icon={props.symbol} size="lg"></FontAwesomeIcon>
			</div>
			<div className="number bottom">{props.value}</div>
			<div className="largeSuit">
				<FontAwesomeIcon
					className="icon"
					icon={props.symbol}
					size="3x"
				></FontAwesomeIcon>
			</div>

			<div className="largeSuit">
				<FontAwesomeIcon
					className="icon-bottom"
					icon={props.symbol}
					size="3x"
				></FontAwesomeIcon>
			</div>
		</div>
	);
}
