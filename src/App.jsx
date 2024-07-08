import { Children, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


const TURN = {
  X : "X",
  O : "0"
}


const Square = ({children,isSelected, updatBoard , index}) => 
{
  const className = `square ${isSelected ? 'is-selected' : '' }`

  const handleClick = () => {
    updatBoard(index)
  }

  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]


function App() {

  const [ board , setBoard ] = useState(Array(9).fill(null))
  const [turn , setTurn] = useState(TURN.X)
  // null es que hay ganador, false es que hay empate//
  const [winner, setWinner] = useState(null)
  
  const chekWinner = (boardToCheck)=> {

    //revisamos las convinaciones para ver cual puede ser el ganador//
    for(const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    return null
  }



  const [likes, setLikes] = useState(0)


  const updatBoard = (index) => { 
    // para que no se sobreescriba la posicion//
    if(board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
 
// para cambiar de turno// 
    const newTurn = turn === TURN.X ? TURN.O : TURN.X;
    setTurn(newTurn)

    const newWinner = chekWinner(newBoard)
    if( newWinner){
     
      setWinner(newWinner)
      alert(`el ganador es ${newWinner}`)
    }
  }

  const handelClick = () => {return ( setLikes(likes + 1))}

  return (
  <main className='board'>
    <h1>Game</h1>
    <section className='game'>
      {
        board.map((firts , index)=> {
          return(
           <Square 
           key={index} 
           index={index}
           updatBoard={updatBoard}>
            {board[index]}
           </Square>
          )
        })
      }
    </section>
    <section className='turn'>
        <Square isSelected={turn === TURN.X}>{TURN.X}</Square>
        <Square isSelected={turn === TURN.O}>{TURN.O}</Square>
    </section>

<button onClick={handelClick}>{likes}</button>
  </main>
  )
}

export default App
