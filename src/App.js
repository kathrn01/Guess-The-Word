import React, {useState} from 'react'; 
import keyboardData from "./data/keyboardData"
import Key from "./components/Key"
import GuessTile from './components/GuessTile'
import boardData from './data/boardData'

export default function App() {
  const numGuesses = 5;
  const [currCol, setCurrCol] = useState(0); 
  //const [deleteCount, setDeleteCount] = useState(0);
  const word = "CARE"
  //const [currGuess, setCurrGuess] = useState(0);
  //const [keys, setKeys] = useState(keyboardData);
  const [tiles, setTiles] = useState(boardData);

  function checkLetterStatus(chosenLetter) {
	if(chosenLetter === "?") { return "white" }
	if(word.includes(chosenLetter) && word.indexOf(chosenLetter) !== currCol) { return "yellow" }
	if(word.includes(chosenLetter)) { return "green" }
	else { return "red" }
  }

  function setColumnDelete(){
	//if(currCol > 0) {
		setCurrCol(prevCol => (prevCol > 0) ? prevCol -= 1 : 0);
	//}
  }

  function setColumnAdd(){
	if(currCol < 4) { setCurrCol(prevCol => prevCol += 1); } 
  }

  function addLetter(chosenLetter){
	let col = currCol - 1; 
	if(chosenLetter !== "?") { 
		setColumnAdd(); 
		col = currCol
	}
		let status = checkLetterStatus(chosenLetter);
		setTiles(prevTiles => {
			return prevTiles.map((tile) => {
				return (tile.id === col) ? {...tile, status: status, letter: chosenLetter} : tile;
			})
		})
  }

  function deleteLetter() {
	setColumnDelete(); 
	addLetter("?");
  }
	
  const tileElements = tiles.map(tile => (
    <GuessTile status={tile.status} letter={tile.letter} row={tile.row} />
  ))

  const keyElements = keyboardData.map((key) => {
    return <Key active={key.active} letter={key.letter} handleClick={addLetter} />
  });

 /* function setGuess() {
  	setCurrGuess(prevGuess => (prevGuess < 6) ? prevGuess + 1 : -1)
	//change color of selected key/deactivate click
       
  }
*/

  return (
    <div className="game">	
	<div className="gameboard">
		{tileElements}
	</div>
	
	<div className="keyboard">
	  {keyElements}
	  <button className="guess">Guess</button>
	  <button className="delete" onClick={deleteLetter}>Delete</button>
	</div>
    </div>
  );
}

