import { tab } from '@testing-library/user-event/dist/tab';
import React, { useEffect, useState } from 'react';
import './styles/index.scss';

type DivProps = {
  div: number,
}

function App() {

  document.title = "Tic Tac Toe";

  const initialState = {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: ""
  }


  const [currentPlayer, setCurrentplayer] = useState(true)
  const [win, setWin] = useState(false)
  const [remiza, setRemiza] = useState(false)
  const [classWin, setClassWin] = useState<string>("")
  const [cellsClick, setCellsClick] = useState<{[key: number]: string}>(initialState)
  const [firstPlayer, setFirstPlayer] = useState(false)
  const [showFirstPlayer, setShowFirstPlayer] = useState(true)

  //create table
    let table:DivProps[] = []
    for(let i = 1; i<=9; i++){
      const obj:DivProps = {
        div: i,
      }
      table.push(obj)
    }
  //get number cell click
  const cellClick = (numberCell:number) => {
    if(!cellsClick[numberCell].length && win === false){
      setCellsClick(prevState => {
        return{
          ...prevState, [numberCell]: currentPlayer ? "images/x.png" : "images/0.png"
        }
      })
      setCurrentplayer(!currentPlayer)
      setShowFirstPlayer(false)
  }
  }
  useEffect(() => {
      switch (true) {
        case cellsClick[1] === "images/x.png" && cellsClick[2] === "images/x.png" && cellsClick[3] === "images/x.png" ||
             cellsClick[1] === "images/0.png" && cellsClick[2] === "images/0.png" && cellsClick[3] === "images/0.png":
        setWin(true); setClassWin("line0")
          break;
        
        case cellsClick[4] === "images/x.png" && cellsClick[5] === "images/x.png" && cellsClick[6] === "images/x.png" ||
             cellsClick[4] === "images/0.png" && cellsClick[5] === "images/0.png" && cellsClick[6] === "images/0.png":
        setWin(true); setClassWin("line1")
          break;
        
        case cellsClick[7] === "images/x.png" && cellsClick[8] === "images/x.png" && cellsClick[9] === "images/x.png" ||
             cellsClick[7] === "images/0.png" && cellsClick[8] === "images/0.png" && cellsClick[9] === "images/0.png":
        setWin(true); setClassWin("line2")
          break;

        case cellsClick[1] === "images/x.png" && cellsClick[4] === "images/x.png" && cellsClick[7] === "images/x.png" ||
             cellsClick[1] === "images/0.png" && cellsClick[4] === "images/0.png" && cellsClick[7] === "images/0.png":
        setWin(true); setClassWin("line3")
          break;

        case cellsClick[2] === "images/x.png" && cellsClick[5] === "images/x.png" && cellsClick[8] === "images/x.png" ||
             cellsClick[2] === "images/0.png" && cellsClick[5] === "images/0.png" && cellsClick[8] === "images/0.png":
        setWin(true); setClassWin("line4")
          break;
        
        case cellsClick[3] === "images/x.png" && cellsClick[6] === "images/x.png" && cellsClick[9] === "images/x.png" ||
             cellsClick[3] === "images/0.png" && cellsClick[6] === "images/0.png" && cellsClick[9] === "images/0.png":
        setWin(true); setClassWin("line5")
          break;

        case cellsClick[1] === "images/x.png" && cellsClick[5] === "images/x.png" && cellsClick[9] === "images/x.png" ||
             cellsClick[1] === "images/0.png" && cellsClick[5] === "images/0.png" && cellsClick[9] === "images/0.png":
        setWin(true); setClassWin("line6")
          break;

        case cellsClick[3] === "images/x.png" && cellsClick[5] === "images/x.png" && cellsClick[7] === "images/x.png" ||
             cellsClick[3] === "images/0.png" && cellsClick[5] === "images/0.png" && cellsClick[7] === "images/0.png":
        setWin(true); setClassWin("line7")
          break;

        case (cellsClick[1].length && cellsClick[2].length && cellsClick[3].length &&
              cellsClick[4].length && cellsClick[5].length && cellsClick[6].length &&
              cellsClick[7].length && cellsClick[8].length && cellsClick[9].length) > 0:
          setClassWin("all"); setRemiza(true)
          break
      
        default:
      }
  
  }, [cellsClick]);

  const stop = () => {

  }


  return<>
  <h1>Tic Tac Toe</h1>
  {showFirstPlayer?
    <h2>
      <button onClick={()=>setFirstPlayer(true)} className={`firstButton ${firstPlayer? "disable" : ""}`}>
        <strong>First player</strong>
      </button>
      <div className={`chosePlayer ${firstPlayer ? "active" : ""}`}>
        <button onClick={()=>{setFirstPlayer(false); setCurrentplayer(true)}} className='choseButton'><img src="images/x.png" /></button>
        <button onClick={()=>{setFirstPlayer(false); setCurrentplayer(false)}} className='choseButton'><img src="images/0.png" /></button>
      </div>
    </h2>
    : ""
  }
  <div className='table'>
    <div className='resize'>
    {table.map((x:DivProps)=><div key={x.div} onClick={()=>{cellClick(x.div);}} className={`cell ${classWin}`}>
    {cellsClick[x.div] ? <img src={cellsClick[x.div]} /> : ""}
    </div>)}
    <strong>{win ? "" : remiza? "No player won!" : currentPlayer? "It's the player's 'X'" : "It's the player's '0'"}</strong>
    <strong>{win && currentPlayer ? "Player 0 win!" : win && !currentPlayer ? "Player X win!" : ""}</strong>
    {win || remiza ? <><br /><br /><button onClick={()=>{setFirstPlayer(false); setShowFirstPlayer(true); setCellsClick(initialState); setClassWin(""); setWin(false); setRemiza(false)}}>Retry!</button></> : ""}
    </div>
  </div>
  </>
}

export default App;