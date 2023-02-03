# React App: Wordsy Game 
## About Wordsy
Wordsy is a game inspired by the popular word guessing game Wordle. However, in Wordsy, users only have four guesses, and words are four letters.<br>
I hope to soon implement a points system, user statistics (database), and make use of an API for words.

## How To Play
A user must guess four letters to submit a guess. After submitting a guess, If the letter exists in the secret word and is guessed in the correct position, the word tile will become green.<br>
If the letter exists in the secret word but is either in the incorrect position or the correct position(s) have already been found, the letter tile will turn yellow.<br>
If the letter doesn't exist in the secret word, the letter tile will turn red, and so will the letter key on the keyboard.

## Examples
| Start | During | End |
| ---- | ---- | ---- | 
| ![before-game](https://user-images.githubusercontent.com/84199502/216684850-d8881c88-d3f2-4549-8c17-0d7c863100b4.png) | ![during-game](https://user-images.githubusercontent.com/84199502/216684890-12690827-03cb-4677-9378-24d6952d3f26.png) | ![after-game](https://user-images.githubusercontent.com/84199502/216684920-bf16898d-8e75-4658-92f5-e2ac0b0fac79.png) |

### Video demo:
https://user-images.githubusercontent.com/84199502/216685035-3968f093-e8bf-4dc3-8025-971dff303dc2.mov

## Packages and Major Source Code Organization 
The code is organized within src folder with 'App.js' containing most logic and the main app component, 'index.css' containing styles for the game <br>
'data' folder, containing keyboard, gameboard, and word data, and 'components' folder containing React components for Tiles and Keys.<br>
I will be adding tests soon.

### Built With
#### Development Environment: command line (zsh), TextEdit
#### Languages: JavaScript, HTML, CSS
#### Libraries and Tools: Create React App (toolchain), React, git

## Acknowledgements and Citations
### Learning React
I used this tutorial: https://www.youtube.com/watch?v=bMknfKXIFA8 as a resource while learning React.
