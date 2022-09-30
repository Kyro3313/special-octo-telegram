let boxes = document.querySelectorAll('[data-cell]')
let container = document.querySelector('.container')

onload = () => {
    container.style.gap = "30px";
    boxes.forEach(e => {e.style.height = "100px"; e.style.width = "100px"})
}



const TicTacBoard = (() =>{
    let win_msg = document.querySelector(".winning-message")
    let cells = document.querySelectorAll('[data-cell]')
    let btn = document.querySelector('#restart')
    let win_txt = document.querySelector('[data-winning-message-text]')
    let player = true    

    cells.forEach(cell => {
        cell.addEventListener('click', make_move, {once: true})
    });

    function make_move(e){
        const cell = e.target
        cell.textContent = player ? "X" : "O"
        if(check_winner()){
            win_msg.style.display = "flex"
            win_txt.textContent = `${check_winner()}`
            return true
        }
        player ? player = false : player = true
        return {player}
    }
    

    function check_winner(){
        let cellsArr = Array.from(cells).map(x => x.textContent)
        

        if(cellsArr[0] === cellsArr[1] && cellsArr[1] === cellsArr[2] && cellsArr[0] !== ''){return `${cellsArr[0]} Wins!`};
        if(cellsArr[3] === cellsArr[4] && cellsArr[4] === cellsArr[5] && cellsArr[3] !== ''){return `${cellsArr[3]} Wins!`};
        if(cellsArr[6] === cellsArr[7] && cellsArr[7] === cellsArr[8] && cellsArr[6] !== ''){return `${cellsArr[6]} Wins!`};

        if(cellsArr[0] === cellsArr[3] && cellsArr[3] === cellsArr[6] && cellsArr[0] !== ''){return `${cellsArr[0]} Wins!`};
        if(cellsArr[1] === cellsArr[4] && cellsArr[4] === cellsArr[7] && cellsArr[1] !== ''){return `${cellsArr[1]} Wins!`};
        if(cellsArr[2] === cellsArr[5] && cellsArr[5] === cellsArr[8] && cellsArr[2] !== ''){return `${cellsArr[2]} Wins!`};

        if(cellsArr[0] === cellsArr[4] && cellsArr[4] === cellsArr[8] && cellsArr[0] !== ''){return `${cellsArr[0]} Wins!`};
        if(cellsArr[6] === cellsArr[4] && cellsArr[4] === cellsArr[2] && cellsArr[6] !== ''){return `${cellsArr[6]} Wins!`};

        if(cellsArr.every(element => element !== '')){return 'It\'s a Tie!'}
        return false
    };



    

    btn.addEventListener('click', ()=>{
        win_msg.style.display = 'none'
        cells.forEach(x => x.textContent = '')
        cells.forEach(cell => {
            cell.addEventListener('click', make_move, {once: true})
        });
        player = true
    })

    return {cells, make_move, check_winner}
})();

