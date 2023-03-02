import React from "react";
import "./Fly.css";

import { IFly } from "../../types";

interface IProps {
  fly: IFly;
  onClick: (flyId: number) => void;
}

const Fly: React.FC<IProps> = ({ fly: fly, onClick }) => {
  return (
    <div
      onSelect={(e) => e.preventDefault()}
      className="fly"
      style={{
        marginLeft: `${fly.position.x}%`,
        marginTop: `${fly.position.y}vh`,
      }}
      onClick={onClick.bind(this, fly.id)}
    >
      <img
        src={
          fly.alive
            ? require(`../../assets/images/alive-fly.gif`)
            : require(`../../assets/images/dead-fly.gif`)
        }
        style={fly.alive ? { opacity: "100%" } : { opacity: "60%" }}
        alt="balloon"
        width={80}
        draggable={false}
      />
    </div>
  );
};

export default Fly;
