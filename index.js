const gameArea = document.querySelector('.game');
let moveGeneral = 0;
let moveX = 0;
let moveO = 0;
const cells = document.querySelectorAll('.cell');
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let winner = '';
let gameResult = [];
let results = [];
let tableBody = document.querySelector('tbody');




function moveCheck() {
    for (let i = 0; i < winningCombinations.length; i++) {
        if ((cells[winningCombinations[i][0]].innerHTML == 'X') && (cells[winningCombinations[i][1]].innerHTML == 'X') && (cells[winningCombinations[i][2]].innerHTML == 'X')) {
            winner = 'Crosses';
            saveResults(winner, moveX);
            showResults(moveX);
        }
        if ((cells[winningCombinations[i][0]].innerHTML == 'O') && (cells[winningCombinations[i][1]].innerHTML == 'O') && (cells[winningCombinations[i][2]].innerHTML == 'O')) {
            winner = 'Noughts';
            saveResults(winner, moveO);
            showResults(moveO);
        }
    }

}

function showResults(moves) {
    document.querySelector('#victoryAudio').play(); 

    if (moves == 9) {
        document.querySelector('h2').textContent = "Game results"
        document.querySelector('p').textContent = 'No winner in the game';
        document.querySelector('.modal-layer').style.display = 'block';
    } else {
    document.querySelector('p').textContent = winner + ' won with ' + moves + ' number of moves!';
    document.querySelector('.modal-layer').style.display = 'block';
    }

    // формирование таблицы
    let row;

    for (let i = 0; i < results.length; i++) {
        row = document.createElement('tr')
        row.innerHTML = "<td class='winnerCell'></td><td class='movesCell'></td>"
        row.querySelector('.winnerCell').textContent = results[i][0];
        row.querySelector('.movesCell').textContent = results[i][1];

        tableBody.prepend(row)
    }
}



function saveResults(winner, moves) {
   
    gameResult.push(winner);
    gameResult.push(moves);

    if (localStorage.getItem('results') !== null) {
        let tableData = JSON.parse(localStorage.getItem('results'));
        if (tableData.length == 10) {
            console.log(tableData)
            tableData.shift();
            results = tableData;
            console.log(results)
        } else {
            results = tableData;
        }
        
    }
    //добавить новый результат

    results.push(gameResult);

    // сохранить с новым результатом
    localStorage.setItem('results', JSON.stringify(results));
}


gameArea.addEventListener('click', function (event) {
    document.querySelector('#moveAudio').play();

    if (event.target.classList.contains('cell')) {
        if (moveGeneral % 2 == 0) {
            event.target.textContent = 'X';
            moveX++
        } else {
            event.target.textContent = 'O';
            moveO++
        }
    }
    moveCheck();
    
    moveGeneral++;

    if (moveGeneral == 9) {
        saveResults('No winner', '-');
        showResults(moveGeneral);
    }
})

document.querySelector('.overlay').addEventListener('click', function () {
    document.querySelector('.modal-layer').style.display = 'none';
    location.reload()
})