import { hot } from 'react-hot-loader/root';
import React from "react";
import './styles.scss';
import Square from './components/Square/Square.jsx'
import SquareRow from './components/SquareRow/SquareRow.jsx'
import ControlPanel from './controlPanel.js'
import {useState, useEffect} from 'react';
import runGame from './runGame.js';
import simulateBoard from './simulateBoard.js';
import UserDash from './components/userDash/userDash.jsx';


const App = ({ name }) => {
  // Version without simulation - commented out.
  //const [initialBoardState, setInitialBoardState] = useState((new Array(50).fill(new Array(100).fill(0)));
  //const [boardState, setBoardState] = useState((new Array(50).fill(new Array(100).fill(0)));
  const [initialBoardState, setInitialBoardState] = useState(simulateBoard(new Array(40).fill(new Array(80).fill(0))));
  const [boardState, setBoardState] = useState(simulateBoard(new Array(40).fill(new Array(80).fill(0))));
  const [tick, setTick] = useState(true)
  const [timer, setTimer] = useState(1000)
  const [play, setPlay] = useState(false)
  const [generation, setGeneration] = useState(0)

  useEffect(() => {
    if(play) {
      const newBoardState = runGame(boardState)
      setBoardState(newBoardState);
      setTimeout(()=>{
        setGeneration(generation + 1)
        setTick(!tick)
      }, timer);
  }

  }, [tick, play]);

  useEffect(()=> {
    if(play) setInitialBoardState(boardState.map((row)=>[...row]))
  }, [play])

   return (
      <>
        <h1>
          Hello {name} nice to see you
        </h1>
        <UserDash initialBoardState={initialBoardState} boardState={boardState} setInitialBoardState={setInitialBoardState} setBoardState={setBoardState}/>
        <div id='board'>
        {boardState.map((row, idx) =>
        <SquareRow row={row} style={{height: `${100/boardState.length}%`}} key={idx} rowIndex={idx} boardState={boardState} setBoardState={setBoardState}/>)}
        </div>
        <ControlPanel generation={generation} setGeneration={setGeneration} initialBoardState={initialBoardState} setBoardState={setBoardState} setTimer={setTimer} timer={timer} setPlay={setPlay} play={play}/>
      </>
    );
}


export default App;