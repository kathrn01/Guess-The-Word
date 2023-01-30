import React from 'react';

export default function Key(props) {
	const styles = {
		backGroundColor: props.active ? "white" : "red"
	}
	return(
		<div style={styles} className="key" onClick={() => props.handleClick(props.letter)}>
			{props.letter}
		</div>
	);	
}