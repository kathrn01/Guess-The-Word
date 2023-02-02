import React, {useState, useEffect, useRef} from 'react'; 
import keyboardData from "./data/keyboardData"
import Key from "./components/Key"
import GuessTile from './components/GuessTile'
import boardData from './data/boardData'

export default function App() {
  const [currCol, setCurrCol] = useState(0); 
  const [currRow, setCurrRow] = useState(0);
  const word = "CARE"; 
  const guess = useRef("");
  const [endOfGame, setEndOfGame] = useState(false);
  const guessedLetters = useRef("");
  const [keys, setKeys] = useState(keyboardData);
  const [tiles, setTiles] = useState(boardData);

  //game tiles
  const tileElements = tiles.map(tile => (
	<GuessTile status={tile.status} letter={tile.letter} />
  ))
 
  //keyboard 
  const keyElements = keys.map((key) => {
    return <Key background={key.background} letter={key.letter} handleClick={addLetter} />
  });

  /* this function will return the color of the tile that will indicate whether a letter was correctly or incorrectly chosen
  and the tiles background colour will change accordingly once the guess is submitted
  the function also adds any incorrect letters to 'guessedLetters' for the keyboard to be updated once a guess is submitted
  */
  function checkLetterStatus(chosenLetter, col) {
	//the letter is in the word and it's correct position was guessed, return green
	if(word.includes(chosenLetter) && word.charAt(col) === chosenLetter) { return "#71bf77"; } //green
	
	//else if below: the letter is in the word, but in the incorrect position 
	/*either returns yellow or red, based on whether the correct position(s) already contains the letter
		ie. if the word is "CARE" and the guess "MERE" is given, the first 'E' would return red, 
		as the correct position for 'E' (the second 'E') has been found. 
		However, if the guess "DEER" is given, both 'E's will be yellow, as the correct position for 'E' has NOT yet been guessed. 
	*/
	else if(word.includes(chosenLetter) && word.indexOf(col) !== chosenLetter) { 
		for(let index = 0; index < word.length; index++){
			let letter = word.charAt(index);
			if(letter === chosenLetter) {
        				//if the letter is not in the correct place in the guess, return yellow, else red
				return (guess.current.charAt(index) != chosenLetter) ? "#f0ec84" : "#eb5146";
    			}
		}
	}
	else { //the letter is not in the word at all
		return "#eb5146"; //red
	}
  }

  //add a letter to current guess and update tiles
  function addLetter(chosenLetter){
	let col = currCol - 1; 
	if(chosenLetter !== "?") { 
		if(currCol < 4) { setCurrCol(prevCol => prevCol += 1); } //increment the column if adding a letter
		col = currCol //this is the column we'll be adding the letter to
	}
	
	//update the tiles to reflect letter added or deleted
	setTiles(prevTiles => {
		return prevTiles.map((tile) => {
			return (tile.row === currRow && tile.col === col) ? {...tile, letter: chosenLetter} : tile
		})
	})
  }

  //delete a letter from current guess
  function deleteLetter() {
	setCurrCol(prevCol => (prevCol > 0) ? prevCol -= 1 : 0); //decrement column
	addLetter("?"); //replace current letter with "?"
  }

  //once four letters are typed, user can submit a guess for evaluation
  function submitGuess() {
	if(currCol === 4) { //only submit guess if four letters have been entered
		if(currRow < 3){ //if there is another guess left
  			setCurrRow(prevRow => prevRow + 1);
			setCurrCol(0);
		} else { //no guesses left: end of game
			setEndOfGame(true);
		}
	
		tiles.forEach(tile => { 
			if(tile.row === currRow) { 
				guess.current = guess.current.concat(tile.letter);
			} 
		});
		//change color of selected key/deactivate click
		setTiles(prevTiles => { 
			return prevTiles.map(tile => {
				return (tile.row === currRow) ? {...tile, status: checkLetterStatus(tile.letter, tile.col)} : tile;
			})
		})

		console.log("submitting guess: "+guess.current);
		if(guess.current === word){
			setEndOfGame(true);
			setCurrRow(4);
		}
	}
  }

  useEffect(() => {
	guess.current = "";
  }, [currRow])

  function reset(){
	setTiles(prevTiles => (prevTiles.map(tile => ({...tile, status: "white", letter: "?"}) )))
	setCurrCol(0);
	setCurrRow(0);
	setEndOfGame(false);
	guess.current = "";
	guessedLetters.current = "";
	

	//choose a new word	
  }


  return (
    <div className="game">	
	<div className="gameboard">
		{tileElements}
	</div>
	
	<div className="keyboard">
	  {keyElements}
	  <button className="delete key" onClick={deleteLetter}>delete</button> <br />
	  <button className="guess key" onClick={submitGuess}>Guess</button> <br />

	  { endOfGame ? <p>Game finished!</p> : <p>Keep guessing!</p> }
	 { endOfGame && <button className="replay key" onClick={reset}>Replay</button> }<br /> 
	</div>
    </div>
  );
}

