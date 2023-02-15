import React from "react";
import "./Subtitle.css";

interface IProps {
  children: string;
}

const Subtitle: React.FC<IProps> = ({ children }) => {
  return <p className="subtitle">{children}</p>;
};

export default Subtitle;
