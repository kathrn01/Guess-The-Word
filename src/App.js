import React, { useState } from 'react'; 
import logo from './logo.svg';
import GameBoard from "./components/GameBoard"
import keyboardData from "./keyboardData"
import Key from "./components/Key"
import './App.css';

function App() {
  const [keys, setKeys] = useState(keyboardData);
  const keyElements = keyboardData.map((key) => {
    return <Key active={key.active} letter={key.letter} />
  });

  function handleEntry() {
  	
  }

  return (
    <div className="game">
	<GameBoard/>
	<div className="keyboard">
	  {keyElements}
	  <button className="enter" onClick={handleEntry}>enter</button>
	  <button className="delete">delete</button>
	</div>
    </div>
  );
}

export default App;
