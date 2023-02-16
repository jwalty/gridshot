let gridDiagonalSize = 5;
let targetsOnMap = 3;
let gridshotContainer = document.querySelector('#gridshotContainer');
let enemyColor = 'rgb(255, 112, 110)';
let emptyColor = 'rgb(255, 255, 255)';
let score = 0;
let accuracy = 0;
let clicks = 0;
let missedClicks = 0;
let hitClicks = 0;
let timerActive = false;

//create grid
for (let i=0; i < gridDiagonalSize; i++) {
    let rowOfColumns = document.createElement('tr');
    rowOfColumns.className = 'tileRow';
    rowOfColumns.draggable = false;
    for (let j=0; j < gridDiagonalSize; j++) {
        let gridTile = document.createElement('td');
        gridTile.style.backgroundColor = emptyColor;
        gridTile.className = 'gridTile';
        gridTile.draggable = false;

        //tile mousedown function
        gridTile.addEventListener('mousedown', () => {

            if (timerActive == false) {
                gridshotContainer.classList.remove('tableInactive');
                timerActive = true;
                startTimer(15);
            }


            clicks++;
            if (gridTile.style.backgroundColor == enemyColor) {
                score += 150;
                gridTile.style.backgroundColor = emptyColor;
                chooseTile(gridTile);
                hitClicks++;
            } else if (gridTile.style.backgroundColor == emptyColor) {
                score -= 100;
                missedClicks++;
            }

            //update accuracy
            accuracy = `${Math.round(hitClicks / clicks * 100)}%`;
            updateStats();
            
        });

        rowOfColumns.appendChild(gridTile);
    }
    gridshotContainer.appendChild(rowOfColumns);
}

function chooseTile(tileToAvoid) {
    let nodemapOfTiles = document.querySelectorAll('.gridTile');
    let randomTile = nodemapOfTiles[Math.floor(Math.random() * nodemapOfTiles.length)];
    if (randomTile.style.backgroundColor == enemyColor || tileToAvoid == randomTile) { 
        chooseTile();
        return;
    }
    randomTile.style.backgroundColor = enemyColor;
}

//spawn starting targets;
for (let i=0; i < targetsOnMap; i++) {
    chooseTile();
}

let reset = () => {
    score = 0;
    accuracy = "0%";
    clicks = 0;
    missedClicks = 0;
    hitClicks = 0;
    updateStats();
}

let updateStats = () => {
    document.getElementById('score').textContent = score;
    document.getElementById('accuracy').textContent = accuracy;
}

let updateFinalStats = () => {
    document.getElementById('lastScore').textContent = score;
    document.getElementById('lastAccuracy').textContent = accuracy;
    reset();
}

function startTimer(givenMaxTime) {

    let maxTime = givenMaxTime;
    let timeLeft = maxTime - 1;

    let trialTimer = setInterval(function() {
        if (timeLeft <= 0){
            clearInterval(trialTimer);
            updateFinalStats();
            timerActive = false;
            gridshotContainer.classList.add('tableInactive');
            document.getElementById('gameOver').style.display = 'flex';
        }
        document.getElementById('time').textContent = `${timeLeft}s`;
        timeLeft--;
    }, 1000);

}

function playAgain() {
    document.getElementById('gameOver').style.display = 'none';
    gridshotContainer.classList.remove('tableInactive');
    document.getElementById('time').textContent = '15s';
}
