import React, { useState } from "react";
import "./App.css";
import Game from "./Components/Game";

import Button from "./Components/Button";
import Title from "./Components/Title";
import PointsDisplayer from "./Components/PointsDisplayer";
import Subtitle from "./Components/Subtitle";
import { ICustomLanguages, IFly, ILanguage, ISkill } from "./types";

import languageLabels from "./languages.json";
import Languages from "./Components/Languages";

const App = () => {
  const languages: ILanguage[] = [
    {
      language: "pt-br",
      icon: "br-icon.png",
    },
    {
      language: "en",
      icon: "en-icon.png",
    },
    {
      language: "es",
      icon: "es-icon.png",
    },
  ];

  const customLanguages: ICustomLanguages[] = [
    {
      language: "pt-br",
      languages: [
        {
          language: languages[0],
          title: "Português",
        },
        {
          language: languages[1],
          title: "Inglês",
        },
        {
          language: languages[2],
          title: "Narcotráfico",
        },
      ],
    },
    {
      language: "en",
      languages: [
        {
          language: languages[1],
          title: "English",
        },
        {
          language: languages[0],
          title: "Brazilian",
        },
        {
          language: languages[2],
          title: "Mexican",
        },
      ],
    },
    {
      language: "es",
      languages: [
        {
          language: languages[2],
          title: "Español",
        },
        {
          language: languages[0],
          title: "Macacos y Pelé",
        },
        {
          language: languages[1],
          title: "Inglés",
        },
      ],
    },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState<ICustomLanguages>(
    customLanguages[0]
  );

  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [money, setMoney] = useState(0);

  const [soundtrack] = useState(
    new Audio(require("./assets/audios/soundtrack.mp3"))
  );

  const [flies, setFlies] = useState<IFly[]>([]);

  function killAllFlies() {
    setFlies((currentFlies) =>
      currentFlies.map((fly) => {
        setTimeout(() => {
          setFlies((currentAliveFlies) => {
            return currentAliveFlies.filter(
              (aliveFly) => aliveFly.id !== fly.id
            );
          });
        }, 1000);

        return {
          ...fly,
          alive: false,
        };
      })
    );

    new Audio(require("./assets/audios/slug4.mp3")).play();
    setScore((currentScore) => currentScore + 1);
  }

  const skills: ISkill[] = [
    {
      title: "PNCD",
      thumbnail: "mosquito-pncd.jpg",
      cost: 120,
      execute: killAllFlies,
    },
  ];

  const handleButtonClick = () => {
    setGameOver(false);
    setGameStarted(true);
    setScore(0);
  };

  if (gameOver) {
    soundtrack.volume = 0.3;
    soundtrack.pause();
    return (
      <div className="main-wrapper">
        <Title color="red">
          {languageLabels[selectedLanguage.language].game_over}
        </Title>
        <PointsDisplayer
          points={score}
          text={languageLabels[selectedLanguage.language].your_score}
          pointsColor="yellow"
        />
        <Button color="red" onClick={handleButtonClick}>
          {languageLabels[selectedLanguage.language].play_again}
        </Button>
      </div>
    );
  }

  if (gameStarted) {
    soundtrack.play();
    return (
      <Game
        flies={flies}
        setFlies={setFlies}
        score={score}
        money={money}
        setMoney={setMoney}
        setScore={setScore}
        setGameOver={setGameOver}
        yourScoreLabel={languageLabels[selectedLanguage.language].your_score}
        yourLivesLabel={languageLabels[selectedLanguage.language].your_lives}
        yourMoneyLabel={languageLabels[selectedLanguage.language].your_money}
        skills={skills}
      />
    );
  }

  return (
    <div className="main-wrapper">
      <Languages
        customLanguages={customLanguages}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
      <Title>Fliessux</Title>
      <Subtitle>By rachzy & oBST01</Subtitle>
      <Button onClick={handleButtonClick}>
        {languageLabels[selectedLanguage.language].play}
      </Button>
    </div>
  );
};

export default App;
