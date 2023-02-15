import React, { useState } from "react";
import "./App.css";
import Game from "./Components/Game";

import Button from "./Components/Button";
import Title from "./Components/Title";
import PointsDisplayer from "./Components/PointsDisplayer";
import Subtitle from "./Components/Subtitle";
import { ICustomLanguages, ILanguage, ILanguages } from "./types";

const App = () => {
  const languages: ILanguage[] = [
    {
      language: "pt-br",
      icon: "./assets/images/br-icon.png"
    },
    {
      language: "en",
      icon: "./assets/images/en-icon.png"
    },
    {
      language: "es",
      icon: "./assets/images/spn-icon.png"
    },
  ]

  const customLanguages: ICustomLanguages[] = [
    {
      language: "pt-br",
      languages: [
        {
          language: languages[0],
          title: "Português"
        },
        {
          language: languages[1],
          title: "Inglês"
        },
        {
          language: languages[2],
          title: "Narcotráfico"
        },
      ]
    },
    {
      language: "en",
      languages: [
        {
          language: languages[0],
          title: "Brazilian"
        },
        {
          language: languages[1],
          title: "English"
        },
        {
          language: languages[2],
          title: "Mexican"
        },
      ]
    },
    {
      language: "es",
      languages: [
        {
          language: languages[0],
          title: "Macacos y Pelé"
        },
        {
          language: languages[1],
          title: "Inglés"
        },
        {
          language: languages[2],
          title: "Español"
        },
      ]
    },
  ]

  const [selectedLanguage, setSelectedLanguage] = useState<ICustomLanguages>(customLanguages[0]);
     
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
      <Subtitle>By rachzy & oBST01</Subtitle>
      <Button onClick={handleButtonClick}>Play</Button>
    </div>
  );
};

export default App;
