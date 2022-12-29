import React from 'react';
import GuessTile from './GuessTile'

export default function Guess(props) {
	const tiles = [];	
	 for(var i=0; i < props.numLetters; i++) { tiles.push( <GuessTile status="white" letter="" /> )}
	return (
		<div className="guess">
			{tiles}
		</div>
	);
}