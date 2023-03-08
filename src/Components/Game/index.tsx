import React, { useEffect, useState } from "react";
import "./Game.css";

import Fly from "../Fly";
import PointsDisplayer from "../PointsDisplayer";

import generateRandomNumber from "../../functions/generateRandomNumber";

import { IFly, ISkill } from "../../types";
import Raquete from "../Raquete";
import SkillCard from "../SkillCard";

interface IProps {
  flies: IFly[];
  setFlies: React.Dispatch<React.SetStateAction<IFly[]>>;
  money: number;
  setMoney: React.Dispatch<React.SetStateAction<number>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  yourScoreLabel: string;
  yourLivesLabel: string;
  yourMoneyLabel: string;
  skills: ISkill[];
}

const Game: React.FC<IProps> = ({
  flies,
  setFlies,
  score,
  money,
  setMoney,
  setScore,
  setGameOver,
  yourScoreLabel,
  yourLivesLabel,
  yourMoneyLabel,
  skills,
}) => {
  const [flieSpawningInterval, setFlySpawningInterval] = useState(1000);
  const [flieSpawningFunction, setFlySpawningFunction] =
    useState<NodeJS.Timer>();

  // Raquete positions
  const [raquetePositions, setRaquetePositions] = useState({
    x: 0,
    y: 0,
  });

  //Audios
  const [flyPopAudio, setFlyPopAudio] = useState(
    new Audio(require("../../assets/audios/slug4.mp3"))
  );
  const [hitAudio, setHitAudio] = useState(
    new Audio(require("../../assets/audios/dwop.mp3"))
  );

  const [remainingLives, setRemainingLives] = useState(3);

  //Function that will be triggered when the user clicks in a Fly
  const handleFlyClick = (flyId: number) => {
    if (flies.filter((fly) => fly.id === flyId && !fly.alive)[0]) return;
    setFlies((currentFlies) => {
      return currentFlies.map((fly) => {
        if (fly.id !== flyId) return fly;
        return {
          ...fly,
          position: {
            x: fly.position.x,
            y: fly.position.y + 1,
          },
          alive: false,
        };
      });
    });

    setTimeout(() => {
      setFlies((currentFlies) => {
        return currentFlies.filter((fly) => fly.id !== flyId);
      });
    }, 1000);

    if (flyId % 2 === 0) {
      setFlyPopAudio(new Audio(require("../../assets/audios/slug4.mp3")));
    } else {
      setFlyPopAudio(new Audio(require("../../assets/audios/slug5.mp3")));
    }

    setScore((currentScore) => currentScore + 1);
    setMoney((currentValue) => currentValue + 1);

    flyPopAudio.currentTime = 0;
    flyPopAudio.volume = 0.5;
    flyPopAudio.play();
  };

  //useEffect to spawn flies at a certain period of time
  useEffect(() => {
    clearInterval(flieSpawningFunction);
    setFlySpawningFunction(
      setInterval(() => {
        setFlies((currentFlies) => {
          return [
            ...currentFlies,
            {
              id: Date.now(),
              position: {
                x: generateRandomNumber(10, 90),
                y: 2,
              },
              clicked: false,
              alive: true,
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
      setFlies((currentFlies) => {
        //Add 0.1 in Y for every fly
        const newCurrentFlies = currentFlies.map((fly) => {
          if (!fly.alive) return fly;
          return {
            ...fly,
            position: {
              x: fly.position.x,
              y: fly.position.y + 1,
            },
          };
        });

        //Check if there's a fly at the extreme bottom of the page
        newCurrentFlies.forEach((fly) => {
          if (!fly.alive) return;
          if (fly.position.y < 100) return; //Y Limit
          //If Y is greater than this, decrease a life from the player
          hitAudio.currentTime = 0.2;
          hitAudio.play();
          setRemainingLives(
            (currentRemainingLives) => currentRemainingLives - 1
          );
        });

        //Return only flies that have the Y position lower than 100
        return newCurrentFlies.filter((fly) => fly.position.y < 100);
      });
    }, 400);
  }, [hitAudio]);

  //useEffect to decrease the fly spawning interval in every 10 seconds
  useEffect(() => {
    const spawningIntervalDecreaser = setInterval(() => {
      setFlySpawningInterval((currentValue) => {
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
          text={yourMoneyLabel}
          points={money}
          pointsColor={"green"}
        />
        <PointsDisplayer
          text={yourScoreLabel}
          points={score}
          pointsColor={"yellow"}
        />
        <PointsDisplayer
          text={yourLivesLabel}
          points={remainingLives}
          pointsColor={"red"}
        />
      </div>
      {flies.map((fly) => {
        return <Fly key={fly.id} onClick={handleFlyClick} fly={fly} />;
      })}
      {skills.map((skill) => {
        return (
          <SkillCard
            key={skill.title}
            money={money}
            setMoney={setMoney}
            skill={skill}
          />
        );
      })}
    </div>
  );
};

export default Game;
