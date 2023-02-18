import React from "react";
import "./Raquete.css";

interface IProps {
  x: number;
  y: number;
}

const Raquete: React.FC<IProps> = ({ x, y }) => {
  return (
    <img
      className="raquete"
      style={{ marginLeft: x, marginTop: y }}
      src={require(`../../assets/images/raquete.png`)}
      alt={"raquete"}
      draggable={false}
    />
  );
};

export default Raquete;
