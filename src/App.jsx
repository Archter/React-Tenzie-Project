import React from "react";
import "./App.css";
import Confetti from "react-confetti";
import Die from "./component/Die";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = React.useState(() => generateAllNewDice());
  const newGameBtn = React.useRef(null);

  // Checking if game is won
  let gameWon = false;
  if (
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value)
  ) {
    gameWon = true;
    // console.log("Game Won!");
  }

  function generateRandomValue() {
    const rand = Math.ceil(Math.random() * 6);
    return rand;
  }

  function generateAllNewDice() {
    const newDice = [];

    for (let i = 10; i > 0; i--) {
      const rand = generateRandomValue();
      newDice.push({ value: rand, isHeld: false, id: nanoid() });
    }

    return newDice;
  }

  function handleClick() {
    if (gameWon) {
      setDice(generateAllNewDice);
    }
    setDice((prevDice) => {
      return prevDice.map((die) => {
        return die.isHeld ? die : { ...die, value: generateRandomValue() };
      });
    });
  }

  const allDice = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        id={die.id}
        isHeld={die.isHeld}
        hold={hold}
      />
    );
  });

  function hold(id) {
    setDice((prevDice) => {
      return prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  // Autofocus feature to the buttons
  React.useEffect(() => {
    // This method is good if you want object to be focused on mount and after game is won

    // document
    //   .querySelector(".roll-btn")
    //   .focus({ focusVisible: true });

    if (gameWon) {
      newGameBtn.current.focus();
    }
  }, [gameWon]);

  return (
    <main>
      {gameWon && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Confetti
            gravity={0.1}
            height={666}
            initialVelocityX={2}
            initialVelocityY={2}
            numberOfPieces={200}
            opacity={1}
            recycle={false}
            run
            width={400}
            wind={0}
          />
        </div>
      )}
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{allDice}</div>
      <button
        ref={newGameBtn}
        className="roll-btn"
        onClick={handleClick}
        style={{ zIndex: 100 }}
        autoFocus
      >
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
