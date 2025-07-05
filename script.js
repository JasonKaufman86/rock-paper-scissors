
// -----------------------------------------------------------------
// Game
// -----------------------------------------------------------------

const ROUNDS = 5

const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors'

const WINNER_PLAYER_1 = 0;
const WINNER_PLAYER_2 = 1;
const WINNER_NONE = -1;

let round = 0;
let drawScore = 0
let player1Score = 0;
let player2Score = 0;

function resetState() {
    round = 0;
    drawScore = 0;
    player1Score = 0;
    player2Score = 0;
}

function getRandomChoice() {
    const choices = [ROCK, PAPER, SCISSORS];
    return choices[Math.floor(Math.random() * choices.length)]
}

function getRoundWinner(player1, player2) {
    if (player1 == player2) return null;
    if (
        player1 == ROCK && player2 == SCISSORS ||
        player1 == PAPER && player2 == ROCK ||
        player1 == SCISSORS && player2 == PAPER
    )return player1;
    return player2;
}

function getGameWinner() {
    if (player1Score == ROUNDS) return WINNER_PLAYER_1;
    if (player2Score == ROUNDS) return WINNER_PLAYER_2;
    return WINNER_NONE;
}

function playRound(humanChoice, computerChoice) {
    const roundWinner = getRoundWinner(humanChoice, computerChoice)
    if (roundWinner === null) return drawScore++;
    if (roundWinner == humanChoice) player1Score++;
    if (roundWinner == computerChoice) player2Score++;
    round++;
}

// -----------------------------------------------------------------
// Round
// -----------------------------------------------------------------

const roundElement = document.querySelector('.round');

function createRoundMessage() {
    return `round ${round}`;
}

function renderRoundMessage() {
    roundElement.textContent = createRoundMessage()
}

// -----------------------------------------------------------------
// Score
// -----------------------------------------------------------------

const scoreElement = document.querySelector('.score')

function createScoreMessage() {
    return `score ${player1Score}-${player2Score}-${drawScore}`
}

function renderScoreMessage() {
    scoreElement.innerText = createScoreMessage()
}

// -----------------------------------------------------------------
// Feedback
// -----------------------------------------------------------------

const START_SCREEN_MESSAGE = 'play me ?';

const feedbackElement = document.querySelector('.feedback');

function createFeedbackMessage(humanChoice, computerChoice) {
    return `${humanChoice} vs ${computerChoice}`;
}

function renderFeedbackMessage(message) {
    feedbackElement.textContent =  message;
}

// -----------------------------------------------------------------
// Screen
// -----------------------------------------------------------------

function renderStartScreen() {
    renderRoundMessage();
    renderScoreMessage();
    renderFeedbackMessage(START_SCREEN_MESSAGE);
}

// -----------------------------------------------------------------
// Buttons
// -----------------------------------------------------------------

function handleInput(input) {
    const computerChoice = getRandomChoice();
    playRound(input, computerChoice);
    const message = createFeedbackMessage(input, computerChoice);
    renderRoundMessage();
    renderScoreMessage();
    renderFeedbackMessage(message);
    const winner = getGameWinner();
    if (winner == WINNER_PLAYER_1 || winner == WINNER_PLAYER_2) {
        resetState();
        renderStartScreen()
    }

}

document.querySelectorAll('button').forEach(b => {
    b.addEventListener("click", (e) => {
        handleInput(e.currentTarget.value);
    });
});


// -----------------------------------------------------------------
// Init
// -----------------------------------------------------------------

renderStartScreen();