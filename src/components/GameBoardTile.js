import React from 'react'; 

export default function GameBoardTile(props) {
	const styles = {
		backgroundColor: props.status
	}
		
	return(
		<div style={styles} className="tile">
			{props.letter}
		</div>
	);
}