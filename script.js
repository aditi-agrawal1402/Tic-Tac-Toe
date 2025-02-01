function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for(let i = 0; i < rows; i++){
        board[i] = [];
        for(let j = 0; j < columns; j++){
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const markCell = (row, column, player) => {
        board[row][column].addToken(player);
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((rows) => rows.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    };

    return {
        getBoard,
        markCell,
        printBoard
    };
};


function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {
        addToken,
        getValue
    };
}


function GameController(
    playerOne = "Player One",
    playerTwo = "Player Two"
) {
    let board = Gameboard();

    let players = [
        {
            name: playerOne,
            token: 1
        },
        {
            name: playerTwo,
            token: 2
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`);
    }

    const playRound = (row, column) => {
        console.log(`Marking ${getActivePlayer().name}'s token on row ${row} column ${column}`);
        board.markCell(row, column, getActivePlayer().token);


        //game logic


        switchPlayerTurn();
        printNewRound();
    }

    printNewRound();

    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard
    };
}

function ScreenController() {
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    
    const updateScreen = () => {
        boardDiv.textContent = "";

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

        board.forEach((row, rowIndex) => {
            row.forEach((cell, index) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.dataset.rowNo = rowIndex;
                cellButton.dataset.columnNo = index;
                cellButton.textContent = cell.getValue();

                boardDiv.appendChild(cellButton);
            })
        })
    }

    function clickHandlerBoard(e) {
        const selectedRow = e.target.dataset.rowNo;
        const selectedColumn = e.target.dataset.columnNo;
        
        if(!selectedColumn) return;
        if(!selectedRow) return;
        console.log(`${selectedRow}, ${selectedColumn}`)
        game.playRound(selectedRow, selectedColumn);
        console.log("ebreyubrg");
        updateScreen();
    }

    boardDiv.addEventListener("click", clickHandlerBoard);

    updateScreen();
}

ScreenController();
