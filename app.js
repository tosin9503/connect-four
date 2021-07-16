var tableR = document.getElementsByTagName('tr');
var tableD = document.getElementsByTagName('td');
var currentTurn = document.querySelector('.player-turn');
const buttons = document.querySelectorAll('.button');
const reset = document.querySelector('.reset');


while (!player1) {
    var player1 = prompt('Red player enter your name:');
};
var player1Color = 'red';

while (!player2) {
    var player2 = prompt('Blue player enter your name:');
};
var player2Color = 'blue';


var currentPlayer = 1;
let winner;
currentTurn.textContent = `${player1}'s turn!`



for (i = 0; i < tableD.length; i++) {
    tableD[i].addEventListener('click', (e) => {
        console.log(`${e.target.parentElement.rowIndex},${e.target.cellIndex}`)
    });
};


function colorChange(e) {
    let column = e.target.cellIndex;
    let row = [];

    for (i = 5; i > -1; i--) {
        if (tableR[i].children[column].style.backgroundColor == 'white') {
            row.push(tableR[i].children[column]);
            if (currentPlayer === 1) {
                row[0].style.backgroundColor = 'red';
                if (checkHorizontal() || checkVertical() || checkDiagonal() || checkDiagonal1()) {
                    currentTurn.textContent = `${player1} has won!`;
                    currentTurn.style.color = player1Color;
                    return alert(`${player1} has won!`);
                } else if (tieCheck()) {
                    currentTurn.textContent = 'Tie!';
                    return alert('Tie!');
                } else {
                    currentTurn.textContent = `${player2}'s turn`
                    return currentPlayer = 2;
                }
            } else {
                row[0].style.backgroundColor = 'blue';
                if (checkHorizontal() || checkVertical() || checkDiagonal() || checkDiagonal1()) {
                    currentTurn.textContent = `${player2} has won!`;
                    currentTurn.style.color = player2Color;
                    return alert(`${player2} has won!`);
                } else if (tieCheck()) {
                    currentTurn.textContent = 'Tie!';
                    return alert('Tie!');
                } else {
                    currentTurn.textContent = `${player1}'s turn`;
                    return currentPlayer = 1;
                }

            }
        }
    }

}


Array.prototype.forEach.call(tableD, (cell) => {
    cell.addEventListener('click', colorChange);
    cell.style.backgroundColor = 'white';
});


function matchColorCheck(one, two, three, four) {
    return (one === two && one === three && one === four && one !== 'white' && one !== undefined);
}


function checkHorizontal() {
    for (let row = 0; row < tableR.length; row++) {
        for (let col = 0; col < 4; col++) {
            if (matchColorCheck(tableR[row].children[col].style.backgroundColor, tableR[row].children[col + 1].style.backgroundColor,
                tableR[row].children[col + 2].style.backgroundColor, tableR[row].children[col + 3].style.backgroundColor)) {
                return true;
            }
        }
    }
}


function checkVertical() {
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 3; row++) {
            if (matchColorCheck(tableR[row].children[col].style.backgroundColor, tableR[row + 1].children[col].style.backgroundColor,
                tableR[row + 2].children[col].style.backgroundColor, tableR[row + 3].children[col].style.backgroundColor)) {
                return true;
            };
        }
    }
}


function checkDiagonal() {
    for (let col = 0; col < 4; col++) {
        for (let row = 0; row < 3; row++) {
            if (matchColorCheck(tableR[row].children[col].style.backgroundColor, tableR[row + 1].children[col + 1].style.backgroundColor,
                tableR[row + 2].children[col + 2].style.backgroundColor, tableR[row + 3].children[col + 3].style.backgroundColor)) {
                return true;
            }
        }
    }

}


function checkDiagonal1() {
    for (let col = 0; col < 4; col++) {
        for (let row = 5; row > 2; row--) {
            if (matchColorCheck(tableR[row].children[col].style.backgroundColor, tableR[row - 1].children[col + 1].style.backgroundColor,
                tableR[row - 2].children[col + 2].style.backgroundColor, tableR[row - 3].children[col + 3].style.backgroundColor)) {
                return true;
            }
        }
    }
}


function tieCheck() {
    let fullbutton = []
    for (i = 0; i < tableD.length; i++) {
        if (tableD[i].style.backgroundColor !== 'white') {
            fullbutton.push(tableD[i]);
        }
    }
    if (fullbutton.length === tableD.length) {
        return true;
    }
}


reset.addEventListener('click', () => {
    buttons.forEach(button => {
        button.style.backgroundColor = 'white';
    });
    currentTurn.style.color = 'black';
    return (currentPlayer === 1 ? currentTurn.textContent = `${player1}'s turn` : currentTurn.textContent = `${player2}'s turn`);
});

