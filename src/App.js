import React, { useState } from 'react'; 
import keyboardData from "./keyboardData"
import Key from "./components/Key"
import Guess from './components/Guess'

export default function App() {
  const numGuesses = 5;
  const numLettersPerGuess = 4;

  const [keys, setKeys] = useState(keyboardData);
  const keyElements = keyboardData.map((key) => {
    return <Key active={key.active} letter={key.letter} />
  });

  const guesses = [];
  for(var i=0; i<numGuesses; i++) { guesses.push( <Guess numLetters={numLettersPerGuess} />) }

  function handleEntry() {
  	
  }

  return (
    <div className="game">	
	<div className="gameboard">
		{guesses}
	</div>
	
	<div className="keyboard">
	  {keyElements}
	  <button className="enter" onClick={handleEntry}>enter</button>
	  <button className="delete">delete</button>
	</div>
    </div>
  );
}

