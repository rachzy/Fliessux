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
      style={{ marginLeft: x - 40, marginTop: y - 20 }}
      src={require(`../../assets/images/raquete.png`)}
      alt={"raquete"}
      draggable={false}
    />
  );
};

export default Raquete;
