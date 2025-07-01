
const ROUNDS = 5

const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors'

let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
    const chance = Math.random();
    if (chance <= 0.33){
        return ROCK;
    }
    if (chance > 0.33 && chance < 0.66){
        return PAPER;
    }
    return SCISSORS;
}

function getHumanChoice() {
    let choice = prompt('Enter your choice: ').toLowerCase();
    return choice;
}

function getRoundWinner(player1, player2) {

    // Draw
    if (player1 == player2){
        return null;
    }

    // Player1 wins
    if (
        player1 == ROCK && player2 == SCISSORS ||
        player1 == PAPER && player2 == ROCK ||
        player1 == SCISSORS && player2 == PAPER
    ){
        return player1;
    }

    // Player2 wins
    return player2;

}

function playRound() {
    const humanChoice = getHumanChoice();
    const computerChoice = getComputerChoice()
    const winner = getRoundWinner(humanChoice, computerChoice)

    if (winner == humanChoice) {
        humanScore++;
    }
    if (winner == computerChoice) {
        computerScore++;
    }
    return `Human chose ${humanChoice}, Computer chose ${computerChoice}`;
}

function playGame(rounds = ROUNDS) {
    let round = 0;

    while (round < ROUNDS) {
        let message = playRound();
        console.log(message)
        round++;

    }
    message = humanScore > computerScore ? "Human wins" : "Comuputer wins";
    alert(message)
}

playGame()