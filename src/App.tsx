import React, { useState } from "react";
import "./App.css";
import Game from "./Components/Game";

import Button from "./Components/Button";
import Title from "./Components/Title";
import PointsDisplayer from "./Components/PointsDisplayer";
import Subtitle from "./Components/Subtitle";

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const [soundtrack, setSoundtrack] = useState(
    new Audio(require("./assets/audios/soundtrack.mp3"))
  );

  const handleButtonClick = () => {
    setGameOver(false);
    setGameStarted(true);
    setScore(0);
    soundtrack.currentTime = 0;
  };

  if (gameOver) {
    soundtrack.volume = 0.3;
    soundtrack.pause();
    return (
      <div className="main-wrapper">
        <Title color="red">Game Over!</Title>
        <PointsDisplayer
          points={score}
          text="Your score"
          pointsColor="yellow"
        />
        <Button color="red" onClick={handleButtonClick}>
          Play Again
        </Button>
      </div>
    );
  }

  if (gameStarted) {
    soundtrack.play();
    return <Game score={score} setScore={setScore} setGameOver={setGameOver} />;
  }

  return (
    <div className="main-wrapper">
      <Title>Fliessux</Title>
      <Subtitle>rachzy & oBST01</Subtitle>
      <Button onClick={handleButtonClick}>Play</Button>
    </div>
  );
};

export default App;
