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
  const [guessedLetters, setGuessedLetters] = useState("");
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
	if(chosenLetter === "?") { 
		setGuessedLetters(prevLetters => prevLetters.substring(0, prevLetters.length -1));
		return "white";
	} else { setGuessedLetters(prevLetters => prevLetters.concat(chosenLetter)); }
	if(word.includes(chosenLetter) && word.indexOf(chosenLetter) === col) { return "#71bf77"; } //green
	else if(word.includes(chosenLetter) && word.indexOf(chosenLetter) !== col) { 
		let count = 0;
		let status = "#f0ec84";
		console.log("word: " +word);	
		[...word].forEach((letter) => {
			if(letter === chosenLetter) {
        				count ++; //count how many of same letter there is in the correct word
    			}
		});
		console.log("guess: " + guess.current);
		[...guess.current].forEach((letter, index) => {
			if(letter === chosenLetter){
    				if(index !== col){
					console.log(index + " doesn't match " + col);
        					if(count > 1) { 
						console.log("count > 1, returning yellow");
						status = "#f0ec84"; //yellow
					} else { 
						console.log("count <= 1, returning red"); 
						status = "#eb5146"; //red
					}
        				}
    			}
		});
		return status;
	}
	else{ 
		return "#eb5146"; //red
	}
  }

  //add a letter to current guess and update tiles
  function addLetter(chosenLetter){
	let col = currCol - 1; 
	if(chosenLetter !== "?") { 
		if(currCol < 4) { setCurrCol(prevCol => prevCol += 1); } 
		col = currCol
	}

	setTiles(prevTiles => {
		return prevTiles.map((tile) => (
			(tile.row === currRow && tile.col === col) ? {...tile, letter: chosenLetter} : tile
		))
	})
  }

  //delete a letter from current guess
  function deleteLetter() {
	setCurrCol(prevCol => (prevCol > 0) ? prevCol -= 1 : 0);
	addLetter("?");
  }

  //once four letters are typed, user can submit a guess for evaluation
  function submitGuess() {
	if(currCol === 4) {
		if(currRow < 4){
  			setCurrRow(prevRow => prevRow + 1);
			setCurrCol(0);
		} else { //end of game 
		}
	
		tiles.forEach(tile => { 
			if(tile.row === currRow) { 
				guess.current = guess.current.concat(tile.letter);
			} 
		});
		console.log("guess after forEach: "+guess.current);
		//change color of selected key/deactivate click
		setTiles(prevTiles => { 
			return prevTiles.map(tile => {
				return (tile.row === currRow) ? {...tile, status: checkLetterStatus(tile.letter, tile.col)} : tile;
			})
		})
		//guess.current = "";
	}
  }

  function reset(){
	setTiles(prevTiles => (prevTiles.map(tile => ({status: "white", letter: "?"}) )))
	setKeys(prevKeys => (prevKeys.map(key => ({...key, background: "white"}) )))
	setCurrCol(0);
	setCurrRow(0);
	//setGuess("");
	//setWrongLetters("");

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
	  {/*<button className="replay key" onClick={reset}>Replay</button><br /> */}

	  {"currRow: " + currRow} <br />
	  {"currCol: " + currCol} <br />
	  {"Guessed letters: " +guessedLetters}<br />
	  {"last guess: " +guess.current }
	</div>
    </div>
  );
}

