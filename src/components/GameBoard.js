import React, { useState } from 'react'; 
import boardData from "../boardData"
import GameBoardTile from "./GameBoardTile"

export default function GameBoard() {
	const boardElements = boardData.map((tile) => {
		return <GameBoardTile 
			status={tile.status}
			letter={tile.letter}
		/>		
	})

	return(
		<div className="board">
			{boardElements}
		</div>
	);
}