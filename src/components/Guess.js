import React, { useState } from 'react';
import GuessTile from './GuessTile'
import boardData from '../boardData'

export default function Guess(props) {
	const [tiles, setTiles] = useState(boardData);
	
	const tileElements = boardData.map(tile => (
		<GuessTile status={tile.status} letter={tile.letter} row={props.row} />
	))

	return (
		<div className="guess">
			{tileElements}
		</div>
	);
}