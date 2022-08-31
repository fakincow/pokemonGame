import { useState, useEffect } from 'react';
import { library } from "@fortawesome/fontawesome-svg-core";
import styles from './Board.module.scss';
import {
  faAngleDown, faStar
} from "@fortawesome/free-solid-svg-icons";
import { Button } from 'react-bootstrap';
import { GAME_STATES } from '../utils/enums';

library.add(faAngleDown, faStar);
const GameBoard = ({ onAtack, dices, startNewGame, gameHistory, gameStatus }) => {

  const [disableAtackBtn, setDisableAtackBtn] = useState(true);
  const [disableNewBtn, setDisableNewBtn] = useState(false);
  useEffect(() => {
    if (gameStatus === GAME_STATES.playerTurn || gameStatus === GAME_STATES.waiting) {
      setDisableAtackBtn(false);
    }else{
      setDisableAtackBtn(true);
    }
    if (gameStatus === GAME_STATES.newGame || gameStatus === GAME_STATES.gameOver) {
      setDisableNewBtn(false);
    } else {
      setDisableNewBtn(true);
    }
  }, [gameStatus]);
  return (
    <div className={styles.GameBoard}>
      <div className={styles.Dice}>
        <div className={styles.Stone}>{dices?.[0]}</div>
        <div className={styles.Stone}> {dices?.[1]} </div>
      </div>
      <div className={styles.MoveResponse}>
        <span><label>You Hit For : </label><label className={styles.DiceRes}>{dices?.[0]}</label></span>
        <span><label>Your Opponent Hit for :</label><label className={styles.DiceRes}> {dices?.[1]}</label></span>
      </div>
      <div className={styles.ButtonsPannel}>
        <Button disabled={disableAtackBtn} onClick={onAtack} variant="btn btn-success" >
          Attack!
        </Button>
        <Button disabled={disableNewBtn}  style={{margin: "10px "}}onClick={startNewGame} variant=" btn btn-warning">
          Start New Game
        </Button>
      </div>
      <div className={styles.GameHistory}>
        Game Log
        <ul>
          {gameHistory.map((item, index) => {
            return (
              <li key={index}>
                {item.action} : Player throwes: {item.player} - Opponent throwes: {item.opponent}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
};

GameBoard.propTypes = {};

GameBoard.defaultProps = {};

export default GameBoard;
