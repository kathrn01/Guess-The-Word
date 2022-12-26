import React from 'react';

export default function Key(props) {
	const styles = {
		backGroundColor: props.active ? "white" : "red"
	}
	return(
		<div style={styles} className="key">
			{props.letter}
		</div>
	);	
}