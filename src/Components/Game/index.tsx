import React, { useEffect, useState } from "react";
import "./Game.css";

import Fly from "../Fly";
import PointsDisplayer from "../PointsDisplayer";

import generateRandomNumber from "../../functions/generateRandomNumber";
import pickRandom from "../../functions/pickRandom";

import { IFly } from "../../types";
import Raquete from "../Raquete";

interface IProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}

const Game: React.FC<IProps> = ({ score, setScore, setGameOver }) => {
  const [flies, setBalloons] = useState<IFly[]>([]);
  const [flieSpawningInterval, setBalloonSpawningInterval] = useState(1000);
  const [flieSpawningFunction, setBalloonSpawningFunction] =
    useState<NodeJS.Timer>();

  // Raquete positions
  const [raquetePositions, setRaquetePositions] = useState({
    x: 0,
    y: 0,
  });

  //Audios
  const [flyPopAudio, setBalloonPopAudio] = useState(
    new Audio(require("../../assets/audios/pop.mp3"))
  );
  const [hitAudio, setHitAudio] = useState(
    new Audio(require("../../assets/audios/hit.mp3"))
  );

  const [remainingLives, setRemainingLives] = useState(3);

  //Function that will be triggered when the user clicks in a Balloon
  const handleBalloonClick = (ballonId: number) => {
    setBalloons((currentBalloons) => {
      return currentBalloons.filter((ballon) => ballon.id !== ballonId);
    });
    setScore((currentScore) => currentScore + 1);
    flyPopAudio.currentTime = 0.7;
    flyPopAudio.volume = 1;
    flyPopAudio.play();
  };

  //useEffect to spawn flies at a certain period of time
  useEffect(() => {
    clearInterval(flieSpawningFunction);
    setBalloonSpawningFunction(
      setInterval(() => {
        setBalloons((currentBalloons) => {
          return [
            ...currentBalloons,
            {
              id: Date.now(),
              position: {
                x: generateRandomNumber(10, 90),
                y: 2,
              },
              clicked: false,
            },
          ];
        });
      }, flieSpawningInterval)
    );
  }, [flieSpawningInterval, generateRandomNumber]);

  //useEffect to make every fly goes down
  //and check if there's a fly at the very bottom
  useEffect(() => {
    setInterval(() => {
      setBalloons((currentBalloons) => {
        //Add 0.1 in Y for every fly
        const newCurrentBalloons = currentBalloons.map((fly) => {
          return {
            ...fly,
            position: {
              x: fly.position.x,
              y: fly.position.y + 1,
            },
          };
        });

        //Check if there's a fly at the extreme bottom of the page
        newCurrentBalloons.forEach((fly) => {
          if (fly.position.y < 100) return; //Y Limit
          //If Y is greater than this, decrease a life from the player
          hitAudio.currentTime = 0.2;
          hitAudio.play();
          setRemainingLives(
            (currentRemainingLives) => currentRemainingLives - 1
          );
        });

        //Return only flies that have the Y position lower than 100
        return newCurrentBalloons.filter((fly) => fly.position.y < 100);
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

  // function that will make the player cursor become a raquete
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setRaquetePositions({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div className="game-container" onMouseMove={handleMouseMove}>
      <Raquete x={raquetePositions.x} y={raquetePositions.y} />
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
      {flies.map((ballon) => {
        return (
          <Fly key={ballon.id} onClick={handleBalloonClick} fly={ballon} />
        );
      })}
    </div>
  );
};

export default Game;
