import React, {useEffect, useRef, useState} from "react";
import Board from "../components/Board";
import {useDispatch, useSelector} from "react-redux";
import {selectGameStatus, selectPoint, setPoint} from "@slices/pointSlice";
import {AppDispatch} from "@store";
import {GameStatus} from "../types/gameStatus";

const Home: React.FC = () => {
  const points = useSelector(selectPoint);
  const gameStatus = useSelector(selectGameStatus);
  const dispatch = useDispatch<AppDispatch>();

  const [counter, setCounter] = useState(0);
  const [inputVal, setInputVal] = useState('0');
  const [timer, setTimer] = useState(0.0);
  const [title, setTitle] = useState('');

  const intervalRef = useRef<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  }
  const handlePlayBtnClick = () => {
    dispatch(setPoint({"point": +inputVal}));
    setCounter(e => e + 1);
  }

  const stop = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimer(timer);
  }

  useEffect(() => {
    setTimer(0);
    if (gameStatus !== GameStatus.NOT_YET_START) {
      intervalRef.current = window.setInterval(() => {
        setTimer(e => e + 0.1);
      }, 100);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [counter, gameStatus]);

  useEffect(() => {
    switch (gameStatus) {
      case GameStatus.NOT_YET_START: setTitle("Let's play"); break;
      case GameStatus.STARTED: setTitle("Clear the point! Hurry up!"); break;
      case GameStatus.FINISHED:
        setTitle("Good job! You won!");
        stop();
        break;
      case GameStatus.ENDED:
        setTitle("Game over!");
        stop();
        break;
      default: setTitle("Let's play"); break;
    }
  }, [gameStatus]);

  return (
    <div style={{display: "flex", flexDirection: "column", height: "100%", width: "100%"}}>
      <div style={{width: "500px", textAlign: "left", margin: "50px"}}>
        <h3>{title}</h3>
        <div style={{width: "100%", display: "flex"}}>
          <label style={{flex: "0 0 40%", boxSizing: "border-box"}}>Points:</label>
          <input style={{flex: "1"}} value={inputVal} onChange={handleInputChange}/>
        </div>
        <div style={{width: "100%", display: "flex"}}>
          <label style={{flex: "0 0 40%", boxSizing: "border-box"}}>Time: </label>
          <span style={{flex: "1"}}>{timer.toFixed(1)}</span>
        </div>
        <button onClick={handlePlayBtnClick}>{counter === 0 ? 'Play' : 'Restart'}</button>
        <button onClick={stop}>Stop</button>
      </div>
      <Board points={points} counter={counter}/>
    </div>
  );
}

export default Home;