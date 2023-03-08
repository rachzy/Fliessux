import React from "react";
import "./SkillCard.css";

import { ISkill } from "../../types";

interface IProps {
  skill: ISkill;
  money: number;
  setMoney: React.Dispatch<React.SetStateAction<number>>;
}

const SkillCard: React.FC<IProps> = ({ skill, money, setMoney }) => {
  return (
    <div
      style={{ opacity: money > skill.cost ? "100%" : "30%" }}
      className="skill-card"
      onClick={() => {
        if (money < skill.cost) return;
        setMoney((currentValue) => currentValue - skill.cost);
        skill.execute();
      }}
    >
      <img
        src={require(`../../assets/images/${skill.thumbnail}`)}
        alt={skill.title}
      />
      <h2>{skill.title}</h2>
      <p>R$ {skill.cost.toFixed(2).replace(".", ",")}</p>
    </div>
  );
};

export default SkillCard;
