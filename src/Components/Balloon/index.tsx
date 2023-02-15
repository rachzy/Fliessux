import React from "react";
import "./Balloon.css";

import { IBallon } from "../../types";

interface IProps {
  ballon: IBallon;
  onClick: (ballonId: number) => void;
}

const Ballon: React.FC<IProps> = ({ ballon, onClick }) => {
  return (
    <div
      onSelect={(e) => e.preventDefault()}
      className="balloon"
      style={{
        marginLeft: `${ballon.position.x}%`,
        marginTop: `${ballon.position.y}vh`,
      }}
      onClick={onClick.bind(this, ballon.id)}
    >
      <img
        src={require(`../../assets/images/balloon-${ballon.color}.png`)}
        alt="balloon"
        width={80}
        draggable={false}
      />
    </div>
  );
};

export default Ballon;
