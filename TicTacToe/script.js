document.addEventListener("DOMContentLoaded", function() {
    // Selecting elements from the DOM
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('[data-cell]');
    const restartButton = document.getElementById('restartButton');
    const playerXScore = document.getElementById('playerX').querySelector('span');
    const playerOScore = document.getElementById('playerO').querySelector('span');
    const drawScore = document.querySelector('.draw').querySelector('span');

    // Initializing variables
    let circleTurn;
    let xWins = 0;
    let oWins = 0;
    let draws = 0;

    // Start the game
    startGame();

    // Add event listener to restart button
    restartButton.addEventListener('click', startGame);

    // Function to start the game
    function startGame() {
        circleTurn = false; // X starts
        cells.forEach(cell => {
            // Reset cells
            cell.classList.remove('x', 'o', 'win');
            cell.removeAttribute('data-content');
            // Add click event listener to each cell
            cell.addEventListener('click', handleClick, { once: true });
        });
        // Set hover class for board
        setBoardHoverClass();
    }

    // Function to handle cell click
    function handleClick(e) {
        const cell = e.target;
        const currentClass = circleTurn ? 'o' : 'x';
        // Place mark on the clicked cell
        placeMark(cell, currentClass);
        // Check for win or draw
        if (checkWin(currentClass)) {
            endGame(false); // Not a draw
        } else if (isDraw()) {
            endGame(true); // Draw
        } else {
            swapTurns(); // Switch turns
            setBoardHoverClass(); // Set hover class for board
        }
    }

    // Function to end the game
    function endGame(draw) {
        if (draw) {
            // Increment draw count and update draw score
            draws++;
            drawScore.textContent = draws;
            alert('The game is a draw!');
        } else {
            if (circleTurn) {
                // Increment O's win count and update score
                oWins++;
                playerOScore.textContent = oWins;
            } else {
                // Increment X's win count and update score
                xWins++;
                playerXScore.textContent = xWins;
            }
            // Alert winner and apply winning animation to the winning combination
            alert(`${circleTurn ? "O's" : "X's"} Wins!`);
            const winCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            winCombinations.forEach(combination => {
                if (combination.every(index => cells[index].classList.contains(circleTurn ? 'o' : 'x'))) {
                    combination.forEach(index => {
                        cells[index].classList.add('win');
                    });
                }
            });
        }
        // Remove click event listener from cells
        cells.forEach(cell => cell.removeEventListener('click', handleClick));
    }

    // Function to place mark on the cell
    function placeMark(cell, currentClass) {
        cell.classList.add(currentClass);
        cell.dataset.content = currentClass.toUpperCase();
    }

    // Function to swap turns between X and O
    function swapTurns() {
        circleTurn = !circleTurn;
    }

    // Function to set hover class for the board
    function setBoardHoverClass() {
        board.classList.remove('x', 'o');
        if (circleTurn) {
            board.classList.add('o');
        } else {
            board.classList.add('x');
        }
    }

    // Function to check if there is a win
    function checkWin(currentClass) {
        const winCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return winCombinations.some(combination => {
            return combination.every(index => {
                return cells[index].classList.contains(currentClass);
            });
        });
    }

    // Function to check if it's a draw
    function isDraw() {
        return [...cells].every(cell => {
            return cell.classList.contains('x') || cell.classList.contains('o');
        });
    }
});
