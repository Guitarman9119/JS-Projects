/*
Basic game functionality

- Guess a number between a min and a maximum not self defined at this moment
- Players gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if lost
- Let player choose a option to play again
*/


// Game Values

let min = 2,
    max = 10,
    winningNum = 2,
    guessesLeft = 3;

//UI Elements

const UIgame = document.getElementById('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const guessMessage = document.querySelector('.message');


// Assign UI min and max

minNum.textContent = min;
maxNum.textContent = max;

//Liset for guess
guessBtn.addEventListener('click', function(){

   let guess = parseInt(guessInput.value);

   //Validate input

    if(isNaN(guess) || guess < min || guess > max ){

        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    //Check if Won
    if(guess === winningNum){

        gameOver(true, `${winningNum} is the correct number!`, "green");

    } else {

        //Wrong Number
        guessesLeft -= 1;

        if(guessesLeft === 0){

            //Game Over - Loose

            gameOver(false, `${winningNum} is the number!`, "red");


        } else {

            guessInput.style.borderColor = "red";

            //Clear Input

            guessInput.value = '';

            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, "red");
            // Game contin. - wrong answer


        }

        

    }

});

//Game Over Function

function  gameOver(won, msg){

    let color;

    won === true ? color ='green' : color = "red";

      // Disable input if correct
      guessInput.disabled = true;

      //Show the user won
      guessInput.style.borderColor = color;

      //text color

      guessMessage.style.borderColor =color;


      setMessage(msg);


}


function setMessage(message, color){

    guessMessage.style.color = color;

    guessMessage.textContent = message;


}