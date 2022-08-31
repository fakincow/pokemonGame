import { useState, useEffect } from 'react';
import GameBoard from '../game-board/GameBoard';
import PlayerCard from '../PlayerCard/PlayerCard';
import styles from './GamePage.module.scss';
import { GAME_STATES } from '../utils/enums';


const GamePage = () => {
  const [playerhitPonts, setPlayerHitpoints] = useState(0);
  const [opponenthitPonts, setOpponenthitPonts] = useState(0);
  const [dices, setDices] = useState();
  const [gameHistory, setGameHistory] = useState([]);
  const [gameStatus, setGameStatus] = useState(GAME_STATES.newGame);
  const [playerName, setPlayerName] = useState('Player');
  const [opponentName, setOpponentName] = useState('Opponent');
  useEffect(() => {
    if (playerhitPonts <= 0 || opponenthitPonts <= 0) {
      gameOver();
    }
  }, [playerhitPonts, opponenthitPonts]);
  const gameOver = () => {
    setGameStatus(GAME_STATES.gameOver);
  }
  const onAtackClicked = () => {
    throwDice();
  }
  const randomizeDice = () => {
    return Math.floor(Math.random() * (6 - 1 + 1) + 1);
  }
  const onStartGame = () => {
    setPlayerHitpoints(100);
    setOpponenthitPonts(100);
    setGameHistory([]);
    setGameStatus(GAME_STATES.playerTurn);
    fetchPokeApi();
  }
  let timeOuts;
  const throwDice = (a, b) => {
    clearTimeout(timeOuts);
    let myScore = randomizeDice();
    let opponentScore = randomizeDice();
    if (a) myScore = 0;
    if (b) opponentScore = 0;
    setPlayerHitpoints((old) => old - opponentScore);
    setOpponenthitPonts((old) => old - myScore);
    setDices([myScore, opponentScore]);

    let move = {
      'player': myScore,
      'opponent': opponentScore,
      'action': 'turn'
    }
    setGameHistory([...gameHistory, move]);
    if (myScore === 6) {
      setGameStatus(GAME_STATES.double);
      throwDice(null, 0);
      return;
    }
    if (opponentScore === 6) {
      setGameStatus(GAME_STATES.double);
      throwDice(0, null)
      return;
    }
    timeOuts = setTimeout(() => {
      setGameStatus(GAME_STATES.waiting)
    }, 1000);

  }

  const fetchPokeApi = async () => {
    let response = await fetch(
      'https://pokeapi.co/api/v2/pokemon'
    );
    let json = await response.json();
    setPlayerName(json.results[0].name);
    setOpponentName(json.results[1].name);
  };

  return (
    <div>
      <div className={styles.GamePage}>
        <div className={styles.Player}>
          <PlayerCard label={playerName} hitPonts={playerhitPonts} playerName={playerName}></PlayerCard>
        </div>
        <div className={styles.GameLog}>
          <label className={styles.GameStatus}> {gameStatus}</label>
          <GameBoard onAtack={onAtackClicked} startNewGame={onStartGame} dices={dices} gameHistory={gameHistory} gameStatus={gameStatus}></GameBoard>
        </div>
        <div className={styles.Opponent}>
          <PlayerCard label={opponentName} hitPonts={opponenthitPonts} playerName={opponentName} enemy={true}></PlayerCard>
        </div>
      </div>
    </div>
  )
};

GamePage.propTypes = {};

GamePage.defaultProps = {};

export default GamePage;
