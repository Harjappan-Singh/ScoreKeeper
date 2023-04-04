let player1 = {
    button: document.querySelector('#player1Btn'),
    scoreOutput: document.querySelector('#player1Score'),
    score: 0
}

let player2 = {
    button: document.querySelector('#player2Btn'),
    scoreOutput: document.querySelector('#player2Score'),
    score: 0
}


const resetBtn = document.querySelector('#resetBtn')
const targetScoreSelect = document.querySelector('#gameOf');
let targetScore = 5;
let gameOver = false;


function updateScore(player, opponent) {
    if (!gameOver) {
        player.score++;
        // console.log(player1ScoreOutput.innerText)
        if (player.score === targetScore) {
            gameOver = true;
            player.scoreOutput.classList.add('winner');
            opponent.scoreOutput.classList.add('loser');
            player.button.disabled = true;
            opponent.button.disabled = true;
        } else if (player.score === opponent.score && player.score === targetScore - 1) {
            targetScore += 1;
            // adding new option for play to
            newOption = document.createElement('option');
            newOption.textContent = targetScore;
            newOption.value = targetScore;
            targetScoreSelect.append(newOption);
            targetScoreSelect.value = targetScore;
            targetScoreSelect.classList.add("newTarget", "bold");
        }
        player.scoreOutput.innerText = player.score;
    }
}
// console.log(typeof (player1Score));
player1.button.addEventListener('click', (e) => {
    updateScore(player1, player2);
})

player2.button.addEventListener('click', (e) => {
    updateScore(player2, player1);
})

targetScoreSelect.addEventListener('change', function () {
    targetScore = parseInt(this.value);
    reset();
})

resetBtn.addEventListener('click', reset)

function reset() {
    gameOver = false;
    targetScoreSelect.classList.remove("newTarget", "bold");
    for (let i = 2; i < targetScoreSelect.length; i = 2) {
        targetScoreSelect[i].remove();

    }
    for (let player of [player1, player2]) {
        player.score = 0;
        player.scoreOutput.innerText = 0;
        player.scoreOutput.classList.remove('winner', 'loser');
        player.button.disabled = false;
    }
}

let playGameBtn = document.querySelector('#playGame').addEventListener('click', function () {
    document.querySelector('.game').style.display = "block";
    document.querySelector('.playerName').style.display = "none";
    player1.button.innerText = `+1 ${document.querySelector('#player1Name').value}`;
    player2.button.innerText = `+1 ${document.querySelector('#player2Name').value}`;
})
