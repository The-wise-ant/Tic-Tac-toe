 /// Game Sounds  ////

 const theme = document.getElementById("theme");
 let isMuted = false;
 const winSound = new Audio('assets/sounds/win.mp3');
 const loseSound = new Audio('assets/sounds/lose.mp3');
 const tieSound = new Audio('assets/sounds/tie.mp3');


 const newGameButton = document.getElementById("newGameButton");
 const startGameButton = document.getElementById("startGameButton");
 const main = document.getElementById("main");

 ///global variables///
 let table = document.getElementById('table');
 let turn = 1;
 table.addEventListener('click', onClick);
 let player = document.getElementById('player');
 let Player1Score = document.getElementById('Player1Score');
 let Player2Score = document.getElementById('Player2Score');
 const x = 'X';
 const o = 'O';
 let gameCompleted = false;

 startGameButton.addEventListener('click', startGame)
 newGameButton.addEventListener('click', newGame)

 function startGame() {
   main.removeAttribute('hidden');
   newGameButton.style.display = 'block';
   theme.play();
   startGameButton.style.display = 'none';

 }


 function onClick(event) {
   if (!gameCompleted && event.target.textContent == '' && player.textContent === 'Player 1') {
     if (turn % 2 !== 0) {
       event.target.textContent = x;
     } else {
       event.target.textContent = o;
     }
     turn++;
     checkWhoWon();
     if (!gameCompleted) {
       if (turn % 2 !== 0) {
         player.textContent = "Player 1";
       } else {
         player.textContent = "Player 2";
         setTimeout(makeAIMove, 1000);
       }
     }
   }
 }




 //basic AI which moves the "O" as second player
 function makeAIMove() {
   const emptyCells = Array.from(table.querySelectorAll('td')).filter(cell => cell.textContent === '');
   if (emptyCells.length > 0) {
     const randomIndex = Math.floor(Math.random() * emptyCells.length);
     emptyCells[randomIndex].textContent = o;
     checkWhoWon();
     turn++;
     player.textContent = "Player 1";
   }
 }


 /// set victory conditions and check if victory conditions are fulfilled
 function checkWhoWon() {
   if (isSameValue(Array.from(table.rows[0].cells), x) ||
     isSameValue(Array.from(table.rows[1].cells), x) ||
     isSameValue(Array.from(table.rows[2].cells), x) ||
     isSameValue([table.rows[0].cells[0], table.rows[1].cells[0], table.rows[2].cells[0]], x) ||
     isSameValue([table.rows[0].cells[1], table.rows[1].cells[1], table.rows[2].cells[1]], x) ||
     isSameValue([table.rows[0].cells[2], table.rows[1].cells[2], table.rows[2].cells[2]], x) ||
     isSameValue([table.rows[0].cells[0], table.rows[1].cells[1], table.rows[2].cells[2]], x) ||
     isSameValue([table.rows[0].cells[2], table.rows[1].cells[1], table.rows[2].cells[0]], x)) {
     theme.pause(); winSound.play();  addClassToWinningCells(x);
     Player1Score.textContent = parseInt(Player1Score.textContent) + 1; gameCompleted = true;
     setTimeout(()=>{ alert('Player 1 won!'); },200)

   } else if (isSameValue(Array.from(table.rows[0].cells), o) ||
     isSameValue(Array.from(table.rows[1].cells), o) ||
     isSameValue(Array.from(table.rows[2].cells), o) ||
     isSameValue([table.rows[0].cells[0], table.rows[1].cells[0], table.rows[2].cells[0]], o) ||
     isSameValue([table.rows[0].cells[1], table.rows[1].cells[1], table.rows[2].cells[1]], o) ||
     isSameValue([table.rows[0].cells[2], table.rows[1].cells[2], table.rows[2].cells[2]], o) ||
     isSameValue([table.rows[0].cells[0], table.rows[1].cells[1], table.rows[2].cells[2]], o) ||
     isSameValue([table.rows[0].cells[2], table.rows[1].cells[1], table.rows[2].cells[0]], o)) {
     theme.pause(); loseSound.play(); addClassToWinningCells(o);
     Player2Score.textContent = parseInt(Player2Score.textContent) + 1; gameCompleted = true;
      setTimeout(()=>{ alert('Player 2 won!'); },200) 
   }

   else if (isTie()) { theme.pause(); tieSound.play();  gameCompleted = true; setTimeout(()=>{ alert("It's a Tie"); },200);}
 }


 ///tool for checking if victory conditions are fulfilled
 function isSameValue(array, valueToCheck) {
   for (let i = 0; i < array.length; i++) {
     if (i == 0) {
       value = array[i].textContent
     }
     if (array[i].textContent !== valueToCheck) {
       return false;
     }
   }
   return true;
 }


 // check if there are empty cells, if this is the case, a tie condition is fired
 function isTie() {
   return Array.from(table.querySelectorAll('td')).every(cell => cell.textContent !== '');
 }


 //function for starting a new game, only when a win,lose or a tie are reached
 function newGame() {
   if (gameCompleted) {
     gameCompleted = false;
     turn = 1;
     theme.currentTime = 0;
     theme.play();
     const cells = document.querySelectorAll('td');
     cells.forEach(cell => {
       cell.style.backgroundColor = 'antiquewhite';
       cell.style.color = 'black';
       cell.textContent = '';
     });
     player.textContent = "Player 1";

   } else {
     alert('Finish The Current Game Before Starting A New One');
   }
 }


 // mute/unmute function for the theme song associated with an onclick event//
 function muteAudio() {
   if (isMuted) {
     theme.volume = 1; // Unmute the audio
     isMuted = false;
     document.getElementById("mute").textContent = "Mute";
   } else {
     theme.volume = 0; // Mute the audio
     isMuted = true;
     document.getElementById("mute").textContent = "Unmute";
   }
 }

// Define the winning combinations
 function addClassToWinningCells(player) {
     const winningCombinations = [
     Array.from(table.rows[0].cells),
     Array.from(table.rows[1].cells),
     Array.from(table.rows[2].cells),
     [table.rows[0].cells[0], table.rows[1].cells[0], table.rows[2].cells[0]],
     [table.rows[0].cells[1], table.rows[1].cells[1], table.rows[2].cells[1]],
     [table.rows[0].cells[2], table.rows[1].cells[2], table.rows[2].cells[2]],
     [table.rows[0].cells[0], table.rows[1].cells[1], table.rows[2].cells[2]],
     [table.rows[0].cells[2], table.rows[1].cells[1], table.rows[2].cells[0]],
   ];

  
   for (const combination of winningCombinations) {
     if (isSameValue(combination, player)) {
   
       for (const cell of combination) {

         cell.style.backgroundColor = 'red';
         cell.style.color = 'white';
       }
       break; 
     }
   }
 }