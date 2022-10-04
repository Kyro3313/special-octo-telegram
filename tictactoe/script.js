let boxes = document.querySelectorAll('[data-cell]')
let container = document.querySelector('.container')


onload = () => {
    container.style.gap = "2rem";
    
    for(let i = 0; i < boxes.length; i++){
        boxes[i].style.width = "5rem";
        boxes[i].style.height = "5rem"
    }
}

setTimeout(function(){
    console.log("Hello World");
}, 2000);


const TicTacApp = (() =>{
    let pbtn = document.querySelector('.pbtn')
    let aibtn = document.querySelector('.abtn')
    let win_msg = document.querySelector(".winning-message")
    let cells = document.querySelectorAll('[data-cell]')
    let btn = document.querySelector('#restart')
    let win_txt = document.querySelector('[data-winning-message-text]')
    let player = true    
    let ai_player = false
    let obtn = document.querySelector('.button-order')
    let fbtn = document.querySelector('.first')
    let sbtn = document.querySelector('.second')
    
    pbtn.classList.add('active')

    pbtn.addEventListener('click', () =>{
        ai_player = false
        aibtn.classList.remove('active')
        pbtn.classList.add('active')
        obtn.style.display = 'none'
        fbtn.classList.remove('active')
        sbtn.classList.remove('active')
        reset()
    })

    aibtn.addEventListener('click', () =>{
        ai_player = true
        pbtn.classList.remove('active')
        aibtn.classList.add('active')
        obtn.style.display = 'flex'
        sbtn.classList.add('active')
        reset()
    })

    fbtn.addEventListener('click', () =>{
      fbtn.classList.add('active')
      sbtn.classList.remove('active')
      reset()
      ai_move()

    })

    

    sbtn.addEventListener('click', () =>{
      sbtn.classList.add('active')
      fbtn.classList.remove('active')
      reset()
    })


    cells.forEach(cell => {
        cell.addEventListener('click', make_move, {once: true})
    });

    

    function make_move(e){
        const cell = e.target
        if(ai_player){
            cell.textContent = "X"
            if(check_winner()){
                win_message(check_winner())
                return true
            }
            ai_move()

            if(check_winner()){
                win_message(check_winner())
                return true
            }
            return 
        }
        cell.textContent = player ? "X" : "O"
        if(check_winner()){
            win_message(check_winner())
            return true
        }
        player ? player = false : player = true
        return {player}
    }

    function win_message(text){
        win_msg.style.display = "flex"
        win_txt.textContent = text
        return true
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




    function minMax(node, player, depth){
        let opponent = (player === "O" ? "X" : "O")
        let available = getAvailable(node)
        if(available.length === 9){
          let start = [0,4,2,6,8]
          return{move: start[Math.floor(Math.random()*start.length)]}
        }
        let result = check_winner2(node)
        if(result === "O"){
          return {score: +1 * (1 + available.length)}
        }if(result === "X"){
          return {score: -1 * (1 + available.length)} 
        }else if(result === 'Tie'){
          return {score: 0}
        }
        
          let moves = []
          let scores = []
          for(let i = 0; i < available.length; i++){
        
                  node[available[i]] = player
                  let score;
                  if(player === "O"){
                    score = minMax(node, "X", depth++).score
                  } else{
                    score = minMax(node, "O", depth++).score
                  }
                  scores.push(score)
                  node[available[i]] = ''
                  moves.push(available[i])
                 
                
              
          }
          let score = (player === "O"? Math.max(...scores) : Math.min(...scores));
          return {score: score, move: moves[scores.indexOf(score)]}
        }
      
  

function check_winner2(board){
  if(board[0] === board[1] && board[1] === board[2] && board[0] !== ''){return board[0]}
  if(board[3] === board[4] && board[4] === board[5] && board[3] !== ''){return board[3]}
  if(board[6] === board[7] && board[7] === board[8] && board[6] !== ''){return board[6]}
  
  if(board[0] === board[3] && board[3] === board[6] && board[0] !== ''){return board[0]}
  if(board[1] === board[4] && board[4] === board[7] && board[1] !== ''){return board[1]}
  if(board[2] === board[5] && board[5] === board[8] && board[2] !== ''){return board[2]}
  
  if(board[0] === board[4] && board[4] === board[8] && board[0] !== ''){return board[0]}
  if(board[6] === board[4] && board[4] === board[2] && board[6] !== ''){return board[6]}
  
  if(board.every(element => element !== '')){return 'Tie'}
  
  return false
  
  }
  
  
    function getAvailable(board) {
      let res = []
      for(let i = 0; i < 9; i++){
        if(board[i] != "O" && board[i] != "X"){
          res.push(i)
        }
      }
      return res
  }
  
    function ai_move(){
      board = Array.from(cells).map(x => x.textContent)
      let move = minMax(board, "O", 0).move
      cells[move].textContent = "O"
      cells[move].removeEventListener('click', make_move, {once: true})
    }
    
    function reset(){
        cells.forEach(x => x.textContent = '')
        cells.forEach(cell => {
            cell.addEventListener('click', make_move, {once: true})
        });
    }

    btn.addEventListener('click', ()=>{
        win_msg.style.display = 'none'
        reset()
        if(ai_player && fbtn.classList.contains('active')){
          ai_move()
        }
    })

    return {cells, make_move, check_winner}
})();

