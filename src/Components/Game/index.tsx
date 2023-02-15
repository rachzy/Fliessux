import React, { useEffect, useState } from "react";
import "./Game.css";

import Ballon from "../Balloon";
import PointsDisplayer from "../PointsDisplayer";

import generateRandomNumber from "../../functions/generateRandomNumber";
import pickRandom from "../../functions/pickRandom";

import { IBallon, colors } from "../../types";

interface IProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}

const Game: React.FC<IProps> = ({ score, setScore, setGameOver }) => {
  const [balloons, setBalloons] = useState<IBallon[]>([]);
  const [balloonSpawningInterval, setBalloonSpawningInterval] = useState(1000);
  const [balloonSpawningFunction, setBalloonSpawningFunction] =
    useState<NodeJS.Timer>();

  //Audios
  const [balloonPopAudio, setBalloonPopAudio] = useState(
    new Audio(require("../../assets/audios/pop.mp3"))
  );
  const [hitAudio, setHitAudio] = useState(
    new Audio(require("../../assets/audios/hit.mp3"))
  );

  const [remainingLives, setRemainingLives] = useState(3);

  const colors: colors[] = ["red", "blue", "green", "yellow"];

  //Function that will be triggered when the user clicks in a Balloon
  const handleBalloonClick = (ballonId: number) => {
    setBalloons((currentBalloons) => {
      return currentBalloons.filter((ballon) => ballon.id !== ballonId);
    });
    setScore((currentScore) => currentScore + 1);
    balloonPopAudio.currentTime = 0.7;
    balloonPopAudio.volume = 1;
    balloonPopAudio.play();
  };

  //useEffect to spawn balloons at a certain period of time
  useEffect(() => {
    clearInterval(balloonSpawningFunction);
    setBalloonSpawningFunction(
      setInterval(() => {
        setBalloons((currentBalloons) => {
          return [
            ...currentBalloons,
            {
              id: Date.now(),
              color: pickRandom(colors),
              position: {
                x: generateRandomNumber(10, 90),
                y: 2,
              },
              clicked: false,
            },
          ];
        });
      }, balloonSpawningInterval)
    );
  }, [balloonSpawningInterval, generateRandomNumber]);

  //useEffect to make every balloon goes down
  //and check if there's a balloon at the very bottom
  useEffect(() => {
    setInterval(() => {
      setBalloons((currentBalloons) => {
        //Add 0.1 in Y for every balloon
        const newCurrentBalloons = currentBalloons.map((balloon) => {
          return {
            ...balloon,
            position: {
              x: balloon.position.x,
              y: balloon.position.y + 1,
            },
          };
        });

        //Check if there's a balloon at the extreme bottom of the page
        newCurrentBalloons.forEach((balloon) => {
          if (balloon.position.y < 100) return; //Y Limit
          //If Y is greater than this, decrease a life from the player
          hitAudio.currentTime = 0.2;
          hitAudio.play();
          setRemainingLives(
            (currentRemainingLives) => currentRemainingLives - 1
          );
        });

        //Return only balloons that have the Y position lower than 100
        return newCurrentBalloons.filter((balloon) => balloon.position.y < 100);
      });
    }, 400);
  }, [hitAudio]);

  //useEffect to decrease the ballon spawning interval in every 10 seconds
  useEffect(() => {
    const spawningIntervalDecreaser = setInterval(() => {
      setBalloonSpawningInterval((currentValue) => {
        if (currentValue <= 200) {
          clearInterval(spawningIntervalDecreaser);
          return currentValue;
        }
        return currentValue - 100;
      });
    }, 10000);
  }, []);

  //useEffect to look for player's remaining lives
  useEffect(() => {
    if (remainingLives > 0) return;
    setGameOver(true);
  }, [remainingLives, setGameOver]);

  return (
    <div>
      <div className="details-container">
        <PointsDisplayer
          text="Your score"
          points={score}
          pointsColor={"yellow"}
        />
        <PointsDisplayer
          text="Your lives"
          points={remainingLives}
          pointsColor={"red"}
        />
      </div>
      {balloons.map((ballon) => {
        return (
          <Ballon
            key={ballon.id}
            onClick={handleBalloonClick}
            ballon={ballon}
          />
        );
      })}
    </div>
  );
};

export default Game;
