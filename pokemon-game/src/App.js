import './App.css';
import GamePage from './GamePage/GamePage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header>
      </header>
      <div>
        <label>Pokemon Battle Simulator</label>
        <GamePage></GamePage>
      </div>
    </div>
  );
}

export default App;
