console.log('');
console.log('==========================================');
console.log('*** Welcome to Node.JS Guessing Game.***');
console.log('You are playing against me (the computer).');
console.log('I will be thinking of a ramdom number');
console.log('and you guess which number I selected.');
console.log('==========================================');
console.log('');

const readline = require('node:readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let secretNumber;
let numAttempts;

askRange();

function askRange() {
    console.log('You get to pick the range of numbers I will be choosing from...')
    console.log('');

    rl.question('Enter a min number: ', answer => {
        let min = Number(answer);
        rl.question('Enter a max number: ', answer => {
            let max = Number(answer);
            console.log('');

            if (min > max) {
                console.log(`I'm thinking of a number between ${max} and ${min}...`);
                secretNumber = randomInRange(max, min);
            } else {
                console.log(`I'm thinking of a number between ${min} and ${max}...`);
                secretNumber = randomInRange(min, max);
            }

            askLimit();
        })
    })
}

function askLimit () {
    console.log('');
    console.log('You get to pick your difficulty level.');
    console.log('The more guesses you have, the easier the game.')
    console.log('');

    rl.question('How many guesses would you like? ', answer => {
        numAttempts = Number(answer);

        console.log(`You decided to uncover my chosen number in less than ${answer} guesses.`)
        console.log('');
        console.log('==== Let the games begin! ====')
        console.log('');
        askGuess();
    })
}

function randomInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function askGuess() {
    rl.question('Enter a guess: ', (answer) => {
        let guess = Number(answer);
        let attempt = checkGuess(guess);

        if (attempt === false) {
            numAttempts--;

            if (numAttempts === 0) {
                console.log(`I'm sorry, but you lost.`);
                console.log('');
                newGame();
            } else {
               askGuess();
            }
        } else {
            console.log('YOU WON!!!');
            console.log('');
            newGame();
        }
    });
}

function checkGuess(guess) {
    if (guess > secretNumber) {
        console.log('This is too high...');
        console.log('');
        return false;
    } else if (guess < secretNumber) {
        console.log('This is too low...');
        console.log('');
        return false;
    } else if (guess === secretNumber) {
        console.log('');
        console.log("That's it!!!");
        console.log('');
        return true;
    } else {
        // let error = ('ERROR @ checkGuess - no condition was matched');
        console.log('ERROR - Please enter a number');
        console.log('');
        numAttempts++;
        return false;
    }
}

function newGame() {
    rl.question('Would you like to start another game? (Y/N) ', (answer) => {
        if (answer.toLowerCase() === 'y' || answer === 'yes') {
            console.log('');
            console.log('=======================');
            console.log(`Let's start a new game!`);
            console.log('=======================');
            console.log('');
            askRange();
        } else {
            console.log('');
            console.log('================================');
            console.log('It was nice playing with you.');
            console.log('See you next time!');
            console.log('================================');
            console.log('');
            rl.close();
        }
    })
}
