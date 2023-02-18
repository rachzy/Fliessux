import React from "react";
import "./Fly.css";

import { IFly } from "../../types";

interface IProps {
  fly: IFly;
  onClick: (ballonId: number) => void;
}

const Fly: React.FC<IProps> = ({ fly: ballon, onClick }) => {
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
        src={require(`../../assets/images/alive-fly.gif`)}
        alt="balloon"
        width={80}
        draggable={false}
      />
    </div>
  );
};

export default Fly;
