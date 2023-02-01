import React from 'react';

export default function Key(props) {
	const styles = {
		backgroundColor: props.background
	}

	return(
		<div style={styles} className="key" onClick={() => props.handleClick(props.letter)}>
			{props.letter}
		</div>
	);	
}