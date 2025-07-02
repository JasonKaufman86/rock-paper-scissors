

// -----------------------------------------------------------------
// Game
// -----------------------------------------------------------------

const ROUNDS = 5

const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors'

// State
let round = 0;
let drawScore = 0
let humanScore = 0;
let botScore = 0;

function resetState() {
    round = 0;
    drawScore = 0;
    humanScore = 0;
    botScore = 0;
}

function getBotChoice() {
    const chance = Math.random();
    if (chance <= 0.33) return ROCK;
    if (chance > 0.33 && chance < 0.66) return PAPER;
    return SCISSORS;
}

function playRound(humanChoice, computerChoice) {
    const roundWinner = getRoundWinner(humanChoice, computerChoice)
    if (roundWinner === null) return drawScore++;
    if (roundWinner == humanChoice) humanScore++;
    if (roundWinner == computerChoice) botScore++;
    round++;
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
    if (humanScore == ROUNDS) return 0;
    if (botScore == ROUNDS) return 1;
    return -1;
}



// -----------------------------------------------------------------
// UI
// -----------------------------------------------------------------

function renderResetScreen() {
    renderRoundMessage();
    renderScoreMessage();
    renderFeedbackMessage();
}

// Round
const roundElement = document.querySelector('.round');

function createRoundMessage() {
    return `round ${round} of ${ROUNDS}`;
}

function renderRoundMessage() {
    roundElement.textContent = createRoundMessage()
}

// Score
const scoreElement = document.querySelector('.score')

function createScoreMessage() {
    return `score ${humanScore}-${botScore}-${drawScore}`
}

function renderScoreMessage() {
    scoreElement.innerText = createScoreMessage()
}

// Feedback
const FEEDBACK_MESSAGE = 'rock-paper-scissors';

const feedbackElement = document.querySelector('.feedback');

function createFeedbackMessage(humanChoice, computerChoice) {
    return `${humanChoice} vs ${computerChoice}`;
}

function renderFeedbackMessage(message = null) {
    feedbackElement.textContent = message === null? FEEDBACK_MESSAGE : message;
}

// Buttons
function onClick(e) {
    const humanChoice = e.target.innerText;
    const computerChoice = getBotChoice();
    playRound(humanChoice, computerChoice);
    const message = createFeedbackMessage(humanChoice, computerChoice);
    renderRoundMessage();
    renderScoreMessage();
    renderFeedbackMessage(message);
    const winner = getGameWinner();
    if (winner == 0 || winner == 1) {
        resetState();
        renderResetScreen()
    }

}

const rockButton = document.querySelector('.controls > .rock');
rockButton.addEventListener("click", onClick);

const paperButton = document.querySelector('.controls > .paper');
paperButton.addEventListener("click", onClick);

const scissorsButton = document.querySelector('.controls > .scissors');
scissorsButton.addEventListener("click", onClick);


renderResetScreen();

