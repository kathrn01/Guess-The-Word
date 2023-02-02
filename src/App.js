import React, {useState, useEffect, useRef} from 'react'; 
import keyboardData from "./data/keyboardData"
import Key from "./components/Key"
import words from "./data/words.js"
import GuessTile from './components/GuessTile'
import boardData from './data/boardData'

export default function App() {
  const [currCol, setCurrCol] = useState(0); //current column (updates as user adds or deletes a letter from a guess) 
  const [currRow, setCurrRow] = useState(0); //current row (updates after user submits a guess) -- goes to next row/guess
  let word = useRef(words.at(Math.floor(Math.random() * words.length)).word); //random word from list is the word that user will try to guess 
  const guess = useRef(""); //the most recent guess the user submitted
  const wrongLetters = useRef(""); //letters incorrectly guessed (used to update the keyboard)
  const [endOfGame, setEndOfGame] = useState(false); //becomes true if either user runs out of guesses, or guesses word correctly
  const [keys, setKeys] = useState(keyboardData); //the keyboard keys
  const [tiles, setTiles] = useState(boardData); //the tiles that make up the guesses/game

  //game tiles components
  const tileElements = tiles.map(tile => (
	<GuessTile status={tile.status} letter={tile.letter} />
  ))
 
  //keyboard components
  const keyElements = keys.map((key) => {
    return <Key background={key.background} letter={key.letter} handleClick={addLetter} />
  });

  /* this function will return the color of the tile that will indicate whether a letter was correctly or incorrectly chosen
  and the tiles background colour will change accordingly once the guess is submitted
  the function also adds any incorrect letters to 'wrongLetters' for the keyboard to be updated once a guess is submitted
  */
  function checkLetterStatus(chosenLetter, col) {
	//the letter is in the word and it's correct position was guessed, return green
	if(word.current.includes(chosenLetter) && word.current.charAt(col) === chosenLetter) { return "#71bf77"; } //green
	
	//else if below: the letter is in the word, but in the incorrect position 
	/*either returns yellow or red, based on whether the correct position(s) already contains the letter
		ie. if the word is "CARE" and the guess "MERE" is given, the first 'E' would return red, 
		as the correct position for 'E' (the second 'E') has been found. 
		However, if the guess "DEER" is given, both 'E's will be yellow, as the correct position for 'E' has NOT yet been guessed. 
	*/
	else if(word.current.includes(chosenLetter) && word.current.indexOf(col) !== chosenLetter) { 
		for(let index = 0; index < word.current.length; index++){
			let letter = word.current.charAt(index);
			if(letter === chosenLetter) {
        				//if the letter is not in the correct place in the guess, return yellow, else red
				return (guess.current.charAt(index) != chosenLetter) ? "#f0ec84" : "#eb5146";
    			}
		}
	}
	else { //the letter is not in the word at all
		wrongLetters.current = wrongLetters.current.concat(chosenLetter);
		return "#eb5146"; //red
	}
  }

  //add a letter to current guess and update tiles
  function addLetter(chosenLetter){
	let col = currCol - 1; 

	//if a letter is being added, not deleted 
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
	//only submit guess if four letters have been entered
	if(currCol === 4) { 
		//set the guess 
		tiles.forEach(tile => { 
			if(tile.row === currRow) { 
				guess.current = guess.current.concat(tile.letter);
			} 
		});

		//set tile status (red, green, yellow) based on the guess
		setTiles(prevTiles => { 
			return prevTiles.map(tile => {
				return (tile.row === currRow) ? {...tile, status: checkLetterStatus(tile.letter, tile.col)} : tile;
			})
		})

		//check if user won
		if(guess.current === word.current){
			setEndOfGame(true);
			setCurrRow(4);
		}

		//update the row if user has guesses left
		if(currRow < 3){ 
  			setCurrRow(prevRow => prevRow + 1);
			setCurrCol(0);
		} else { //no guesses left: end of game
			setEndOfGame(true);
		}
	}
  }

  useEffect(() => {
	if(currRow < 4) { guess.current = ""; } //reset the guess 
	
	//update keys from incorrect letters (if any) in most recent guess
	setKeys(prevKeys => {
		return prevKeys.map(key => {
			return (wrongLetters.current.includes(key.letter) ? {...key, background: "#eb5146"} : key)
		})	
	})
  }, [currRow])

  //reset all values and set a new word to be guessed
  function reset(){
	setTiles(prevTiles => (prevTiles.map(tile => ({...tile, status: "#ffffff", letter: "?"}) )))
	setKeys(prevKeys => (prevKeys.map(key => ({...key, background: "#ffffff"}) )))
	setCurrCol(0);
	setCurrRow(0);
	setEndOfGame(false);
	guess.current = "";
	wrongLetters.current = "";
	

	//choose a new word from the words list
	let randomWordIndex = Math.floor(Math.random() * words.length)
	word.current = words.at(randomWordIndex).word;
  }

  return (
    <div className="game">	
	<div className="gameboard">
		{tileElements}
	</div>
	
	<div className="keyboard">
	  {keyElements}
	  <button className="delete key" onClick={deleteLetter}>delete</button>
	</div>

	<div className="guess-replay-buttons">
		{ endOfGame ? <button className="replay key" onClick={reset}>Replay</button> : <button className="guess key" onClick={submitGuess}>Guess</button>}
		{ (endOfGame) ? (word.current === guess.current ? <p>Congratulations, you guessed correctly!</p> : <p>Better luck next time. Correct word: {word.current}</p>) : <p>Keep guessing!</p> }
	</div>
    </div>
  );
}

